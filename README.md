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
npm run lint
npm run build
```

## Deployment

The repository includes `.github/workflows/deploy.yml`. A push to `main` or a manual workflow dispatch builds the Vite app and deploys the `dist` folder to GitHub Pages.

Production URL:

```text
https://nsurya-0698.github.io/surya-professional-portfolio/
```
