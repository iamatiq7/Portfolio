import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves this site from /Portfolio/ — the base path must match.
// Auto-detect: use '/Portfolio/' for GitHub Pages production builds; '/' for local dev.
// To build for GitHub Pages run: npm run build:gh  (defined in package.json)
export default defineConfig(({ mode }) => ({
  base: mode === 'gh-pages' ? '/Portfolio/' : '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0, // keep assets as real files (predictable paths)
  },
}));
