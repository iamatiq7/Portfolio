#!/usr/bin/env node
/**
 * Gallery pre-flight check.
 *
 *   npm run gallery:check
 *
 * Fails on unsupported / non-browser formats, warns about size and uppercase
 * extensions (which are easy to upload from a camera and easy to miss).
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('src/assets/gallery');
const SUPPORTED = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const WARN_BYTES = 600 * 1024;
const MAX_BYTES = 8 * 1024 * 1024;

if (!fs.existsSync(ROOT)) {
  console.log('No gallery folder found at src/assets/gallery — nothing to check.');
  process.exit(0);
}

const files = [];
for (const entry of fs.readdirSync(ROOT, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const dir = path.join(ROOT, entry.name);
  for (const f of fs.readdirSync(dir)) {
    if (f === '.gitkeep') continue;
    files.push({ album: entry.name, name: f, file: path.join(dir, f), size: fs.statSync(path.join(dir, f)).size });
  }
}

let errors = 0;
let warnings = 0;

for (const item of files) {
  const ext = path.extname(item.name);
  const lower = ext.toLowerCase();
  const kb = Math.round(item.size / 1024);

  if (!SUPPORTED.has(lower)) {
    console.error(`✗ ${item.album}/${item.name} — unsupported format (${ext || 'no extension'}). Use JPG, PNG, WebP or AVIF.`);
    errors++;
    continue;
  }
  if (ext !== lower) {
    console.warn(`⚠ ${item.album}/${item.name} — uppercase extension; supported, but lowercase .${lower.slice(1)} is safer.`);
    warnings++;
  }
  if (item.size > MAX_BYTES) {
    console.error(`✗ ${item.album}/${item.name} — ${kb} KB is too large to publish (limit 8 MB).`);
    errors++;
  } else if (item.size > WARN_BYTES) {
    console.warn(`⚠ ${item.album}/${item.name} — ${kb} KB; compress to ≤ 600 KB (target ≤ 400 KB) for a fast page.`);
    warnings++;
  }
}

const albums = [...new Set(files.map((f) => f.album))];

// Stray images outside the album folders are invisible to the gallery.
const stray = [];
for (const name of fs.readdirSync(process.cwd())) {
  if (/\.(jpe?g|png|webp|avif|heic|heif)$/i.test(name) && fs.statSync(path.join(process.cwd(), name)).isFile()) {
    stray.push(`repo root: ${name}`);
  }
}
const legacy = path.resolve('public/assets/gallery');
if (fs.existsSync(legacy)) {
  const legacyFiles = fs.readdirSync(legacy, { recursive: true }).filter((f) => /\.(jpe?g|png|webp|avif|heic|heif)$/i.test(String(f)));
  if (legacyFiles.length) stray.push(`public/assets/gallery contains ${legacyFiles.length} image(s) (legacy location)`);
}

console.log(`\nGallery: ${files.length} photo(s) across ${albums.length} album(s) — ${albums.join(', ') || 'none'}`);
console.log(`Result: ${errors} error(s), ${warnings} warning(s)`);
if (stray.length) {
  console.log('\nℹ Images outside the gallery folders (they will not render until moved, but the build auto-moves them):');
  for (const s of stray) console.log(`   • ${s}`);
}

if (errors) process.exit(1);
