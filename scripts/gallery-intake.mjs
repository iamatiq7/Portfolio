#!/usr/bin/env node
/**
 * Gallery intake + image conversion — runs automatically before every build
 * (`prebuild` / `prebuild:gh`).
 *
 * Whatever the owner uploads, this script turns it into a web-ready JPEG and
 * puts it inside src/assets/gallery/<album>/ so the gallery always shows it.
 *
 *   • HEIC / HEIF (iPhone)      → JPEG via heic-convert (libheif, WASM)
 *   • TIFF / TIF                → JPEG via sharp
 *   • BMP                       → JPEG via bmp-js + sharp
 *   • GIF                       → JPEG (first frame)
 *   • PNG / WebP / AVIF / JPEG  → optimised JPEG when oversized
 *   • any image sitting in the repo root or public/assets/gallery → moved in
 *
 * Rules: max width 1600 px, JPEG quality 82, progressive; transparency is
 * flattened onto the site background. Originals are removed once converted.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import heicConvert from 'heic-convert';
import bmpjs from 'bmp-js';

const ROOT = process.cwd();
const GALLERY = path.join(ROOT, 'src', 'assets', 'gallery');
const LEGACY = path.join(ROOT, 'public', 'assets', 'gallery');
const UNSORTED = path.join(GALLERY, 'unsorted');

const MAX_WIDTH = 1600;
const QUALITY = 82;
const OPTIMISE_ABOVE = 600 * 1024;

const WEB = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const CONVERT = new Set(['.heic', '.heif', '.tiff', '.tif', '.bmp', '.gif', '.jfif']);
const ALL = new Set([...WEB, ...CONVERT]);

const stats = { converted: 0, optimised: 0, skipped: 0, failed: 0 };
const log = [];

const isFile = (p) => {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
};

const slugify = (name) =>
  path
    .basename(name, path.extname(name))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'photo';

function uniquePath(dir, slug) {
  let candidate = path.join(dir, `${slug}.jpg`);
  let i = 2;
  while (fs.existsSync(candidate)) {
    candidate = path.join(dir, `${slug}-${i}.jpg`);
    i += 1;
  }
  return candidate;
}

async function jpegFrom(file, ext) {
  if (ext === '.heic' || ext === '.heif') {
    const buf = await heicConvert({ buffer: fs.readFileSync(file), format: 'JPEG', quality: 0.9 });
    return sharp(Buffer.from(buf));
  }
  if (ext === '.bmp') {
    const raw = bmpjs.decode(fs.readFileSync(file));
    return sharp(raw.data, { raw: { width: raw.width, height: raw.height, channels: 4 } });
  }
  return sharp(file, { animated: false }); // tiff, gif, png, webp, avif, jpeg
}

async function processImage({ file, album, force, overwrite = false }) {
  const ext = path.extname(file).toLowerCase();
  if (!ALL.has(ext)) return;

  const size = fs.statSync(file).size;
  let width = 0;
  try {
    const meta = await sharp(file).metadata();
    width = meta.width || 0;
  } catch {
    // HEIC/BMP metadata may be unavailable — treat as needing conversion
    width = 0;
  }

  const needsConvert = CONVERT.has(ext) || !WEB.has(ext);
  const needsOptimise = WEB.has(ext) && (size > OPTIMISE_ABOVE || width > MAX_WIDTH);
  if (!force && !needsConvert && !needsOptimise) {
    stats.skipped += 1;
    return;
  }

  const destDir = path.join(GALLERY, album);
  fs.mkdirSync(destDir, { recursive: true });
  const baseSlug = slugify(file);
  const dest = overwrite
    ? path.join(destDir, `${baseSlug}.jpg`)
    : uniquePath(destDir, baseSlug);

  try {
    const pipeline = await jpegFrom(file, ext);
    const out = await pipeline
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .flatten({ background: '#0a1120' })
      .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
      .toBuffer();

    fs.writeFileSync(dest, out);
    const outMeta = await sharp(dest).metadata();
    const outKb = Math.round(out.length / 1024);
    const inKb = Math.round(size / 1024);

    log.push(
      `✔ ${path.relative(ROOT, file)} → ${path.relative(GALLERY, dest)} · ${inKb} KB → ${outKb} KB · ${width || '?'}px → ${outMeta.width}px`
    );

    if (path.resolve(file) !== path.resolve(dest)) {
      try {
        fs.unlinkSync(file);
      } catch {
        try {
          fs.rmSync(file, { force: true });
        } catch {
          log.push(`   ↳ source could not be removed (locked); it will simply be overwritten next build.`);
        }
      }
    }
    if (needsConvert) stats.converted += 1;
    else stats.optimised += 1;
  } catch (err) {
    stats.failed += 1;
    log.push(`✖ ${path.relative(ROOT, file)} — could not convert (${String(err.message).split('\n')[0].slice(0, 120)}). File left untouched.`);
  }
}

// 1) repository root uploads
for (const name of fs.readdirSync(ROOT)) {
  const p = path.join(ROOT, name);
  if (!isFile(p)) continue;
  if (!ALL.has(path.extname(name).toLowerCase())) continue;
  await processImage({ file: p, album: 'unsorted', overwrite: true });
}

// 2) legacy public/assets/gallery uploads
if (fs.existsSync(LEGACY)) {
  const walk = async (dir, album) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(p, album || entry.name);
      } else if (ALL.has(path.extname(entry.name).toLowerCase())) {
        await processImage({ file: p, album: album || 'unsorted', overwrite: true });
      }
    }
  };
  await walk(LEGACY, null);
}

// 3) gallery folders: convert non-web formats, optimise oversized web images
if (fs.existsSync(GALLERY)) {
  for (const entry of fs.readdirSync(GALLERY, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const album = entry.name;
    const dir = path.join(GALLERY, album);
    for (const name of fs.readdirSync(dir)) {
      const p = path.join(dir, name);
      if (!isFile(p)) continue;
      if (!ALL.has(path.extname(name).toLowerCase())) continue;
      await processImage({ file: p, album });
    }
  }
}

if (log.length) {
  console.log('\n🖼  Gallery intake — converted/optimised images:');
  for (const line of log) console.log('   ' + line);
}
console.log(
  `\nGallery intake summary: ${stats.converted} converted · ${stats.optimised} optimised · ${stats.skipped} already fine · ${stats.failed} failed`
);
if (stats.failed) {
  console.log('   Failed files were left in place; fix or remove them, then rebuild.\n');
}
