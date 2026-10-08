import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function ChecklistPage() {
  return (
    <DocPage
      title='Checklist'
      lead='A homework list on ruled paper: hand-drawn boxes, a red-pen tick that overshoots the box, and the line struck through when it is done. For month-end close, onboarding, handovers.'
      importLine="import { Checklist } from 'officehut/react';"
      cssFile='officehut/css/components/checklist.css'
    >
      <Example
        title='Month-end close'
        demo='school/checklist/MonthEnd'
        anatomy={[
          { selector: '.checklist-box' },
          { selector: '.checklist-text' },
          { selector: '.checklist-meta' },
        ]}
      >
        <p>
          Pass <code>items</code> with an <code>id</code> and a{' '}
          <code>label</code>. <code>meta</code> is written at the end of the
          line — an owner, a due date — and <code>late</code> turns it red.{' '}
          <code>defaultValue</code> lists the ids that start ticked.{' '}
          <code>disabled</code> items can&apos;t be ticked yet.
        </p>
      </Example>
      <Note title='Accessibility'>
        Every line is a real{' '}
        <code>&lt;input type=&quot;checkbox&quot;&gt;</code> inside its{' '}
        <code>&lt;label&gt;</code>: Tab moves between them, Space ticks, and
        screen readers say &ldquo;checked&rdquo;. The hand-drawn look is only
        CSS on top. Name the list with <code>aria-label</code>.
        &ldquo;Late&rdquo; is shown by colour, so write it in the meta too
        (&ldquo;due yesterday&rdquo;, not just the date).
      </Note>

      <Example
        title='Onboarding with progress'
        demo='school/checklist/Onboarding'
        scene
      >
        <p>
          Controlled: hold the ticked ids in state and pass <code>value</code>{' '}
          and <code>onChange</code>, which receives the new list of ids. Here
          the card reads it to fill a{' '}
          <a href='/docs/components/progress'>Progress</a> bar.{' '}
          <code>flush</code> drops the paper so the list sits inside the card.
        </p>
      </Example>

      <Example title='Plain HTML, no JavaScript' demo='school/checklist/Html'>
        <p>
          The tick and the strike-through are pure CSS (
          <code>.checklist-box:checked + .checklist-text</code>
          ), so the plain-HTML list works with zero JavaScript — in a
          server-rendered page, an email preview, a printed handover. The
          Vanilla JS tab shows an optional script that remembers what was
          ticked.
        </p>
      </Example>
      <Note title='Order matters' tone='blue'>
        The strike-through relies on the checkbox coming directly before{' '}
        <code>.checklist-text</code>. Put an icon or anything else between them
        and done lines stop being crossed out.
      </Note>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Checklist props'
        rows={[
          {
            name: 'items',
            type: 'ChecklistItem[]',
            description: 'The lines (below).',
          },
          {
            name: 'value',
            type: 'string[]',
            description: 'Ticked ids (controlled).',
          },
          {
            name: 'defaultValue',
            type: 'string[]',
            default: '[]',
            description: 'Ticked ids to start with (uncontrolled).',
          },
          {
            name: 'onChange',
            type: '(done: string[]) => void',
            description: 'Called with the new list of ticked ids.',
          },
          {
            name: 'flush',
            type: 'boolean',
            description: 'No paper, border or padding — for use inside cards.',
          },
          {
            name: 'aria-label',
            type: 'string',
            description: 'Name of the list.',
          },
        ]}
      />
      <Ledger
        title='ChecklistItem'
        rows={[
          {
            name: 'id',
            type: 'string',
            description: 'Unique within the list.',
          },
          { name: 'label', type: 'ReactNode', description: 'The task.' },
          {
            name: 'meta',
            type: 'ReactNode',
            description: 'Owner or due date, at the end of the line.',
          },
          { name: 'late', type: 'boolean', description: 'Meta in red pen.' },
          {
            name: 'disabled',
            type: 'boolean',
            description: 'Can’t be ticked.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          { name: '.checklist', description: 'The list (ul), on paper.' },
          { name: '.checklist-item', description: 'One ruled line (li).' },
          {
            name: '.checklist-label',
            description: 'Label wrapping box and text.',
          },
          {
            name: '.checklist-box',
            description: 'The checkbox, drawn by hand.',
          },
          {
            name: '.checklist-text',
            description:
              'Task text; struck through when the box before it is checked.',
          },
          {
            name: '.checklist-meta(.is-late)',
            description: 'End-of-line note; red when late.',
          },
          { name: '.checklist-flush', description: 'No paper.' },
        ]}
      />
      <Ledger
        kind='var'
        title='Custom properties'
        rows={[
          {
            name: '--_rule',
            default: '2.25rem',
            description: 'Local: minimum line height. Set on .checklist.',
          },
        ]}
      />
    </DocPage>
  );
}
