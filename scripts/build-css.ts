/**
 * Compiles the SCSS sources into:
 *   dist/css/officehut.css(.map)          full kit
 *   dist/css/officehut.min.css            minified full kit
 *   dist/css/components/<name>.css        one file per component, each one
 *                                         self-contained except for :root tokens
 *   dist/css/core.css                     tokens + reset + typography + layout,
 *                                         pair with per-component files
 */
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compile, compileString } from 'sass';
import { browserslistToTargets, transform } from 'lightningcss';

const root = fileURLToPath(new URL('..', import.meta.url));
const scssDir = join(root, 'src/scss');
const outDir = join(root, 'dist/css');
const pkg = (
  await import(join(root, 'package.json'), { with: { type: 'json' } })
).default;

// lightningcss targets roughly matching package.json "browserslist"
const targets = browserslistToTargets([]);
const minTargets = {
  chrome: 111 << 16,
  firefox: 113 << 16,
  safari: (16 << 16) | (4 << 8),
};

function write(file: string, css: string) {
  writeFileSync(join(outDir, file), css);
  const kb = (Buffer.byteLength(css) / 1024).toFixed(1);
  console.warn(`  ${file.padEnd(36)} ${kb.padStart(6)} kB`);
}

function minify(css: string, filename: string) {
  return transform({
    filename,
    code: Buffer.from(css),
    minify: true,
    targets: { ...targets, ...minTargets },
  }).code.toString();
}

mkdirSync(join(outDir, 'components'), { recursive: true });
const banner = `/*! officehut v${pkg.version} | MIT | github.com/mohammed-taysser/officehut */\n`;

console.warn('officehut css');

// full bundle
const full = compile(join(scssDir, 'officehut.scss'), {
  style: 'expanded',
  sourceMap: true,
});
write(
  'officehut.css',
  banner + full.css + '\n/*# sourceMappingURL=officehut.css.map */\n',
);
writeFileSync(
  join(outDir, 'officehut.css.map'),
  JSON.stringify(full.sourceMap),
);
write('officehut.min.css', banner + minify(full.css, 'officehut.css'));

// core (everything except components)
const core = compileString(
  `@use 'sass:meta';
	@use 'abstracts' as *;
	@use 'base';
	@use 'layout';
	@if $enable-utilities { @include meta.load-css('utilities'); }`,
  { loadPaths: [scssDir], style: 'expanded' },
);
write('core.css', banner + core.css);
write('core.min.css', banner + minify(core.css, 'core.css'));

// per component
for (const file of readdirSync(join(scssDir, 'components'))) {
  if (!file.endsWith('.scss') || file === '_index.scss') continue;
  const name = basename(file, '.scss').replace(/^_/, '');
  const out = compileString(`@use 'components/${name}';`, {
    loadPaths: [scssDir],
    style: 'expanded',
  });
  write(`components/${name}.css`, banner + minify(out.css, `${name}.css`));
}
