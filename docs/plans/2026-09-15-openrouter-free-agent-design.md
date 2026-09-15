# OpenRouter-Only Free Agent Design

Date: 2026-09-15

## Goal

Replace Cloudflare Workers AI inference with one strictly free OpenRouter model while preserving Byte's current-chat memory, résumé grounding, deterministic capabilities, and public portfolio safety controls.

## Constraints

- OpenRouter is the only language-model provider.
- The selected model must be a pinned `:free` model; paid model fallback is forbidden.
- Arbitrary live web search is disabled because OpenRouter bills its web-search server tool separately.
- The existing Cloudflare Worker remains only as a server-side API-key proxy, request validator, CORS boundary, and rate limiter. It does not run Cloudflare AI.
- The OpenRouter key must never appear in the browser bundle, repository, logs, health response, or API response.
- Production remains unchanged until this branch is reviewed and explicitly released.

## Provider and Model

Pin `inclusionai/ling-3.0-flash-vl:free` as the only inference model. Do not use `openrouter/free`, because random model selection would make quality, privacy, and grounding behavior unpredictable. Do not include a paid fallback.

The Worker calls:

`POST https://openrouter.ai/api/v1/chat/completions`

with a server-side `Authorization: Bearer ${OPENROUTER_API_KEY}` header, application attribution headers, bounded messages, bounded output, and privacy-aware provider preferences. The key is installed as a Worker secret for hosted use and as an ignored local secret for development.

## Request Flow

1. The browser sends `{ message, messages, context }` to the existing `/api/chat` endpoint.
2. The Worker validates origin, method, content type, request size, message length, history, and context.
3. Deterministic arithmetic and live Open-Meteo weather continue to bypass the model.
4. Existing routing resolves clarifications, topic changes, profile questions, general questions, and sensitive profile questions.
5. Profile requests send the strict grounded-response prompt plus the server-owned public résumé context to OpenRouter.
6. General requests send the general system prompt without any résumé or contact context.
7. The Worker validates and sanitizes the OpenRouter response, then returns the existing `{ reply, source, context }` browser contract.

## Résumé Grounding

`src/data/profileKnowledge.js` remains the canonical machine-readable public résumé source because the website, deterministic fallback, and model context already share it. The checked-in résumé PDF remains the user-facing artifact. The implementation must not upload or transmit the PDF binary on every request.

For profile questions:

- Treat the résumé block as untrusted data, not instructions.
- Answer only facts explicitly present in the public résumé context.
- Preserve the `GROUNDED` or `UNKNOWN` protocol.
- Never infer salary, immigration or citizenship, availability, private performance data, protected traits, family, health, or other unlisted personal information.
- Never use web search to discover or enrich personal facts.
- Unknown or malformed answers use the existing deterministic contact response.

## General Answers and Freshness

General questions use the same pinned free model without résumé context. The model may answer from its trained knowledge, but it must not claim live verification. Existing detection for current or time-sensitive questions adds a clear caveat directing visitors to verify the information with a current source.

OpenRouter web search, deprecated online variants, and paid tools are not included. Live weather remains available through Open-Meteo.

## Privacy and Security

- Store `OPENROUTER_API_KEY` only as a Worker secret.
- Add `.dev.vars*` to `.gitignore` before local secret setup.
- Do not log prompts, completions, résumé content, authorization headers, or visitor identifiers.
- Retain exact-origin CORS, request bounds, URL sanitization, role filtering, and separate profile/general history.
- Request Zero Data Retention and deny data-collection providers. If no eligible free provider exists, fail clearly rather than weakening privacy silently.
- Preserve per-visitor and global rate limits. OpenRouter free-account capacity errors return a clear free-capacity message.

## Error Handling

- Missing key or 401/403: controlled configuration-unavailable response.
- 402: controlled free-provider-unavailable response; never retry with a paid model.
- 408/429/5xx: one bounded retry only when appropriate, then deterministic profile fallback or a clear general-capacity response.
- Invalid JSON, missing choices, provider error payloads, empty output, or truncated output: reject rather than display partial content.
- Never include upstream error details or the API key in a client response.

## Verification

- Unit-test exact OpenRouter URL, authorization presence without exposing the value, attribution headers, pinned free model, request limits, and absence of web-search tools.
- Assert all Cloudflare AI bindings and `env.AI.run` calls are removed.
- Assert general prompts contain no résumé context and profile prompts contain the canonical context.
- Test grounded, unknown, malformed, truncated, 401, 402, 403, 408, 429, and 5xx behavior.
- Preserve context-memory, clarification, weather, arithmetic, CORS, and rate-limit regression tests.
- Run the assistant suite, full lint, production build, `git diff --check`, and Wrangler dry-run.
- Run real canaries for general and profile questions using the dedicated OpenRouter key without changing production.

## Rollout

Develop on `codex/openrouter-free-agent`. Test against a local or separate preview Worker endpoint. Production remains on the current version until the user reviews the behavior. After approval, install the OpenRouter key as a production secret, deploy the Worker, verify health and canaries, and only then update the production frontend if the endpoint changes.
