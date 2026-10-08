import { Link } from 'react-router';
import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function ToastPage() {
  return (
    <DocPage
      title='Toast'
      lead='A paper slip that appears in a corner to confirm something just happened, then goes away. A thin line along the bottom shows how long it will stay; hovering pauses it.'
      importLine="import { useToast, toast } from 'officehut/react';"
      cssFile='officehut/css/components/toast.css'
    >
      <Example title='Basic' demo='toast/Basic' center>
        <p>
          Toasts are imperative: call <code>toast()</code> with a title and
          message, or just a string. React and vanilla share one implementation;{' '}
          <code>useToast()</code> simply returns it, so you don&apos;t need a
          provider.
        </p>
      </Example>

      <Example title='Tones' demo='toast/Tones' center>
        <p>
          A <code>color</code> paints the start edge and the timer line. A
          danger toast is announced straight away (
          <code>role=&quot;alert&quot;</code>); the others wait politely. The
          danger example uses <code>duration: 0</code>, so it stays until
          closed.
        </p>
      </Example>

      <Example title='Undo' demo='toast/Undo' center>
        <p>
          <code>action</code> adds one button. Clicking it runs your callback
          and closes the toast. Undo is the classic use: do the thing at once,
          offer to take it back.
        </p>
      </Example>
      <Note title='Accessibility'>
        A toast disappears, and people who read slowly, zoom in or use a
        keyboard can miss it. Never put the only copy of an important message or
        the only way to do something in a toast. For an undo action, give it a
        longer <code>duration</code>, or <code>0</code>, and make the same
        action reachable elsewhere.
      </Note>

      <Example title='Positions' demo='toast/Positions' center>
        <p>
          <code>bottom-end</code> by default. Each corner has its own stack,
          created on first use. The corners are logical, so <code>end</code> is
          the left side in RTL.
        </p>
      </Example>

      <Example
        title='Anatomy and static toasts'
        demo='toast/Static'
        anatomy={[
          { selector: '.toast-title' },
          { selector: '.toast-text' },
          { selector: '.toast .btn-close', label: '.btn-close' },
        ]}
      >
        <p>
          This is the markup <code>toast()</code> builds. Writing it yourself is
          useful for a flash message rendered by the server; put it inside a{' '}
          <code>.toast-stack</code> to pin it to a corner.
        </p>
      </Example>

      <H2 id='when'>Toast, alert, or modal?</H2>
      <ul>
        <li>
          <strong>Toast</strong>: something just happened because of what you
          did. &ldquo;Invoice sent.&rdquo;
        </li>
        <li>
          <strong>
            <Link to='/docs/components/alert'>Alert</Link>
          </strong>
          : something is true about this page until it is fixed. &ldquo;Three
          receipts are missing.&rdquo;
        </li>
        <li>
          <strong>
            <Link to='/docs/components/modal'>Modal</Link>
          </strong>
          : you must decide before going on. &ldquo;Remove this vendor?&rdquo;
        </li>
      </ul>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='toast(options | message) → close()'
        rows={[
          { name: 'title', type: 'string', description: 'Bold first line.' },
          {
            name: 'message',
            type: 'string',
            description: 'Body text. Plain text only.',
          },
          {
            name: 'color',
            type: 'Color',
            description: 'Edge and timer colour. danger makes it assertive.',
          },
          {
            name: 'duration',
            type: 'number',
            default: '5000',
            description: 'Milliseconds before it closes. 0 = until closed.',
          },
          {
            name: 'position',
            type: "'bottom-end' | 'bottom-start' | 'top-end' | 'top-start'",
            default: "'bottom-end'",
            description: 'Corner.',
          },
          {
            name: 'action',
            type: '{ label, onClick }',
            description: 'One button; closes the toast after onClick.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          {
            name: '.toast-stack',
            description:
              'Fixed corner container. .is-top and .is-start move it.',
          },
          {
            name: '.toast / .toast-{color}',
            description: 'The slip and its tone.',
          },
          {
            name: '.toast-body / -title / -text / -icon',
            description: 'Parts.',
          },
          {
            name: '.toast-timer',
            description: 'Countdown line. Set --_duration on it.',
          },
          {
            name: '.toast.is-leaving',
            description: 'Fade-out while being dismissed.',
          },
        ]}
      />
      <Ledger
        kind='event'
        rows={[
          {
            name: 'oh:dismiss',
            type: 'cancelable',
            description: 'On the toast, before it closes.',
          },
          { name: 'oh:dismissed', description: 'On document, after removal.' },
        ]}
      />
    </DocPage>
  );
}
