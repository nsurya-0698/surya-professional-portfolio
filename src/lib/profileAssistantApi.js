import { createLocalAssistantReply } from './profileAssistant.js';
import { classifyAssistantQuestion } from './assistantRouting.js';
import { createArithmeticReply } from './safeArithmetic.js';

const DEFAULT_API_URL =
  'https://surya-portfolio-assistant.surya-professional-portfolio.workers.dev/api/chat';
const API_URL = (import.meta.env?.VITE_PROFILE_ASSISTANT_API_URL || DEFAULT_API_URL).trim();
const MAX_HISTORY_MESSAGES = 6;
const REQUEST_TIMEOUT_MS = 20_000;
const PROFILE_ROUTES = new Set(['profile', 'profile-unknown', 'mixed']);
const PROJECTS_CLARIFICATION =
  "Do you mean Surya's projects from this portfolio, or projects in general?";
const SUBJECT_CLARIFICATION = 'Do you mean Surya, or someone else from the conversation?';

const parseRetryAfterSeconds = (value) => {
  if (!value) return null;

  const seconds = Number(value);
  if (Number.isFinite(seconds) && seconds >= 0) {
    return Math.max(1, Math.min(3_600, Math.ceil(seconds)));
  }

  const retryAt = Date.parse(value);
  if (!Number.isFinite(retryAt)) return null;

  const delaySeconds = Math.ceil((retryAt - Date.now()) / 1_000);
  return Math.max(1, Math.min(3_600, delaySeconds));
};

const createRetryMessage = (route, retryAfterSeconds) => {
  const retryInstruction = retryAfterSeconds
    ? `Please try again in ${retryAfterSeconds} seconds.`
    : 'Please wait a moment and try again.';

  if (route === 'weather') {
    return `Live weather is receiving too many requests right now. ${retryInstruction}`;
  }

  return `Byte is receiving a lot of questions right now. ${retryInstruction}`;
};

const createFailureReply = (kind, route, message, historyMessages, retryAfterSeconds = null) => {
  if (route === 'ambiguous-projects') return PROJECTS_CLARIFICATION;
  if (route === 'ambiguous-subject') return SUBJECT_CLARIFICATION;

  if (PROFILE_ROUTES.has(route)) {
    return createLocalAssistantReply(message, historyMessages);
  }

  if (kind === 'rate-limit') {
    return createRetryMessage(route, retryAfterSeconds);
  }

  if (route === 'weather') {
    if (kind === 'timeout') {
      return 'The live weather request took too long. Please try again.';
    }

    if (kind === 'network') {
      return "Live weather couldn't connect. Please check your connection and try again.";
    }

    return 'Live weather is temporarily unavailable. Please try again shortly.';
  }

  if (kind === 'timeout') {
    return 'Byte took too long to respond. Please try again.';
  }

  if (kind === 'network') {
    return "Byte couldn't connect to the assistant service. Please check your connection and try again.";
  }

  return 'The AI provider is temporarily unavailable. Please try again shortly.';
};

const createFailureResult = (kind, route, message, historyMessages, retryAfterSeconds = null) => ({
  content: createFailureReply(kind, route, message, historyMessages, retryAfterSeconds),
  source: 'local',
});

export const getAssistantReply = async (
  { message, messages = [] },
  {
    apiUrl = API_URL,
    fetchImpl = globalThis.fetch,
    setTimeoutImpl = globalThis.setTimeout,
    clearTimeoutImpl = globalThis.clearTimeout,
    requestTimeoutMs = REQUEST_TIMEOUT_MS,
  } = {}
) => {
  const normalizedMessages = Array.isArray(messages) ? messages : [];
  const recentMessages = normalizedMessages
    .filter((item) => item.role === 'user' || item.role === 'assistant')
    .slice(-MAX_HISTORY_MESSAGES)
    .map(({ role, content }) => ({ role, content }));
  const historyMessages =
    recentMessages.at(-1)?.role === 'user' && recentMessages.at(-1)?.content.trim() === message.trim()
      ? recentMessages.slice(0, -1)
      : recentMessages;
  const arithmeticReply = createArithmeticReply(message);

  if (arithmeticReply !== null) {
    return {
      content: arithmeticReply,
      source: 'arithmetic',
    };
  }

  const route = classifyAssistantQuestion(message, historyMessages);

  if (!apiUrl || typeof fetchImpl !== 'function') {
    return createFailureResult('network', route, message, historyMessages);
  }

  const controller = new AbortController();
  const timeoutId = setTimeoutImpl?.(() => controller.abort(), requestTimeoutMs);

  try {
    const response = await fetchImpl(apiUrl, {
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

    if (response.status === 429) {
      const retryAfterSeconds = parseRetryAfterSeconds(response.headers.get('retry-after'));
      return createFailureResult(
        'rate-limit',
        route,
        message,
        historyMessages,
        retryAfterSeconds
      );
    }

    if (response.status === 503 || !response.ok) {
      return createFailureResult('provider', route, message, historyMessages);
    }

    const contentType = response.headers.get('content-type') || '';

    if (!contentType.includes('application/json')) {
      return createFailureResult('provider', route, message, historyMessages);
    }

    let data;
    try {
      data = await response.json();
    } catch {
      return createFailureResult('provider', route, message, historyMessages);
    }

    if (!data?.reply) {
      return createFailureResult('provider', route, message, historyMessages);
    }

    return {
      content: data.reply,
      source: 'api',
    };
  } catch (error) {
    const kind = controller.signal.aborted || error?.name === 'AbortError' ? 'timeout' : 'network';

    if (import.meta.env?.DEV) {
      console.info(`Portfolio assistant using ${kind} fallback.`);
    }

    return createFailureResult(kind, route, message, historyMessages);
  } finally {
    clearTimeoutImpl?.(timeoutId);
  }
};
