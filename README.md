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

The portfolio connects to a Cloudflare Worker using a free-plan-compatible Workers AI model. It keeps questions about Surya grounded in `src/data/profileKnowledge.js`, answers general questions in a separate context, and retrieves live weather through Open-Meteo.

```bash
npm run assistant:dev
npm run assistant:deploy
```

Run `npm run assistant:deploy` whenever `src/data/profileKnowledge.js` or Worker behavior changes so the hosted assistant stays synchronized with the visible portfolio. The production Worker endpoint is the frontend default; `VITE_PROFILE_ASSISTANT_API_URL` can override it for another environment.

## Deployment

The repository includes `.github/workflows/deploy.yml`. A push to `main` or a manual workflow dispatch builds the Vite app and deploys the `dist` folder to GitHub Pages.

Production URL:

```text
https://nsurya-0698.github.io/surya-professional-portfolio/
```
