import { Link } from 'react-router';
import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function UtilitiesPage() {
  return (
    <DocPage
      title='Utilities'
      lead='Single-purpose classes for the small adjustments every screen needs: a margin here, a flex row there, a muted line of text. They use logical properties and the same spacing scale as the components.'
      cssFile='officehut/css/core.css'
    >
      <p>
        Utilities win over component styles (they are <code>!important</code>),
        so <code>class=&quot;card p-0&quot;</code> does what it says. If you
        write a block of six utilities on the same element twice, that is a sign
        it wants to be a small class of its own.
      </p>

      <Example title='Spacing' demo='utilities/Spacing'>
        <p>
          <code>m</code> or <code>p</code>, then an optional side, then a step
          from 0 to 7: <code>.mt-3</code>, <code>.px-4</code>,{' '}
          <code>.ms-auto</code>. Steps are 0.25, 0.5, 0.75, 1, 1.5, 2 and 3rem.
          Every class has responsive versions such as <code>.p-md-5</code>.
        </p>
      </Example>
      <Ledger
        kind='class'
        title='Sides'
        rows={[
          { name: '.m-* / .p-*', description: 'All sides.' },
          {
            name: '.mx-* / .px-*',
            description: 'Inline sides (left and right in LTR).',
          },
          {
            name: '.my-* / .py-*',
            description: 'Block sides (top and bottom).',
          },
          {
            name: '.mt-* / .mb-* / .pt-* / .pb-*',
            description: 'Top or bottom.',
          },
          {
            name: '.ms-* / .me-* / .ps-* / .pe-*',
            description: 'Inline start or end. Flips in RTL.',
          },
          {
            name: '.m-auto / .ms-auto / .me-auto / .mx-auto',
            description: 'Push things apart or centre them.',
          },
          {
            name: '.gap-{0-7}',
            description:
              'Gap for flex and grid; also sets the gap of .stack, .hstack and .cluster.',
          },
        ]}
      />

      <Example title='Display and flex' demo='utilities/Flex'>
        <p>
          <code>.d-flex</code>, <code>.align-items-center</code>,{' '}
          <code>.justify-content-between</code> and friends, all with responsive
          versions. For whole-page layout, prefer the{' '}
          <Link to='/docs/layout/grid'>grid and stacks</Link>.
        </p>
      </Example>

      <Example title='Colour' demo='utilities/Colors'>
        <p>
          <code>.text-{'{color}'}</code> uses the readable ink of a palette
          colour. <code>.bg-{'{color}'}</code> is the solid fill with matching
          text, <code>.bg-{'{color}'}-soft</code> the tint. Surfaces have their
          own: <code>.bg-paper</code>, <code>.bg-surface</code>,{' '}
          <code>.bg-sunken</code>.
        </p>
      </Example>

      <Example title='Paper' demo='utilities/Paper'>
        <p>
          A few desk materials as backgrounds: ruled lines and graph paper.
          Elevation is an edge, not a blur: <code>.elev-1</code> is the 1px
          darker bottom edge every card has.
        </p>
      </Example>

      <Example title='Visibility and print' demo='utilities/Visibility'>
        <p>
          Hide by breakpoint with <code>.d-none .d-md-inline</code>.{' '}
          <code>.visually-hidden</code> keeps text for screen readers only;{' '}
          <code>.visually-hidden-focusable</code> shows it again on focus, which
          is how skip links work. <code>.d-print-none</code> keeps buttons and
          filters off paper.
        </p>
      </Example>
      <Note title='Hidden is not the same as gone'>
        <code>.d-none</code> hides from everyone, including screen readers.{' '}
        <code>.visually-hidden</code> hides from the eye only. Pick the one that
        matches who the text is for.
      </Note>

      <H2 id='reference'>Reference</H2>
      <Ledger
        kind='class'
        title='Layout'
        rows={[
          {
            name: '.d-{none|inline|inline-block|block|flex|inline-flex|grid|contents}',
            description: 'Display, with .d-{bp}-* versions.',
          },
          {
            name: '.flex-row / -column / -wrap / -nowrap',
            description: 'Direction and wrapping, responsive.',
          },
          {
            name: '.flex-1 / .flex-grow-1 / .flex-shrink-0',
            description: 'Sizing flex children.',
          },
          {
            name: '.align-items-{start|center|end|baseline|stretch}',
            description: 'Cross-axis alignment, responsive.',
          },
          { name: '.align-self-{start|center|end}', description: 'One child.' },
          {
            name: '.justify-content-{start|center|end|between|around}',
            description: 'Main-axis alignment, responsive.',
          },
          { name: '.place-items-center', description: 'Centre in a grid.' },
          {
            name: '.w-{25|50|75|100} / .h-* / .w-auto / .mw-100 / .min-w-0',
            description: 'Sizing. min-w-0 lets text truncate inside flex rows.',
          },
          {
            name: '.position-{static|relative|absolute|fixed|sticky} / .sticky-top',
            description: 'Positioning.',
          },
          {
            name: '.overflow-hidden / .overflow-auto',
            description: 'Overflow.',
          },
          {
            name: '.ratio',
            description: 'Aspect box; set --ratio (default 16 / 9).',
          },
          {
            name: '.object-cover',
            description: 'object-fit: cover for images.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Colour and surface'
        rows={[
          { name: '.text-{color}', description: 'Palette ink.' },
          {
            name: '.bg-{color} / .bg-{color}-soft',
            description: 'Solid fill with readable text / tint.',
          },
          {
            name: '.border-{color}',
            description: 'Tinted border colour; pair with .border.',
          },
          {
            name: '.bg-paper / .bg-surface / .bg-sunken / .bg-transparent',
            description: 'Surfaces.',
          },
          {
            name: '.bg-ruled / .bg-grid',
            description: 'Ruled lines (1.5rem) / graph paper (1rem).',
          },
          {
            name: '.elev-0 / -1 / -2 / -float',
            description: 'Edges and shadows.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Borders and shape'
        rows={[
          {
            name: '.border / .border-0',
            description: 'Hairline border on all sides, or none.',
          },
          {
            name: '.border-top / -bottom / -start / -end',
            description: 'One side.',
          },
          {
            name: '.border-dashed',
            description: 'Dashed, for drop zones and placeholders.',
          },
          {
            name: '.rounded / -sm / -lg / -pill / -circle / -0',
            description: 'Corner radius.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Interaction and accessibility'
        rows={[
          {
            name: '.visually-hidden / .sr-only',
            description: 'For screen readers only.',
          },
          {
            name: '.visually-hidden-focusable',
            description: 'Hidden until focused. Skip links.',
          },
          {
            name: '.stretched-link',
            description:
              'Makes the nearest positioned ancestor clickable through this link.',
          },
          {
            name: '.cursor-pointer / .user-select-none / .pe-none',
            description: 'Pointer behaviour.',
          },
          { name: '.d-print-none', description: 'Hidden when printing.' },
        ]}
      />
      <p>
        Text utilities are listed on the{' '}
        <Link to='/docs/layout/typography'>Typography</Link> page. To drop all
        utilities from your build, set <code>$enable-utilities: false</code> in
        Sass.
      </p>
    </DocPage>
  );
}
