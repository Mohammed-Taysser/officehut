import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function ModalPage() {
  return (
    <DocPage
      title='Modal'
      lead='A sheet laid on top of the page for one focused task: review a request, confirm a removal, fill a short form. It is a native <dialog>, so the browser traps focus, handles Esc and keeps the rest of the page inert.'
      importLine="import { Modal, useDisclosure } from 'officehut/react';"
      cssFile='officehut/css/components/modal.css'
    >
      <Example title='Basic' demo='modal/Basic' center>
        <p>
          <code>Modal</code> is controlled with <code>open</code> and{' '}
          <code>onClose</code>. <code>onClose</code> runs for the close button,{' '}
          <kbd>Esc</kbd> and a click on the backdrop; you decide whether to
          actually close. <code>title</code> is linked to the dialog with{' '}
          <code>aria-labelledby</code>.
        </p>
      </Example>

      <Example
        title='Anatomy'
        demo='modal/Anatomy'
        anatomy={[
          { selector: '.modal-header' },
          { selector: '.modal-title' },
          { selector: '.btn-close' },
          { selector: '.modal-body' },
          { selector: '.modal-footer' },
        ]}
      >
        <p>
          Header with title and close button, a body that scrolls when it is too
          tall, and a footer on the slightly darker <code>--oh-surface-2</code>{' '}
          paper with buttons aligned to the end.
        </p>
      </Example>

      <Example title='Sizes' demo='modal/Sizes' center>
        <p>
          <code>sm</code> for confirmations, <code>md</code> for short forms,{' '}
          <code>lg</code> and <code>xl</code> for previews and tables.
        </p>
      </Example>

      <Example title='Drawer' demo='modal/Drawer' center>
        <p>
          <code>drawer</code> slides the same dialog in from the end edge at
          full height. Use it for details you read next to a list, like a ticket
          or a vendor file. It moves to the left edge in RTL.
        </p>
      </Example>

      <Example title='Without React' demo='modal/DataApi' center>
        <p>
          A trigger with <code>data-oh-toggle=&quot;modal&quot;</code> opens the{' '}
          <code>&lt;dialog class=&quot;modal&quot;&gt;</code> it targets. Any
          button inside with <code>data-oh-dismiss=&quot;modal&quot;</code>{' '}
          closes it, and so does a{' '}
          <code>&lt;form method=&quot;dialog&quot;&gt;</code>.
        </p>
      </Example>
      <Note title='Accessibility'>
        Focus moves into the dialog on open and back to the trigger on close.
        Label the dialog: React does it from <code>title</code>; in HTML, add{' '}
        <code>aria-labelledby</code> pointing at your heading. For a destructive
        confirmation, put initial focus on the safe button with{' '}
        <code>autoFocus</code>.
      </Note>

      <Example title='Confirming a removal' demo='modal/Confirm' scene>
        <p>
          A small dialog that says exactly what will happen.{' '}
          <code>backdropClose={'{false}'}</code> stops a stray click from
          dismissing it, and the safe choice has focus.
        </p>
      </Example>
      <Note title='Scroll lock' tone='blue'>
        While a modal is open the page behind doesn&apos;t scroll, and the
        scrollbar&apos;s width is padded back so the layout doesn&apos;t jump.
        Nested modals are counted, so closing the top one keeps the lock.
      </Note>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Modal props'
        rows={[
          { name: 'open', type: 'boolean', description: 'Required.' },
          {
            name: 'onClose',
            type: '() => void',
            description:
              'Required. Called on Esc, backdrop click and the close button.',
          },
          {
            name: 'title',
            type: 'ReactNode',
            description: 'Header title; also the accessible name.',
          },
          {
            name: 'footer',
            type: 'ReactNode',
            description: 'Footer content, usually buttons.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg' | 'xl'",
            default: "'md'",
            description: '24, 32, 48 or 72rem wide.',
          },
          {
            name: 'drawer',
            type: 'boolean',
            description: 'Full-height panel from the end edge.',
          },
          {
            name: 'backdropClose',
            type: 'boolean',
            default: 'true',
            description: 'Whether a backdrop click calls onClose.',
          },
          { name: 'hideClose', type: 'boolean', description: 'No × button.' },
          {
            name: 'closeLabel',
            type: 'string',
            default: "'Close'",
            description: 'Accessible name of the × button.',
          },
          {
            name: '...dialog props',
            type: 'ComponentProps<"dialog">',
            description: 'Passed to the <dialog>.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          { name: '.modal', description: 'On the <dialog>.' },
          { name: '.modal-sm / -lg / -xl', description: 'Widths.' },
          { name: '.modal-drawer', description: 'Side panel.' },
          {
            name: '.modal-header / -title / -body / -footer',
            description: 'Parts.',
          },
          {
            name: '.modal.is-closing',
            description: 'Set during the 140ms closing animation.',
          },
        ]}
      />
      <Ledger
        kind='attr'
        title='Data API'
        rows={[
          {
            name: 'data-oh-toggle="modal"',
            description: 'On the trigger, with data-oh-target or href="#id".',
          },
          {
            name: 'data-oh-dismiss="modal"',
            description: 'On a button inside: closes the dialog.',
          },
          {
            name: 'data-oh-backdrop-close',
            description: 'On the <dialog>. "false" ignores backdrop clicks.',
          },
        ]}
      />
      <Ledger
        kind='event'
        rows={[
          {
            name: 'oh:show',
            type: 'cancelable',
            description: 'On the dialog, before it opens.',
          },
          { name: 'oh:shown', description: 'Open.' },
          {
            name: 'oh:hide',
            type: 'cancelable',
            description: 'Before closing by Esc, backdrop or modal.hide().',
          },
          {
            name: 'oh:hidden',
            description:
              'Closed and focus returned. Fires however it was closed.',
          },
        ]}
      />
    </DocPage>
  );
}
