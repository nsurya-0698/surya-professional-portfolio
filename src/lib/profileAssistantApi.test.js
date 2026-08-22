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
  assert.match(result.content, /Surya's projects.*projects in general/i);
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
