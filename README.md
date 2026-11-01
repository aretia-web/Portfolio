# Portfolio — Alejandro Ruiz Navarrete

Personal portfolio. Static site: HTML + CSS + JS, no build tools required.

## Structure

```
portfolio/
├── index.html              ← main page (About · Experience · Projects · Contact)
├── 404.html                ← custom not-found page (served by Netlify)
├── netlify.toml            ← security headers + asset caching
├── robots.txt
├── assets/
│   ├── css/styles.css      ← design tokens (light + dark) and all styles
│   ├── js/main.js          ← typewriter, theme toggle, mobile menu, scroll reveal, copy email
│   └── img/favicon.svg
├── .gitignore
├── package.json
└── README.md
```

## Local preview

```bash
npm run serve
```

Or just open `index.html` directly in the browser.

## Deploy

Connected to Netlify via this repo. Every push to `main` redeploys automatically.

## Updating content

- **Texts / links**: edit `index.html` directly
- **Colors / typography**: edit the `:root` variables at the top of `assets/css/styles.css` (light theme first, dark theme below it)
- **Terminal phrases**: edit the `phrases` array in `assets/js/main.js`
- **New project**: duplicate an `<article class="project-card">` block in `index.html`
- **New role**: duplicate an `<li class="tl-item">` block in the Experience section
- **Social preview image**: once the final domain is known, add `og:image` and `og:url` (absolute URLs) in the `<head>`
