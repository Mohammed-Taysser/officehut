import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';

export default function DividerPage() {
  return (
    <DocPage
      title='Divider'
      lead='A hairline between sections, with an optional label in small capitals. The dotted one is a perforation — for the bit people tear off.'
      importLine="import { Divider } from 'officehut/react';"
      cssFile='officehut/css/components/divider.css'
    >
      <Example title='Labels' demo='divider/Basic'>
        <p>
          <code>label</code> sits in the middle by default; <code>align</code>{' '}
          moves it to the start or end. A string label is also the separator's
          accessible name.
        </p>
      </Example>

      <Example
        title='Dashed and perforated'
        demo='divider/Perforated'
        scene
        center
      >
        <p>
          <code>variant="dotted"</code> reads as "detach here" — payment slips,
          tear-off stubs. <code>dashed</code> suits drafts and optional
          sections.
        </p>
      </Example>

      <Example title='Vertical' demo='divider/Vertical' center>
        <p>
          <code>vertical</code> separates groups in a toolbar. It stretches to
          the height of the row.
        </p>
      </Example>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Divider props'
        rows={[
          {
            name: 'label',
            type: 'ReactNode',
            description: 'Text on the line.',
          },
          {
            name: 'align',
            type: "'start' | 'center' | 'end'",
            default: "'center'",
            description: 'Label position.',
          },
          {
            name: 'variant',
            type: "'solid' | 'dashed' | 'dotted' | 'strong'",
            default: "'solid'",
            description: 'Line style.',
          },
          {
            name: 'vertical',
            type: 'boolean',
            description: 'Vertical rule (aria-orientation).',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          {
            name: '.divider',
            description:
              'Line; text inside becomes the label. Add role="separator".',
          },
          { name: '.divider-start / -end', description: 'Label position.' },
          {
            name: '.divider-dashed / -dotted / -strong',
            description: 'Line styles.',
          },
          { name: '.divider-vertical', description: 'Vertical rule.' },
        ]}
      />
    </DocPage>
  );
}
