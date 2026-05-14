/* global process */
import { ASSISTANT_SYSTEM_PROMPT, PROFILE_CONTEXT } from '../src/data/profileKnowledge.js';

// Server-only endpoint for hosts that support API functions.
// Set OPENAI_API_KEY in the hosting environment. Optional: set OPENAI_MODEL to tune cost/latency.
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini';
const MAX_MESSAGE_LENGTH = 1200;
const MAX_HISTORY_MESSAGES = 6;

const sendJson = (res, statusCode, payload) => {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
};

const getRequestBody = (req) => {
  if (typeof req.body === 'string') {
    return JSON.parse(req.body || '{}');
  }

  return req.body || {};
};

const normalizeMessages = (messages = []) =>
  messages
    .filter((message) => message?.role === 'user' || message?.role === 'assistant')
    .slice(-MAX_HISTORY_MESSAGES)
    .map((message) => ({
      role: message.role,
      content: String(message.content || '').slice(0, MAX_MESSAGE_LENGTH),
    }));

const extractOutputText = (data) => {
  if (typeof data?.output_text === 'string') {
    return data.output_text.trim();
  }

  return (data?.output || [])
    .flatMap((item) => item.content || [])
    .map((content) => content.text || '')
    .join('\n')
    .trim();
};

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return sendJson(res, 204, {});
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return sendJson(res, 503, { error: 'Assistant is not configured' });
  }

  try {
    const body = getRequestBody(req);
    const message = String(body.message || '').trim().slice(0, MAX_MESSAGE_LENGTH);
    const messages = normalizeMessages(body.messages);

    if (!message) {
      return sendJson(res, 400, { error: 'Message is required' });
    }

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        instructions: `${ASSISTANT_SYSTEM_PROMPT}\n\nPORTFOLIO AND RESUME CONTEXT:\n${PROFILE_CONTEXT}`,
        input: [
          ...messages,
          {
            role: 'user',
            content: message,
          },
        ],
        max_output_tokens: 360,
        temperature: 0.4,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('OpenAI assistant request failed:', data?.error?.message || response.statusText);
      return sendJson(res, 502, { error: 'Assistant request failed' });
    }

    const reply = extractOutputText(data);

    if (!reply) {
      return sendJson(res, 502, { error: 'Assistant returned an empty response' });
    }

    return sendJson(res, 200, { reply });
  } catch (error) {
    console.error('Portfolio assistant error:', error);
    return sendJson(res, 500, { error: 'Assistant failed' });
  }
}
