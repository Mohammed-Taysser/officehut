import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function StatPage() {
  return (
    <DocPage
      title='Stat'
      lead='A figure on a sheet: label, value in mono, the change against last period, and a small pen-drawn sparkline. Sometimes a handwritten note in the margin.'
      importLine="import { Stat, StatGroup, Sparkline } from 'officehut/react';"
      cssFile='officehut/css/components/stat.css'
    >
      <Example title='KPI row' demo='stat/Kpis' scene>
        <p>
          Three cards across the top of an accounts dashboard.{' '}
          <code>trend</code> draws the arrow; <code>sentiment</code> decides the
          colour — overdue going <em>up</em> is bad.
        </p>
      </Example>

      <Example
        title='Anatomy'
        demo='stat/Single'
        center
        anatomy={[
          { selector: '.stat-label' },
          { selector: '.stat-value' },
          { selector: '.stat-unit' },
          { selector: '.stat-delta' },
          { selector: '.stat-note' },
          { selector: '.stat-chart' },
        ]}
      >
        <p>
          <code>note</code> is a handwritten remark ("blip on 6 Oct"). The
          sparkline goes in <code>chart</code> and sits at the end, aligned to
          the bottom.
        </p>
      </Example>

      <Example title='Group' demo='stat/Group'>
        <p>
          <code>StatGroup</code> puts several stats on one sheet with hairlines
          between them; it wraps to as many columns as fit.
        </p>
      </Example>

      <Example title='Sparkline' demo='stat/Sparklines' center>
        <p>
          <code>Sparkline</code> is one SVG polyline from an array of numbers —
          no chart library. Add <code>area</code>, <code>baseline</code> (dashed
          line at the first value) or turn off the <code>dot</code>. The
          geometry is exported as <code>sparklinePoints()</code> if you want to
          draw your own.
        </p>
      </Example>
      <Note title='Accessibility'>
        A labelled sparkline is a <code>role="img"</code> — describe the trend,
        not the numbers ("Overdue amount, rising"). Without <code>label</code>{' '}
        it is hidden, so make sure the figure next to it says enough. The delta
        arrow is decorative; a hidden "up"/"down" is read before the delta.
      </Note>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Stat props'
        rows={[
          {
            name: 'label / value',
            type: 'ReactNode',
            description: 'Required.',
          },
          {
            name: 'unit',
            type: 'ReactNode',
            description: 'Small text after the value.',
          },
          {
            name: 'delta',
            type: 'ReactNode',
            description: 'Change, e.g. "+12%".',
          },
          {
            name: 'trend',
            type: "'up' | 'down' | 'flat'",
            description: 'Arrow direction.',
          },
          {
            name: 'sentiment',
            type: "'good' | 'bad' | 'neutral'",
            default: 'from trend',
            description: 'Delta colour.',
          },
          {
            name: 'meta',
            type: 'ReactNode',
            description: 'Muted text after the delta.',
          },
          {
            name: 'note',
            type: 'ReactNode',
            description: 'Handwritten margin note.',
          },
          {
            name: 'chart',
            type: 'ReactNode',
            description: 'Usually a Sparkline.',
          },
          {
            name: 'color',
            type: 'Color',
            description: 'Top edge and sparkline colour.',
          },
          {
            name: 'plain',
            type: 'boolean',
            description: 'No paper, for use inside cards.',
          },
        ]}
      />
      <Ledger
        title='Sparkline props'
        rows={[
          {
            name: 'values',
            type: 'number[]',
            description: 'The series. Non-finite values are skipped.',
          },
          {
            name: 'width / height',
            type: 'number',
            default: '96 / 28',
            description: 'SVG size in px.',
          },
          {
            name: 'color',
            type: 'Color',
            description: 'Line colour (else inherits from the stat).',
          },
          {
            name: 'area / baseline / dot',
            type: 'boolean',
            default: 'dot: true',
            description: 'Extras.',
          },
          {
            name: 'label',
            type: 'string',
            description: 'Accessible description; omit to hide.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          { name: '.stat', description: 'The sheet.' },
          {
            name: '.stat-label / -value / -unit / -foot / -note / -chart',
            description: 'Parts.',
          },
          {
            name: '.stat-delta.is-up / .is-down',
            description: 'Delta with arrow.',
          },
          { name: '.stat-delta-good / -bad', description: 'Delta colour.' },
          {
            name: '.stat-{color} / .stat-plain',
            description: 'Top edge / no paper.',
          },
          { name: '.stat-group', description: 'Several stats on one sheet.' },
          {
            name: '.sparkline(-{color}) / -line / -area / -dot / -base',
            description: 'SVG parts.',
          },
        ]}
      />
    </DocPage>
  );
}
