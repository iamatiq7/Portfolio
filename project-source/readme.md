# Kazi Atiqur Rahman — Enterprise Infrastructure Portfolio

A production-ready, single-page professional portfolio for an **Enterprise Infrastructure & Systems Engineer** — HPE servers, enterprise storage, backup infrastructure and VMware virtualization.

Built with **React 19 + Vite 8**, shipped as a static site that works on **GitHub Pages** (project sub-path) and on any static host.

---

## Quick start

```bash
cd Portfolio-v2
npm install
npm run dev          # local dev server → http://localhost:5173/
```

Production builds:

```bash
npm run build        # base "/"      → for root-domain hosting / AutoClaw preview
npm run build:gh     # base "/Portfolio/" → for https://iamatiq7.github.io/Portfolio/
npm run preview      # serve the last build locally
```

> **Why two build modes?** GitHub Pages serves this repository from `/Portfolio/`, so asset URLs must be prefixed. `build:gh` does that via `--mode gh-pages` (see `vite.config.js`). For any other host (Netlify, Vercel, nginx root), use `npm run build`.

---

## Project structure

```
Portfolio-v2/
├── index.html                 # SEO meta, Open Graph, JSON-LD Person schema, favicon links
├── vite.config.js             # base path switching (gh-pages vs root)
├── public/
│   └── assets/
│       ├── profile/           # profile-photo.jpg
│       ├── resume/            # Kazi_Atiqur_Rahman_Resume.pdf
│       ├── projects/          # project photography (empty — see asset_guide.md)
│       ├── gallery/           # Beyond Engineering albums (empty — see asset_guide.md)
│       ├── certifications/    # certificate scans
│       ├── fonts/             # self-hosted Inter + JetBrains Mono (woff2)
│       ├── og/                # og-image.png (1200×630 social card)
│       └── favicon-*.png
├── src/
│   ├── main.jsx               # entry: mounts App, loads global styles
│   ├── app.jsx                # section composition + scroll spy
│   ├── data/portfolio.js      # ★ ALL CONTENT LIVES HERE
│   ├── components/
│   │   ├── navbar.jsx         # sticky nav, scroll-spy, mobile drawer
│   │   ├── hero.jsx           # name, positioning, CTAs, portrait, stat strip
│   │   ├── about.jsx          # narrative + quick facts + highlights
│   │   ├── expertise.jsx      # 6 domain cards, badge taxonomy
│   │   ├── experience.jsx     # timeline
│   │   ├── projects.jsx       # 7 case-study cards + modal + academic projects + thesis
│   │   ├── projectvisual.jsx  # deterministic SVG schematics per project category
│   │   ├── education.jsx      # academic timeline + future focus
│   │   ├── certifications.jsx # featured certificate + HPE qualifications + in-progress
│   │   ├── gallery.jsx        # Beyond Engineering (album-driven, empty-state ready)
│   │   ├── contact.jsx        # contact links + validated mailto form
│   │   ├── footer.jsx
│   │   └── ui.jsx             # icon set, scroll-reveal, scroll spy, modal behaviour, SmartImage
│   └── styles/
│       ├── fonts.css          # @font-face declarations (local woff2)
│       ├── global.css         # design tokens, reset, primitives, print rules
│       └── components.css     # section + component styles, responsive breakpoints
├── asset_guide.md             # what images to collect, exact names/sizes/folders
├── content_update_guide.md    # how to edit text, skills, projects, links
├── deployment-github-pages.md # step-by-step deployment + rollback
├── test-report.md             # QA evidence (37 automated checks)
├── analysis-report.md         # STAGE 1 analysis of the old site
└── readme.md
```

---

## How the page works

| Layer | Behaviour |
|---|---|
| **Navigation** | Fixed header; `useActiveSection` scroll-spy highlights the current section; 8 anchors; mobile drawer below 900 px; resume download in the header |
| **Hero** | Positioning statement, three CTAs (projects / resume / contact), portrait with graceful fallback, four verifiable stat cards |
| **Content** | Every section renders from `src/data/portfolio.js`; no copy is hard-coded in components |
| **Projects** | 7 cards → "Case study" opens an accessible modal (Escape / ✕ / scrim to close, scroll lock, focus returned to the page). Each card carries a deterministic SVG schematic — no stock photography claiming to be a real deployment |
| **Certifications** | Featured Huawei HCIA-DCS card with certificate-image lightbox; 10 HPE qualifications; 2 in-progress certifications |
| **Gallery** | Album-driven; renders a designed empty state until albums are added in the data file |
| **Contact** | Client-side validation (required fields, email pattern, `aria-invalid`, inline errors) → opens the visitor's mail client with a pre-filled message. Nothing is stored or sent to a server |
| **Animation** | IntersectionObserver scroll-reveal, 700 ms ease; fully disabled under `prefers-reduced-motion`; forced visible in print |
| **Images** | `SmartImage` swaps in a labelled placeholder if a file is missing — layout never breaks; all `<img>` have descriptive `alt` |

### Accessibility

- Semantic landmarks (`header`, `main`, `section`, `footer`), one `h1`, ordered headings
- Skip-to-content link, visible `:focus-visible` rings on every interactive element
- Modal: `role="dialog"`, `aria-modal`, Escape-to-close, background scroll lock
- Form: real `<label>` elements, `role="alert"` errors, `aria-invalid`
- Decorative SVGs marked `aria-hidden`; informational SVGs carry `role="img"` + label
- Neutral colour contrast ≥ 4.5:1 for body text on the navy canvas

### Performance

- 85 KB gzipped JS, 6 KB gzipped CSS, self-hosted woff2 fonts (48 KB each; only 4 weights)
- No CDN, no analytics, no third-party requests at runtime (CSP-safe)
- Lazy image loading below the fold; hero portrait loads eagerly with `fetchpriority="high"`
- Fixed `aspect-ratio` on every image slot → zero layout shift

---

## Content accuracy policy

This portfolio is deliberately conservative:

- Job dates come from the supplied resume — **Dec 2024 — Present** (no inflated "2+ years").
- The Square Group project is labelled **Ongoing**; no completion claim is made.
- Enterprise projects list the role as *supporting* where that is what the resume supports.
- VMware depth is differentiated per technology (lab-proven vs project exposure vs familiarity).
- Cybersecurity is presented as a **developing direction**, not expertise.
- No invented clients, metrics, awards or recommendations appear anywhere on the site.

---

## Where to change what

| I want to change… | File |
|---|---|
| Any text, project, skill, certification, timeline entry | `src/data/portfolio.js` |
| Colours, spacing, typography scale | `src/styles/global.css` (`:root` tokens) |
| Section layout / responsive behaviour | `src/styles/components.css` |
| Page title, meta description, OG tags, JSON-LD | `index.html` |
| Photos, certificates, resume PDF | `public/assets/…` (see `asset_guide.md`) |
| Deployment base path | `vite.config.js` |

Detailed walkthroughs: `content_update_guide.md` (copy/data) and `asset_guide.md` (images).
