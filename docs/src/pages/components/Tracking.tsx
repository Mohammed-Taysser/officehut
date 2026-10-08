import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function TrackingPage() {
  return (
    <DocPage
      title='Tracking'
      lead='A strip of blocks, one per day or check — an uptime bar, or a punch card. Each block carries its own tooltip.'
      importLine="import { Tracking } from 'officehut/react';"
      cssFile='officehut/css/components/tracking.css'
    >
      <Example title='Uptime' demo='tracking/Basic' center>
        <p>
          <code>items</code> is a list of <code>{'{ status, label }'}</code>.{' '}
          <code>status</code> is any palette colour or <code>'empty'</code> for
          no data; <code>label</code> is the tooltip. <code>startLabel</code> /{' '}
          <code>endLabel</code> caption the ends.
        </p>
      </Example>

      <Example title='Punch card' demo='tracking/Attendance'>
        <p>
          <code>size="sm"</code> fits in a table row; <code>lg</code> for a
          single headline strip. Empty slots look punched out.
        </p>
      </Example>
      <Note title='Accessibility'>
        The strip is a list named by <code>aria-label</code>; each block is a
        list item with the same text in <code>title</code> (mouse tooltip) and{' '}
        <code>aria-label</code> (screen readers). For 90 blocks that is a lot to
        listen to — put the summary ("99.89% uptime") in text next to the strip.
      </Note>

      <Example title='Status page' demo='tracking/StatusPage' scene center />

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Tracking props'
        rows={[
          {
            name: 'items',
            type: "{ status: Color | 'empty'; label: string }[]",
            description: 'One per block.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Strip height.',
          },
          {
            name: 'startLabel / endLabel',
            type: 'ReactNode',
            description: 'Caption under the ends.',
          },
          {
            name: 'aria-label',
            type: 'string',
            description: 'Names the strip.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          { name: '.tracking', description: 'The strip (use <ul>).' },
          {
            name: '.tracking-block',
            description: 'One block; no tone = empty slot.',
          },
          { name: '.tracking-block-{color}', description: 'Block colour.' },
          { name: '.tracking-sm / .tracking-lg', description: 'Heights.' },
          {
            name: '.tracking-legend',
            description: 'Caption row: two spans with a dotted rule between.',
          },
        ]}
      />
    </DocPage>
  );
}
