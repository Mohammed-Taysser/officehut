import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function AlertPage() {
  return (
    <DocPage
      title='Alert'
      lead='A message that belongs to the page, not to a moment: a closed office, a missing receipt, a failed payment run. For short-lived confirmations, use a toast instead.'
      importLine="import { Alert } from 'officehut/react';"
      cssFile='officehut/css/components/alert.css'
    >
      <Example title='Tones' demo='alert/Tones'>
        <p>
          Without a <code>color</code> the alert is neutral paper. The tone sets
          the tint, border and ink together.
        </p>
      </Example>

      <Example title='Soft, note and solid' demo='alert/Variants'>
        <p>
          <code>soft</code> is the default tint. <code>note</code> looks like a
          sheet of paper with a coloured margin line, which reads quieter next
          to cards. <code>solid</code> is a full fill. <code>icon</code> picks
          an icon for the tone; pass your own SVG instead if you like.
        </p>
      </Example>

      <Example
        title='Title and actions'
        demo='alert/Rich'
        anatomy={[
          { selector: '.alert-icon' },
          { selector: '.alert-title' },
          { selector: '.alert-actions' },
          { selector: '.alert-body' },
        ]}
      >
        <p>
          <code>title</code> adds a bold first line, <code>actions</code> a row
          of buttons under the message. Keep it to two actions; more than that
          is a form.
        </p>
      </Example>

      <Example title='Dismissible' demo='alert/Dismissible'>
        <p>
          In React, <code>dismissible</code> adds a close button; the alert
          hides itself, or calls <code>onDismiss</code> if you want to control
          it. In HTML, a button with <code>data-oh-dismiss</code> fades out and
          removes the closest <code>.alert</code> (reload the page to get these
          two back).
        </p>
      </Example>
      <Note title='Accessibility'>
        React gives danger and warning alerts{' '}
        <code>role=&quot;alert&quot;</code>, which interrupts a screen reader,
        and the others <code>role=&quot;status&quot;</code>. An alert that is on
        the page from the start doesn&apos;t need to interrupt anyone; pass{' '}
        <code>role=&quot;note&quot;</code> to override. In plain HTML, add the
        role yourself.
      </Note>

      <Example title='On a timesheet' demo='alert/Timesheet' scene>
        <p>
          A dismissible note above the card for the whole page, and a small
          danger alert inside the card right where the problem is.
        </p>
      </Example>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Alert props'
        rows={[
          {
            name: 'color',
            type: 'Color',
            description: 'Tone. Empty = neutral.',
          },
          {
            name: 'variant',
            type: "'soft' | 'note' | 'solid'",
            default: "'soft'",
            description: 'How the tone is applied.',
          },
          { name: 'title', type: 'ReactNode', description: 'Bold first line.' },
          {
            name: 'icon',
            type: 'boolean | ReactNode',
            description: 'true picks one for the tone; or pass your own.',
          },
          {
            name: 'actions',
            type: 'ReactNode',
            description: 'Buttons under the message.',
          },
          {
            name: 'dismissible',
            type: 'boolean',
            description: 'Show a close button.',
          },
          {
            name: 'onDismiss',
            type: '() => void',
            description: 'Called on close. Without it the alert hides itself.',
          },
          {
            name: 'closeLabel',
            type: 'string',
            default: "'Dismiss'",
            description: 'Accessible name of the close button.',
          },
          {
            name: 'size',
            type: "'sm' | 'md'",
            default: "'md'",
            description: 'Tighter padding and smaller text.',
          },
          {
            name: 'role',
            type: 'string',
            description:
              "Defaults to 'alert' for danger/warning, 'status' otherwise.",
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          { name: '.alert', description: 'Flex row: icon · body · close.' },
          { name: '.alert-{color}', description: 'Tone.' },
          {
            name: '.alert-note / .alert-solid',
            description: 'Variants. Soft needs no class.',
          },
          { name: '.alert-sm', description: 'Small.' },
          {
            name: '.alert-icon / .alert-body / .alert-title / .alert-actions',
            description: 'Parts.',
          },
          {
            name: '.alert.is-leaving',
            description: 'Fade-out state while being dismissed.',
          },
        ]}
      />
      <Ledger
        kind='attr'
        title='Data API'
        rows={[
          {
            name: 'data-oh-dismiss',
            description:
              'On a button inside the alert. Empty, "alert", or a selector of the alert to remove.',
          },
        ]}
      />
      <Ledger
        kind='event'
        rows={[
          {
            name: 'oh:dismiss',
            type: 'cancelable',
            description:
              'On the alert, before it fades. preventDefault() keeps it.',
          },
          {
            name: 'oh:dismissed',
            description:
              'On document, after removal. detail.element is the alert.',
          },
        ]}
      />
    </DocPage>
  );
}
