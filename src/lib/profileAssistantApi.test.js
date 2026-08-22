import assert from 'node:assert/strict';
import test from 'node:test';
import { getAssistantReply } from './profileAssistantApi.js';

const inertTimers = {
  setTimeoutImpl: () => 1,
  clearTimeoutImpl: () => {},
};

const jsonResponse = (payload, options = {}) =>
  new Response(JSON.stringify(payload), {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

const createAbortOnlyFetch = () => async (_url, { signal }) =>
  new Promise((resolve, reject) => {
    void resolve;
    const abort = () => {
      const error = new Error('private timeout detail');
      error.name = 'AbortError';
      reject(error);
    };

    if (signal.aborted) {
      abort();
      return;
    }

    signal.addEventListener('abort', abort, { once: true });
  });

const immediateTimeout = {
  setTimeoutImpl: (callback) => {
    queueMicrotask(callback);
    return 1;
  },
  clearTimeoutImpl: () => {},
};

test('answers safe arithmetic locally without calling the assistant API', async () => {
  let fetchCalls = 0;
  const result = await getAssistantReply(
    { message: '2 + 2', messages: [] },
    {
      ...inertTimers,
      fetchImpl: async () => {
        fetchCalls += 1;
        throw new Error('fetch should not run');
      },
    }
  );

  assert.equal(fetchCalls, 0);
  assert.equal(result.source, 'arithmetic');
  assert.match(result.content, /4/);
});

test('routes arithmetic through the Worker when chat context must be transitioned', async () => {
  const currentContext = {
    version: 1,
    activeRoute: null,
    activeSubject: null,
    activeTopic: null,
    pendingClarification: 'project-scope',
    clarificationAttempts: 0,
  };
  const nextContext = {
    version: 1,
    activeRoute: 'general',
    activeSubject: 'general',
    activeTopic: 'general',
    pendingClarification: null,
    clarificationAttempts: 0,
  };
  let requestBody = null;

  const result = await getAssistantReply(
    { message: '2 + 2', messages: [], context: currentContext },
    {
      ...inertTimers,
      fetchImpl: async (_url, options) => {
        requestBody = JSON.parse(options.body);
        return jsonResponse({
          reply: '4',
          source: 'deterministic-arithmetic',
          context: nextContext,
        });
      },
    }
  );

  assert.deepEqual(requestBody.context, currentContext);
  assert.equal(result.content, '4');
  assert.equal(result.source, 'deterministic-arithmetic');
  assert.deepEqual(result.context, nextContext);
});

test('shows Retry-After guidance for a rate-limited general question', async () => {
  const result = await getAssistantReply(
    { message: 'Explain recursion.', messages: [] },
    {
      ...inertTimers,
      fetchImpl: async () =>
        jsonResponse(
          { error: 'private throttle detail' },
          { status: 429, headers: { 'Retry-After': '45' } }
        ),
    }
  );

  assert.equal(result.source, 'local');
  assert.match(result.content, /receiving a lot of questions/i);
  assert.match(result.content, /45 seconds/i);
  assert.doesNotMatch(result.content, /private throttle detail/i);
});

test('uses a weather-specific rate-limit message', async () => {
  const result = await getAssistantReply(
    { message: 'Weather in Nashville', messages: [] },
    {
      ...inertTimers,
      fetchImpl: async () =>
        jsonResponse({ error: 'private weather detail' }, { status: 429 }),
    }
  );

  assert.equal(result.source, 'local');
  assert.match(result.content, /live weather.*too many requests/i);
  assert.doesNotMatch(result.content, /private weather detail/i);
});

test('distinguishes an AI provider failure without exposing backend details', async () => {
  const result = await getAssistantReply(
    { message: 'Explain idempotency.', messages: [] },
    {
      ...inertTimers,
      fetchImpl: async () =>
        jsonResponse({ error: 'model schema rejected secret field' }, { status: 503 }),
    }
  );

  assert.equal(result.source, 'local');
  assert.match(result.content, /AI provider is temporarily unavailable/i);
  assert.doesNotMatch(result.content, /schema|secret field/i);
});

test('distinguishes a request timeout from provider and network failures', async () => {
  const result = await getAssistantReply(
    { message: 'Explain idempotency.', messages: [] },
    {
      ...immediateTimeout,
      fetchImpl: createAbortOnlyFetch(),
      requestTimeoutMs: 1,
    }
  );

  assert.equal(result.source, 'local');
  assert.match(result.content, /took too long/i);
  assert.doesNotMatch(result.content, /private timeout detail/i);
});

test('uses a 20-second browser timeout by default', async () => {
  let scheduledDelay = null;
  const result = await getAssistantReply(
    { message: 'Explain idempotency.', messages: [] },
    {
      setTimeoutImpl: (_callback, delay) => {
        scheduledDelay = delay;
        return 1;
      },
      clearTimeoutImpl: () => {},
      fetchImpl: async () => jsonResponse({ reply: 'Idempotency makes retries safe.' }),
    }
  );

  assert.equal(scheduledDelay, 20_000);
  assert.equal(result.content, 'Idempotency makes retries safe.');
  assert.equal(result.source, 'api');
});

test('forwards opaque conversation context and preserves successful response metadata', async () => {
  const currentContext = {
    version: 1,
    activeRoute: 'profile',
    futureWorkerField: { remainsOpaque: true },
  };
  const nextContext = {
    version: 1,
    activeRoute: 'profile',
    activeSubject: 'surya',
    activeTopic: 'projects',
    pendingClarification: null,
    clarificationAttempts: 0,
  };
  let requestBody = null;

  const result = await getAssistantReply(
    {
      message: 'Yes',
      messages: [
        { id: 'assistant-1', role: 'assistant', content: 'Are you asking about Surya?' },
        { id: 'user-1', role: 'user', content: 'Yes' },
      ],
      context: currentContext,
    },
    {
      ...inertTimers,
      fetchImpl: async (_url, options) => {
        requestBody = JSON.parse(options.body);
        return jsonResponse({
          reply: "Surya's projects include...",
          source: 'cloudflare-profile-ai',
          context: nextContext,
        });
      },
    }
  );

  assert.deepEqual(requestBody.context, currentContext);
  assert.deepEqual(requestBody.messages, [
    { role: 'assistant', content: 'Are you asking about Surya?' },
  ]);
  assert.equal(result.source, 'cloudflare-profile-ai');
  assert.deepEqual(result.context, nextContext);
});

test('does not expose a new context when a provider request fails', async () => {
  const currentContext = {
    version: 1,
    activeRoute: 'profile',
    activeSubject: 'surya',
    activeTopic: 'projects',
    pendingClarification: null,
    clarificationAttempts: 0,
  };
  let requestBody = null;

  const result = await getAssistantReply(
    { message: 'Tell me more', messages: [], context: currentContext },
    {
      ...inertTimers,
      fetchImpl: async (_url, options) => {
        requestBody = JSON.parse(options.body);
        return jsonResponse({ error: 'provider unavailable' }, { status: 503 });
      },
    }
  );

  assert.deepEqual(requestBody.context, currentContext);
  assert.equal(result.source, 'local');
  assert.equal(Object.hasOwn(result, 'context'), false);
});

test('sends null for malformed context and ignores malformed response context', async () => {
  let requestBody = null;

  const result = await getAssistantReply(
    { message: 'Hello', messages: [], context: ['not', 'a', 'context', 'object'] },
    {
      ...inertTimers,
      fetchImpl: async (_url, options) => {
        requestBody = JSON.parse(options.body);
        return jsonResponse({
          reply: 'Hello!',
          source: 'cloudflare-general-ai',
          context: ['invalid'],
        });
      },
    }
  );

  assert.equal(requestBody.context, null);
  assert.equal(result.source, 'cloudflare-general-ai');
  assert.equal(Object.hasOwn(result, 'context'), false);
});

test('distinguishes a network failure for a general question', async () => {
  const result = await getAssistantReply(
    { message: 'Explain idempotency.', messages: [] },
    {
      ...inertTimers,
      fetchImpl: async () => {
        throw new TypeError('private network detail');
      },
    }
  );

  assert.equal(result.source, 'local');
  assert.match(result.content, /couldn't connect/i);
  assert.doesNotMatch(result.content, /private network detail/i);
});

test('keeps project clarification available when the Worker is offline', async () => {
  const result = await getAssistantReply(
    { message: 'Tell me about the projects', messages: [] },
    {
      ...inertTimers,
      fetchImpl: async () => {
        throw new TypeError('offline');
      },
    }
  );

  assert.equal(result.source, 'local');
  assert.match(result.content, /asking about Surya's portfolio projects/i);
  assert.equal(result.context.pendingClarification, 'project-scope');
});

test('creates pending context for an offline clarification and does not repeat it on yes', async () => {
  const offlineFetch = async () => {
    throw new TypeError('offline');
  };
  const firstMessages = [{ role: 'user', content: 'Tell me about projects' }];
  const firstResult = await getAssistantReply(
    { message: 'Tell me about projects', messages: firstMessages },
    { ...inertTimers, fetchImpl: offlineFetch }
  );

  assert.match(firstResult.content, /asking about Surya's portfolio projects/i);
  assert.equal(firstResult.context.pendingClarification, 'project-scope');

  const secondResult = await getAssistantReply(
    {
      message: 'Yes',
      messages: [
        ...firstMessages,
        { role: 'assistant', content: firstResult.content },
        { role: 'user', content: 'Yes' },
      ],
      context: firstResult.context,
    },
    { ...inertTimers, fetchImpl: offlineFetch }
  );

  assert.match(secondResult.content, /couldn't connect/i);
  assert.doesNotMatch(secondResult.content, /are you asking|do you mean/i);
  assert.equal(Object.hasOwn(secondResult, 'context'), false);
});

test('does not repeat a pending clarification when the Worker is offline', async () => {
  const pendingContext = {
    version: 1,
    activeRoute: null,
    activeSubject: null,
    activeTopic: null,
    pendingClarification: 'project-scope',
    clarificationAttempts: 0,
  };
  const messages = [
    { role: 'user', content: 'Tell me about projects' },
    {
      role: 'assistant',
      content: 'Are you asking about Surya\'s portfolio projects?',
    },
    { role: 'user', content: 'Yes' },
  ];

  const scenarios = [
    {
      name: 'rate limit',
      fetchImpl: async () => jsonResponse({ error: 'busy' }, { status: 429 }),
      expected: /receiving a lot of questions/i,
    },
    {
      name: 'provider failure',
      fetchImpl: async () => jsonResponse({ error: 'down' }, { status: 503 }),
      expected: /provider is temporarily unavailable/i,
    },
    {
      name: 'network failure',
      fetchImpl: async () => {
        throw new TypeError('offline');
      },
      expected: /couldn't connect/i,
    },
    {
      name: 'timeout',
      fetchImpl: createAbortOnlyFetch(),
      expected: /took too long/i,
      timerOptions: immediateTimeout,
    },
  ];

  for (const scenario of scenarios) {
    const result = await getAssistantReply(
      { message: 'Yes', messages, context: pendingContext },
      {
        ...inertTimers,
        ...scenario.timerOptions,
        fetchImpl: scenario.fetchImpl,
        requestTimeoutMs: 1,
      }
    );

    assert.match(result.content, scenario.expected, scenario.name);
    assert.doesNotMatch(result.content, /are you asking|do you mean/i, scenario.name);
    assert.equal(Object.hasOwn(result, 'context'), false, scenario.name);
  }
});

test('does not synthesize clarification resolutions while the Worker is offline', async () => {
  const offlineFetch = async () => {
    throw new TypeError('offline');
  };
  const scenarios = [
    {
      name: 'explicit Surya project resolution',
      message: "Surya's projects",
      context: {
        version: 1,
        activeRoute: null,
        activeSubject: null,
        activeTopic: 'projects',
        pendingClarification: 'project-scope',
        pendingQuestion: 'Tell me about projects',
        clarificationAttempts: 0,
      },
    },
    {
      name: 'explicit Surya subject resolution',
      message: 'Surya',
      context: {
        version: 1,
        activeRoute: null,
        activeSubject: null,
        activeTopic: null,
        pendingClarification: 'profile-subject',
        pendingQuestion: 'What did he build?',
        clarificationAttempts: 0,
      },
    },
    {
      name: 'explicit general subject resolution',
      message: 'Alan Turing',
      context: {
        version: 1,
        activeRoute: null,
        activeSubject: null,
        activeTopic: null,
        pendingClarification: 'profile-subject',
        pendingQuestion: 'What did he build?',
        clarificationAttempts: 0,
      },
    },
  ];

  for (const scenario of scenarios) {
    const result = await getAssistantReply(
      { message: scenario.message, messages: [], context: scenario.context },
      { ...inertTimers, fetchImpl: offlineFetch }
    );

    assert.match(result.content, /couldn't connect/i, scenario.name);
    assert.equal(Object.hasOwn(result, 'context'), false, scenario.name);
  }
});

test('keeps cross-mode context coherent when a Surya request fails between general turns', async () => {
  const alanContext = {
    version: 1,
    activeRoute: 'general',
    activeIntent: 'general',
    activeSubject: 'general',
    activeEntity: 'Alan Turing',
    activeTopic: 'general',
    lastResolvedQuestion: 'Tell me about Alan Turing',
    pendingClarification: null,
    pendingQuestion: null,
    clarificationAttempts: 0,
  };
  const alanResult = await getAssistantReply(
    { message: 'Tell me about Alan Turing', messages: [] },
    {
      ...inertTimers,
      fetchImpl: async () =>
        jsonResponse({
          reply: 'Alan Turing was a pioneering computer scientist.',
          source: 'cloudflare-general-ai',
          context: alanContext,
        }),
    }
  );

  const failedSuryaResult = await getAssistantReply(
    {
      message: 'What did Surya build at Oracle?',
      messages: [
        { role: 'user', content: 'Tell me about Alan Turing' },
        { role: 'assistant', content: alanResult.content },
      ],
      context: alanResult.context,
    },
    {
      ...inertTimers,
      fetchImpl: async () => jsonResponse({ error: 'down' }, { status: 503 }),
    }
  );

  assert.match(failedSuryaResult.content, /provider is temporarily unavailable/i);
  assert.doesNotMatch(failedSuryaResult.content, /Agent Gateway|Oracle Chat/i);
  assert.equal(Object.hasOwn(failedSuryaResult, 'context'), false);

  let followUpBody = null;
  const followUpResult = await getAssistantReply(
    {
      message: 'What did he build?',
      messages: [
        { role: 'user', content: 'Tell me about Alan Turing' },
        { role: 'assistant', content: alanResult.content },
        { role: 'user', content: 'What did Surya build at Oracle?' },
        { role: 'assistant', content: failedSuryaResult.content },
      ],
      context: alanResult.context,
    },
    {
      ...inertTimers,
      fetchImpl: async (_url, options) => {
        followUpBody = JSON.parse(options.body);
        return jsonResponse({
          reply: 'Alan Turing helped develop foundational computing concepts.',
          source: 'cloudflare-general-ai',
          context: alanContext,
        });
      },
    }
  );

  assert.deepEqual(followUpBody.context, alanContext);
  assert.match(followUpResult.content, /Alan Turing/i);
});

test('does not show a semantic same-route fallback when a profile topic switch fails', async () => {
  const projectContext = {
    version: 1,
    activeRoute: 'profile',
    activeIntent: 'profile',
    activeSubject: 'surya',
    activeEntity: 'Surya',
    activeTopic: 'projects',
    lastResolvedQuestion: "Tell me about Surya's projects",
    pendingClarification: null,
    pendingQuestion: null,
    clarificationAttempts: 0,
  };

  const result = await getAssistantReply(
    {
      message: "Tell me about Surya's Oracle experience",
      messages: [],
      context: projectContext,
    },
    {
      ...inertTimers,
      fetchImpl: async () => jsonResponse({ error: 'down' }, { status: 503 }),
    }
  );

  assert.match(result.content, /provider is temporarily unavailable/i);
  assert.doesNotMatch(result.content, /Agent Gateway|Oracle Chat/i);
  assert.equal(Object.hasOwn(result, 'context'), false);
});

test('keeps deterministic profile answers when the remote request times out', async () => {
  const result = await getAssistantReply(
    { message: 'What did Surya do at Oracle?', messages: [] },
    {
      ...immediateTimeout,
      fetchImpl: createAbortOnlyFetch(),
      requestTimeoutMs: 1,
    }
  );

  assert.equal(result.source, 'local');
  assert.match(result.content, /Agent Gateway/);
  assert.doesNotMatch(result.content, /temporarily unavailable|took too long/i);
});
