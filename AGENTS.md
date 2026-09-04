# AGENTS.md — Aquariz & Flanora Website Ecosystem

## Repo Overview

This is a **100% static HTML/CSS/JS website ecosystem** — no build pipeline, no Node.js, no package.json, no CI/CD, no framework. Every page is a single `.html` file with embedded `<style>` and `<script>`. Deployable to GitHub Pages, Netlify, Vercel, or any static host instantly.

## Production Entrypoints

- `index.html` — Aquariz corporate parent hub (root domain)
- `flanora/index.html` — Flanora sub-brand site (`/flanora/`)
- `404.html` and `flanora/404.html` — custom error pages for each section

## ⚠️ Archive Files Are NOT Production

`archive/` contains deprecated prototypes (`flanora_index.html`, `index.html`, `swadlicious.html`) that used Three.js, GSAP ScrollTrigger, and Lenis. **These are not deployed.** The current production sites are vanilla HTML/CSS/JS. `robots.txt` explicitly blocks `/flanora/archive/` from indexing.

## ⚠️ flanora/README.md Is Outdated

The `flanora/README.md` claims the site uses Three.js, GSAP, Lenis, 3D tilt cards, and glassmorphic UI. **This is incorrect for the current `flanora/index.html`**, which is plain vanilla CSS/JS. The README was written for the prototype that lives in `archive/`. Do not trust it for feature references — always check `flanora/index.html` directly.

## Shared Tech Stack

- **Fonts**: Plus Jakarta Sans (body) + Playfair Display (display) via Google Fonts
- **Icons**: Font Awesome 6.5.1 (CDN)
- **No build tools, no bundlers, no package managers**
- **CDN-only** dependencies (Google Fonts, Font Awesome)

## Branding Constants (must stay in sync)

- GSTIN: `32ACCFA6985C1ZL`
- Phone: `+91 6238 796 383`
- Email: `aquariz.official@gmail.com`
- Instagram: `@aquariz.official` & `@flanora.in`
- Address: Ward -12, Plot no 801/2-24, Thumboor, Thrissur, Kerala, PIN 680662
- Domain: `aquariz.in`

These appear in both `index.html` and `flanora/index.html`. Update both if changing.

## File Structure

```
aquariz/
├── index.html                  # Aquariz corporate site (production)
├── 404.html                    # Root 404 page
├── flanora/
│   ├── index.html              # Flanora site (production)
│   ├── 404.html                # Flanora 404 page
│   └── README.md               # ⚠️ outdated, do not trust
├── archive/                    # Deprecated prototypes (not deployed)
├── assets/images/              # Shared image assets (4 JPGs)
├── robots.txt                  # Blocks /flanora/archive/ from crawling
└── .gitignore                  # Updated for static HTML project
```

## Editing Rules

- Both `index.html` and `flanora/index.html` follow identical design systems (CSS variables, component classes, responsive breakpoints). Keep them in sync for shared UI patterns.
- Images are referenced relatively (e.g., `../assets/images/...` from `flanora/`).
- WhatsApp order links use `wa.me/916238796383` — the phone number must match the branding constants.
- Both sites use mobile-first CSS with a `@media (min-width: 960px)` breakpoint for desktop nav.
- Both have a fixed bottom mobile action bar hidden on desktop (`@media (min-width: 768px) { display: none }`).

## Deployment

No build step needed. Upload the directory contents to any static host. Ensure `index.html` and `flanora/index.html` are at the correct paths for your hosting provider (e.g., Netlify requires `flanora/index.html` to be at `flanora/`).