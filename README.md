# Kazi Atiqur Rahman — Portfolio

Live site: **https://iamatiq7.github.io/Portfolio/**

Enterprise infrastructure portfolio for **Kazi Atiqur Rahman** — Enterprise Infrastructure & Systems Engineer (HPE servers, enterprise storage, backup, VMware virtualization), Dhaka, Bangladesh.

---

## Deploy pipeline

A push to `main` triggers `.github/workflows/deploy.yml`:

1. `npm ci`
2. `npm run build:gh` → assets prefixed with `/Portfolio/`
3. asserts `dist/index.html` contains `/Portfolio/assets/`
4. uploads `dist/` and deploys with `actions/deploy-pages`

No build output is committed. Editing source and pushing is the whole workflow.

---

## Layout

```
├── index.html                 # SEO meta, Open Graph, JSON-LD Person schema
├── vite.config.js             # base: '/Portfolio/' in gh-pages mode
├── src/
│   ├── data/portfolio.js      # ★ all content: hero, about, skills, projects,
│   │                          #   experience, education, 13 certificates, gallery
│   ├── components/            # one component per section (+ ui.jsx primitives)
│   └── styles/                # tokens, components, certifications
├── public/assets/
│   ├── certifications/        # 13 previews + files/ (original PDFs/JPGs)
│   ├── profile/               # profile-photo.jpg
│   ├── resume/                # Kazi_Atiqur_Rahman_Resume.pdf
│   ├── projects/ · gallery/   # empty until photographs are supplied
│   ├── fonts/ · og/           # self-hosted woff2, social card
├── certificate-library.md     # certificate inventory (dates, IDs, files)
├── asset_guide.md             # photo/certificate checklist
├── content_update_guide.md    # copy & design-token reference
├── deployment-github-pages.md # deploy + rollback runbook
├── test-report.md             # QA evidence
└── analysis-report.md         # audit of the previous site
```

---

## Local development

```bash
npm install
npm run dev        # http://localhost:5173/
npm run build:gh   # production build (GitHub Pages base path)
npm run preview    # serve the last build
```

---

## Editing content

Everything user-visible lives in **`src/data/portfolio.js`**:

- `hero`, `about`, `contact` — positioning and links
- `expertise` — 6 skill domains with badges
- `experience` — timeline and responsibility bullets
- `projects` — 7 case studies (status, tech, role, outcomes)
- `softwareProjects`, `thesis` — academic work
- `education` — academic timeline
- `certifications` — 13 credentials with `image` + `file` (originals) + `credentialId`
- `inProgress` — RHCSA, CCNA
- `gallery.albums` — Beyond Engineering albums

Design tokens: `src/styles/global.css`. Certificate section styles: `src/styles/certifications.css`.

## Certificates

13 verified credentials are published with previews and original documents:

- **Huawei** HCSA O&M-DCS — cert no. `0329010187810446411409`, valid through 08 Aug 2028
- **xFusion** FCIA Server — `XFU01FCIA011783` (granted 20 Nov 2025)
- **xFusion** FCIP FusionOne HCI — `XFU03FCIP010153` (granted 08 Dec 2025)
- **HPE** — 10 Service & Solution Qualifications (Feb–Sep 2025)

Full inventory: `certificate-library.md`. Clicking any certificate opens a viewer with metadata, the original document and (where available) a verification link.

## Verified build

- 43/43 automated browser checks — layout at 1440 / 820 / 390 px, project modal, certificate viewer (open, metadata, original-document fetch, Escape), form validation, mobile drawer, all scroll-reveal blocks, zero console errors, zero failed requests
- Self-hosted fonts and inline icons — no third-party requests at runtime
- Resume PDF bundled and downloadable

## Content accuracy

Employment dates follow the source résumé (**Dec 2024 — Present**); the Square Group engagement is marked **Ongoing**; enterprise project roles are described as *supporting* where that is what the résumé supports; cybersecurity is presented as a developing direction. Certificate dates and credential numbers are transcribed from the certificates themselves. No invented clients, metrics, awards or testimonials.
