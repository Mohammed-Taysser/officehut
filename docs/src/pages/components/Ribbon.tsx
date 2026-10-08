import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function RibbonPage() {
  return (
    <DocPage
      title='Ribbon'
      lead='A strip of masking tape stuck across the corner of a card, with torn ends. For one-word labels: Paid, Draft, New.'
      importLine="import { Ribbon } from 'officehut/react';"
      cssFile='officehut/css/components/ribbon.css'
    >
      <Example title='Basic' demo='ribbon/Basic' center>
        <p>
          Put the ribbon inside anything with <code>position: relative</code> —
          cards already are. The tape is trimmed flush with the corner by a
          small clipping box, so the card itself doesn't need{' '}
          <code>overflow: hidden</code>. In HTML the label goes in an inner
          element: <code>{'<div class="ribbon"><span>Paid</span></div>'}</code>.
        </p>
      </Example>

      <Example title='Placement' demo='ribbon/Placements'>
        <p>
          <code>end</code> corner (default), <code>start</code> corner, or a
          short piece across the <code>top</code> edge. Corners flip under{' '}
          <code>dir="rtl"</code>.
        </p>
      </Example>
      <Note title='Keep it to a word'>
        The corner only fits about eight characters. The ribbon is decorative,
        too — repeat important state in the content (a Badge, a column) so
        screen readers and printouts get it.
      </Note>

      <Example title='Invoice cards' demo='ribbon/Invoices' scene />

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Ribbon props'
        rows={[
          {
            name: 'color',
            type: 'Color',
            description: 'Tape tint. Default masking-tape beige.',
          },
          {
            name: 'placement',
            type: "'end' | 'start' | 'top'",
            default: "'end'",
            description: 'Where it sticks.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          {
            name: '.ribbon',
            description:
              'Clipping box in the end corner; the tape is its child element.',
          },
          {
            name: '.ribbon-start',
            description: 'Start corner (flips under RTL).',
          },
          {
            name: '.ribbon-top',
            description:
              'A single short piece of tape on the top edge — no inner element.',
          },
          { name: '.ribbon-{color}', description: 'Tint.' },
        ]}
      />
      <Ledger
        kind='var'
        title='Local custom properties'
        rows={[
          {
            name: '--_box',
            description: 'Size of the corner clipping box (5.75rem).',
          },
          { name: '--_tape / --_ink', description: 'Tape and text colour.' },
        ]}
      />
    </DocPage>
  );
}
