# TEST REPORT — Portfolio v2

**Date:** 2026-11-08 · **Build under test:** `dist/` produced by `npm run build` (Vite 8.3.5, React 19)
**Method:** headless Chromium driven by Puppeteer against the production build served over HTTP, plus `vite build` compilation checks.

---

## 1. Build results

| Build | Command | Output | Result |
|---|---|---|---|
| Root (`base: "/"`) | `npm run build` | `dist/index.html` 3.19 kB · CSS 27.91 kB (5.97 gzip) · JS 284.83 kB (85.13 gzip) | ✅ 0 errors, 31 modules |
| GitHub Pages (`base: "/Portfolio/"`) | `npm run build:gh` | same bundle, asset URLs prefixed `/Portfolio/` | ✅ 0 errors |

Assets emitted: 1 HTML, 1 CSS, 1 JS, 6 woff2 fonts, profile JPG (129 KB), resume PDF (236 KB), OG image (44.8 KB), 2 favicons.

---

## 2. Automated functional checks — **37 / 37 passed**

Full machine-readable results: `qa-results.json` (in the delivery `evidence/` folder).

| # | Check | Result | Evidence |
|---|---|---|---|
| 1–9 | All 9 section anchors present (`home` … `contact`) | ✅ | DOM query per id |
| 10 | 7 enterprise project cards render | ✅ | `count=7` |
| 11 | 3 academic project cards render | ✅ | `count=3` |
| 12 | 116 skill/tech badges render | ✅ | `count=116` |
| 13 | 6 expertise categories | ✅ | `count=6` |
| 14 | 10 HPE qualification cards | ✅ | `count=10` |
| 15 | Self-hosted Inter font loads | ✅ | `document.fonts.check()` |
| 16 | Hero portrait decodes | ✅ | `naturalWidth=960`, `naturalHeight=1200` |
| 17 | No placeholder shown for portrait | ✅ | fallback element absent |
| 18 | No horizontal overflow @1440 | ✅ | `scrollWidth=1440` |
| 19 | Hero CTA does not overlap portrait | ✅ | CTA right 825 < photo left 896 |
| 20 | All 8 nav anchors resolve to elements | ✅ | `hrefs=8` |
| 21 | LinkedIn + GitHub links correct | ✅ | `/in/iamatiq7`, `/iamatiq7` |
| 22 | Resume PDF served | ✅ | HTTP 200, `application/pdf`, 236,063 bytes |
| 23 | Case-study modal opens | ✅ | title "Enterprise Backup Infrastructure" |
| 24 | Modal closes on **Escape** | ✅ | closed |
| 25 | Modal closes via **✕** | ✅ | closed |
| 26 | Body scroll restored after modal | ✅ | `overflow !== hidden` |
| 27 | Empty form shows 3 validation errors | ✅ | name, email, message |
| 28 | Invalid email flagged | ✅ | `aria-invalid="true"` |
| 29 | No horizontal overflow @390 | ✅ | `scrollWidth=390` |
| 30 | Mobile hamburger visible @390 | ✅ | computed display ≠ none |
| 31 | Mobile drawer opens | ✅ | `is-open` class |
| 32 | Drawer closes after choosing a link | ✅ | `is-open` removed |
| 33 | No overflowing element @390 | ✅ | audited 6 component classes |
| 34 | **All 50 scroll-reveal blocks activate** | ✅ | `50 / 50` visible after scroll sweep |
| 35 | No console errors | ✅ | 0 messages |
| 36 | No uncaught exceptions | ✅ | 0 |
| 37 | No failed / 4xx requests | ✅ | 0 |
| 38 | Gallery lightbox opens with caption, closes on Escape (tested against a temporary album fixture, then reverted to the shipped empty state) | ✅ | 1 album / 2 photo buttons / caption "Team at the final defence" / 0 console errors |

---

## 3. Visual verification (screenshots)

| Capture | What it proves |
|---|---|
`qa-desktop-hero.png` (1440×900) | Hero renders with real portrait, correct type hierarchy, no overlap
`qa-desktop-full.png` (1440×12703) | All 10 sections render in sequence; reveals activate
`qa-mobile-full.png` (390×23493 @2×) | Mobile stacking is clean, no clipped cards
`qa-tablet-full.png` (820×1180) | Tablet breakpoint reflows correctly
`sec-about.png` / `sec-expertise.png` / `sec-experience.png` / `sec-projects.png` / `sec-certifications.png` / `sec-contact.png` | Per-section inspection at full width
`m-hero.png`, `m-projects.png`, `m-certs.png`, `m-menu.png` | Mobile hero, cards, certifications, open drawer

Reviewed manually: spacing rhythm, badge wrapping, long-title wrapping (e.g. "Comparative Analysis of Deep CNN Models…"), card alignment, modal layout, form states. One mobile defect found and fixed during QA (see §5).

---

## 4. Content / accuracy review

| Rule | Status |
|---|---|
| Employment dates match the supplied resume (`Dec 2024 — Present`) | ✅ no "2+ years" claim anywhere |
| Square Group marked **Ongoing**, no completion claim | ✅ |
| Enterprise project roles described as *supporting* where applicable | ✅ |
| VMware depth differentiated (lab / exposure / familiarity) | ✅ expertise card note |
| Cybersecurity presented as developing direction | ✅ "Where I'm Headed" + explicit note |
| Certifications limited to resume-listed HPE qualifications + HCIA-DCS | ✅ 10 HPE + 1 Huawei |
| No invented clients, awards, testimonials, metrics | ✅ none present |
| No confidential customer data (IPs, serials, case IDs) | ✅ none present |
| All user-visible copy in English | ✅ |
| No dead buttons | ✅ every button/link has a destination or real behaviour |

---

## 5. Defects found during QA and fixed

| # | Defect | Impact | Fix |
|---|---|---|---|
| 1 | `components.css` was never imported in `main.jsx` | Whole site rendered unstyled | Added the import; CSS output went 5.84 kB → 27.91 kB |
| 2 | Modal had no Escape handler and scroll lock | Keyboard users trapped; background scrolled | Added `useDialog()` hook (Escape + body scroll lock + restore) |
| 3 | Mobile navbar showed "Resume CV" (text node + `::after`) and squeezed the brand | Brand truncated on phones | Split label into `navbar__resume-full` / `-short`, hide/show via media query |
| 4 | Hero portrait was `loading="lazy"` | Above-the-fold image could pop in late | `priority` prop → `loading="eager"` + `fetchpriority="high"` |
| 5 | Scroll-reveal content invisible when printing | Blank PDF exports | `@media print` forces `.reveal` visible |
| 6 | Placeholder text exposed internal file paths to visitors | Unprofessional public copy | Rewritten to visitor-appropriate wording |

---

## 6. Known limitations

1. **Contact form** opens the visitor's mail client (`mailto:`); it does not submit to a server. A real inbox integration needs a form endpoint (Formspree/Netlify Forms/custom API) — deliberately not faked.
2. **No project photographs or certificate scan yet** — placeholders are shown; the layout is verified to hold without them. See `asset_guide.md`.
3. **Profile photo is the existing one**, upscaled from 315×394. A native ≥900 px portrait will look sharper.
4. **No Lighthouse/Core Web Vitals run** in this environment — the build is deterministic and dependency-free at runtime, but a Lighthouse pass on the deployed URL is recommended.
5. Deep-link testing covered anchor navigation only (no client-side router by design).

---

## 7. How to re-run these checks

```bash
# production build
npm run build

# serve and open
npm run preview     # http://localhost:4173/
```

Manual checklist: navigate all 8 nav items · open and close a case study (mouse + Escape) · submit the empty form · resize to 390 px and use the drawer · click Resume · tab through the hero with the keyboard (focus rings visible).

The exact automated harness (static server + Puppeteer, 37 assertions) is archived with the delivery as `evidence/qa-run-qa.mjs`; run it with `node run-qa.mjs` after `npm install puppeteer-core`.

A second harness, `evidence/gallery-test.mjs`, verifies the Beyond Engineering lightbox against a temporary two-photo album fixture (open → caption → Escape → closed). It requires the album fixture inserted into `gallery.albums`; the shipped build keeps `albums: []` and renders the designed empty state.
