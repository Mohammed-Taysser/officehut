import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function EmptyStatePage() {
  return (
    <DocPage
      title='Empty state'
      lead='What a list shows when there is nothing in it: an empty in-tray, one plain sentence about why, and the action that fills it.'
      importLine="import { EmptyState } from 'officehut/react';"
      cssFile='officehut/css/components/empty.css'
    >
      <Example
        title='Anatomy'
        demo='empty-state/Basic'
        center
        anatomy={[
          { selector: '.empty-icon' },
          { selector: '.empty-title' },
          { selector: '.empty-text' },
          { selector: '.empty-note' },
          { selector: '.empty-actions' },
        ]}
      >
        <p>
          <code>children</code> become the description. <code>note</code> adds
          one short handwritten line — keep it human and keep it short.
        </p>
      </Example>

      <Example title='Compact and bordered' demo='empty-state/Compact'>
        <p>
          <code>size="sm"</code> for empty panels inside cards;{' '}
          <code>bordered</code> draws a dashed outline that reads as "drop
          something here". <code>color</code> tints the drawing.
        </p>
      </Example>

      <Example title='Custom drawing' demo='empty-state/NoResults' center>
        <p>
          Pass your own SVG as <code>icon</code> (or <code>false</code> for
          none). Draw it with <code>stroke="currentColor"</code> at 1.5px so it
          matches the tray.
        </p>
      </Example>
      <Note title='Writing the sentence'>
        Say why it's empty and what happens next ("Supplier invoices land here
        once matched to a PO"), not just "No data". Offer the one action that
        fixes it.
      </Note>

      <Example title='In a page' demo='empty-state/Approvals' scene center>
        <p>
          With active filters, let people remove them right above the empty
          state.
        </p>
      </Example>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='EmptyState props'
        rows={[
          { name: 'title', type: 'ReactNode', description: 'Heading.' },
          {
            name: 'children',
            type: 'ReactNode',
            description: 'Description sentence.',
          },
          {
            name: 'note',
            type: 'ReactNode',
            description: 'Short handwritten line.',
          },
          { name: 'actions', type: 'ReactNode', description: 'Buttons.' },
          {
            name: 'icon',
            type: 'ReactNode | false',
            default: '<InTrayIcon />',
            description: 'Drawing above the title.',
          },
          { name: 'bordered', type: 'boolean', description: 'Dashed outline.' },
          {
            name: 'size',
            type: "'sm' | 'md'",
            default: "'md'",
            description: 'Padding and drawing size.',
          },
          { name: 'color', type: 'Color', description: 'Tints the drawing.' },
          {
            name: 'titleAs',
            type: "'h2' | 'h3' | 'h4' | 'p'",
            default: "'h3'",
            description: 'Heading level.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          { name: '.empty', description: 'Centred column.' },
          {
            name: '.empty-icon / -title / -text / -note / -actions',
            description: 'Parts.',
          },
          { name: '.empty-bordered / .empty-sm', description: 'Modifiers.' },
          { name: '.empty-{color}', description: 'Tints the drawing.' },
        ]}
      />
    </DocPage>
  );
}
