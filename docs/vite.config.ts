import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import pkg from '../package.json' with { type: 'json' };

const root = import.meta.dirname;
const src = resolve(root, '../src');

/**
 * Docs site. It imports the library from source through the same specifiers a
 * user would (`officehut/react`, `officehut`), so every demo is copy-pasteable.
 */
export default defineConfig({
  root,
  base: process.env.DOCS_BASE ?? '/',
  plugins: [react()],
  define: {
    __OH_VERSION__: JSON.stringify(pkg.version),
  },
  resolve: {
    alias: [
      {
        find: /^officehut\/react$/,
        replacement: resolve(src, 'react/index.ts'),
      },
      {
        find: /^officehut\/tokens$/,
        replacement: resolve(src, 'shared/tokens.ts'),
      },
      { find: /^officehut$/, replacement: resolve(src, 'js/index.ts') },
      { find: /^@docs\//, replacement: `${resolve(root, 'src')}/` },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: { loadPaths: [resolve(src, 'scss')] },
    },
  },
  build: {
    outDir: resolve(root, 'dist'),
    emptyOutDir: true,
    chunkSizeWarningLimit: 900,
  },
  server: { port: 5173 },
});
