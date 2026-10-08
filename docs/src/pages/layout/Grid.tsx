import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function GridPage() {
  return (
    <DocPage
      title='Grid & stacks'
      lead='Three tools, from most to least structured: a 12-column row/col grid with the familiar names, a CSS grid helper for equal tiles, and stacks for laying things out in one direction.'
      cssFile='officehut/css/core.css'
    >
      <H2 id='which-one'>Which one to reach for</H2>
      <ul>
        <li>
          <strong>Equal tiles</strong> (room cards, KPI boxes, a team
          directory): <code>.grid.cols-*</code> or <code>.grid-auto</code>.
        </li>
        <li>
          <strong>Uneven columns</strong> (invoice lines and totals, a form and
          its help text): <code>.row</code> and <code>.col-*</code>.
        </li>
        <li>
          <strong>One line or one column of things</strong> (a toolbar, a card
          body): <code>.hstack</code>, <code>.stack</code>,{' '}
          <code>.cluster</code>.
        </li>
      </ul>

      <Example title='Rows and columns' demo='grid/Row'>
        <p>
          <code>.col</code> shares the space equally,{' '}
          <code>.col-{'{1-12}'}</code> takes a fixed share of twelve, and{' '}
          <code>.col-auto</code> fits its content. Gutters come from{' '}
          <code>--oh-gutter</code>.
        </p>
      </Example>

      <Example title='Responsive columns' demo='grid/Responsive'>
        <p>
          Add a breakpoint to any column class: <code>.col-md-6</code> applies
          from 768px up. Columns are full width below their breakpoint.{' '}
          <code>.g-3</code> sets both gutters to a spacing step; use{' '}
          <code>.gx-*</code> or <code>.gy-*</code> for one axis. Breakpoints
          follow the window, not the preview, so resize the browser to see them
          wrap.
        </p>
      </Example>

      <Example title='Offsets' demo='grid/Offset'>
        <p>
          <code>.offset-{'{n}'}</code> pushes a column from the start side. It
          flips in RTL.
        </p>
      </Example>

      <Example title='CSS grid tiles' demo='grid/CssGrid'>
        <p>
          <code>.grid</code> with <code>.cols-{'{1-6}'}</code> (and responsive{' '}
          <code>.cols-md-3</code> etc.) makes equal columns with a gap and no
          negative margins. Tiles can span with <code>.span-{'{1-4}'}</code> or{' '}
          <code>.span-full</code>.
        </p>
      </Example>

      <Example title='Auto-fill' demo='grid/Auto'>
        <p>
          <code>.grid-auto</code> fits as many columns as there is room for,
          each at least <code>--min</code> wide (16rem by default). No
          breakpoints needed.
        </p>
      </Example>

      <Example title='Stacks' demo='grid/Stacks'>
        <p>
          <code>.stack</code> is a column with a 1rem gap, <code>.hstack</code>{' '}
          a centred row with a 0.5rem gap, <code>.cluster</code> a row that
          wraps. Change the gap with any <code>.gap-*</code> utility. Combine
          with <code>.ms-auto</code> to push the last item to the end.
        </p>
      </Example>
      <Note title='Gaps, not margins'>
        Stacks and grids space their children with <code>gap</code>, so you
        don&apos;t need margin on the children and nothing collapses or doubles
        up. The reset removes default margins on headings and paragraphs for the
        same reason.
      </Note>

      <H2 id='containers'>Containers</H2>
      <p>
        <code>.container</code> centres content up to 1320px with gutter
        padding. <code>.container-fluid</code> is full width with the same
        padding. <code>.container-narrow</code> caps at 46rem, which suits
        settings pages and long forms.
      </p>

      <H2 id='reference'>Reference</H2>
      <Ledger
        kind='class'
        title='Flex grid'
        rows={[
          {
            name: '.row',
            description:
              'Wrapping flex row with negative inline margins for the gutters.',
          },
          { name: '.col / .col-{bp}', description: 'Equal share.' },
          {
            name: '.col-{1-12} / .col-{bp}-{1-12}',
            description: 'Fixed share of 12.',
          },
          {
            name: '.col-auto / .col-{bp}-auto',
            description: 'Width of the content.',
          },
          {
            name: '.offset-{0-11} / .offset-{bp}-{n}',
            description: 'Start-side offset.',
          },
          {
            name: '.g-{0-7} / .gx-* / .gy-*',
            description: 'Gutters from the spacing scale.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='CSS grid and stacks'
        rows={[
          {
            name: '.grid',
            description:
              'Grid with --oh-gutter gap. One column until you add cols-*.',
          },
          {
            name: '.cols-{1-6} / .cols-{bp}-{1-6}',
            description: 'Number of equal columns.',
          },
          {
            name: '.span-{1-4} / .span-full',
            description: 'Tile spans; responsive variants too.',
          },
          {
            name: '.grid-auto',
            description: 'Auto-fill columns at least var(--min, 16rem) wide.',
          },
          { name: '.stack', description: 'Column, gap 1rem.' },
          { name: '.hstack', description: 'Row, centred, gap 0.5rem.' },
          {
            name: '.cluster',
            description: 'Wrapping row, centred, gap 0.5rem.',
          },
          {
            name: '.container / -fluid / -narrow',
            description: '1320px, full width, 46rem.',
          },
        ]}
      />
      <Ledger
        kind='var'
        rows={[
          {
            name: '--oh-gutter',
            default: '1rem',
            description:
              'Grid gaps and container padding. 0.75rem in compact density.',
          },
          {
            name: '--min',
            default: '16rem',
            description: 'Minimum tile width for .grid-auto.',
          },
          {
            name: 'Breakpoints',
            default: 'sm 576 · md 768 · lg 992 · xl 1200 · xxl 1400',
            description: 'Min-width. Change them with $breakpoints in Sass.',
          },
        ]}
      />
    </DocPage>
  );
}
