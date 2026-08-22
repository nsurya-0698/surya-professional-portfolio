import { createLocalAssistantReply } from './profileAssistant.js';
import { classifyAssistantQuestion } from './assistantRouting.js';

const DEFAULT_API_URL =
  'https://surya-portfolio-assistant.surya-professional-portfolio.workers.dev/api/chat';
const API_URL = (import.meta.env?.VITE_PROFILE_ASSISTANT_API_URL || DEFAULT_API_URL).trim();
const MAX_HISTORY_MESSAGES = 6;
const REQUEST_TIMEOUT_MS = 12_000;
const createUnavailableReply = (message, historyMessages) => {
  const route = classifyAssistantQuestion(message, historyMessages);

  if (route === 'weather') {
    return 'Live weather is temporarily unavailable. Please try again shortly.';
  }

  if (route === 'profile' || route === 'profile-unknown' || route === 'mixed') {
    return createLocalAssistantReply(message, historyMessages);
  }

  return 'The free AI assistant is temporarily unavailable. Please try again shortly.';
};

export const getAssistantReply = async ({ message, messages }) => {
  const recentMessages = messages
    .filter((item) => item.role === 'user' || item.role === 'assistant')
    .slice(-MAX_HISTORY_MESSAGES)
    .map(({ role, content }) => ({ role, content }));
  const historyMessages =
    recentMessages.at(-1)?.role === 'user' && recentMessages.at(-1)?.content.trim() === message.trim()
      ? recentMessages.slice(0, -1)
      : recentMessages;

  if (!API_URL) {
    return {
      content: createUnavailableReply(message, historyMessages),
      source: 'local',
    };
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        message,
        messages: historyMessages,
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
      content: createUnavailableReply(message, historyMessages),
      source: 'local',
    };
  } finally {
    window.clearTimeout(timeoutId);
  }
};
