# GALLERY GUIDE — adding photographs

The gallery is **folder-driven**. You do not edit components or write code: drop image files into an album folder, push, and the site rebuilds itself.

Live section: https://iamatiq7.github.io/Portfolio/#gallery

---

## 1. Where photos go

```
src/assets/gallery/
├── thesis/      ← thesis group photos, defence, presentation day
├── projects/    ← project team photos, datacenter visits, rack builds
├── events/      ← workshops, vendor training, conferences
└── campus/      ← university life
```

These four albums already exist. **Create a new folder** anywhere under `src/assets/gallery/` and it becomes a new album automatically — no data edit required (its title is derived from the folder name).

Supported formats: `.jpg` `.jpeg` `.png` `.webp` `.avif`

---

## 2. Adding photos — two ways

### Option A — from GitHub in the browser (no tools needed)

1. Open `https://github.com/iamatiq7/Portfolio/tree/main/src/assets/gallery/thesis`
2. **Add file → Upload files**
3. Drop your photos in, commit to `main`.
4. The Actions workflow rebuilds and republishes in 1–2 minutes. Hard-refresh the live site.

Works the same for `projects/`, `events/`, `campus/` — or create a folder with **Add file → Create new file** (name it `placeholder.txt`), then upload into it.

### Option B — from your computer

```bash
# copy photos into the album folder
cp ~/Pictures/thesis-*.jpg src/assets/gallery/thesis/

npm run build:gh     # optional local check
git add src/assets/gallery
git commit -m "gallery: add thesis team photos"
git push
```

GitHub Pages redeploys automatically.

---

## 3. File naming (controls order and captions)

Ordering is alphabetical with numeric awareness, so **prefix with numbers**:

```
thesis/
├── 01-thesis-team-final-defence.jpg
├── 02-presentation-day.jpg
└── 03-lab-session.jpg
```

The caption is generated from the filename:

| Filename | Auto caption |
|---|---|
| `01-thesis-team-final-defence.jpg` | “Thesis Team Final Defence” (leading number dropped) |
| `02-presentation-day.jpg` | “Presentation Day” |
| `datacenter-visit.jpg` | “Datacenter Visit” |

**Override a caption** in `src/data/portfolio.js`:

```js
gallery: {
  // …
  captions: {
    'thesis/01-thesis-team-final-defence.jpg': 'Thesis team after the final defence — AUST, 2024',
    'projects/02-rack-build.jpg': 'Rack build for the Square Group backup deployment',
  }
}
```

Keys are always `<album-folder>/<exact-filename>`.

---

## 4. Album titles and descriptions

Edit `src/data/portfolio.js` → `gallery.albums`:

```js
{
  id: 'thesis',                       // must match the folder name
  title: 'Thesis & Research',
  date: '2024',                       // optional, shown as a chip
  description: 'Group photographs from the undergraduate thesis …'
}
```

An album with **no photos is hidden**. An undeclared folder still appears, titled from its name — nothing you upload can go missing.

---

## 5. Image recommendations

| Item | Recommendation |
|---|---|
| Long edge | **1600 px** (minimum 1200 px) |
| Aspect ratio | 4:3 or 3:2 landscape; portrait works too |
| File size | **≤ 400 KB** each (compress with Squoosh / TinyPNG) |
| Format | JPEG for photographs, WebP if you want smaller files |
| Count | 6–20 per album keeps the page fast |
| Privacy | Check faces, badges, screens, customer names and whiteboards before uploading |

Photos are lazily loaded and hashed at build time, so filenames can contain spaces — but kebab-case (`01-thesis-team.jpg`) is safer and produces cleaner captions.

---

## 6. How the gallery behaves

| Behaviour | Detail |
|---|---|
| Album tabs | “All photos” plus one tab per non-empty album, each with a photo count |
| Grid | 4 columns desktop → 3 tablet → 2 mobile; the first photo of each album is a large feature tile |
| Lightbox | Click any photo → full-size view with caption, album name and `n / total` counter |
| Navigation | On-screen prev/next buttons, **←/→** arrow keys, **Esc** to close, click the backdrop to dismiss |
| Captions | Shown on hover in the grid, and under the photo in the lightbox |
| Missing files | Never break the layout — empty albums are hidden, and the section shows a designed empty state until the first photo arrives |

---

## 7. Troubleshooting

| Symptom | Cause / fix |
|---|---|
| New photos don’t appear | File is directly in `src/assets/gallery/` instead of a subfolder, or the extension isn’t supported |
| Photos appear but the old ones vanished | You replaced the folder contents instead of adding to it |
| Wrong order | Rename with numeric prefixes (`01-`, `02-`) |
| Caption shows the filename | Add an entry in `gallery.captions` with the exact `folder/filename` key |
| Album title looks odd | Folder name is used verbatim → add a proper `albums` entry with `id` = folder name |
| Build fails after upload | One file may be corrupt or a `.heic` (unsupported) — remove it and rebuild |
| Deployment not updating | Check the Actions run under the repository’s **Actions** tab; hard-refresh with Ctrl+F5 |

---

## 8. বাংলা সারসংক্ষেপ

- ছবি রাখুন: `src/assets/gallery/thesis/`, `projects/`, `events/`, `campus/` — এই চারটি ফোল্ডার তৈরি আছে।
- নতুন ফোল্ডার বানালে সেটিও আলাদা অ্যালবাম হিসেবে দেখাবে — কোড বদলাতে হবে না।
- ফাইলের নাম `01-thesis-team.jpg` এভাবে দিলে ক্রম ঠিক থাকবে এবং ক্যাপশন অটো তৈরি হবে।
- ক্যাপশন নিজের মতো চাইলে `src/data/portfolio.js` → `gallery.captions` এ লিখুন।
- GitHub-এ ব্রাউজার থেকে ফোল্ডারে ছবি আপলোড করলেই সাইট নিজে থেকে rebuild হয়ে যাবে (১–২ মিনিট)।
- প্রতিটি ছবি ১৬০০px চওড়া, ৪০০KB-এর নিচে রাখুন।

---

## 9. Uploaded a photo but it did not appear? (real incident, 2026-11-08)

A `DSC_0033.JPG` (7.37 MB, 6000×4000, uppercase extension) was uploaded to
`src/assets/gallery/thesis/` and did not show up. Two causes:

1. **Uppercase `.JPG`** — the build-time glob originally matched lowercase extensions only, so the
   file was ignored. **Fixed:** `.JPG/.JPEG/.PNG/.WEBP/.AVIF` are now matched too.
2. **7.37 MB / 6000 px** — far too heavy for a gallery tile even once detected.

What was done: the photo was resized to 1600 px wide / 169 KB, renamed `01-thesis-group.jpg`,
the camera original was removed from the repository, and a pre-flight check was added:

```bash
npm run gallery:check
# Gallery: 1 photo(s) across 1 album(s) — thesis
# Result: 0 error(s), 0 warning(s)
```

It fails on unsupported formats, errors above 8 MB, and warns above 600 KB or on uppercase extensions.

---

## 10. Uploaded to the repository ROOT instead of an album (2026-11-08, second incident)

A second photo (`IMG_6087.JPG`, 7.37 MB) was uploaded with **Add file → Upload files** from the
repository home page. It landed at the repository root, where the gallery never looks — so the
site showed nothing new.

**Why this happens:** GitHub's upload dialog uploads into *the folder you are currently viewing*.
From the repo home that is the root, not `src/assets/gallery/<album>/`.

**Permanent fix — automatic intake.** Every build now runs `scripts/gallery-intake.mjs`
(`prebuild` / `prebuild:gh`), which:

- finds browser-displayable images in the repository root or in the legacy `public/assets/gallery/`,
- moves them into `src/assets/gallery/unsorted/` (or the matching album for the legacy path),
- reports every move in the build log.

So a misplaced upload now still appears on the site (under the “Unsorted” album) instead of
disappearing. HEIC/HEIF files are flagged with a warning because browsers cannot display them.

**Correct habit:** always use the album upload link
(`https://github.com/iamatiq7/Portfolio/upload/main/src/assets/gallery/thesis`, …) — never the
repository home page.

That photo was a team photograph, so it was optimised to 1600 px / 271 KB and published as
`src/assets/gallery/teams/01-team-photo.jpg` under the **Teams & Groups** album.

---

## 11. যেকোনো ফরম্যাট আপলোড করুন — অটো কনভার্ট হয়

Build-এর আগে `scripts/gallery-intake.mjs` চলে এবং যা-ই আপলোড করেন সেটিকে ওয়েব-রেডি JPEG-তে
কনভার্ট করে `src/assets/gallery/<album>/`-এ রাখে। ফলে unsupported ফরম্যাটের কারণে ছবি আর হারায় না।

| Input | Conversion path |
|---|---|
| `.HEIC` / `.HEIF` (iPhone) | `heic-convert` (libheif WASM) → sharp → JPEG |
| `.TIFF` / `.TIF` | sharp → JPEG |
| `.BMP` | `bmp-js` decode → sharp → JPEG |
| `.GIF` | first frame → JPEG |
| `.PNG` / `.WEBP` / `.AVIF` / `.JPG` | kept, but re-encoded to JPEG if wider than 1600 px or larger than 600 KB |
| Anything in the **repo root** or `public/assets/gallery/` | moved into the gallery automatically (album `unsorted` if the folder is unknown) |

Rules applied to every output: **max width 1600 px**, **JPEG quality 82**, progressive, EXIF rotation
applied, transparency flattened onto the site background. Originals are deleted after conversion.

Sample build output:

```
🖼  Gallery intake — converted/optimised images:
   ✔ UPLOAD-FROM-IPHONE.HEIC → unsorted/upload-from-iphone.jpg · 205 KB → 120 KB · 2400px → 1600px
   ✔ scan-bitmap.bmp          → unsorted/scan-bitmap.jpg       · 12656 KB → 124 KB
   ✔ site-scan.tiff           → projects/site-scan.jpg         · 12656 KB → 120 KB
   ✔ campus-png.png           → campus/campus-png.jpg          · 1713 KB → 120 KB
   ✔ event-loop.gif           → events/event-loop.jpg          · 1458 KB → 122 KB
Gallery intake summary: 5 converted · 0 optimised · 2 already fine · 0 failed
```

**Failure behaviour:** a corrupt or unreadable file is reported (`✖ … could not convert`) and left
untouched — the build continues, the rest of the gallery still deploys. Fix or delete that file and
push again.

**Cost:** the conversion runs in GitHub Actions, not in the browser. A typical batch of 10 phone
photos adds roughly 10–20 seconds to the build. Nothing extra is shipped to visitors beyond the
resulting JPEGs.
