# Portfolio — Alejandro Ruiz Navarrete

Personal developer portfolio. Static site: HTML + CSS + JS, no build tools required.

## Structure

```
portfolio/
├── index.html              ← main page
├── assets/
│   ├── css/styles.css      ← all styles and design tokens
│   ├── js/main.js          ← terminal typewriter animation
│   └── img/                ← (profile photo, project screenshots)
├── .gitignore
├── package.json
└── README.md
```

## Local preview

```bash
npm run serve
# opens at http://localhost:3000
```

Or just open `index.html` directly in the browser.

## Deploy

Connected to Netlify via this repo. Every push to `main` redeploys automatically.

## Updating content

- **Texts / links**: edit `index.html` directly
- **Colors / typography**: edit the `:root` variables at the top of `assets/css/styles.css`
- **Terminal phrases**: edit the `phrases` array in `assets/js/main.js`
- **New project**: duplicate a `.project-card` block in `index.html`
