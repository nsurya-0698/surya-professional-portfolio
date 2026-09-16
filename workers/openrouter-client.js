import { OPENROUTER_MODEL } from '../src/lib/assistantConfig.js';

export const OPENROUTER_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';
export { OPENROUTER_MODEL };

const APPLICATION_URL = 'https://nsurya-0698.github.io/surya-professional-portfolio/';
const APPLICATION_TITLE = 'Surya Portfolio Byte';
export const OPENROUTER_REQUEST_TIMEOUT_MS = 15_000;
const MAX_RETRY_AFTER_SECONDS = 300;

const getRetryAfter = (response) => {
  const value = Number.parseInt(response.headers.get('retry-after') || '', 10);
  return Number.isFinite(value) && value > 0
    ? String(Math.min(value, MAX_RETRY_AFTER_SECONDS))
    : null;
};

const getErrorCategory = (status) => {
  if (status === 401 || status === 403) return 'configuration';
  if (status === 402) return 'free-capacity';
  if (status === 408) return 'timeout';
  if (status === 429) return 'rate-limit';
  return status >= 500 ? 'provider-unavailable' : 'provider-response';
};

export class OpenRouterError extends Error {
  constructor(category, status = 503, retryAfter = null) {
    super('OpenRouter request failed');
    this.name = 'OpenRouterError';
    this.category = category;
    this.status = status;
    this.retryAfter = retryAfter;
  }
}

export const requestOpenRouter = async ({
  apiKey,
  messages,
  maxTokens,
  temperature,
  topP,
  fetchImpl = fetch,
}) => {
  if (!apiKey || typeof apiKey !== 'string') {
    throw new OpenRouterError('configuration', 503);
  }

  let response;

  try {
    response = await fetchImpl(OPENROUTER_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': APPLICATION_URL,
        'X-OpenRouter-Title': APPLICATION_TITLE,
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages,
        max_tokens: maxTokens,
        temperature,
        top_p: topP,
        stream: false,
        provider: {
          allow_fallbacks: true,
          data_collection: 'deny',
          zdr: true,
        },
      }),
      signal: AbortSignal.timeout(OPENROUTER_REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    const category = error?.name === 'TimeoutError' || error?.name === 'AbortError'
      ? 'timeout'
      : 'network';
    throw new OpenRouterError(category, 503);
  }

  if (!response.ok) {
    throw new OpenRouterError(
      getErrorCategory(response.status),
      response.status,
      getRetryAfter(response)
    );
  }

  let result;

  try {
    result = await response.json();
  } catch {
    throw new OpenRouterError('invalid-response', 503);
  }

  if (result?.error || !Array.isArray(result?.choices) || result.choices.length === 0) {
    throw new OpenRouterError('invalid-response', 503);
  }

  return result;
};
