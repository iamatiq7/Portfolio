# Kazi Atiqur Rahman — Portfolio

Live site: **https://iamatiq7.github.io/Portfolio/**

Enterprise infrastructure portfolio for **Kazi Atiqur Rahman** — Enterprise Infrastructure & Systems Engineer (HPE servers, enterprise storage, backup, VMware virtualization), Dhaka, Bangladesh.

---

## How this repository deploys

Pushing to `main` triggers `.github/workflows/deploy.yml`, which:

1. installs dependencies (`npm ci`),
2. builds with the GitHub Pages base path (`npm run build:gh` → `/Portfolio/`),
3. verifies `dist/index.html` references `/Portfolio/assets/…`,
4. publishes `dist/` to GitHub Pages via `actions/deploy-pages`.

No manual build or commit of build output is required. A push is the only action.

---

## Project structure

```
├── index.html                 # SEO meta, Open Graph, JSON-LD Person schema
├── vite.config.js             # base path: '/Portfolio/' for gh-pages mode
├── package.json               # dev / build / build:gh / preview scripts
├── public/assets/             # fonts, profile photo, resume PDF, og image, favicons
├── src/
│   ├── main.jsx               # entry
│   ├── app.jsx                # section composition
│   ├── data/portfolio.js      # ★ ALL site content lives here
│   ├── components/            # navbar, hero, about, expertise, experience,
│   │                          # projects (+modal), education, certifications,
│   │                          # gallery (+lightbox), contact, footer, ui
│   └── styles/                # tokens + component styles (hand-authored CSS)
├── asset_guide.md             # photo/certificate checklist: folders, names, sizes
├── content_update_guide.md    # how to edit any copy or design token
├── deployment-github-pages.md # deploy + rollback runbook
├── test-report.md             # QA evidence (37/37 browser checks)
└── analysis-report.md         # audit of the previous site
```

---

## Local development

```bash
npm install
npm run dev        # http://localhost:5173/
npm run build:gh   # production build with /Portfolio/ base path
npm run preview    # serve the last build locally
```

---

## Editing content

Nearly everything is in **`src/data/portfolio.js`**:

- `hero`, `about`, `contact` — positioning and links
- `expertise` — 6 skill domains and their badges
- `experience` — timeline entries and responsibility bullets
- `projects` — case studies (status chip, tech, overview, role, outcomes)
- `softwareProjects`, `thesis` — academic work
- `education`, `certifications` — credentials
- `gallery.albums` — Beyond Engineering albums (empty until photos are added)

Design tokens (palette, spacing, typography) are in `src/styles/global.css`.

## Adding photographs

1. Drop files into `public/assets/projects/<project>/`, `…/gallery/<album>/`, `…/certifications/`, or `…/profile/`.
2. Reference them in `src/data/portfolio.js` (schema in `asset_guide.md`).
3. Commit and push — the workflow rebuilds and republishes.

Missing images render labelled placeholders; the layout never breaks.

---

## Verified build

- 37/37 automated browser checks: layout at 1440 / 820 / 390 px, modal open/close (Escape + ✕), form validation, mobile drawer, all scroll-reveal blocks, zero console errors, zero failed requests
- Self-hosted fonts and inline icons — no third-party requests at runtime (CSP-safe)
- Resume PDF bundled: `public/assets/resume/Kazi_Atiqur_Rahman_Resume.pdf`

## Content accuracy

Employment dates follow the source résumé (**Dec 2024 — Present**); the Square Group engagement is marked **Ongoing**; enterprise project roles are described as *supporting* where that is what the résumé supports; cybersecurity is presented as a developing direction. No invented clients, metrics, awards or testimonials.
