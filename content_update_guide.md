# CONTENT_UPDATE_GUIDE

All site copy lives in **one file**: `src/data/portfolio.js`. Change a value, rebuild, redeploy — no component edits needed.

---

## 1. The 60-second workflow

```bash
# 1. edit content
notepad src/data/portfolio.js

# 2. check locally
npm run dev          # http://localhost:5173/

# 3. build for GitHub Pages
npm run build:gh

# 4. publish (see deployment-github-pages.md)
```

---

## 2. Field-by-field reference

### `site` — metadata shown in the footer and browser tab

```js
site: {
  title: 'Kazi Atiqur Rahman — Enterprise Infrastructure & Systems Engineer',
  description: '…',
  footerTitle: 'Enterprise Infrastructure & Systems Engineer',
}
```

> The `<title>`, meta description and Open Graph tags in `index.html` are **separate** — update both if you change the positioning statement.

### `contact`

```js
contact: {
  email: 'iamatiq7@gmail.com',
  phone: '+880 1521 584 666',
  location: 'Dhaka, Bangladesh',
  linkedin: 'https://www.linkedin.com/in/iamatiq7',
  github: 'https://github.com/iamatiq7',
  portfolio: 'https://iamatiq7.github.io/Portfolio/'
}
```

Used by the hero meta strip, contact section, footer and social icons. The form's `mailto:` target follows `contact.email` automatically.

### `hero`

| Field | Effect |
|---|---|
| `name` | Large headline |
| `title` | Eyebrow chip above the name |
| `tagline` | One-line positioning statement |
| `summary` | Paragraph under the tagline |
| `workplace`, `educationShort` | Meta strip under the CTA buttons |
| `stats[]` | Four stat cards — `{ value, label }`. Keep values verifiable |

### `about`

- `paragraphs[]` — each string is a paragraph; the first is styled as a lead.
- `highlights[]` — `{ icon, title, text }`. Available icons: `server`, `database`, `shield`, `layers`, `network`, `wrench`.
- `quickFacts` — the sidebar table (`role`, `company`, `dept`, `domain`, `education`, `languages`).
- `philosophy` — the quote card at the bottom of the sidebar.

### `expertise[]`

One object per domain card:

```js
{
  id: 'servers',              // also selects the icon
  title: 'Enterprise Server Infrastructure',
  short: 'One-line description',
  items: ['HPE ProLiant DL380 Gen10', …],   // badges
  note: 'Honest depth statement shown in mono type at the card bottom'
}
```

Icon map: `servers`, `storage`, `backup`, `virtualization`, `os-network`, `operations`.

Add a category by appending an object; the grid reflows automatically (3 → 2 → 1 columns).

### `experience[]`

```js
{
  company: 'Smart Technologies (BD) Ltd.',
  role: 'Assistant System Engineer',
  dept: 'Enterprise Services — Server, Storage & Backup',
  period: 'Dec 2024 — Present',
  location: 'Dhaka, Bangladesh',
  summary: 'Two-sentence context about the employer and scope.',
  responsibilities: ['Bullet one', 'Bullet two', …]
}
```

Add a previous employer by prepending an object — the timeline renders newest first in array order.

### `projects[]`

```js
{
  id: 'square-group-backup',           // unique, kebab-case
  title: 'Enterprise Backup Infrastructure',
  org: 'Square Group',
  category: 'Backup & Storage Infrastructure',  // selects the SVG schematic
  status: 'Ongoing',                   // 'Ongoing' | 'Enterprise Project' | 'Lab Project'
  tech: ['HPE Alletra 4120', …],       // badges
  overview: 'Two–three sentence summary.',
  role: 'What you actually did — be precise.',
  outcomes: ['Array', 'of', 'outcome strings'],
  editableNote: 'Optional note shown in the modal (photos pending, etc.)',
  galleryFolder: 'square-group'
}
```

Category → schematic mapping (see `projectvisual.jsx`): `Backup & Storage Infrastructure`, `Virtualization`, `Server Infrastructure`, `Datacenter Operations`, `Enterprise Infrastructure`. Unknown categories fall back to the server-rack art.

**Rules of thumb**
- Never claim completion for an ongoing project — set `status: 'Ongoing'`.
- Never describe a role as "led" unless it was led.
- Keep `outcomes` factual; they appear under "Key outcomes & learning".

### `softwareProjects[]`

`{ title, tech: [], description }` — rendered as the "Engineering beyond infrastructure" cards.

### `thesis[]`

`{ title, description }` — undergraduate research cards.

### `education[]`

```js
{ degree, institution, period, result, note? }
```

`result` renders under the institution; `note` is optional smaller text.

### `certifications[]`

Earned qualification:

```js
{ name, issuer, status: 'Earned', note: 'Service & Solution Qualification' }
```

Featured (shows the large card + certificate image):

```js
{
  name: 'HCIA-DCS — Data Center System',
  issuer: 'Huawei',
  status: 'Earned',
  featured: true,
  image: 'huawei-hcia-dcs.jpg',      // file in public/assets/certifications/
  description: 'One–two sentences.'
}
```

In progress:

```js
{ name: 'RHCSA — Red Hat Certified System Administrator', issuer: 'Red Hat', status: 'In Progress' }
```

`status: 'In Progress'` moves an entry into the "Currently pursuing" row. Only list certifications actually earned or actively pursued.

### `futureFocus`

```js
{ title, intro, items: ['Cybersecurity', …], note: 'A developing direction — …' }
```

Keep the `note`: it prevents the section from overstating expertise.

### `gallery`

`{ title, intro, albums: [] }` — see `asset_guide.md` §6 for the album shape.

---

## 3. Change the design (without breaking it)

### Colours — `src/styles/global.css`

```css
:root {
  --bg-0: #0a1120;      /* page canvas */
  --bg-1: #0d1626;      /* alternating section */
  --bg-2: #111c30;      /* cards */
  --accent: #38bdf8;    /* THE accent — used sparingly on purpose */
  --text-1: #eef4fb;
  --text-2: #a7b8ce;
}
```

Change `--accent` for a different brand colour; every chip, icon, link hover and button follows. Keep the accent to **one** hue — that restraint is what makes the design read as premium.

### Typography

- Families: `src/styles/fonts.css` (`@font-face`) — replace the `.woff2` files in `public/assets/fonts/` and update the family names.
- Scale: `clamp()` values in `global.css` (`.section-head h2`, `.hero__name`).

### Spacing rhythm

`--space-1 … --space-7` in `global.css`. Sections use `--space-7` (7rem) vertical padding — reduce to 5rem if the page feels too airy.

### Layout breakpoints — `src/styles/components.css`

- `1080px` — expertise 3→2 columns, projects 3→2
- `900px` — mobile nav, hero stacks, about/contact single column
- `640px` — all grids single column, timeline compresses

---

## 4. Navigation

`src/components/navbar.jsx` → `NAV_ITEMS` array. Each entry is `{ id, label }` where `id` must match the section's `id` in `app.jsx`:

```js
const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  …
];
```

Order matters — the array drives both desktop and mobile menus and the scroll-spy. If you add a section, add its id to `SECTION_IDS` in `app.jsx` too.

---

## 5. SEO metadata — `index.html`

| Tag | Purpose |
|---|---|
| `<title>` | Browser tab + search result headline |
| `meta description` | Search snippet (~155 chars) |
| `og:title`, `og:description`, `og:image`, `og:url` | LinkedIn / Facebook previews |
| `twitter:*` | X/Twitter previews |
| `application/ld+json` | Person schema — name, job title, employer, alumni, skills |

Social card image: `public/assets/og/og-image.png` (1200 × 630). Replace it with a branded card if the design changes.

---

## 6. Adding a whole new section

1. Create `src/components/NewSection.jsx` exporting a `<section id="new-section">` block.
2. Import and place it in `app.jsx` inside `<main>`, and add `'new-section'` to `SECTION_IDS`.
3. Add `{ id: 'new-section', label: 'New Section' }` to `NAV_ITEMS`.
4. Add copy to `src/data/portfolio.js`.
5. Reuse `.section`, `.container`, `.section-head`, `.card`, `.badge` classes so it matches automatically.

---

## 7. Content quality rules (enforced by review, not code)

1. Never invent employers, clients, awards, metrics or testimonials.
2. Never claim a certification that is not held.
3. Mark ongoing work as ongoing.
4. Distinguish hands-on vs project exposure vs learning.
5. No confidential customer detail in text or images.
6. Spelling: the site uses American spelling consistently ("virtualization", "organization"). Keep it consistent when adding copy.
