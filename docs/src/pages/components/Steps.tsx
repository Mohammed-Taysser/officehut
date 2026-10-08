import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function StepsPage() {
  return (
    <DocPage
      title='Steps'
      lead='A routing slip: the desks a document has to pass, in order. Finished desks get a rubber stamp with a pen tick. The current desk is filled in, and the ones still to come are dashed boxes waiting for a signature.'
      importLine="import { Steps } from 'officehut/react';"
      cssFile='officehut/css/components/steps.css'
    >
      <Example
        title='Routing slip'
        demo='nav/StepsBasic'
        anatomy={[
          { selector: '.step.is-done .step-marker', label: '.step.is-done' },
          {
            selector: '.step.is-current .step-marker',
            label: '.step.is-current',
          },
          { selector: '.step-title' },
          { selector: '.step-meta' },
        ]}
      >
        <p>
          Pass <code>items</code> and the index of the <code>current</code>{' '}
          step. Earlier steps are done and later ones upcoming. Set{' '}
          <code>current</code> to <code>items.length</code> when the slip is
          finished. The line to the next desk stays dashed until a step is done.
        </p>
      </Example>

      <Example title='Vertical & returned' demo='nav/StepsVertical'>
        <p>
          <code>orientation="vertical"</code> stacks the slip for narrow columns
          and checklists. Mark a step <code>error</code> when the paper was sent
          back. It gets a red stamp with a cross, and its{' '}
          <code>description</code> turns red so the reason stands out.
        </p>
      </Example>

      <Example title='Plain HTML' demo='nav/StepsHtml' center>
        <p>
          No JavaScript is needed. An empty <code>.step-marker</code> numbers
          itself with a CSS counter. Set state with <code>.is-done</code>,{' '}
          <code>.is-current</code> (plus <code>aria-current="step"</code>) or{' '}
          <code>.is-error</code>. <code>.steps-sm</code> makes it smaller, for
          cards and table rows.
        </p>
      </Example>
      <Note title='Accessibility' tone='blue'>
        The stamps are decorative, so each title starts with a visually hidden
        state: "Completed:", "Current:", "Not started:" or "Returned:".
        Translate them with <code>stateLabels</code>. Name the list with{' '}
        <code>aria-label</code>, e.g. "INV-2041 approval route".
      </Note>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Steps props'
        rows={[
          {
            name: 'items',
            type: 'StepItem[]',
            description: '{ title, description?, error?, icon? }',
          },
          {
            name: 'current',
            type: 'number',
            description:
              '0-based index of the current step; items.length = all done.',
          },
          {
            name: 'orientation',
            type: "'horizontal' | 'vertical'",
            default: "'horizontal'",
            description: 'Row or column.',
          },
          {
            name: 'size',
            type: "'sm' | 'md'",
            default: "'md'",
            description: 'Marker size.',
          },
          {
            name: 'stateLabels',
            type: 'Partial<Record<StepState, string>>',
            description: 'Screen-reader words per state.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          { name: '.steps', description: 'The <ol>. Horizontal by default.' },
          {
            name: '.steps-vertical / .steps-sm',
            description: 'Column layout / smaller markers.',
          },
          {
            name: '.step',
            description: 'One desk. Upcoming unless it has a state class.',
          },
          {
            name: '.is-done / .is-current / .is-error',
            description: 'States. aria-current="step" also counts as current.',
          },
          { name: '.step-marker', description: 'Circle. Empty = auto number.' },
          {
            name: '.step-body / .step-title / .step-meta',
            description: 'Text beside or under the marker.',
          },
        ]}
      />
      <Ledger
        kind='var'
        title='Local custom properties'
        rows={[
          { name: '--_size', description: 'Marker diameter.' },
          {
            name: '--_gap',
            description: 'Space between a marker and its line.',
          },
          { name: '--_line', description: 'Dashed line colour.' },
          {
            name: '--_done',
            description: 'Stamp ink. Defaults to --oh-success-ink.',
          },
          {
            name: '--_current / --_current-fg',
            description: 'Current marker fill and number colour.',
          },
        ]}
      />
    </DocPage>
  );
}
