import { Link } from 'react-router';
import { CodeBlock } from '../../components/CodeBlock';
import { DocPage, H2, H3 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

const CSS_OVERRIDE = `/* After officehut.css. Applies to light and night shift alike. */
:root {
  --oh-font-sans: 'Inter', system-ui, sans-serif;
  --oh-radius: 3px;
  --oh-radius-lg: 6px;
  --oh-sidebar-w: 17rem;
}

/* Palette colours are set per theme, so override them per theme too. */
:root,
[data-oh-theme='light'] {
  --oh-primary: #0b6e4f;
}
[data-oh-theme='dark'] {
  --oh-primary: #3fa37f;
}`;

const SASS = `@use 'officehut/scss' with (
  // Maps merge with the defaults: list only what changes.
  $colors: (
    'primary': #0b6e4f,
    'brand': #c2410c,        // new key → .btn-brand, .badge-brand, .alert-brand …
  ),
  $paper: #f4f2ec,
  $night-paper: #141517,
  $radius: 3px,
  $font-sans: ('Inter', system-ui, sans-serif),
  $breakpoints: ('xxl': 1600px),

  // Drop layers you don't use.
  $enable-utilities: false,
  $enable-print: false,
);`;

const TONE = `// The tone mixin maps a palette entry onto the local --_c* variables.
@use 'officehut/scss/abstracts' as oh;

.ledger-row.is-overdue {
  @include oh.tone('danger');
  background: var(--_c-soft);
  color: var(--_c-ink);
  border-inline-start: 3px solid var(--_c);
}`;

/** Light / night values side by side, styled like the other ledgers. */
function TokenTable({ rows }: { rows: [string, string, string, string][] }) {
  return (
    <figure className='doc-ledger'>
      <div className='doc-ledger-scroll'>
        <table>
          <thead>
            <tr>
              <th scope='col'>Variable</th>
              <th scope='col'>Light</th>
              <th scope='col'>Night shift</th>
              <th scope='col'>Notes</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([name, light, night, note]) => (
              <tr key={name}>
                <th scope='row'>
                  <code>{name}</code>
                </th>
                <td className='doc-ledger-type'>
                  <Swatch color={light} /> {light}
                </td>
                <td className='doc-ledger-type'>
                  <Swatch color={night} /> {night}
                </td>
                <td>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

function Swatch({ color }: { color: string }) {
  return (
    <span
      aria-hidden
      className='d-inline-block rounded-sm border align-middle'
      style={{
        width: '0.8rem',
        height: '0.8rem',
        background: color,
        verticalAlign: '-0.1em',
      }}
    />
  );
}

export default function ThemingPage() {
  return (
    <DocPage
      title='Theming & tokens'
      lead='Everything visual is a CSS custom property prefixed --oh-. Change them at runtime with plain CSS, or set the Sass configuration at build time when you need new palette colours or want to switch whole layers off.'
    >
      <H2 id='two-ways'>Two ways to theme</H2>
      <ul>
        <li>
          <strong>CSS variables</strong> for fonts, radius, spacing and colour
          tweaks. No build step. Works with the CDN file.
        </li>
        <li>
          <strong>Sass configuration</strong> when you need a new palette colour
          (which generates classes), different breakpoints, or a smaller
          stylesheet without utilities or print styles.
        </li>
      </ul>

      <H2 id='css-variables'>Overriding CSS variables</H2>
      <p>
        Static tokens (type, space, shape, motion, layers) live on{' '}
        <code>:root</code>. Surfaces, inks and the palette are declared per
        theme, so a palette override has to be written for each theme you
        support.
      </p>
      <CodeBlock code={CSS_OVERRIDE} lang='scss' label='overrides.css' />

      <Example title='Scoped override' demo='theming/Override'>
        <p>
          Variables cascade, so you can rebrand one area of a page, such as a
          finance module embedded in a larger app. The right-hand panel
          overrides <code>--oh-primary</code> and the radius tokens on one
          element.
        </p>
      </Example>
      <Note title='Why the panel has data-oh-theme'>
        The soft tints and inks (<code>--oh-primary-soft</code>,{' '}
        <code>--oh-primary-ink</code>…) are computed with{' '}
        <code>color-mix()</code> on <code>:root</code> and on every element with{' '}
        <code>data-oh-theme</code>. A plain <code>&lt;div&gt;</code> inherits
        the already-computed tints from its parent, so if you change a palette
        colour on a subtree, put <code>data-oh-theme</code> on the same element.
        That also pins the subtree to that theme.
      </Note>

      <H2 id='sass-config'>Sass configuration</H2>
      <p>
        Every setting in <code>src/scss/_config.scss</code> is{' '}
        <code>!default</code>. Pass the ones you want to change when you load
        the kit:
      </p>
      <CodeBlock code={SASS} lang='scss' label='styles.scss' />
      <Note title='New colours and TypeScript' tone='blue'>
        A colour you add in Sass gets CSS classes, but the React{' '}
        <code>Color</code> type only knows the nine built-in names. Pass your
        class through <code>className</code> (
        <code>className=&quot;btn-brand&quot;</code>) or cast the prop.
      </Note>

      <H2 id='tones'>The tone system</H2>
      <p>
        Coloured components don't know palette names. A colour class such as{' '}
        <code>.badge-success</code> or <code>.alert-danger</code> only sets five
        local variables, and the component's styles read those. That is why
        every style works with every colour, and why you can add a colour
        without touching component CSS.
      </p>
      <Ledger
        kind='var'
        title='Tone variables'
        rows={[
          {
            name: '--_c',
            description:
              'Solid fill: solid buttons and badges, the alert note margin, the toast edge.',
          },
          {
            name: '--_c-fg',
            description:
              'Text on the solid fill. White, or dark ink for light and warning.',
          },
          {
            name: '--_c-soft',
            description:
              'Tinted background: soft buttons, soft badges, alerts. 13% of the colour on the surface.',
          },
          {
            name: '--_c-ink',
            description:
              'Text on the tinted background, and stamp ink. The colour mixed 78% with the body ink.',
          },
          {
            name: '--_c-line',
            description:
              'Tinted border: outline buttons and badges, alert borders. 40% of the colour.',
          },
          {
            name: '--_c-hover',
            description:
              'Hover fill for solid controls. The colour mixed with 14% black.',
          },
        ]}
      />
      <Example title='A one-off tone' demo='theming/Tone'>
        <p>
          Set the <code>--_c*</code> variables yourself and components without a
          colour class pick them up. Handy for a colour you need in one place,
          like a fiscal-year banner.
        </p>
      </Example>
      <p>In Sass, the same mapping is a mixin:</p>
      <CodeBlock code={TONE} lang='scss' />

      <H2 id='tokens'>Token reference</H2>
      <p>
        Values below are the defaults from <code>_root.scss</code>. Night shift
        values are listed where they differ; see{' '}
        <Link to='/docs/dark-mode'>Dark mode & density</Link>.
      </p>

      <Example title='Palette' demo='theming/Palette'>
        <p>
          Nine colours, each with derived <code>-soft</code>, <code>-line</code>
          , <code>-ink</code>, <code>-hover</code> and <code>-fg</code>{' '}
          variants. Toggle night shift above the preview to see the lifted night
          values.
        </p>
      </Example>

      <H3 id='tokens-surfaces'>Surfaces and ink</H3>
      <TokenTable
        rows={[
          ['--oh-paper', '#f6f4ef', '#18191c', 'Page background (the desk).'],
          [
            '--oh-surface',
            '#fffefa',
            '#212226',
            'Cards, inputs, menus, modals.',
          ],
          [
            '--oh-surface-2',
            '#faf8f2',
            '#26272c',
            'Card headers, modal footers, hover rows.',
          ],
          [
            '--oh-sunken',
            '#eeebe3',
            '#141518',
            'Wells, inline code, inactive folder tabs.',
          ],
          ['--oh-ink', '#1f2328', '#e8e4da', 'Body text.'],
          ['--oh-ink-2', '#565b63', '#aaa69d', 'Secondary text (.text-muted).'],
          [
            '--oh-ink-3',
            '#8b8f95',
            '#7c7a74',
            'Hints, placeholders, eyebrows (.text-subtle).',
          ],
          ['--oh-rule', '#e4dfd3', '#33343a', 'Hairline borders.'],
          [
            '--oh-rule-2',
            '#d3ccbc',
            '#44454c',
            'Stronger borders and the paper bottom edge.',
          ],
          [
            '--oh-ruling',
            '#c9daec',
            '#2b3644',
            'Blue lines of the exercise book (.notebook).',
          ],
          ['--oh-margin-line', '#e3a2a2', '#6a3a3d', 'The red margin line.'],
        ]}
      />

      <H3 id='tokens-palette'>Palette</H3>
      <Ledger
        kind='var'
        rows={[
          {
            name: '--oh-primary',
            default: '#2f5d8a',
            description: 'Main actions, links, focus ring.',
          },
          {
            name: '--oh-secondary',
            default: '#6b6f76',
            description: 'Neutral grey.',
          },
          {
            name: '--oh-success',
            default: '#3d7a4f',
            description: 'Approved, paid, healthy.',
          },
          {
            name: '--oh-info',
            default: '#2b7f8e',
            description: 'Neutral information.',
          },
          {
            name: '--oh-warning',
            default: '#c08419',
            description: 'Pending, due soon. Dark text on solid fills.',
          },
          {
            name: '--oh-danger',
            default: '#b8452f',
            description: 'Overdue, failed, destructive.',
          },
          {
            name: '--oh-light',
            default: '#e9e5db',
            description: 'Light neutral. Dark text on solid fills.',
          },
          {
            name: '--oh-dark',
            default: '#2a2d33',
            description: 'Dark neutral.',
          },
          {
            name: '--oh-aurora',
            default: '#8b53a1',
            description: 'House accent (dusty violet).',
          },
        ]}
      />
      <Ledger
        kind='var'
        title='Derived, per colour'
        rows={[
          {
            name: '--oh-{color}-soft',
            description: 'color-mix(in oklab, colour 13%, surface).',
          },
          {
            name: '--oh-{color}-line',
            description: 'color-mix(in oklab, colour 40%, surface).',
          },
          {
            name: '--oh-{color}-ink',
            description:
              'color-mix(in oklab, colour 78%, ink). Plain ink for light, dark and secondary.',
          },
          {
            name: '--oh-{color}-hover',
            description: 'color-mix(in oklab, colour 86%, black).',
          },
          {
            name: '--oh-{color}-fg',
            description:
              'Text on a solid fill: #fff, or #1f2328 for light and warning.',
          },
          {
            name: '--oh-focus',
            description: 'Focus ring: primary mixed 70% with the surface.',
          },
          { name: '--oh-link', description: 'Link colour: --oh-primary-ink.' },
        ]}
      />
      <p className='text-subtle fs-sm'>
        In night shift, palette colours are mixed 16% towards white so they hold
        contrast on charcoal; <code>dark</code> and <code>light</code> become
        slightly lifted surfaces.
      </p>

      <H3 id='tokens-type'>Type</H3>
      <Ledger
        kind='var'
        rows={[
          {
            name: '--oh-font-sans',
            default: "'Ubuntu', system-ui, …",
            description: 'Body and UI text.',
          },
          {
            name: '--oh-font-mono',
            default: "'JetBrains Mono', ui-monospace, …",
            description: 'Code, stamps, IDs.',
          },
          {
            name: '--oh-font-hand',
            default: "'Patrick Hand', 'Segoe Print', …, cursive",
            description:
              'Handwriting: margin notes, .handwriting. Not bundled; load it yourself.',
          },
          {
            name: '--oh-font-size',
            default: '0.875rem',
            description: 'Base size (14px). 0.8125rem in compact density.',
          },
          {
            name: '--oh-line-height',
            default: '1.5',
            description: 'Body line height.',
          },
          {
            name: '--oh-text-xs',
            default: '0.75rem',
            description: 'Badges, eyebrows, tooltips.',
          },
          {
            name: '--oh-text-sm',
            default: '0.8125rem',
            description: 'Small print, breadcrumbs.',
          },
          {
            name: '--oh-text-base',
            default: '0.875rem',
            description: 'Same as the base size.',
          },
          {
            name: '--oh-text-md',
            default: '1rem',
            description: 'Lead text, modal titles.',
          },
          {
            name: '--oh-text-lg',
            default: '1.25rem',
            description: 'Section titles.',
          },
          {
            name: '--oh-text-xl',
            default: '1.5rem',
            description: 'Page titles.',
          },
          {
            name: '--oh-text-2xl',
            default: '2rem',
            description: 'Big numbers.',
          },
        ]}
      />

      <H3 id='tokens-space'>Space, shape and controls</H3>
      <Ledger
        kind='var'
        rows={[
          {
            name: '--oh-space-0 … 7',
            default: '0, .25, .5, .75, 1, 1.5, 2, 3rem',
            description:
              'Spacing scale. Utilities m-*, p-*, gap-* use the same steps.',
          },
          {
            name: '--oh-radius-sm',
            default: '3px',
            description: 'Badges, dropdown items, tooltips.',
          },
          {
            name: '--oh-radius',
            default: '5px',
            description: 'Buttons, cards, alerts.',
          },
          { name: '--oh-radius-lg', default: '8px', description: 'Modals.' },
          {
            name: '--oh-control-h-sm',
            default: '1.75rem',
            description: 'Small control height. 1.5rem compact.',
          },
          {
            name: '--oh-control-h',
            default: '2.25rem',
            description: 'Control height. 1.875rem compact.',
          },
          {
            name: '--oh-control-h-lg',
            default: '2.75rem',
            description: 'Large control height. 2.25rem compact.',
          },
          {
            name: '--oh-control-px',
            default: '0.75rem',
            description: 'Control inline padding. 0.5rem compact.',
          },
          {
            name: '--oh-gutter',
            default: '1rem',
            description: 'Grid gap and container padding. 0.75rem compact.',
          },
        ]}
      />

      <H3 id='tokens-elevation'>Elevation and motion</H3>
      <Ledger
        kind='var'
        rows={[
          {
            name: '--oh-elev-1',
            description:
              'The paper edge: 0 1px 0 rule-2. Cards, accordions, notes.',
          },
          {
            name: '--oh-elev-2',
            description: 'Edge plus a second offset sheet.',
          },
          {
            name: '--oh-elev-float',
            description:
              'Soft shadow for things that float: menus, modals, toasts.',
          },
          { name: '--oh-backdrop', description: 'Modal backdrop colour.' },
          {
            name: '--oh-ease-fast',
            default: '120ms ease-out',
            description: 'Hover and colour changes.',
          },
          {
            name: '--oh-ease',
            default: '180ms cubic-bezier(.2,.7,.3,1)',
            description: 'Opening and moving things.',
          },
        ]}
      />

      <H3 id='tokens-layout'>Layout and layers</H3>
      <Ledger
        kind='var'
        rows={[
          {
            name: '--oh-navbar-h',
            default: '3.5rem',
            description: 'Navbar height.',
          },
          {
            name: '--oh-sidebar-w',
            default: '15rem',
            description: 'Sidebar width in the app shell.',
          },
          {
            name: '--oh-z-sticky',
            default: '1020',
            description: '.sticky-top',
          },
          { name: '--oh-z-navbar', default: '1030', description: 'Navbar.' },
          {
            name: '--oh-z-dropdown',
            default: '1040',
            description: 'Dropdown menus.',
          },
          {
            name: '--oh-z-backdrop / -modal',
            default: '1050 / 1060',
            description: 'Reserved. Native dialogs use the top layer.',
          },
          {
            name: '--oh-z-toast',
            default: '1070',
            description: 'Toast stacks.',
          },
          { name: '--oh-z-tooltip', default: '1080', description: 'Tooltips.' },
        ]}
      />

      <H2 id='sass-reference'>Sass settings</H2>
      <Ledger
        kind='var'
        rows={[
          {
            name: '$enable-reset',
            type: 'bool',
            default: 'true',
            description: 'The small reset (box-sizing, margins, focus ring).',
          },
          {
            name: '$enable-utilities',
            type: 'bool',
            default: 'true',
            description: 'All utility classes. The largest single layer.',
          },
          {
            name: '$enable-dark-theme',
            type: 'bool',
            default: 'true',
            description: 'Night shift and auto themes.',
          },
          {
            name: '$enable-print',
            type: 'bool',
            default: 'true',
            description: 'Print styles.',
          },
          {
            name: '$colors',
            type: 'map',
            default: '()',
            description: 'Merged into the nine default colours.',
          },
          {
            name: '$paper, $surface, $surface-2, $sunken',
            type: 'color',
            description: 'Light surfaces.',
          },
          {
            name: '$ink, $ink-2, $ink-3, $rule, $rule-2',
            type: 'color',
            description: 'Light inks and borders.',
          },
          {
            name: '$night-*',
            type: 'color',
            description: 'The same values for night shift.',
          },
          {
            name: '$font-sans, $font-mono, $font-hand',
            type: 'list',
            description: 'Font stacks.',
          },
          {
            name: '$ruling, $margin-line',
            type: 'color',
            default: '#c9daec, #e3a2a2',
            description:
              'Notebook lines (with $night-ruling, $night-margin-line).',
          },
          {
            name: '$font-size-base, $line-height-base',
            type: 'number',
            default: '0.875rem, 1.5',
            description: 'Body text.',
          },
          {
            name: '$font-sizes, $spacers',
            type: 'map',
            description: 'Merged into the text-* and space-* scales.',
          },
          {
            name: '$radius-sm, $radius, $radius-lg',
            type: 'length',
            default: '3px, 5px, 8px',
            description: 'Corner radii.',
          },
          {
            name: '$control-height-sm, $control-height, $control-height-lg',
            type: 'length',
            description: 'Comfortable control heights.',
          },
          {
            name: '$transition-fast, $transition',
            type: 'transition',
            description: 'Motion tokens.',
          },
          {
            name: '$breakpoints',
            type: 'map',
            default: 'sm 576 · md 768 · lg 992 · xl 1200 · xxl 1400',
            description: 'Used by responsive utilities and grid classes.',
          },
          {
            name: '$container-max, $grid-columns, $gutter',
            type: '—',
            default: '1320px, 12, 1rem',
            description: 'Grid.',
          },
          {
            name: '$navbar-height, $sidebar-width',
            type: 'length',
            default: '3.5rem, 15rem',
            description: 'App shell.',
          },
          {
            name: '$z-layers',
            type: 'map',
            description: 'Merged into the z-index layers.',
          },
        ]}
      />
      <p>
        JavaScript can read the same lists from <code>officehut/tokens</code>:{' '}
        <code>COLORS</code>, <code>BREAKPOINTS</code>, <code>PLACEMENTS</code>,{' '}
        <code>THEMES</code> and the attribute names <code>THEME_ATTR</code> and{' '}
        <code>DENSITY_ATTR</code>. If you change breakpoints in Sass, those
        constants won't know.
      </p>
    </DocPage>
  );
}
