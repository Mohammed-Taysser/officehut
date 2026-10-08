import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function StatusPage() {
  return (
    <DocPage
      title='Status'
      lead='A coloured dot and a label. For presence, service health and anything that is in one of a few states.'
      importLine="import { Status } from 'officehut/react';"
      cssFile='officehut/css/components/status.css'
    >
      <Example title='Tones' demo='status/Basic' center>
        <p>No colour means neutral — offline, unknown, not started.</p>
      </Example>

      <Example title='Pulse' demo='status/Pulse' center>
        <p>
          <code>pulse</code> adds a soft ring for things that are live right
          now. Use it for one thing on the screen, not every row.
        </p>
      </Example>
      <Note title='Colour is not enough'>
        Always keep the text label — the dot alone fails for colour-blind users.
        If space forces a dot on its own, give it an <code>aria-label</code> (it
        becomes <code>role="img"</code>) and a tooltip.
      </Note>

      <Example title='Sizes' demo='status/Sizes' />

      <Example title='Team roster' demo='status/Roster' scene center />

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Status props'
        rows={[
          {
            name: 'color',
            type: 'Color',
            description: 'Dot colour. Default neutral grey.',
          },
          { name: 'pulse', type: 'boolean', description: 'Animated ring.' },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Text and dot size.',
          },
          { name: 'children', type: 'ReactNode', description: 'Label.' },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          { name: '.status', description: 'Wrapper.' },
          { name: '.status-dot', description: 'The dot (aria-hidden).' },
          { name: '.status-{color}', description: 'Tone.' },
          {
            name: '.status-pulse',
            description: 'Pulsing ring (uses the oh-pulse keyframes).',
          },
          { name: '.status-sm / .status-lg', description: 'Sizes.' },
        ]}
      />
    </DocPage>
  );
}
