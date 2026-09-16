# OpenRouter Free Agent Implementation Checklist

Date: 2026-09-15

- [x] Work on `codex/openrouter-free-agent`; do not alter production.
- [x] Pin `inclusionai/ling-3.0-flash-vl:free` as the sole model.
- [x] Add a server-only OpenRouter adapter with ZDR and data-collection denial.
- [x] Remove the Cloudflare Workers AI binding and every `env.AI.run` call.
- [x] Keep the Cloudflare Worker for CORS, validation, rate limits, and secret handling.
- [x] Ground profile requests with exact checked-in résumé content.
- [x] Add a PDF hash drift test for the résumé grounding source.
- [x] Keep general prompts isolated from résumé/contact data.
- [x] Preserve deterministic arithmetic, Open-Meteo weather, and current-chat context.
- [x] Add ignored local-secret files and setup documentation.
- [x] Pass assistant tests, lint, production build, diff checks, and Wrangler dry run.
- [x] Create a dedicated OpenRouter key and pass local general/profile browser canaries on the pinned `:free` model.
- [ ] Rotate the test key because it was pasted into chat, then verify account usage remains $0.
- [ ] Release only after explicit user review and approval.
