# STAGE 1 — Existing Portfolio Analysis

**Subject:** `Portfolio-main.zip` (existing site at https://iamatiq7.github.io/Portfolio/)
**Analysed:** 2026-11-04 · **Analyst:** ATIQ.V2 (AutoClaw)

## 1. What the existing site is

| Item | Finding |
|---|---|
| Stack | Static HTML5 + hand-written CSS + jQuery 3.6 |
| External dependencies | Font Awesome 5.15 (CDN), jQuery 3.6 (CDN) |
| Files | `index.html` (7.5 KB), `css/style.css` (6.9 KB), `js/script.js` (609 B), 7 images |
| Layout | Fixed left sidebar (avatar + vertical nav) + scrolling right column |
| Sections | Home, About, Education, Portfolio (image grid), Contact |
| Build step | None |
| Responsive | Basic media queries, sidebar collapses into a hamburger drawer |

## 2. Content audit

**Accurate and reusable**
- Name, location, email `kaziatiqurrahman01@gmail.com`, phone `+8801521584666`
- Education history (JSC 2014, SSC 2017, HSC 2019, BSc CSE 2019–2024 at AUST)
- Profile photograph (`images/pic.jpg`, 315×394)

**Inaccurate / must be replaced**
- Headline "Front-End Developer" — contradicts the actual role (Enterprise Infrastructure & Systems Engineer)
- "Age 21" — static, unverifiable, irrelevant to an enterprise portfolio
- Counters: "2+ years experience", "5+ projects completed", "10+ happy clients", "2+ awards won" — none verifiable; "happy clients" and "awards" are fabricated in the original template
- "Download CV" button points to `href="#"` — dead control
- Contact form has no `action`, no handler — silently does nothing
- Portfolio grid: six unrelated stock-style images with empty `alt` attributes; no project names, no context
- Typo in copy: "Tech-nology" (hard line-break artifact), "porjects"

**Missing entirely (required by the brief)**
- Technical expertise taxonomy, professional experience timeline, project case studies, certifications, Beyond Engineering gallery, resume download, real social links (LinkedIn/GitHub), SEO metadata, accessible semantics.

## 3. Technical issues

1. **CDN dependency** — icons and jQuery load from `cdnjs.cloudflare.com`. Breaks under strict CSP and on offline/air-gapped review.
2. **jQuery for 30 lines of behaviour** — unnecessary payload for a static page.
3. **No semantic landmarks** — no `<main>`, `<section aria-labelledby>`, or heading hierarchy beyond `h1/h3`.
4. **Empty `alt` on all images** — screen readers skip the only visual content.
5. **No SEO metadata** — title is literally "Portfolio"; no description, no Open Graph, no structured data.
6. **Single 6.9 KB stylesheet with no design tokens** — colours and spacing hard-coded per rule.
7. **Resume/CV absent from the repository** — nothing to download.
8. **No 404/empty states, no focus-visible styles, no reduced-motion handling.**

## 4. Verdict

The existing site is a generic front-end student template. Colour tweaks or section reshuffling cannot deliver the required positioning. **Full rebuild** is the correct path, retaining only:

- the real profile photograph (re-used, upscaled to 960×1200),
- verified personal/contact/education facts,
- the resume PDF supplied separately with this brief (now bundled as the working download).

Everything else — information architecture, design system, content, components, build pipeline — is new.

## 5. Rebuild decisions

| Decision | Rationale |
|---|---|
| React 19 + Vite 8 | Brief prefers React/Vite; component model suits 10 content sections + modal/lightbox state |
| Centralised `src/data/portfolio.js` | Brief requires "add a project by editing one data entry" |
| Hand-authored modular CSS (no Tailwind) | Zero extra build deps, full control of the enterprise dark design system, ~28 KB total CSS |
| Inline SVG icon set (no icon library) | CSP-safe, no runtime dependency, only the ~25 icons actually used |
| Self-hosted Inter + JetBrains Mono (woff2) | CSP blocks Google Fonts; self-hosting keeps typography intact on GitHub Pages and in preview |
| `base: '/Portfolio/'` for GH builds | Repository is a GitHub Pages *project* site served from a subdirectory |
| No client-side router | Single-page anchored layout — avoids SPA 404s on GitHub Pages entirely |
| mailto-based contact form | No backend available on static hosting; fake submission explicitly forbidden by the brief |

## 6. Assets carried forward

| Asset | Source | Destination |
|---|---|---|
| Profile photo | `images/pic.jpg` (315×394) | `public/assets/profile/profile-photo.jpg` (960×1200, q88) |
| Resume PDF | supplied `Kazi_Atiqur_Rahman.pdf` (236 KB) | `public/assets/resume/Kazi_Atiqur_Rahman_Resume.pdf` |

All other imagery is intentionally **not** reused: the six gallery images could not be verified as the owner's own project photographs, and the brief forbids imagery that falsely implies participation.
