#!/usr/bin/env node
/**
 * Gallery intake — runs automatically before every build
 * (`prebuild` / `prebuild:gh`).
 *
 * Problem it solves: photos uploaded to the repository root (or to the legacy
 * public/assets/gallery folder) are invisible to the gallery, which only reads
 * src/assets/gallery/<album>/.
 *
 * This script finds browser-displayable images in those wrong places and moves
 * them into src/assets/gallery/unsorted/ so they always appear on the site.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const GALLERY = path.join(ROOT, 'src', 'assets', 'gallery');
const UNSORTED = path.join(GALLERY, 'unsorted');
const LEGACY = path.join(ROOT, 'public', 'assets', 'gallery');

const OK_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const HEIC_EXT = new Set(['.heic', '.heif']);

const moved = [];
const warnings = [];

function isFile(p) {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

function moveInto(srcFile, album = 'unsorted') {
  const destDir = album === 'unsorted' ? UNSORTED : path.join(GALLERY, album);
  fs.mkdirSync(destDir, { recursive: true });
  let base = path.basename(srcFile);
  let dest = path.join(destDir, base);
  if (fs.existsSync(dest)) {
    const ext = path.extname(base);
    const stem = path.basename(base, ext);
    dest = path.join(destDir, `${stem}-${Date.now().toString(36)}${ext}`);
  }
  fs.renameSync(srcFile, dest);
  moved.push(`${path.relative(ROOT, srcFile)} → ${path.relative(ROOT, dest)}`);
}

// 1) images dropped in the repository root
for (const name of fs.readdirSync(ROOT)) {
  const p = path.join(ROOT, name);
  if (!isFile(p)) continue;
  const ext = path.extname(name).toLowerCase();
  if (HEIC_EXT.has(ext)) {
    warnings.push(`${name} is HEIC/HEIF — browsers cannot display it. Convert to JPG, then re-upload.`);
    continue;
  }
  if (!OK_EXT.has(ext)) continue;
  moveInto(p);
}

// 2) legacy public/assets/gallery uploads, preserving their sub-folder as the album
if (fs.existsSync(LEGACY)) {
  const walk = (dir, album) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(p, album || entry.name);
        continue;
      }
      const ext = path.extname(entry.name).toLowerCase();
      if (HEIC_EXT.has(ext)) {
        warnings.push(`${path.relative(ROOT, p)} is HEIC/HEIF — convert to JPG.`);
        continue;
      }
      if (OK_EXT.has(ext)) moveInto(p, album || 'unsorted');
    }
  };
  walk(LEGACY, null);
}

if (moved.length) {
  console.log('\n📥 Gallery intake — moved misplaced photos into the gallery:');
  for (const m of moved) console.log(`   • ${m}`);
  console.log('   → They will appear under the "Unsorted" album until you move them into an album folder.\n');
}
if (warnings.length) {
  console.log('\n⚠ Gallery intake warnings:');
  for (const w of warnings) console.log(`   • ${w}`);
  console.log('');
}
if (!moved.length && !warnings.length) {
  console.log('Gallery intake: nothing to move.');
}
