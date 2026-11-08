# Kazi Atiqur Rahman — Portfolio

Live site: **https://iamatiq7.github.io/Portfolio/**

Enterprise infrastructure portfolio for **Kazi Atiqur Rahman** — Enterprise Infrastructure & Systems Engineer (HPE servers, enterprise storage, backup, VMware virtualization), Dhaka, Bangladesh.

---

## Repository layout

| Path | Contents |
|---|---|
| `/index.html`, `/assets/` | **The deployed site** — pre-built static output (served by GitHub Pages from this branch root) |
| `/project-source/` | Full editable React + Vite source project |
| `/project-source/src/data/portfolio.js` | ★ All site content (text, projects, skills, certifications) |
| `/project-source/asset_guide.md` | Where to place photos/certificates, exact filenames and sizes |
| `/project-source/content_update_guide.md` | How to edit any copy or design token |
| `/project-source/deployment-github-pages.md` | Deployment + rollback runbook |

> GitHub Pages serves this branch root directly, so treat `/index.html` and `/assets/` as **build output** — do not hand-edit them.

---

## Editing content

```bash
cd project-source
npm install
npm run dev            # local preview → http://localhost:5173/

# edit src/data/portfolio.js (or styles/), then rebuild:
npm run build:gh       # produces dist/ with /Portfolio/ base path
```

Publish the rebuild:

```bash
# from the repository root
rm -rf assets index.html
cp -r project-source/dist/* .
git add -A && git commit -m "content: update" && git push
```

GitHub Pages republishes within ~1 minute.

---

## Adding photographs

1. Put files in `project-source/public/assets/projects/<project>/`, `.../gallery/<album>/`, `.../certifications/`, or `.../profile/`.
2. Reference them in `src/data/portfolio.js` (see `asset_guide.md` for the exact schema).
3. Rebuild and publish as above.

The site renders labelled placeholders for any missing image — the layout never breaks.

---

## Verified build

- 37/37 automated browser checks (layout at 1440 / 820 / 390 px, modal + Escape, form validation, mobile drawer, zero console errors, zero failed requests)
- Self-hosted fonts and inline icons — **no third-party requests at runtime**
- Resume PDF bundled and downloadable: `assets/resume/Kazi_Atiqur_Rahman_Resume.pdf`

---

## Content accuracy

Employment dates follow the source résumé (**Dec 2024 — Present**); the Square Group engagement is marked **Ongoing**; enterprise project roles are described as *supporting* where that is what the résumé supports; cybersecurity is presented as a developing direction. No invented clients, metrics, awards or testimonials.
