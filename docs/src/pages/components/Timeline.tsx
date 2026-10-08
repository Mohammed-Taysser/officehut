import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function TimelinePage() {
  return (
    <DocPage
      title='Timeline'
      lead='An ordered log, written like a logbook: mono timestamps in the margin, a ruled spine with a mark per entry, and a line or two of text.'
      importLine="import { Timeline } from 'officehut/react';"
      cssFile='officehut/css/components/timeline.css'
    >
      <Example
        title='Anatomy'
        demo='timeline/Basic'
        center
        anatomy={[
          { selector: '.timeline-time' },
          { selector: '.timeline-marker' },
          { selector: '.timeline-title' },
          { selector: '.timeline-text' },
        ]}
      >
        <p>
          <code>Timeline</code> is an <code>&lt;ol&gt;</code>; each{' '}
          <code>Timeline.Item</code> takes a <code>time</code> (rendered in a{' '}
          <code>&lt;time&gt;</code> — pass <code>dateTime</code> for the machine
          value), a <code>title</code> and text. <code>hollow</code> marks
          something planned.
        </p>
      </Example>

      <Example title='Logbook' demo='timeline/Logbook' scene center>
        <p>
          <code>ruled</code> puts each entry on a blue rule with a red margin
          line after the times. <code>Timeline.Day</code> splits the log by
          date.
        </p>
      </Example>

      <Example title='Without times' demo='timeline/Plain' center>
        <p>
          <code>plain</code> drops the time column — for checklists and
          onboarding steps where the order matters but the clock doesn't.
        </p>
      </Example>
      <Note title='Newest first?'>
        Logs of what happened read oldest → newest, like a logbook. Activity
        feeds where people want the latest news usually go the other way. Pick
        one per screen and say which in the heading.
      </Note>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Timeline props'
        rows={[
          {
            name: 'ruled',
            type: 'boolean',
            description: 'Logbook ruling and margin line.',
          },
          { name: 'plain', type: 'boolean', description: 'No time column.' },
        ]}
      />
      <Ledger
        title='Timeline.Item props'
        rows={[
          {
            name: 'time',
            type: 'ReactNode',
            description: 'Shown in the margin.',
          },
          {
            name: 'dateTime',
            type: 'string',
            description: 'Machine-readable time for <time>.',
          },
          { name: 'title', type: 'ReactNode', description: 'Entry heading.' },
          { name: 'color', type: 'Color', description: 'Marker colour.' },
          {
            name: 'hollow',
            type: 'boolean',
            description: 'Outlined marker for planned entries.',
          },
          {
            name: 'children',
            type: 'ReactNode',
            description: 'Text; a string is wrapped in .timeline-text.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          { name: '.timeline', description: 'The list (use <ol>).' },
          {
            name: '.timeline-item(-{color})',
            description: 'Entry; tone sets the marker colour.',
          },
          {
            name: '.timeline-time / -marker / -body',
            description: 'The three columns.',
          },
          { name: '.timeline-title / -text', description: 'Body text.' },
          {
            name: '.timeline-marker.is-hollow',
            description: 'Outlined marker.',
          },
          { name: '.timeline-day', description: 'Date separator row.' },
          {
            name: '.timeline-ruled / .timeline-plain',
            description: 'Modifiers.',
          },
        ]}
      />
    </DocPage>
  );
}
