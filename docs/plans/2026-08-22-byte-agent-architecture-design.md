# Byte Agent-First Assistant Design

Date: 2026-08-22

## Goal

Make Byte behave like a general conversational AI agent at the fullest capability available on Cloudflare's free plan. Byte should answer ordinary questions directly, maintain conversational context, switch topics naturally, and use trusted portfolio capabilities only when they are relevant.

## Current Problem

The current assistant classifies every message into rigid profile, general, weather, or unsupported-live routes before invoking the model. That design blocks natural conversation, rejects some valid short answers, obscures rate-limit and provider failures, and prevents the model from clarifying ambiguous references. It also returned an incorrect, truncated answer for a multi-step arithmetic expression.

## Considered Approaches

### Patch the existing hard router

This is the smallest change, but it preserves brittle keyword routing and cannot support natural topic changes reliably.

### Inject the entire portfolio into every prompt

This gives one model all information, but it wastes the free inference allowance, increases latency, and risks mixing Surya-specific context into unrelated answers.

### Agent-first model with optional capabilities

This is the selected design. Qwen 3.8 is the primary conversational model. It receives normal questions and recent user conversation. It can request narrowly scoped capabilities for portfolio facts, live weather, and deterministic arithmetic. Portfolio context is not included unless the profile capability is needed.

## Architecture

Byte uses one public `/api/chat` endpoint and one conversational contract.

1. Validate and bound the visitor's message and recent history.
2. Resolve deterministic capabilities that require exactness or trusted live data:
   - safe arithmetic expressions are calculated without model inference;
   - explicit live-weather requests use the existing weather provider.
3. Send all other ordinary conversation to Qwen 3.8 with a concise agent instruction.
4. When the message clearly concerns Surya, supply the canonical portfolio knowledge to a profile-grounded model call.
5. When a reference is genuinely ambiguous, such as `Tell me about the projects` without a clear subject, Byte asks whether the visitor means Surya's projects or projects in general.
6. If Qwen 3.8 is temporarily unavailable or returns an invalid response, retry once with the lower-cost Qwen 3 model using the same general-agent contract.

The existing deterministic classifier remains only as a safety and capability selector. It must not block ordinary topics such as current events, stocks, software versions, or general knowledge. For information that cannot be verified live, the model answers within its knowledge and transparently states the limitation instead of pretending to have live access.

## Conversation Behavior

- General questions receive normal general-model answers.
- Surya-specific questions use trusted portfolio knowledge and must not invent missing personal facts.
- General-to-profile and profile-to-general topic changes are allowed within one chat.
- Pronouns use recent conversational context. If the subject cannot be resolved safely, Byte asks a short clarification question.
- Short valid answers such as `4` are accepted.
- Model responses cut off by an output limit are never displayed as complete answers.
- Byte presents one consistent personality; internal capability selection is not exposed as separate chat modes.

## Capabilities

### Portfolio knowledge

The canonical profile module remains the source of truth. The profile model may only answer Surya-specific facts from that source. Missing, sensitive, or unverifiable personal information produces the existing contact response.

### Arithmetic

A bounded parser handles arithmetic expressions without `eval` or `Function`. It supports numbers, parentheses, unary signs, and common arithmetic operators. It enforces length, nesting, exponent, and result-size limits and rejects mixed prose or unsupported syntax. This capability is invisible to visitors; Byte simply returns the correct answer.

### Live weather

The existing fixed-host weather integration remains available. It retains attribution, timeouts, validation, and a separate rate limit.

### General model

Qwen 3.8 is the primary model for general conversation. The existing lower-cost Qwen 3 model is the automatic provider fallback. Both use bounded history, concise output limits, URL sanitization, and no hidden portfolio context in unrelated answers.

## Reliability and Free-Tier Controls

- Accept valid short alphanumeric model replies rather than imposing a 12-character minimum.
- Detect provider completion truncation and retry or return a controlled response.
- Replace the four-general-questions-per-minute limit with the shared, less restrictive visitor limit while retaining an account-wide protection limit.
- Preserve Cloudflare Workers AI free-plan hard-stop behavior; no paid model or external database is introduced.
- Distinguish provider failures, request throttling, and network timeouts in the browser instead of collapsing all failures into one misleading message.

## Safety Boundaries

- Never forward client-supplied assistant-role messages as trusted context.
- Never include portfolio context in unrelated general-model prompts.
- Never infer or fabricate Surya's salary, immigration status, availability, or other unlisted personal facts.
- Never execute visitor input as JavaScript or fetch visitor-provided URLs.
- Do not claim current/live verification unless a configured live capability supplied the data.
- Continue refusing harmful requests and avoid definitive medical, legal, or financial instructions.

## Testing

Automated coverage will verify:

- ordinary general questions reach the primary general model;
- provider failure retries with the fallback model;
- valid short replies are accepted;
- truncated replies are not displayed;
- exact multi-step arithmetic bypasses AI and produces the correct answer;
- general and profile contexts remain isolated;
- topic switching and ambiguous project questions behave conversationally;
- weather still bypasses AI and remains attributed;
- sensitive and prompt-injection profile questions fail closed;
- throttling, provider failure, and timeout messages are distinct;
- no paid binding, database, or exposed credential is introduced.

## Release Validation

Run assistant tests, lint, the production build, Wrangler dry-run, and live endpoint probes for general, profile, weather, arithmetic, clarification, fallback, and sensitive-profile cases. Verify the local browser preview before deploying the Worker. Keep unrelated working-tree changes out of the release commit.
