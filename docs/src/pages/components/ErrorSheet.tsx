import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function ErrorSheetPage() {
  return (
    <DocPage
      title='Error sheet'
      lead='When something breaks, the page comes back marked in red pen: a wavy underline under the title, “see me after class” in the margin, and a way to try again. A slip version covers a single broken widget.'
      importLine="import { ErrorBoundary, ErrorSheet } from 'officehut/react';"
      cssFile='officehut/css/components/error.css'
    >
      <p>
        <code>ErrorBoundary</code> catches errors thrown while its children
        render and shows a fallback instead of a blank screen.{' '}
        <code>ErrorSheet</code> is that fallback on its own, for routes and
        server errors.
      </p>

      <Example title='One broken widget' demo='school/error-sheet/Slip' scene>
        <p>
          <code>variant=&apos;slip&apos;</code> shows a small dashed notice in
          place of the part that crashed; the rest of the dashboard carries on.
          Press <em>Simulate a crash</em>, then <em>Try again</em> to remount
          the widget.
        </p>
      </Example>
      <Note title='What boundaries catch'>
        Boundaries catch errors during rendering, in lifecycle methods and in
        constructors below them. They don&apos;t catch errors in event handlers,
        timers or promises — those never reach React. The demos set state in the
        click handler and throw on the next render for that reason.
      </Note>

      <Example
        title='The full sheet'
        demo='school/error-sheet/Sheet'
        anatomy={[
          { selector: '.error-sheet-title' },
          { selector: '.error-sheet-remark' },
          { selector: '.error-sheet-actions' },
        ]}
      >
        <p>
          The default <code>variant</code> is <code>sheet</code>: a notebook
          page with the title, a red-pen remark, a sentence about what to do,
          and <em>Try again</em> / <em>Reload page</em> buttons. Wrap whole
          pages or routes in one. <code>onError</code> is where you report to
          your logger, and <code>resetKeys</code> (for example{' '}
          <code>[location.pathname]</code>) clears the error when the user
          navigates away. Press <em>Simulate a crash</em> to see it.
        </p>
      </Example>
      <Note title='Accessibility' tone='blue'>
        Both the sheet and the slip are <code>role=&quot;alert&quot;</code>, so
        the failure is announced as soon as it appears. The ✗ in the margin is
        hidden; the title says what went wrong in words. Focus is not moved — if
        the whole page was replaced, consider moving focus to the title.
      </Note>

      <Example title='Your own words' demo='school/error-sheet/Custom' scene>
        <p>
          Use <code>ErrorSheet</code> directly with your <code>title</code>,{' '}
          <code>remark</code> and next steps as children.{' '}
          <code>showDetails</code> adds a fold-out with the message or stack —
          handy for internal tools, best left off for customers. It understands{' '}
          <code>Error</code>s, strings and response-like objects with{' '}
          <code>status</code>/<code>statusText</code>. (The <em>Reload page</em>{' '}
          button really reloads this page.)
        </p>
      </Example>

      <Example
        title='Server-rendered error page'
        demo='school/error-sheet/ServerPage'
      >
        <p>
          The sheet is classes only —{' '}
          <code>.notebook.notebook-holes.error-sheet</code> with{' '}
          <code>.error-sheet-title</code>, <code>-remark</code>,{' '}
          <code>-actions</code> and <code>-detail</code> — so a server template
          can render it for a 500 page with no JavaScript. The slip is{' '}
          <code>.error-slip</code>. The Vanilla JS tab shows the template and an
          optional Reload button.
        </p>
      </Example>
      <Note title='Stylesheets'>
        If you cherry-pick CSS files, the sheet also needs{' '}
        <code>notebook.css</code> and <code>button.css</code>.
      </Note>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='ErrorBoundary props'
        rows={[
          {
            name: 'children',
            type: 'ReactNode',
            description: 'What to protect.',
          },
          {
            name: 'variant',
            type: "'sheet' | 'slip'",
            default: "'sheet'",
            description: 'Default fallback: full page or inline notice.',
          },
          {
            name: 'fallback',
            type: 'ReactNode | (error, reset) => ReactNode',
            description: 'Your own fallback instead.',
          },
          {
            name: 'onError',
            type: '(error, info) => void',
            description: 'Report the error (Sentry, console…).',
          },
          {
            name: 'resetKeys',
            type: 'unknown[]',
            description:
              'When any value changes, the boundary clears its error.',
          },
        ]}
      />
      <Ledger
        title='ErrorSheet props'
        rows={[
          {
            name: 'error',
            type: 'unknown',
            description: 'Error, string or { status, statusText }.',
          },
          {
            name: 'title',
            type: 'ReactNode',
            default: "'Something went wrong on this page'",
            description: 'Heading (h2).',
          },
          {
            name: 'remark',
            type: 'ReactNode',
            default: "'see me after class'",
            description: 'Red-pen remark.',
          },
          {
            name: 'children',
            type: 'ReactNode',
            description: 'What the user can do next.',
          },
          {
            name: 'onRetry / retryLabel',
            type: '() => void / string',
            default: "— / 'Try again'",
            description: 'Shows the retry button.',
          },
          {
            name: 'showDetails',
            type: 'boolean',
            default: 'false',
            description: 'Fold-out with message or stack.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          {
            name: '.error-sheet',
            description:
              'Goes with .notebook.notebook-holes; caps the width at 40rem.',
          },
          {
            name: '.error-sheet-title',
            description: 'Title with a wavy red underline.',
          },
          {
            name: '.error-sheet-remark',
            description: 'Handwritten remark in red pen.',
          },
          {
            name: '.error-sheet-actions',
            description: 'Button row, one ruled line high.',
          },
          {
            name: '.error-sheet-detail',
            description: '<details> with the error text.',
          },
          {
            name: '.error-slip',
            description: 'Compact dashed notice for one widget.',
          },
        ]}
      />
    </DocPage>
  );
}
