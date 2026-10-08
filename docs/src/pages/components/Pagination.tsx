import { CodeBlock } from '../../components/CodeBlock';
import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function PaginationPage() {
  return (
    <DocPage
      title='Pagination'
      lead='Page numbers set like the foot of a textbook page, in mono figures with the current one circled in pen. For table footers they join up into ledger cells.'
      importLine="import { Pagination, paginationRange } from 'officehut/react';"
      cssFile='officehut/css/components/pagination.css'
    >
      <Example title='Basic' demo='nav/PaginationBasic'>
        <p>
          Pass the number of pages as <code>total</code> and keep the page in
          state. The first and last pages always show, with{' '}
          <code>siblings</code> either side of the current one (default 1), and
          an ellipsis for the rest. The control keeps the same width as you page
          through, so the buttons don't move under the mouse.{' '}
          <code>.pagination-bar</code> and <code>.pagination-info</code> lay out
          the usual "Showing 41–60 of 233" line beside it.
        </p>
      </Example>

      <Example title='Styles & sizes' demo='nav/PaginationVariants'>
        <p>
          <code>boxed</code> joins the numbers into cells and marks the current
          one with a double rule, like a ledger total.{' '}
          <code>variant="compact"</code> swaps the numbers for a mono "page 3 of
          12". Change the wording with <code>summary</code>. Sizes:{' '}
          <code>sm</code>, <code>md</code>, <code>lg</code>.
        </p>
      </Example>

      <Example title='Links in the URL' demo='nav/PaginationLinks' center>
        <p>
          With <code>getHref</code> every page becomes a real link, so the page
          number lives in the URL and back and forward work. Add{' '}
          <code>linkAs</code> for your router's link; it receives{' '}
          <code>href</code>. Edge links lose their <code>href</code> and get{' '}
          <code>aria-disabled</code>.
        </p>
      </Example>

      <H2 id='range-helper'>The range helper</H2>
      <p>
        <code>paginationRange(page, total, siblings)</code> is a pure function
        that the component uses. Call it when you build your own markup, e.g. in
        a server template:
      </p>
      <CodeBlock
        lang='js'
        label='range.js'
        code={`import { paginationRange } from 'officehut/react';

paginationRange(1, 12); // [1, 2, 3, 4, 5, 'ellipsis', 12]
paginationRange(6, 12); // [1, 'ellipsis', 5, 6, 7, 'ellipsis', 12]
paginationRange(6, 12, 0); // [1, 'ellipsis', 6, 'ellipsis', 12]`}
      />
      <Note title='Accessibility' tone='blue'>
        The list sits in a <code>&lt;nav&gt;</code> named by <code>label</code>.
        Give each pagination on a page its own label. Numbers are read as "Page
        3" (<code>pageLabel</code>), the current one has{' '}
        <code>aria-current="page"</code>, and the ellipsis is hidden from screen
        readers.
      </Note>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Pagination props'
        rows={[
          { name: 'total', type: 'number', description: 'Number of pages.' },
          {
            name: 'page / defaultPage / onChange',
            type: 'number / fn',
            default: '1',
            description: 'Current page (1-based), controlled or not.',
          },
          {
            name: 'siblings',
            type: 'number',
            default: '1',
            description: 'Pages either side of the current one.',
          },
          {
            name: 'variant',
            type: "'numbers' | 'compact'",
            default: "'numbers'",
            description: 'Numbers, or ‹ page 3 of 12 ›.',
          },
          {
            name: 'boxed',
            type: 'boolean',
            description: 'Joined ledger cells.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Cell height and type size.',
          },
          {
            name: 'getHref',
            type: '(page) => string',
            description: 'Render links instead of buttons.',
          },
          {
            name: 'linkAs',
            type: 'ElementType',
            default: "'a'",
            description: 'Router link component. Receives href.',
          },
          {
            name: 'label',
            type: 'string',
            default: "'Pagination'",
            description: 'aria-label of the <nav>.',
          },
          {
            name: 'prevLabel / nextLabel',
            type: 'ReactNode',
            default: "'Previous' / 'Next'",
            description: 'Edge button text.',
          },
          {
            name: 'pageLabel',
            type: '(page) => string',
            default: '`Page ${n}`',
            description: 'Accessible name of a number.',
          },
          {
            name: 'summary',
            type: '(page, total) => ReactNode',
            description: 'Compact text.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          { name: '.pagination', description: 'The <ul>.' },
          {
            name: '.page-link',
            description:
              'A number or edge button. Current: aria-current="page" or .active.',
          },
          {
            name: '.page-prev / .page-next',
            description: 'Edge buttons with a chevron (mirrored in RTL).',
          },
          { name: '.page-ellipsis', description: 'The gap marker.' },
          {
            name: '.pagination-summary',
            description: '"page 3 of 12" — wrap the number in <strong>.',
          },
          { name: '.pagination-boxed', description: 'Joined ledger cells.' },
          { name: '.pagination-sm / .pagination-lg', description: 'Sizes.' },
          {
            name: '.pagination-bar / .pagination-info',
            description: 'Info line + pagination row.',
          },
        ]}
      />
      <Ledger
        kind='var'
        title='Local custom properties'
        rows={[
          { name: '--_h', description: 'Cell height.' },
          {
            name: '--_pen',
            description:
              'Colour of the ring / double rule. Defaults to --oh-primary-ink.',
          },
        ]}
      />
    </DocPage>
  );
}
