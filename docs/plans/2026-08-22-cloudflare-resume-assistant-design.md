# Free Cloudflare Resume Assistant

## Goal

Connect the existing portfolio assistant to a real language model without a paid provider, database, domain change, or browser-exposed credential. Answers must stay grounded in Surya's approved portfolio and resume facts. When the answer is not present, the assistant must direct the visitor to contact Surya rather than guess.

## Approved architecture

- Keep the React portfolio on GitHub Pages and preserve its current URL.
- Add a small Cloudflare Worker at a free `workers.dev` endpoint.
- Invoke a free-plan-compatible Cloudflare Workers AI model through an `AI` binding.
- Import the existing `src/data/profileKnowledge.js` module into the Worker so the hosted model and deterministic fallback use the same curated context.
- Configure the GitHub Pages build with the public Worker endpoint through `VITE_PROFILE_ASSISTANT_API_URL`.
- Retain the current local response engine whenever the Worker, model, or free quota is unavailable.

## Grounding behavior

The Worker sends the model a strict system prompt plus the curated profile context. The response contract requires the model to mark an answer as either grounded or unknown. Unknown, malformed, empty, or unsupported responses are replaced with a deterministic message containing Surya's email, LinkedIn profile, and Contact-section link.

The assistant may summarize or compare listed facts, including role fit, but must not invent employers, dates, metrics, technologies, education, certifications, immigration details, availability, compensation, or personal information.

## Security and free-tier controls

- Accept only `POST` and preflight `OPTIONS` requests.
- Allow the production GitHub Pages origin and local preview origins through explicit CORS handling.
- Cap request body size, message length, history length, and model output.
- Rate-limit inference before calling the model.
- Keep all model access in the Worker; the browser receives no Cloudflare token or secret.
- Use only a model available on Cloudflare's free plan. If the daily allocation is exhausted, return an error so the browser automatically uses the local assistant.

## Verification

- Unit-test request validation, CORS, grounded-response parsing, unknown-answer fallback, and model failure behavior with a mocked AI binding.
- Run lint and production build.
- Test known questions such as Oracle experience, skills, projects, education, and role fit.
- Test unknown questions such as salary, availability, and unlisted personal details and confirm that every answer directs the visitor to contact Surya.
- Deploy the Worker, configure the public endpoint, and verify the portfolio falls back locally when the endpoint is unavailable.
