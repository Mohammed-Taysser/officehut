import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function ChipPage() {
  return (
    <DocPage
      title='Chip'
      lead='Filter tokens like "Status: Overdue ×". Removable, toggleable, or just a quiet tag.'
      importLine="import { Chip, ChipList } from 'officehut/react';"
      cssFile='officehut/css/components/chip.css'
    >
      <Example title='Tones and sizes' demo='chip/Basic'>
        <p>
          Neutral paper by default; <code>color</code> gives a soft tint.{' '}
          <code>label</code> adds a muted prefix for key/value filters.
        </p>
      </Example>

      <Example title='Removable filters' demo='chip/Filters'>
        <p>
          <code>onRemove</code> adds a × button named "Remove <em>text</em>"
          (override with <code>removeLabel</code>). Without React, put{' '}
          <code>data-oh-dismiss</code> on the close button and the vanilla data
          API removes the chip:{' '}
          <code>
            {
              '<span class="chip">Q3 <button class="btn-close" data-oh-dismiss aria-label="Remove Q3"></button></span>'
            }
          </code>
        </p>
      </Example>
      <Note title='Focus after removing'>
        When a chip disappears its button goes with it, and focus falls back to
        the page. Move focus to the next chip (or the filter input) yourself if
        people remove several in a row.
      </Note>

      <Example title='Toggle chips' demo='chip/Toggle'>
        <p>
          Render <code>as="button"</code> with <code>aria-pressed</code> for
          on/off filters. Don't combine with <code>onRemove</code> — a button
          can't hold another button.
        </p>
      </Example>

      <Example title='Filter bar' demo='chip/Toolbar' scene center />

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Chip props'
        rows={[
          { name: 'color', type: 'Color', description: 'Soft tint.' },
          {
            name: 'label',
            type: 'ReactNode',
            description: 'Muted prefix, rendered as "label:".',
          },
          { name: 'icon', type: 'ReactNode', description: 'Before the text.' },
          {
            name: 'onRemove',
            type: '() => void',
            description: 'Shows a remove button.',
          },
          {
            name: 'removeLabel',
            type: 'string',
            default: "'Remove <text>'",
            description: 'Accessible name of ×.',
          },
          {
            name: 'size',
            type: "'sm' | 'md'",
            default: "'md'",
            description: 'Height.',
          },
          {
            name: 'as',
            type: 'ElementType',
            default: "'span'",
            description: "e.g. 'button' for toggles.",
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          { name: '.chip', description: 'The token.' },
          {
            name: '.chip-label / .chip-text',
            description: 'Prefix and value.',
          },
          { name: '.chip-{color} / .chip-sm', description: 'Tone and size.' },
          {
            name: '.chip[aria-pressed="true"] / .chip.active',
            description: 'Selected toggle.',
          },
          {
            name: '.chip > .btn-close',
            description:
              'Remove button; add data-oh-dismiss for no-JS removal.',
          },
          { name: '.chip-list', description: 'Wrapping row of chips.' },
        ]}
      />
    </DocPage>
  );
}
