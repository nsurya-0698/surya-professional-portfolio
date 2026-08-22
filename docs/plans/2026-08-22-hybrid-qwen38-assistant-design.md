# Hybrid Qwen 3.8 Portfolio Assistant Design

## Goal

Upgrade Byte's general-knowledge responses to Cloudflare's newest free-compatible Qwen model without wasting the daily Workers AI allocation on the résumé context or weakening profile grounding.

## Approved architecture

- Keep `@cf/qwen/qwen3-30b-a3b-fp8` for résumé, experience, education, skills, projects, certifications, and recruiter-fit questions.
- Use `@cf/qwen/qwen3.8-27b` for general-knowledge questions.
- Keep weather on the existing deterministic Open-Meteo route so current and next-day weather remains live.
- Keep sensitive or unlisted Surya questions on the deterministic contact response.
- Keep unsupported live topics explicit: Byte must say it cannot verify the current answer instead of guessing.

## Why the assistant uses two models

The profile route sends a curated résumé context with every request. That context is the source of truth, so a newer model cutoff adds little value while consuming substantially more of Cloudflare's free quota. General questions use a much smaller prompt and benefit more from Qwen 3.8's newer release and stronger general-purpose capabilities.

Cloudflare allocates 10,000 Workers AI neurons per day on Workers Free. Qwen 3.8 consumes approximately 8.9 times more input neurons and 9.5 times more output neurons than the current Qwen3 model. The hybrid design preserves useful daily capacity while remaining free-only.

## Model-specific request behavior

### Profile model

- Continue using the current Qwen3 request format.
- Preserve the strict `GROUNDED` / `UNKNOWN` response protocol.
- Preserve deterministic sensitive-topic routing and local fallback behavior.

### General model

- Send `messages` using Qwen 3.8's documented chat-completions schema.
- Use `max_completion_tokens` instead of deprecated `max_tokens`.
- Set `chat_template_kwargs.enable_thinking` to `false` so short portfolio answers do not spend the quota on hidden reasoning.
- Do not send the unsupported `repetition_penalty` parameter.
- Continue sanitizing links and limiting response length.

## Health and observability

- Report both `profileModel` and `generalModel` from `/health`.
- Keep response source labels distinct for profile and general routes.
- Do not change the production website URL or the public Worker URL.

## Safety and failure behavior

- Profile and general prompts remain isolated.
- Client-supplied assistant messages remain excluded.
- General mode never receives Surya's résumé context.
- If Qwen 3.8 is unavailable, malformed, or the free allocation is exhausted, the frontend uses its route-appropriate fallback.
- No paid provider, API key, database, or paid web-search integration is introduced.

## Validation and rollout

1. Add separate profile and general model constants and model-specific input builders.
2. Extend unit tests to assert correct model and payload selection.
3. Run assistant tests, lint, production build, diff checks, and a Wrangler dry run.
4. Run a small local canary against the remote Workers AI binding if Wrangler authentication is available.
5. Deploy only the Worker after validation, then verify `/health` plus profile, general, unknown, and weather requests.
6. Keep the website changes local for review unless the user separately authorizes pushing them.

## Freshness boundary

Qwen 3.8 is a newer static model, not a live search engine. Its exact training cutoff is not published by Cloudflare or Qwen. Byte can provide live weather through the existing approved API, but it must not claim current news, prices, scores, or other changing facts without a dedicated live data source.
