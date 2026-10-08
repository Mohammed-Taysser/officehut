import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function TablePage() {
  return (
    <DocPage
      title='Table'
      lead='Hairline rows, a quiet header, and figures in mono with tabular digits so columns of money line up. Or turn it into a page from an accounts book.'
      importLine="import { Table } from 'officehut/react';"
      cssFile='officehut/css/components/table.css'
    >
      <Example title='Basic' demo='table/Basic'>
        <p>
          <code>Table</code> is a styled <code>&lt;table&gt;</code> — you write
          the rows. Mark figure cells (and their header) with{' '}
          <code>className="num"</code>: end-aligned, mono, tabular.{' '}
          <code>responsive</code> wraps it so wide tables scroll sideways on
          phones.
        </p>
      </Example>

      <Example title='Striped, hover, compact, row tones' demo='table/Variants'>
        <p>
          <code>striped</code>, <code>hover</code> and <code>size="sm"</code>{' '}
          combine freely. Tint a row or a cell with{' '}
          <code>.table-{'{color}'}</code> — here, tickets past their SLA.
        </p>
      </Example>

      <Example title='Ledger' demo='table/Ledger' scene>
        <p>
          <code>ledger</code> rules the rows in exercise-book blue, draws a red
          double margin after the first column, separates money columns with
          hairlines, and gives the totals row the accountant's single rule above
          and double rule below.
        </p>
      </Example>

      <Example title='Sticky header' demo='table/Sticky'>
        <p>
          Give <code>responsive</code> a height (<code>responsive="16rem"</code>
          ) and add <code>stickyHeader</code> to keep the column names in view.
        </p>
      </Example>
      <Note title='Accessibility'>
        Give every table a <code>&lt;caption&gt;</code> (visible or{' '}
        <code>.visually-hidden</code>), use <code>&lt;th scope="col"&gt;</code>{' '}
        for headers and <code>scope="row"</code> for the first cell of a row
        when it names the row.
      </Note>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Table props'
        rows={[
          {
            name: 'striped / hover / bordered',
            type: 'boolean',
            description: 'Row styles.',
          },
          {
            name: 'size',
            type: "'sm' | 'md'",
            default: "'md'",
            description: 'Cell padding.',
          },
          {
            name: 'ledger',
            type: 'boolean',
            description: 'Accounts-book look.',
          },
          {
            name: 'stickyHeader',
            type: 'boolean',
            description: 'Header sticks while the wrapper scrolls.',
          },
          {
            name: 'responsive',
            type: 'boolean | string',
            description: 'Scroll wrapper; a length also caps its height.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          { name: '.table', description: 'Base.' },
          {
            name: '.num',
            description: 'Figure cell: end-aligned, mono, tabular-nums.',
          },
          {
            name: '.table-striped / -hover / -bordered / -sm',
            description: 'Modifiers.',
          },
          { name: '.table-ledger', description: 'Ruled ledger page.' },
          {
            name: '.table-total',
            description:
              'Totals row inside tbody (ledger): double-ruled figures.',
          },
          { name: '.table-{color}', description: 'Tint a row or cell.' },
          { name: '.table-sticky', description: 'Sticky thead.' },
          {
            name: '.table-responsive',
            description: 'Scroll wrapper; --_max-h caps the height.',
          },
        ]}
      />
    </DocPage>
  );
}
