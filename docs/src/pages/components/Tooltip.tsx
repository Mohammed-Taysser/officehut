import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function TooltipPage() {
  return (
    <DocPage
      title='Tooltip'
      lead='A small dark label that explains a control: what an icon does, why a button is locked, what “Net 30” means. Ink on paper, flipped.'
      importLine="import { Tooltip } from 'officehut/react';"
      cssFile='officehut/css/components/tooltip.css'
    >
      <Example title='Basic' demo='tooltip/Basic' center>
        <p>
          Wrap one element. The tooltip shows after 250ms of hover, at once on
          keyboard focus, and hides on blur, mouse out or <kbd>Esc</kbd>. While
          it shows, the element points to it with <code>aria-describedby</code>.
        </p>
      </Example>
      <Note title='Accessibility'>
        A tooltip is a description, not a name. Icon-only buttons still need an{' '}
        <code>aria-label</code>; the tooltip adds detail. The wrapped element
        must be focusable, and the tooltip can&apos;t hold links or buttons,
        because it vanishes when you move towards it. A <code>disabled</code>{' '}
        button gets no hover or focus events; to explain why it is locked, wrap
        it in a focusable <code>&lt;span tabIndex={'{0}'}&gt;</code> as above
        and put the tooltip on the wrapper.
      </Note>

      <Example
        title='Placement'
        demo='tooltip/Placement'
        center
        minHeight={160}
      >
        <p>
          <code>top</code> by default. Any placement works, including{' '}
          <code>-start</code> and <code>-end</code>. If there is no room, the
          tooltip flips to the other side.
        </p>
      </Example>

      <Example title='Without React' demo='tooltip/DataApi' center>
        <p>
          <code>data-oh-tooltip=&quot;text&quot;</code> on any focusable
          element. <code>data-oh-placement</code> picks the side. There is one
          shared bubble for the whole page.
        </p>
      </Example>

      <Example title='CSS only' demo='tooltip/CssOnly' center>
        <p>
          For static pages without any script, <code>.has-tip</code> with{' '}
          <code>data-tip</code> shows a tooltip above the element on hover and{' '}
          <code>:focus-visible</code>. It can&apos;t flip and isn&apos;t linked
          with <code>aria-describedby</code>, so keep the information available
          elsewhere too.
        </p>
      </Example>

      <Example title='Editor toolbar' demo='tooltip/Toolbar' scene>
        <p>Icon buttons with tooltips that name the tool and its shortcut.</p>
      </Example>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Tooltip props'
        rows={[
          {
            name: 'content',
            type: 'ReactNode',
            description: 'Required. Keep it short: one line of plain text.',
          },
          {
            name: 'placement',
            type: 'Placement',
            default: "'top'",
            description: 'Preferred side.',
          },
          {
            name: 'delay',
            type: 'number',
            default: '250',
            description: 'Hover delay in ms. Focus shows immediately.',
          },
          {
            name: 'children',
            type: 'ReactElement',
            description: 'One element. Gets ref and event handlers merged in.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          {
            name: '.tooltip',
            description: 'The bubble (position: fixed). .is-open shows it.',
          },
          {
            name: '.has-tip',
            description: 'CSS-only tooltip from the data-tip attribute.',
          },
        ]}
      />
      <Ledger
        kind='attr'
        title='Data API'
        rows={[
          { name: 'data-oh-tooltip', description: 'Tooltip text.' },
          { name: 'data-oh-placement', description: 'Side. Default top.' },
          {
            name: 'data-tip',
            description: 'Text for .has-tip (no JavaScript).',
          },
        ]}
      />
    </DocPage>
  );
}
