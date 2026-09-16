import assert from 'node:assert/strict';
import test from 'node:test';
import { PROFILE_ASSISTANT_REQUEST_TIMEOUT_MS } from '../src/lib/profileAssistantApi.js';
import {
  OPENROUTER_ENDPOINT,
  OPENROUTER_MODEL,
  OPENROUTER_REQUEST_TIMEOUT_MS,
  OpenRouterError,
  requestOpenRouter,
} from './openrouter-client.js';

const messages = [
  { role: 'system', content: 'Server-owned instructions.' },
  { role: 'user', content: 'Explain recursion.' },
];

test('leaves browser-to-worker time after the provider timeout', () => {
  assert.ok(OPENROUTER_REQUEST_TIMEOUT_MS <= 15_000);
  assert.ok(PROFILE_ASSISTANT_REQUEST_TIMEOUT_MS - OPENROUTER_REQUEST_TIMEOUT_MS >= 5_000);
});

test('sends one strict-free privacy-aware OpenRouter request', async () => {
  let captured;
  const result = await requestOpenRouter({
    apiKey: 'test-secret',
    messages,
    maxTokens: 400,
    temperature: 0.2,
    topP: 0.8,
    fetchImpl: async (url, init) => {
      captured = { url, init, body: JSON.parse(init.body) };
      return Response.json({
        choices: [{ finish_reason: 'stop', message: { content: 'A safe answer.' } }],
      });
    },
  });

  assert.equal(captured.url, OPENROUTER_ENDPOINT);
  assert.equal(captured.init.method, 'POST');
  assert.equal(captured.init.headers.Authorization, 'Bearer test-secret');
  assert.equal(captured.init.headers['HTTP-Referer'], 'https://nsurya-0698.github.io/surya-professional-portfolio/');
  assert.equal(captured.init.headers['X-OpenRouter-Title'], 'Surya Portfolio Byte');
  assert.equal(captured.body.model, OPENROUTER_MODEL);
  assert.deepEqual(captured.body.messages, messages);
  assert.equal(captured.body.stream, false);
  assert.equal(captured.body.max_tokens, 400);
  assert.deepEqual(captured.body.provider, {
    allow_fallbacks: true,
    data_collection: 'deny',
    zdr: true,
  });
  assert.equal('models' in captured.body, false);
  assert.equal('tools' in captured.body, false);
  assert.equal('plugins' in captured.body, false);
  assert.equal('web_search_options' in captured.body, false);
  assert.equal(result.choices[0].message.content, 'A safe answer.');
});

test('fails before fetch when the server secret is missing', async () => {
  let called = false;

  await assert.rejects(
    requestOpenRouter({
      apiKey: '',
      messages,
      maxTokens: 100,
      temperature: 0.2,
      topP: 0.8,
      fetchImpl: async () => {
        called = true;
        return Response.json({});
      },
    }),
    (error) => error instanceof OpenRouterError && error.category === 'configuration'
  );
  assert.equal(called, false);
});

test('maps provider status without exposing the upstream response body', async () => {
  for (const [status, category] of [
    [401, 'configuration'],
    [402, 'free-capacity'],
    [403, 'configuration'],
    [408, 'timeout'],
    [429, 'rate-limit'],
    [503, 'provider-unavailable'],
  ]) {
    await assert.rejects(
      requestOpenRouter({
        apiKey: 'test-secret',
        messages,
        maxTokens: 100,
        temperature: 0.2,
        topP: 0.8,
        fetchImpl: async () =>
          new Response('sensitive upstream details', {
            status,
            headers: { 'Retry-After': '9999' },
          }),
      }),
      (error) => {
        assert.equal(error instanceof OpenRouterError, true);
        assert.equal(error.category, category);
        assert.doesNotMatch(error.message, /sensitive|test-secret/i);
        if (status === 429) assert.equal(error.retryAfter, '300');
        return true;
      }
    );
  }
});

test('rejects malformed JSON, top-level errors, and missing choices', async () => {
  const payloads = [
    new Response('not json', { status: 200 }),
    Response.json({ error: { message: 'provider detail' } }),
    Response.json({ choices: [] }),
  ];

  for (const response of payloads) {
    await assert.rejects(
      requestOpenRouter({
        apiKey: 'test-secret',
        messages,
        maxTokens: 100,
        temperature: 0.2,
        topP: 0.8,
        fetchImpl: async () => response,
      }),
      (error) => error instanceof OpenRouterError && error.category === 'invalid-response'
    );
  }
});
