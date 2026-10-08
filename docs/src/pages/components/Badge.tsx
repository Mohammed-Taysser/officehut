import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function BadgePage() {
  return (
    <DocPage
      title='Badge'
      lead='A short label for a state or a count. Its best trick is the rubber stamp: PAID, OVERDUE, VOID, pressed onto the page at a slight angle in mono capitals.'
      importLine="import { Badge } from 'officehut/react';"
      cssFile='officehut/css/components/badge.css'
    >
      <Example title='Stamps' demo='badge/Stamp' center minHeight={220}>
        <p>
          <code>variant=&quot;stamp&quot;</code> is for the state of a{' '}
          <em>document</em>: an invoice, a contract, a timesheet. The ink takes
          the tone colour, the border has the double rule of a real stamp, and
          it sits rotated by four degrees. <code>animate</code> thumps it down
          once when it appears, which is a nice moment after someone clicks
          &ldquo;Mark as paid&rdquo;.
        </p>
      </Example>
      <Note title='One stamp per document'>
        A stamp is loud on purpose. Use one per card or page, for the state that
        matters most. For lists of statuses in a table, the soft badge reads
        better.
      </Note>

      <Example title='Soft, solid and outline' demo='badge/Variants'>
        <p>
          <code>soft</code> is the default and the right choice for most table
          cells. <code>solid</code> for counts that need to be seen,{' '}
          <code>outline</code> for tags and categories. <code>pill</code> rounds
          the ends.
        </p>
      </Example>

      <Example title='Counters and dots' demo='badge/Corner' center>
        <p>
          <code>corner</code> pins the badge to the top end corner of the
          nearest positioned parent; add <code>.position-relative</code> to the
          button or wrapper. A badge with no content is a small dot.
        </p>
      </Example>
      <Note title='Accessibility'>
        A dot has no text, and a counter on its own is just a number. Put the
        meaning in the button&apos;s <code>aria-label</code>{' '}
        (&ldquo;Notifications, 3 unread&rdquo;) and hide the badge, or put{' '}
        <code>.visually-hidden</code> text inside the dot.
      </Note>

      <Example
        title='On an invoice'
        demo='badge/Invoice'
        scene
        anatomy={[
          { selector: '.badge-stamp', label: '.badge-stamp' },
          { selector: '.badge-outline' },
        ]}
      >
        <p>
          A stamp for the payment state, soft and outline badges for the tags.
        </p>
      </Example>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Badge props'
        rows={[
          {
            name: 'color',
            type: 'Color',
            description: 'Tone. Empty = neutral grey.',
          },
          {
            name: 'variant',
            type: "'soft' | 'solid' | 'outline' | 'stamp'",
            default: "'soft'",
            description: 'Style.',
          },
          { name: 'pill', type: 'boolean', description: 'Rounded ends.' },
          {
            name: 'corner',
            type: 'boolean',
            description: 'Pin to the top end corner of a positioned parent.',
          },
          {
            name: 'animate',
            type: 'boolean',
            description: 'Stamp-down animation on mount. Stamp only.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          {
            name: '.badge',
            description:
              'Base. Without a tone class it is grey; on its own with no content it is a dot.',
          },
          {
            name: '.badge-{color}',
            description: 'Solid tone. Add a style class to soften it.',
          },
          { name: '.badge-soft / .badge-outline', description: 'Styles.' },
          {
            name: '.badge-stamp',
            description: 'Rubber stamp. .is-animated plays the thump.',
          },
          {
            name: '.badge-pill / .badge-corner',
            description: 'Shape and position.',
          },
        ]}
      />
      <Note title='Class order in HTML' tone='blue'>
        In plain HTML a tone class alone is solid:{' '}
        <code>badge badge-success</code>. The React default is soft, which
        renders <code>badge badge-success badge-soft</code>.
      </Note>
    </DocPage>
  );
}
