# Surya Teja Nammi Portfolio

A clean React + Vite portfolio for Surya Teja Nammi, focused on full stack engineering, cloud architecture, enterprise AI work, projects, certifications, and contact.

## Tech Stack

- React 19
- Vite
- CSS modules by section with shared design tokens
- EmailJS for the contact form
- GitHub Actions + GitHub Pages deployment

## Local Development

```bash
npm install
npm run dev
```

The local app runs at `http://localhost:5173/surya-professional-portfolio/`.

## Quality Checks

```bash
npm run assistant:test
npm run lint
npm run build
```

## Personal AI Assistant

The portfolio connects to a Cloudflare Worker that securely proxies one pinned free OpenRouter model. Questions about Surya are grounded in `src/data/resumeKnowledge.js`, general questions use a separate prompt without résumé data, and live weather comes from Open-Meteo. OpenRouter web search is intentionally disabled because it is not part of the free inference tier.

Create an ignored `.dev.vars` file for local Worker development:

```text
OPENROUTER_API_KEY=your_dedicated_openrouter_key
```

```bash
npm run assistant:dev
npm run assistant:test
```

For hosted use, install the key as a Worker secret; never add it to `wrangler.jsonc`, a `VITE_*` variable, or the repository:

```bash
npx wrangler@4.125.0 secret put OPENROUTER_API_KEY
npm run assistant:deploy
```

Run `npm run assistant:deploy` whenever `src/data/resumeKnowledge.js` or Worker behavior changes so the hosted assistant stays synchronized with the checked-in résumé. The production Worker endpoint is the frontend default; `VITE_PROFILE_ASSISTANT_API_URL` can override it for a preview environment.

## Deployment

The repository includes `.github/workflows/deploy.yml`. A push to `main` or a manual workflow dispatch builds the Vite app and deploys the `dist` folder to GitHub Pages.

Production URL:

```text
https://nsurya-0698.github.io/surya-professional-portfolio/
```
