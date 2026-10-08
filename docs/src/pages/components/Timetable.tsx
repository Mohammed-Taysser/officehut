import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function TimetablePage() {
  return (
    <DocPage
      title='Timetable'
      lead='The weekly grid from the inside cover of a school planner: days across, periods down, a red margin after the times. At work it is a shift rota, a room booking sheet or a training week.'
      importLine="import { Timetable } from 'officehut/react';"
      cssFile='officehut/css/components/timetable.css'
    >
      <Example
        title='Front-desk rota'
        demo='school/timetable/Rota'
        anatomy={[
          { selector: '.timetable-time' },
          { selector: '.is-today' },
          { selector: '.lesson-title' },
          { selector: '.lesson-meta' },
          { selector: '.lesson-free' },
        ]}
      >
        <p>
          Give it <code>days</code> (columns), <code>slots</code> (rows, usually
          start times) and <code>entries</code>. Each entry names its{' '}
          <code>day</code> and <code>slot</code> by label or index;{' '}
          <code>span</code> lets a shift cover several slots. <code>today</code>{' '}
          underlines a column with a highlighter, and <code>free</code> draws a
          hatched, crossed-out box.
        </p>
      </Example>

      <Example title='Meeting rooms' demo='school/timetable/Rooms'>
        <p>
          Columns don&apos;t have to be days. Here they are rooms and the rows
          are hours. An entry&apos;s <code>color</code> takes any palette tone
          and tints the box with a stripe down its start edge.
        </p>
      </Example>
      <Note title='Accessibility'>
        It is a real <code>&lt;table&gt;</code>: day headers are column headers,
        times are row headers, and a long shift is a <code>rowspan</code>, so
        screen readers announce &ldquo;Tue, 12:00, Cover needed&rdquo;. Pass a{' '}
        <code>caption</code> — it is visually hidden but names the table. The
        current column gets <code>aria-current=&quot;date&quot;</code>. Colour
        is not announced, so put the meaning in <code>title</code> or{' '}
        <code>meta</code>.
      </Note>

      <Example title='Onboarding week' demo='school/timetable/Training' scene>
        <p>
          A new hire&apos;s first week inside a card, with free study periods
          hatched out.
        </p>
      </Example>
      <Note title='Narrow screens' tone='blue'>
        The table keeps a minimum width of 36rem and scrolls sideways inside{' '}
        <code>.timetable-wrap</code> rather than squeezing the boxes. Entries
        that overlap the same cell aren&apos;t supported: the later one wins.
      </Note>

      <Example title='Plain HTML' demo='school/timetable/Html'>
        <p>
          Without React, write the table yourself: <code>.timetable</code>{' '}
          inside <code>.timetable-wrap</code>, <code>th.timetable-time</code>{' '}
          for the times, and a <code>.lesson</code> box in each booked cell. A
          two-hour booking is a <code>rowspan</code>; the cell underneath is
          simply left out.
        </p>
      </Example>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Timetable props'
        rows={[
          { name: 'days', type: 'string[]', description: 'Column headers.' },
          {
            name: 'slots',
            type: 'string[]',
            description: 'Row headers, usually start times.',
          },
          {
            name: 'entries',
            type: 'TimetableEntry[]',
            description: 'What goes in the grid (below).',
          },
          {
            name: 'today',
            type: 'number | string',
            description: 'Column to highlight, by index or label.',
          },
          {
            name: 'caption',
            type: 'string',
            description: 'Visually hidden table caption.',
          },
        ]}
      />
      <Ledger
        title='TimetableEntry'
        rows={[
          {
            name: 'day / slot',
            type: 'number | string',
            description:
              'Column and row, by index or label. Unknown labels are skipped.',
          },
          {
            name: 'span',
            type: 'number',
            default: '1',
            description: 'Rows covered; clipped at the last slot.',
          },
          { name: 'title', type: 'ReactNode', description: 'Bold first line.' },
          {
            name: 'meta',
            type: 'ReactNode',
            description: 'Small second line: who, where.',
          },
          { name: 'color', type: 'Color', description: 'Palette tone.' },
          {
            name: 'free',
            type: 'boolean',
            description: 'Hatched “free period” box.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          {
            name: '.timetable-wrap',
            description: 'Paper and horizontal scroll.',
          },
          { name: '.timetable', description: 'The table.' },
          {
            name: '.timetable-time',
            description: 'Time column, with the red margin line.',
          },
          { name: '.is-today', description: 'Highlighted column header.' },
          { name: '.lesson', description: 'A booked box inside a cell.' },
          { name: '.lesson-{color}', description: 'Tone.' },
          {
            name: '.lesson-title / .lesson-meta',
            description: 'Lines inside the box.',
          },
          { name: '.lesson-free', description: 'Hatched free period.' },
        ]}
      />
      <Ledger
        kind='var'
        title='Custom properties'
        rows={[
          {
            name: '--_slot',
            default: '3rem',
            description: 'Local: minimum row height. Set it on .timetable.',
          },
        ]}
      />
      <p className='text-muted fs-sm'>
        <code>timetableGrid(days, slots, entries)</code> is exported too: it
        returns the resolved grid with spans, if you want to draw the rota your
        own way.
      </p>
    </DocPage>
  );
}
