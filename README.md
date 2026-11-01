# Portfolio — Alejandro Ruiz Navarrete

Personal portfolio. Static site: HTML + CSS + JS, no build tools required.

## Structure

```
portfolio/
├── index.html              ← English version (About · Experience · Projects · Contact)
├── es/index.html           ← Spanish version (same structure — keep both in sync)
├── 404.html                ← custom not-found page (served by Netlify)
├── netlify.toml            ← security headers + asset caching
├── robots.txt
├── assets/
│   ├── css/styles.css      ← design tokens (light + dark) and all styles
│   ├── js/main.js          ← typewriter, theme toggle, mobile menu, scroll reveal, copy email
│   └── img/                ← favicon, logos/, og-image(-es).png (social previews)
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

- **Texts / links**: edit `index.html` (English) **and** `es/index.html` (Spanish)
- **Language**: Spanish-language browsers visiting `/` are sent to `/es/` on their first visit; the EN/ES button remembers the visitor's choice
- **Colors / typography**: edit the `:root` variables at the top of `assets/css/styles.css` (light theme first, dark theme below it)
- **Terminal phrases / UI strings**: edit the `STR` object (en / es) in `assets/js/main.js`
- **New project**: duplicate an `<article class="project-card">` block in `index.html`
- **New role**: duplicate an `<li class="tl-item">` block in the Experience section
- **Social preview image**: once the site's public URL is known, make `og:image` (and the `hreflang` links) absolute, e.g. `https://your-site.netlify.app/assets/img/og-image.png`
