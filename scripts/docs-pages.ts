/**
 * Prepares docs/dist for GitHub Pages, which has no rewrites.
 *
 * Every docs route gets its own copy of index.html, so a deep link such as
 * /officehut/docs/components/button is served from docs/components/button.html
 * with a 200 instead of falling through to 404.html. 404.html stays as the
 * fallback for unknown URLs, where the app renders its own "not found" page.
 *
 * Run after `pnpm docs:build` (the GitHub Pages workflow does this for you).
 */
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FLAT_NAV } from '../docs/src/content/nav.ts';

const dist = fileURLToPath(new URL('../docs/dist/', import.meta.url));
const index = join(dist, 'index.html');

if (!existsSync(index)) {
  console.error('docs/dist/index.html not found: run `pnpm docs:build` first.');
  process.exit(1);
}

const copy = (to: string) => {
  mkdirSync(dirname(to), { recursive: true });
  copyFileSync(index, to);
};

for (const { path } of FLAT_NAV) {
  const route = path.replace(/^\/+|\/+$/g, '');
  // `/docs/rtl` → docs/rtl.html. A route that is also a folder (`/docs`) is
  // redirected by Pages to `/docs/`, so it needs docs/index.html as well.
  copy(join(dist, `${route}.html`));
  if (FLAT_NAV.some((other) => other.path.startsWith(`${path}/`))) {
    copy(join(dist, route, 'index.html'));
  }
}

copy(join(dist, '404.html'));
// Vite chunks may start with "_"; Jekyll would hide them.
writeFileSync(join(dist, '.nojekyll'), '');

console.warn(
  `GitHub Pages: ${FLAT_NAV.length} routes, 404.html and .nojekyll written.`,
);
