# Byte Low-Latency Model Design

## Context

Byte's general-question route currently uses `@cf/qwen/qwen3.8-27b` with a 12-second browser timeout. The model is capable, but intermittent slow responses can outlast the browser cutoff. The assistant must remain free, preserve Surya-specific grounding, and answer general questions reliably.

## Decision

Use `@cf/zai-org/glm-4.7-flash` as the primary model for general questions. Cloudflare positions it for fast, efficient conversational use, and it consumes substantially fewer free-tier neurons than Qwen 3.8. Keep `@cf/qwen/qwen3-30b-a3b-fp8` as the sequential fallback and as the existing profile-grounded model.

## Request Flow

1. Deterministic arithmetic continues to run before any network or model call.
2. Live weather continues to use the existing weather provider without AI inference.
3. Surya, résumé, experience, skills, and project questions continue through the isolated profile-grounded Qwen 3 route.
4. General questions use GLM-4.7-Flash.
5. Qwen 3 is called only if GLM errors, returns invalid output, or reports truncation.
6. Current-information questions retain the deterministic non-live-data caveat.
7. Unknown or sensitive Surya-specific details continue to direct visitors to Surya rather than guessing.

## Reliability and Quota Controls

- Increase the browser request timeout from 12 to 20 seconds. Canary testing showed normal answers in 1–4 seconds but one correct multilingual response at 16.8 seconds, so the larger cutoff prevents a false failure without slowing typical responses.
- Do not race models or retry automatically in parallel; speculative calls would waste the shared free allocation.
- Preserve the shared visitor, general-global, and weather-specific rate limits.
- Keep output concise and bounded.
- Preserve typed rate-limit, timeout, network, and provider fallback messages.

## Compatibility

GLM uses the OpenAI-style chat-completions response shape already supported by Byte. The GLM-specific payload will use documented chat-completion fields and will be validated against the live Cloudflare binding before deployment. If the payload or quality gate fails, production remains on the existing Qwen 3.8 configuration.

## Validation and Rollout

- Unit tests must verify exact model selection and model-specific payloads.
- Existing routing, grounding, injection, weather, arithmetic, fallback, rate-limit, and frontend tests must remain green.
- Run live GLM canaries covering short answers, lists, explanations, coding, and conversation context.
- Acceptance requires no schema errors, no hidden reasoning, no truncated output, accurate concise answers, and typical responses comfortably below the browser cutoff.
- Run full ESLint, production build, Wrangler dry-run, and deployed endpoint smoke tests.
- Publish only after the canary passes; rollback is a one-constant model restoration plus redeployment.

## Non-Goals

- No paid service or third-party database.
- No parallel model racing.
- No streaming UI in this change.
- No changes to résumé content, portfolio layout, weather behavior, or profile-grounding rules.
