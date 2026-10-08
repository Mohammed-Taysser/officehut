import { Link } from 'react-router';
import { CodeBlock } from '../../components/CodeBlock';
import { DocPage, H2, H3 } from '../../components/DocPage';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

const CDN = `<!doctype html>
<html lang="en" data-oh-theme="light">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/officehut@0.1/dist/css/officehut.min.css">
    <script src="https://cdn.jsdelivr.net/npm/officehut@0.1/dist/officehut.iife.js" defer></script>
  </head>
  <body>
    <div class="container page">
      <button class="btn btn-primary" data-oh-tooltip="Sends to finance@">Submit timesheet</button>
    </div>
  </body>
</html>`;

const IIFE = `<script>
  // The CDN build runs initAll() on DOMContentLoaded and exposes window.Officehut.
  document.querySelector('#save').addEventListener('click', () => {
    Officehut.toast({ title: 'Saved', message: 'Week 41 timesheet', color: 'success' });
  });
</script>`;

const NPM = `pnpm add officehut
# or
npm install officehut`;

const CSS_ONLY_JS = `// main.ts — any bundler that understands CSS imports (Vite, webpack, Parcel)
import 'officehut/css';`;

const CSS_ONLY_CSS = `/* app.css */
@import 'officehut/css';`;

const SASS = `// styles.scss
@use 'officehut/scss' with (
  $colors: ('primary': #0b6e4f, 'brand': #c2410c),
  $radius: 3px,
  $font-size-base: 0.9375rem,
  $enable-print: false,
);

// Mixins and maps are available too.
@use 'officehut/scss/abstracts' as oh;

.invoice-total {
  @include oh.tone('brand');
  color: var(--_c-ink);

  @include oh.up(md) {
    text-align: end;
  }
}`;

const SASS_CLI = `sass --pkg-importer=node styles.scss styles.css
# then in styles.scss: @use 'pkg:officehut/scss' with (...);`;

const VANILLA = `import 'officehut/css';
import { initAll, toast } from 'officehut';

// Wires every data-oh-* attribute with a few delegated listeners on document.
// Call it once; elements added later work too.
initAll();

document.querySelector('#send')?.addEventListener('click', () => {
  toast({ title: 'Invoice sent', message: 'INV-2041 to Acme Logistics', color: 'success' });
});`;

const REACT = `// main.tsx
import 'officehut/css';
import { createRoot } from 'react-dom/client';
import { App } from './App';

createRoot(document.getElementById('root')!).render(<App />);

// App.tsx
import { Badge, Button, Card } from 'officehut/react';

export function App() {
  return (
    <Card title="Leave request" footer={<Button color="success">Approve</Button>}>
      Salma Nour, 21–23 October <Badge color="warning">Pending</Badge>
    </Card>
  );
}`;

const PICK = `/* Only what this screen needs. core.css holds tokens, reset, typography, grid and utilities. */
@import 'officehut/css/core.css';
@import 'officehut/css/components/button.css';
@import 'officehut/css/components/badge.css';
@import 'officehut/css/components/card.css';`;

const FONTS = `pnpm add @fontsource/ubuntu @fontsource/jetbrains-mono @fontsource/patrick-hand

// main.ts
import '@fontsource/ubuntu/400.css';
import '@fontsource/ubuntu/500.css';
import '@fontsource/ubuntu/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/patrick-hand/400.css'; // margin notes and handwriting`;

export default function InstallationPage() {
  return (
    <DocPage
      title='Installation'
      lead='Pick the smallest setup that does the job. A static page needs two tags from a CDN; a React app needs one package and one CSS import.'
    >
      <H2 id='cdn'>From a CDN</H2>
      <p>
        The quickest way to try the kit. The script is the IIFE build: it wires
        up the data attributes as soon as the page loads, so there is nothing
        else to call.
      </p>
      <CodeBlock code={CDN} lang='html' label='index.html' />
      <p>
        Everything the vanilla API exports is also on{' '}
        <code>window.Officehut</code>:
      </p>
      <CodeBlock code={IIFE} lang='html' />
      <Note title='Pin the version'>
        <code>officehut@0.1</code> follows patch releases. Use a full version
        such as <code>officehut@0.1.0</code> in production so a release can't
        change your pages overnight.
      </Note>

      <H2 id='npm'>From npm</H2>
      <CodeBlock code={NPM} lang='bash' />

      <H3 id='css-only'>CSS only</H3>
      <p>
        If your pages have no dropdowns, modals or tabs, you don't need any
        JavaScript. Import the stylesheet from your entry file or from CSS:
      </p>
      <CodeBlock code={CSS_ONLY_JS} lang='js' label='main.ts' />
      <CodeBlock code={CSS_ONLY_CSS} lang='scss' label='app.css' />
      <p>
        <code>officehut/css/min</code> is the minified build if your bundler
        doesn't minify CSS itself.
      </p>

      <H3 id='sass'>Sass</H3>
      <p>
        Load the Sass source when you want to change the palette, radius, fonts
        or breakpoints at build time, or switch whole layers off. Every setting
        in <code>_config.scss</code> is <code>!default</code>, and maps are
        merged with the defaults, so list only what you change.
      </p>
      <CodeBlock code={SASS} lang='scss' label='styles.scss' />
      <p>
        A new key in <code>$colors</code> (like <code>brand</code> above)
        generates <code>.btn-brand</code>, <code>.badge-brand</code>,{' '}
        <code>.alert-brand</code> and the rest. See{' '}
        <Link to='/docs/theming'>Theming</Link> for every option.
      </p>
      <p>
        Vite and webpack resolve <code>officehut/scss</code> through the package
        exports. With the Sass command line, turn on the Node package importer:
      </p>
      <CodeBlock code={SASS_CLI} lang='bash' />

      <H3 id='vanilla-js'>Vanilla JS</H3>
      <p>
        The ES module build is for apps with a bundler. Call{' '}
        <code>initAll()</code> once; it attaches a few listeners to{' '}
        <code>document</code> and returns a function that removes them.
      </p>
      <CodeBlock code={VANILLA} lang='js' label='main.ts' />
      <p>
        The <Link to='/docs/javascript'>Vanilla JS API</Link> page lists every
        attribute, class and event.
      </p>

      <H3 id='react'>React</H3>
      <p>
        React 19 or newer is an optional peer dependency. Import the CSS once,
        then import components from <code>officehut/react</code>. You don't need{' '}
        <code>initAll()</code> in a React app; the components handle their own
        behaviour.
      </p>
      <CodeBlock code={REACT} lang='tsx' />

      <H2 id='cherry-picking'>Cherry-picking CSS</H2>
      <p>
        The full stylesheet has a 30&nbsp;kB budget (minified and gzipped). If
        you only use a handful of components, load <code>core.css</code> and one
        file per component instead. Each component file only depends on the
        tokens in <code>core.css</code>.
      </p>
      <CodeBlock code={PICK} lang='scss' label='app.css' />
      <p>
        Accordion styles live in <code>collapse.css</code>, and the close button
        (<code>.btn-close</code>) used by alerts, modals and toasts lives in{' '}
        <code>button.css</code>.
      </p>

      <H2 id='fonts'>Fonts</H2>
      <p>
        The font stacks start with Ubuntu, JetBrains Mono and Patrick Hand (for
        notebook margins and handwriting), but the kit doesn't ship font files.
        Without them you get <code>system-ui</code>, your platform's monospace
        and its cursive font, which is fine. To match these docs, install them
        yourself:
      </p>
      <CodeBlock code={FONTS} lang='bash' />

      <H2 id='entry-points'>Entry points</H2>
      <Ledger
        kind='attr'
        title='Package exports'
        rows={[
          {
            name: 'officehut',
            description:
              'Vanilla JS (ES module): initAll, toast, Modal, Dropdown, setTheme and friends.',
          },
          {
            name: 'officehut/react',
            description: 'React components and hooks.',
          },
          {
            name: 'officehut/tokens',
            description:
              'COLORS, BREAKPOINTS, PLACEMENTS and the theme attribute names as JS constants.',
          },
          { name: 'officehut/css', description: 'The full stylesheet.' },
          { name: 'officehut/css/min', description: 'Same, minified.' },
          {
            name: 'officehut/css/core.css',
            description:
              'Tokens, reset, typography, grid, shell and utilities. No components.',
          },
          {
            name: 'officehut/css/components/<name>.css',
            description:
              'One component: alert, avatar, badge, breadcrumb, button, card, collapse, dropdown, modal, tabs, toast, tooltip.',
          },
          {
            name: 'officehut/scss',
            description: 'Sass entry. Configure with @use … with (…).',
          },
          {
            name: 'officehut/scss/*',
            description:
              'Individual partials, e.g. officehut/scss/abstracts for the mixins.',
          },
          {
            name: 'officehut/iife',
            description:
              'The <script> build. Runs initAll() on load and sets window.Officehut.',
          },
        ]}
      />
    </DocPage>
  );
}
