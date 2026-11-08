# ASSET_GUIDE — Photographs, Certificates & Documents

Everything visual on the site lives under `public/assets/`. Drop a file in the right folder with the right name, rebuild, and it appears — no code changes required.

> **Never publish customer-confidential material.** No server serial numbers, IP addresses, support case numbers, internal network diagrams, or OEM correspondence in any photograph. Blur or crop racks/screens before uploading.

---

## 1. Asset map at a glance

| # | Asset | Priority | Exact path | Recommended size | Ratio | Placeholder now? |
|---|---|---|---|---|---|---|
| 1 | Professional profile photo | **Essential** | `public/assets/profile/profile-photo.jpg` | 960 × 1200 px, < 200 KB | 3:4 portrait | ✅ real photo already installed (upscaled from the old site) |
| 2 | Resume PDF | **Essential** | `public/assets/resume/Kazi_Atiqur_Rahman_Resume.pdf` | A4, < 1 MB | — | ✅ real resume already installed |
| 3 | Huawei HCIA-DCS certificate scan | **Recommended** | `public/assets/certifications/huawei-hcia-dcs.jpg` | 1600 × 1200 px, < 400 KB | 4:3 landscape | ⬜ placeholder shown |
| 4 | Square Group — project overview | Recommended | `public/assets/projects/square-group/project-overview.jpg` | 1600 × 1000 px | 16:10 | ⬜ SVG schematic used instead |
| 5 | Square Group — storage / backup rack | Recommended | `public/assets/projects/square-group/storage.jpg` | 1600 × 1000 px | 16:10 | ⬜ |
| 6 | Square Group — tape library | Optional | `public/assets/projects/square-group/tape-library.jpg` | 1600 × 1000 px | 16:10 | ⬜ |
| 7 | Robi — VVF environment / Synergy frame | Recommended | `public/assets/projects/robi/infrastructure.jpg` | 1600 × 1000 px | 16:10 | ⬜ |
| 8 | Superdome Flex 280 lab | Recommended | `public/assets/projects/superdome-lab/superdome.jpg` | 1600 × 1000 px | 16:10 | ⬜ |
| 9 | Superdome lab — vCenter / HA screenshot | Optional | `public/assets/projects/superdome-lab/lab-console.jpg` | 1600 × 1000 px | 16:10 | ⬜ |
| 10 | Thesis team photographs | **Recommended** | `public/assets/gallery/thesis/01.jpg` … `06.jpg` | 1600 × 1200 px | 4:3 | ⬜ empty state |
| 11 | University life / campus | Optional | `public/assets/gallery/university/01.jpg` … | 1600 × 1200 px | 4:3 | ⬜ empty state |
| 12 | Workshops & technical events | Optional | `public/assets/gallery/events/01.jpg` … | 1600 × 1200 px | 4:3 | ⬜ empty state |
| 13 | LinkedIn URL (verify) | **Essential** | `src/data/portfolio.js` → `contact.linkedin` | — | — | ✅ `linkedin.com/in/iamatiq7` (from resume) |
| 14 | GitHub URL (verify) | **Essential** | `src/data/portfolio.js` → `contact.github` | — | — | ✅ `github.com/iamatiq7` (from resume) |
| 15 | Email address (verify) | **Essential** | `src/data/portfolio.js` → `contact.email` | — | — | ✅ `iamatiq7@gmail.com` (from resume) |

Formats: **JPG** for photographs, **PNG** only for screenshots with text, keep every file under 400 KB where possible.

---

## 2. Replace the profile photo

1. Prepare a professional portrait — head-and-shoulders, neutral background, 3:4 vertical, at least 900 × 1200 px.
2. Save as JPG (quality 80–88) and name it **`profile-photo.jpg`**.
3. Overwrite `public/assets/profile/profile-photo.jpg`.
4. Rebuild (`npm run build:gh`) and redeploy.

If the file is missing or corrupt, the hero automatically shows a labelled placeholder instead of a broken image.

---

## 3. Replace the resume PDF

1. Export the latest CV as PDF, A4, text-selectable (not a scan).
2. Name it **`Kazi_Atiqur_Rahman_Resume.pdf`**.
3. Overwrite `public/assets/resume/Kazi_Atiqur_Rahman_Resume.pdf`.
4. Rebuild and redeploy. Both header and hero download buttons point at this file.

---

## 4. Certificates (installed — 13 credentials)

All 13 certificates are already on the site, with preview images and original documents:

- previews → `public/assets/certifications/<slug>.jpg`
- originals → `public/assets/certifications/files/<slug>.pdf` (or `.jpg`)
- data → `src/data/portfolio.js` → `certifications`

Full inventory with dates, credential numbers and file names: **`certificate-library.md`**.

**Adding a new certificate**

1. Preview: 1400 px wide, 4:3, JPG under 200 KB → `public/assets/certifications/<slug>.jpg`
2. Original document → `public/assets/certifications/files/<slug>.pdf`
3. Add an entry to `certifications` with `name`, `short`, `issuer`, `vendor`, `dateLabel`, `image`, `file`, optional `credentialId` / `validThrough` / `featured` / `verifyUrl`.
4. Rebuild and push — the card grid, counts and viewer update automatically.

Only publish documents that belong to the portfolio owner. Never invent a credential number: leave `credentialId` out if it is not printed on the certificate.

### Excluded file

`Huawei/1763874889933-…png` is an xFusion FCIA certificate issued to **Elias Ahammmed**. It was deliberately **not** published.

---

## 5. Add project photographs

Project cards currently use generated technical schematics (deliberate: no stock photo may imply a real deployment). Real photographs replace them once supplied.

**Steps**

1. Create the folder if missing: `public/assets/projects/<project-folder>/`
   Existing folder names: `square-group`, `robi`, `superdome-lab`, `ibaspp`, `citybank-gib`, `bkash`, `ec-pam`
2. Copy photos in with descriptive kebab-case names (`project-overview.jpg`, `storage-rack.jpg`, `tape-library.jpg`).
3. Rebuild and redeploy.

**To show them inside a case study**, add a `photos` array to that project in `src/data/portfolio.js`:

```js
{
  id: 'square-group-backup',
  // …existing fields…
  photos: [
    { file: 'project-overview.jpg', caption: 'Backup infrastructure overview' },
    { file: 'tape-library.jpg', caption: 'StoreEver MSL tape library' }
  ]
}
```

The modal renders captions beneath each image; missing files fall back to a labelled placeholder.

---

## 6. Add photos to the gallery

The gallery is **folder-driven** — no code edits, no data entries required:

```
src/assets/gallery/
├── thesis/      ← thesis group photos
├── projects/    ← project team photos
├── events/      ← workshops and events
└── campus/      ← university life
```

Drop images into a folder (1600 px long edge, ≤ 400 KB, .jpg/.png/.webp), push, and the
workflow rebuilds. A new folder becomes a new album automatically. Optional caption and
album-title overrides live in `gallery.captions` / `gallery.albums` in `src/data/portfolio.js`.

Full instructions, naming rules and troubleshooting: **`gallery-guide.md`**.

## 7. Image hygiene checklist

- [ ] No visible customer names, logos, hostnames, IPs, serial numbers, or case IDs
- [ ] No faces of colleagues without their consent
- [ ] No screens showing confidential dashboards
- [ ] Photos straightened, cropped, colour-corrected, exported ≤ 400 KB
- [ ] Descriptive filenames (no `IMG_2831.JPG`)
- [ ] `alt` text meaningful — edit captions in the data file rather than leaving them empty

---

## 8. What is still missing (and why the site is complete without it)

The site is fully functional with placeholders: cards, galleries and certificate panels degrade gracefully. To reach the final "documented" state, the following are needed from the owner:

| Missing item | Why it matters | Where it goes |
|---|---|---|
| Professional portrait (better than current casual photo) | First impression for recruiters | `assets/profile/profile-photo.jpg` |
| SCADA-free Square Group rack/storage photos | Proves the flagship project visually | `assets/projects/square-group/` |
| Robi / Synergy environment photo (approved for public use) | Supports the VVF 9.0 case study | `assets/projects/robi/` |
| Superdome lab photo + vCenter screenshot | Demonstrates hands-on virtualization | `assets/projects/superdome-lab/` |
| Thesis team photographs | Humanizes the academic journey | `assets/gallery/thesis/` |
| HCIA-DCS certificate scan | Verifiable credential | `assets/certifications/huawei-hcia-dcs.jpg` |
