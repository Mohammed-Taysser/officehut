import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { DocPage, H2, H3 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Note } from '../../components/Note';

/** Key → action table in the ledger style. */
function Keys({ title, rows }: { title: string; rows: [string, ReactNode][] }) {
  return (
    <figure className='doc-ledger'>
      <figcaption className='doc-ledger-title'>{title}</figcaption>
      <div className='doc-ledger-scroll'>
        <table>
          <thead>
            <tr>
              <th scope='col'>Key</th>
              <th scope='col'>Does</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([key, action]) => (
              <tr key={key}>
                <th scope='row'>
                  {key.split(' / ').map((k, i) => (
                    <span key={k}>
                      {i > 0 && ' / '}
                      <kbd>{k}</kbd>
                    </span>
                  ))}
                </th>
                <td>{action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

/** What the component does vs. what is left to you. */
function Duties({ rows }: { rows: [string, ReactNode, ReactNode][] }) {
  return (
    <figure className='doc-ledger'>
      <div className='doc-ledger-scroll'>
        <table>
          <thead>
            <tr>
              <th scope='col'>Component</th>
              <th scope='col'>Handled for you</th>
              <th scope='col'>Still your job</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([name, done, todo]) => (
              <tr key={name}>
                <th scope='row'>{name}</th>
                <td>{done}</td>
                <td>{todo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

export default function AccessibilityPage() {
  return (
    <DocPage
      title='Accessibility'
      lead='The kit takes care of roles, keyboard handling and focus where it can. It can’t write your labels or decide what matters on your screen, so this page is honest about both halves.'
    >
      <H2 id='the-basics'>The basics</H2>
      <ul>
        <li>
          Native elements first: <code>&lt;button&gt;</code>,{' '}
          <code>&lt;dialog&gt;</code>, <code>&lt;details&gt;</code>,{' '}
          <code>&lt;nav&gt;</code> and <code>&lt;ol&gt;</code>. They come with
          keyboard support and semantics that no amount of ARIA fully copies.
        </li>
        <li>
          Text on tinted backgrounds uses the <code>-ink</code> tokens, which
          mix the colour with the body ink to keep contrast. Solid warning and
          light fills use dark text.
        </li>
        <li>
          State is never colour alone where the kit controls it: stamps say
          PAID, alerts have titles and icons, presence dots have a label.
        </li>
      </ul>

      <H2 id='focus-rings'>Focus rings</H2>
      <p>
        Every focusable element gets a 2px outline in <code>--oh-focus</code>{' '}
        with a 2px gap, through <code>:focus-visible</code>. Mouse clicks don't
        show it; keyboard focus always does. It is an outline, so it never
        shifts layout.
      </p>
      <Example title='Try the keyboard' demo='a11y/Focus'>
        <p>
          Click just inside the preview, then press <kbd>Tab</kbd>. In the tab
          list, use the arrow keys.
        </p>
      </Example>
      <Note title='Don’t remove it'>
        If the ring clashes with your brand, change <code>--oh-focus</code>.
        Removing the outline makes the app unusable for anyone on a keyboard.
      </Note>

      <H2 id='reduced-motion'>Reduced motion</H2>
      <p>
        With <code>prefers-reduced-motion: reduce</code>, every animation and
        transition is cut to 1ms: dropdowns, modals, toasts, the stamp thump,
        collapse heights. Modals also skip their closing delay. Nothing is lost,
        it just happens at once.
      </p>

      <H2 id='keyboard'>Keyboard maps</H2>
      <H3 id='keys-dropdown'>Dropdown</H3>
      <Keys
        title='On the trigger'
        rows={[
          ['Enter / Space', 'Toggles the menu (it is a button).'],
          ['ArrowDown', 'Opens the menu and focuses the first item.'],
          ['ArrowUp', 'Opens the menu and focuses the last item.'],
        ]}
      />
      <Keys
        title='Inside the menu'
        rows={[
          [
            'ArrowDown / ArrowUp',
            'Next / previous item. Wraps around. Disabled items are skipped.',
          ],
          ['Home / End', 'First / last item.'],
          [
            'Enter / Space',
            'Activates the item and closes the menu (unless keepOpen).',
          ],
          ['Escape', 'Closes and puts focus back on the trigger.'],
          ['Tab', 'Closes and lets focus move on.'],
        ]}
      />
      <H3 id='keys-tabs'>Tabs</H3>
      <Keys
        title='In the tab list'
        rows={[
          [
            'ArrowRight / ArrowLeft',
            'Next / previous tab, selected immediately. Reversed in RTL.',
          ],
          ['Home / End', 'First / last tab.'],
          [
            'Tab',
            'Leaves the tab list and moves into the panel. Only the selected tab is in the tab order.',
          ],
        ]}
      />
      <H3 id='keys-modal'>Modal and drawer</H3>
      <Keys
        title='While open'
        rows={[
          [
            'Tab / Shift+Tab',
            'Cycles through the dialog only. The rest of the page is inert (native <dialog>).',
          ],
          [
            'Escape',
            'Closes with the closing animation. Focus returns to whatever opened it.',
          ],
        ]}
      />
      <H3 id='keys-other'>Accordion, collapse, tooltip</H3>
      <Keys
        title='Elsewhere'
        rows={[
          [
            'Enter / Space',
            'Opens or closes an accordion item (native <summary>) or a collapse trigger.',
          ],
          ['Escape', 'Hides a visible tooltip.'],
        ]}
      />

      <H2 id='per-component'>Component by component</H2>
      <Duties
        rows={[
          [
            'Accordion',
            <>
              Native <code>&lt;details&gt;</code>; open state is announced by
              the browser.
            </>,
            'Short, specific summaries. Avoid buttons or links inside the summary.',
          ],
          [
            'Alert',
            <>
              React sets <code>role=&quot;alert&quot;</code> for danger and
              warning, <code>status</code> otherwise. Close button labelled
              &ldquo;Dismiss&rdquo;.
            </>,
            <>
              In plain HTML, add the role yourself. Only use <code>alert</code>{' '}
              for things that must interrupt.
            </>,
          ],
          [
            'Avatar',
            <>
              Initials get <code>role=&quot;img&quot;</code> and the full name
              as label; images get <code>alt</code>. Presence dots are labelled.
            </>,
            <>
              Hide decorative avatars next to a visible name with{' '}
              <code>aria-hidden</code> so the name isn't read twice.
            </>,
          ],
          [
            'Badge',
            'Plain text, so it is read as written.',
            <>
              An empty badge is a dot with no text: add{' '}
              <code>.visually-hidden</code> text. Give counters context
              (&ldquo;3 unread&rdquo;).
            </>,
          ],
          [
            'Breadcrumb',
            <>
              <code>&lt;nav aria-label&gt;</code> around an{' '}
              <code>&lt;ol&gt;</code>; last item gets{' '}
              <code>aria-current=&quot;page&quot;</code>. Dividers are CSS, so
              not read.
            </>,
            'Translate the label when the page language changes.',
          ],
          [
            'Collapse',
            <>
              React marks the closed region <code>inert</code>. Vanilla keeps{' '}
              <code>aria-expanded</code> in sync on triggers that point at it
              with <code>data-oh-target</code> or <code>href</code>.
            </>,
            <>
              Put <code>aria-expanded</code> and <code>aria-controls</code> on
              your trigger (React leaves the trigger to you).
            </>,
          ],
          [
            'Dropdown',
            <>
              <code>aria-haspopup</code>, <code>aria-expanded</code>,{' '}
              <code>role=&quot;menu&quot;</code>; React items are{' '}
              <code>menuitem</code>. Focus returns to the trigger.
            </>,
            <>
              Vanilla: add <code>role=&quot;menuitem&quot;</code> and{' '}
              <code>tabindex=&quot;-1&quot;</code> to items. Use a menu for
              actions, not for site navigation.
            </>,
          ],
          [
            'Modal',
            <>
              Native <code>showModal()</code>: focus moves in, the page behind
              is inert, Esc works. React links the title with{' '}
              <code>aria-labelledby</code>.
            </>,
            <>
              Vanilla: add <code>aria-labelledby</code> pointing at your title.
              Label the close button.
            </>,
          ],
          [
            'Tabs',
            <>
              Roles, <code>aria-selected</code>, <code>aria-controls</code>,
              roving <code>tabindex</code>, arrow keys, RTL.
            </>,
            <>
              Give the tab list an <code>aria-label</code>. Vanilla: give each
              tab an <code>id</code> so panels can be labelled by it.
            </>,
          ],
          [
            'Toast',
            <>
              Live region: <code>role=&quot;status&quot;</code> (polite),{' '}
              <code>role=&quot;alert&quot;</code> for danger. Hover pauses the
              timer.
            </>,
            <>
              Don't put the only copy of important information in a toast. Use{' '}
              <code>duration: 0</code> when the toast has an action.
            </>,
          ],
          [
            'Tooltip',
            <>
              <code>role=&quot;tooltip&quot;</code>, linked with{' '}
              <code>aria-describedby</code> while visible. Shows on focus at
              once, hides on Esc.
            </>,
            'Only for extra hints. The trigger must be focusable and must already have a name (icon buttons need aria-label).',
          ],
        ]}
      />

      <H2 id='checklist'>Before you ship a screen</H2>
      <ul>
        <li>Unplug the mouse and do the main task with the keyboard only.</li>
        <li>
          Every icon-only button has an <code>aria-label</code>.
        </li>
        <li>Every form field has a visible label, not just a placeholder.</li>
        <li>
          Headings go in order, and the page has one <code>&lt;h1&gt;</code>.
        </li>
        <li>Zoom to 200%: nothing important is cut off.</li>
        <li>
          Check both <Link to='/docs/dark-mode'>themes</Link> if you changed
          colours.
        </li>
      </ul>
    </DocPage>
  );
}
