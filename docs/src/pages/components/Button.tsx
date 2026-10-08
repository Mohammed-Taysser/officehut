import { Button, COLORS } from 'officehut/react';
import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';
import { Playground } from '../../components/Playground';

export default function ButtonPage() {
  return (
    <DocPage
      title='Button'
      lead='Buttons press down like a key — the bottom edge disappears when you click. Colour is chosen with a tone, and the style (solid, soft, outline, ghost, link) works with any tone.'
      importLine="import { Button, ButtonList } from 'officehut/react';"
      cssFile='officehut/css/components/button.css'
    >
      <H2 id='switchboard'>Switchboard</H2>
      <p>
        Flip the switches; the JSX and HTML underneath are rebuilt from the live
        button.
      </p>
      <Playground
        component='Button'
        childrenProp='children'
        controls={{
          children: { type: 'text', default: 'Approve', label: 'label' },
          color: { type: 'select', options: ['', ...COLORS], default: '' },
          variant: {
            type: 'select',
            options: ['solid', 'soft', 'outline', 'ghost', 'link'],
            default: 'solid',
          },
          size: { type: 'select', options: ['md', 'sm', 'lg'], default: 'md' },
          pill: { type: 'toggle' },
          loading: { type: 'toggle' },
          disabled: { type: 'toggle' },
        }}
        render={({ children, color, variant, size, ...flags }) => (
          <Button
            color={(color || undefined) as never}
            variant={variant as never}
            size={size as never}
            pill={flags.pill as boolean}
            loading={flags.loading as boolean}
            disabled={flags.disabled as boolean}
          >
            {children as string}
          </Button>
        )}
      />

      <Example title='Styles' demo='button/Variants'>
        <p>
          A plain <code>.btn</code> is a neutral sheet of paper — the right
          default for most secondary actions. Add a tone (
          <code>.btn-primary</code>) for the main action on a screen, and a
          style modifier (<code>.btn-soft</code>, <code>.btn-outline</code>,{' '}
          <code>.btn-ghost</code>, <code>.btn-link</code>) to tone it down.
        </p>
      </Example>

      <Example title='Tones' demo='button/Colors' center>
        <p>
          Every palette colour works with every style. <code>aurora</code> is
          the house accent.
        </p>
      </Example>

      <Example title='With icons' demo='button/Icons' center>
        <p>
          Pass any SVG to <code>icon</code> / <code>iconEnd</code>; it is sized
          to <code>1.15em</code>. Icon-only buttons are square with{' '}
          <code>iconOnly</code> (<code>.btn-icon</code>).
        </p>
      </Example>
      <Note title='Accessibility'>
        Icon-only buttons have no text, so always give them an{' '}
        <code>aria-label</code>. Pair with a{' '}
        <a href='/docs/components/tooltip'>Tooltip</a> if sighted users need the
        hint too.
      </Note>

      <Example title='Sizes & shapes' demo='button/Sizes' />

      <Example title='States' demo='button/States' center>
        <p>
          <code>loading</code> keeps the width, draws a spinner and sets{' '}
          <code>aria-busy</code>. Toggle buttons use <code>aria-pressed</code> —
          the pressed look comes for free.
        </p>
      </Example>

      <Example title='Groups' demo='button/Groups' center>
        <p>
          <code>ButtonList</code> spaces buttons out; add <code>attached</code>{' '}
          to join them into a segmented group (<code>.btn-group</code>).
        </p>
      </Example>

      <Example title='Links & router links' demo='button/AsLink' center>
        <p>
          Give it <code>href</code> and it renders an <code>&lt;a&gt;</code>.
          Use <code>as</code> to render any component — props are typed from the
          component you pass.
        </p>
      </Example>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Button props'
        rows={[
          {
            name: 'color',
            type: 'Color',
            description: 'Palette tone. Empty = neutral paper button.',
          },
          {
            name: 'variant',
            type: "'solid' | 'soft' | 'outline' | 'ghost' | 'link'",
            default: "'solid'",
            description: 'How strongly the tone is applied.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Height follows the density tokens.',
          },
          {
            name: 'pill / square / block',
            type: 'boolean',
            description: 'Shape and width modifiers.',
          },
          {
            name: 'icon / iconEnd',
            type: 'ReactNode',
            description: 'Rendered before / after the label.',
          },
          {
            name: 'iconOnly',
            type: 'boolean',
            description: 'Square icon button. Needs aria-label.',
          },
          {
            name: 'loading',
            type: 'boolean',
            description: 'Spinner, disabled, aria-busy.',
          },
          {
            name: 'as',
            type: 'ElementType',
            description:
              "Render as another element or component, e.g. a router Link. Defaults to 'a' when href is set.",
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          { name: '.btn', description: 'Base button.' },
          {
            name: '.btn-{color}',
            description:
              'Tone: primary, secondary, success, info, warning, danger, light, dark, aurora.',
          },
          {
            name: '.btn-soft / -outline / -ghost / -link',
            description: 'Style modifiers; combine with a tone.',
          },
          { name: '.btn-sm / .btn-lg', description: 'Sizes.' },
          {
            name: '.btn-pill / .btn-square / .btn-icon / .btn-block',
            description: 'Shapes.',
          },
          { name: '.btn.is-loading', description: 'Spinner state.' },
          {
            name: '.btn-list / .btn-group',
            description: 'Spaced row / attached group.',
          },
          {
            name: '.btn-close',
            description: 'The × used by alerts, modals and toasts.',
          },
        ]}
      />
      <Ledger
        kind='var'
        title='Local custom properties'
        rows={[
          { name: '--_h', description: 'Height. Defaults to --oh-control-h.' },
          {
            name: '--_bg / --_fg / --_bd',
            description: 'Background, text and border.',
          },
          {
            name: '--_edge',
            description: 'The 1px bottom edge that vanishes when pressed.',
          },
          { name: '--_bg-hover', description: 'Hover background.' },
        ]}
      />
    </DocPage>
  );
}
