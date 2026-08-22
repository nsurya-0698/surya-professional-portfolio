# Free Cloudflare Personal Assistant

## Goal

Connect the existing portfolio assistant to a real language model without a paid provider, database, domain change, or browser-exposed credential. The assistant answers general questions, retrieves live weather, and keeps every answer about Surya grounded in approved portfolio and resume facts. When a requested Surya fact is not present, it directs the visitor to contact Surya rather than guessing.

## Approved architecture

- Keep the React portfolio on GitHub Pages and preserve its current URL.
- Add a small Cloudflare Worker at a free `workers.dev` endpoint.
- Invoke a free-plan-compatible Cloudflare Workers AI model through an `AI` binding.
- Import the existing `src/data/profileKnowledge.js` module into the Worker so the hosted model and deterministic fallback use the same curated context.
- Use the public Worker endpoint by default, with `VITE_PROFILE_ASSISTANT_API_URL` available as an override.
- Retain the current local response engine for profile questions whenever the Worker, model, or free quota is unavailable.

## Request routing

- Profile questions receive the curated resume context and use the strict grounded/unknown response contract.
- Missing, sensitive, or private Surya facts return a deterministic response with email, LinkedIn, and the Contact section.
- General questions use a separate prompt that contains no resume, employer, or contact data.
- Weather questions use fixed Open-Meteo geocoding and forecast endpoints rather than asking the model to guess live conditions.
- Other real-time requests clearly state that live verification is not available.

## Grounding behavior

For profile questions, the Worker sends the model a strict system prompt plus the curated profile context. The response contract requires the model to mark an answer as either grounded or unknown. Unknown profile facts return the deterministic contact message. If the model misses its response format for a known profile topic, the existing deterministic resume assistant supplies the answer from the same curated context.

The assistant may summarize or compare listed facts, including role fit, but must not invent employers, dates, metrics, technologies, education, certifications, immigration details, availability, compensation, or personal information.

## Security and free-tier controls

- Accept only `POST` and preflight `OPTIONS` requests.
- Allow the production GitHub Pages origin and local preview origins through explicit CORS handling.
- Cap request body size, message length, history length, and model output.
- Rate-limit inference before calling the model.
- Keep all model access in the Worker; the browser receives no Cloudflare token or secret.
- Use only a model available on Cloudflare's free plan. If the daily allocation is exhausted, return an error so the browser automatically uses the local assistant.
- Keep profile and general prompts isolated so general questions never receive personal resume context.
- Use only fixed weather-provider hosts, encoded location input, timeouts, and required provider attribution.

## Verification

- Unit-test request validation, CORS, routing, grounded-response parsing, unknown-answer fallback, general-context isolation, weather formatting, and model failure behavior with mocked bindings.
- Run lint and production build.
- Test known questions such as Oracle experience, skills, projects, education, and role fit.
- Test unknown questions such as salary, availability, and unlisted personal details and confirm that every answer directs the visitor to contact Surya.
- Test a general technical question and a live Nashville weather question.
- Deploy the Worker, configure the public endpoint, and verify the portfolio falls back locally when the endpoint is unavailable.
