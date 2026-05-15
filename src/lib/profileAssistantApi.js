import { createLocalAssistantReply } from './profileAssistant.js';

const API_URL = (import.meta.env?.VITE_PROFILE_ASSISTANT_API_URL || '').trim();
const MAX_HISTORY_MESSAGES = 6;

export const getAssistantReply = async ({ message, messages }) => {
  const recentMessages = messages
    .filter((item) => item.role === 'user' || item.role === 'assistant')
    .slice(-MAX_HISTORY_MESSAGES)
    .map(({ role, content }) => ({ role, content }));

  if (!API_URL) {
    return {
      content: createLocalAssistantReply(message, recentMessages),
      source: 'local',
    };
  }

  try {
    // Optional hosted API path. Static GitHub Pages builds skip this unless
    // VITE_PROFILE_ASSISTANT_API_URL is configured at build time.
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        messages: recentMessages,
      }),
    });

    const contentType = response.headers.get('content-type') || '';

    if (!response.ok || !contentType.includes('application/json')) {
      throw new Error('Assistant API is unavailable');
    }

    const data = await response.json();

    if (!data?.reply) {
      throw new Error('Assistant API returned an empty response');
    }

    return {
      content: data.reply,
      source: 'api',
    };
  } catch (error) {
    if (import.meta.env?.DEV) {
      console.info('Portfolio assistant using local response fallback:', error.message);
    }

    return {
      content: createLocalAssistantReply(message, recentMessages),
      source: 'local',
    };
  }
};
