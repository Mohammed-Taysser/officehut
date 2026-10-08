import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import pkg from './package.json' with { type: 'json' };

const root = import.meta.dirname;
const define = { __OH_VERSION__: JSON.stringify(pkg.version) };

/**
 * Library build.
 *
 * - default mode → ESM bundles for bundlers (`dist/js`, `dist/react`, `dist/shared`)
 * - `--mode iife` → a single `dist/officehut.iife.js` for `<script>` / CDN use
 *
 * CSS is compiled separately by `scripts/build-css.ts` and types by `tsc -p tsconfig.lib.json`.
 */
export default defineConfig(({ mode }) => {
  if (mode === 'iife') {
    return {
      define,
      build: {
        outDir: 'dist',
        emptyOutDir: false,
        sourcemap: true,
        minify: true,
        lib: {
          entry: resolve(root, 'src/js/auto.ts'),
          name: 'Officehut',
          formats: ['iife'],
          fileName: () => 'officehut.iife.js',
        },
      },
    };
  }

  return {
    define,
    plugins: [react()],
    build: {
      outDir: 'dist',
      emptyOutDir: false,
      sourcemap: true,
      minify: false,
      lib: {
        entry: {
          'js/index': resolve(root, 'src/js/index.ts'),
          'react/index': resolve(root, 'src/react/index.ts'),
          'shared/tokens': resolve(root, 'src/shared/tokens.ts'),
        },
        formats: ['es'],
      },
      rolldownOptions: {
        external: [/^react($|\/)/, /^react-dom($|\/)/],
        output: {
          preserveModules: false,
          chunkFileNames: 'chunks/[name]-[hash].js',
        },
      },
    },
  };
});
