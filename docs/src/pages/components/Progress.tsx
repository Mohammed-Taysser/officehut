import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function ProgressPage() {
  return (
    <DocPage
      title='Progress'
      lead='A track with a fill. Put the figure beside the label in mono, stack segments to show a split, or add ruler ticks so people can read 40% at a glance.'
      importLine="import { Progress } from 'officehut/react';"
      cssFile='officehut/css/components/progress.css'
    >
      <Example
        title='Anatomy'
        demo='progress/Basic'
        anatomy={[
          { selector: '.progress-label' },
          { selector: '.progress-value' },
          { selector: '.progress', label: '.progress (role=progressbar)' },
          { selector: '.progress-bar' },
        ]}
      >
        <p>
          <code>label</code> names the bar and sits above it;{' '}
          <code>showValue</code> prints the figure at the end of the row —{' '}
          <code>true</code> for a percentage, or any text such as{' '}
          <code>"EGP 84,200 / 120,000"</code>. Use <code>max</code> for real
          units and <code>valueText</code> to say the same thing to screen
          readers.
        </p>
      </Example>

      <Example title='Sizes' demo='progress/Sizes'>
        <p>
          <code>sm</code> for table cells and lists, <code>lg</code> when the
          percentage should sit inside the fill.
        </p>
      </Example>

      <Example title='Stacked' demo='progress/Stacked'>
        <p>
          Pass <code>segments</code> to split one bar. Each segment gets a 1px
          paper gap; their labels are combined into <code>aria-valuetext</code>{' '}
          ("Paid 61%, Pending 24%, Overdue 9%").
        </p>
      </Example>

      <Example title='Ruled' demo='progress/Ruled'>
        <p>
          <code>ruled</code> draws ticks every 10% with a long one at the half,
          like a school ruler. <code>scale</code> prints the numbers underneath.
        </p>
      </Example>

      <Example title='Indeterminate' demo='progress/Indeterminate'>
        <p>
          Leave out <code>value</code> when you can't tell how long it will
          take. The bar drops <code>aria-valuenow</code>, which is how assistive
          tech knows it is indeterminate.
        </p>
      </Example>
      <Note title='Reduced motion'>
        With <code>prefers-reduced-motion</code> the sliding fill stops and the
        whole track is shaded instead — still clearly "working", without
        movement.
      </Note>

      <Example title='Budget sheet' demo='progress/Budget' scene center>
        <p>
          A typical use: one ruled bar per department, coloured by how close it
          is to the limit.
        </p>
      </Example>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Progress props'
        rows={[
          {
            name: 'value',
            type: 'number',
            description: 'Current value. Omit for an indeterminate bar.',
          },
          {
            name: 'min / max',
            type: 'number',
            default: '0 / 100',
            description: 'Range. Values are clamped.',
          },
          {
            name: 'label',
            type: 'ReactNode',
            description:
              'Visible label and accessible name. Otherwise pass aria-label.',
          },
          {
            name: 'showValue',
            type: 'boolean | ReactNode',
            description: 'true = percentage; or your own figure.',
          },
          {
            name: 'valueText',
            type: 'string',
            description: 'aria-valuetext, e.g. "EGP 84,200 of 120,000".',
          },
          {
            name: 'color',
            type: 'Color',
            default: "'primary'",
            description: 'Fill tone.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: 'Track height.',
          },
          {
            name: 'ruled / scale',
            type: 'boolean',
            description: 'Ruler ticks / numbers under the bar.',
          },
          {
            name: 'indeterminate',
            type: 'boolean',
            description: 'Sliding fill, no value.',
          },
          {
            name: 'segments',
            type: '{ value, color?, label? }[]',
            description: 'Stacked bar.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          {
            name: '.progress',
            description:
              'The track. Put role="progressbar" and aria-value* on it.',
          },
          {
            name: '.progress-bar',
            description: 'A fill. Width via style="--_value: 40%" (or width).',
          },
          {
            name: '.progress-{color} / .progress-bar-{color}',
            description: 'Tone the track or one segment.',
          },
          { name: '.progress-sm / .progress-lg', description: 'Heights.' },
          {
            name: '.progress-ruled / .progress-scale',
            description: 'Ruler ticks / numbers row.',
          },
          { name: '.progress-indeterminate', description: 'Sliding fill.' },
          {
            name: '.progress-group / -label / -value',
            description: 'Label row above the bar.',
          },
        ]}
      />
    </DocPage>
  );
}
