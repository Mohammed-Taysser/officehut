import { Link } from 'react-router';
import { CodeBlock } from '../../components/CodeBlock';
import { DocPage, H2, H3 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

const INIT = `import { initAll } from 'officehut';

const teardown = initAll(); // safe to call twice; returns the same teardown
// later, e.g. in a test:
teardown();`;

const MARKUP = `<button class="btn" data-oh-toggle="collapse" data-oh-target="#filters" aria-expanded="false">
  Filters
</button>
<div class="collapse" id="filters"><div>…</div></div>`;

const CLASSES = `import { Modal, Dropdown, Collapse, Tabs, getInstance, getOrCreate } from 'officehut';

const dialog = document.querySelector('#approve-leave');

// One instance per element and component. getOrCreate never makes a second one.
const modal = getOrCreate(Modal, dialog, { backdropClose: false });
modal.show();
modal.hide();
modal.isOpen; // false

// Only look, don't create:
getInstance(Modal, dialog); // the instance above, or null

// new Modal(dialog) also works, but replaces (and destroys) an existing instance.
modal.destroy(); // removes its listeners`;

const LATE = `// initAll() set up tab lists that existed at the time.
// For markup added later, create the instance once so arrow keys work
// before the first click:
import { getOrCreate, Tabs, Dropdown } from 'officehut';

container.innerHTML = renderTicketTabs();
getOrCreate(Tabs, container.querySelector('.tabs'));
getOrCreate(Dropdown, container.querySelector('[data-oh-toggle="dropdown"]'));`;

const EVENTS = `document.addEventListener('oh:hide', (event) => {
  const form = event.target.querySelector('form');
  if (form?.dataset.dirty && !confirm('Discard your changes to this expense?')) {
    event.preventDefault(); // the modal stays open
  }
});

document.querySelector('#period-tabs').addEventListener('oh:change', (event) => {
  loadTimesheets(event.detail.tab.dataset.period);
});`;

const REGISTER = `import { registerToggle, resolveTarget, toast } from 'officehut';

// <button class="btn" data-oh-toggle="copy" data-oh-target="#iban">Copy IBAN</button>
registerToggle('copy', (trigger) => {
  const source = resolveTarget(trigger);
  navigator.clipboard.writeText(source.textContent.trim());
  toast({ message: 'IBAN copied', color: 'success', duration: 2000 });
});`;

const TOAST = `import { toast } from 'officehut';

const close = toast({
  title: 'Invoice sent',
  message: 'INV-2041 to Acme Logistics',
  color: 'success',
  duration: 5000,           // 0 = stays until closed
  position: 'bottom-end',   // 'bottom-start' | 'top-end' | 'top-start'
  action: { label: 'Undo', onClick: () => unsend('INV-2041') },
});

close(); // dismiss early

toast('Saved'); // a plain string is the message`;

const HELPERS = `import { dismiss, showTooltip, hideTooltip, closeDropdowns } from 'officehut';

dismiss(document.querySelector('#welcome-alert')); // same as clicking its close button
showTooltip(button, 'Locked by Mona until 16:00');
hideTooltip();
closeDropdowns(); // e.g. on client-side route change`;

export default function JavascriptPage() {
  return (
    <DocPage
      title='Vanilla JS API'
      lead='A few kilobytes of JavaScript for the components that need behaviour. Most of the time you write HTML attributes and call initAll() once. When you need more, every behaviour is also a class you can drive from code.'
    >
      <H2 id='init-all'>initAll()</H2>
      <p>
        <code>initAll()</code> adds a handful of delegated listeners to{' '}
        <code>document</code>: one for clicks, a few for tooltips. Because they
        are delegated, markup added later (by a framework, a fetch, a template)
        works without calling anything again. The CDN build calls it for you.
      </p>
      <CodeBlock code={INIT} lang='js' />

      <H2 id='data-attributes'>Data attributes</H2>
      <p>
        A trigger names the behaviour and, where needed, the element it
        controls:
      </p>
      <CodeBlock code={MARKUP} lang='html' />
      <p>
        The target is found from <code>data-oh-target</code> (any CSS selector),
        then <code>href=&quot;#id&quot;</code>, then <code>aria-controls</code>.
        Triggers that are <code>:disabled</code>, <code>.disabled</code> or{' '}
        <code>aria-disabled=&quot;true&quot;</code> are ignored.
      </p>
      <Ledger
        kind='attr'
        title='Triggers'
        rows={[
          {
            name: 'data-oh-toggle="collapse"',
            description: (
              <>
                Toggles the target <code>.collapse</code>. Keeps{' '}
                <code>aria-expanded</code> in sync.{' '}
                <Link to='/docs/components/collapse'>Collapse</Link>
              </>
            ),
          },
          {
            name: 'data-oh-toggle="dropdown"',
            description: (
              <>
                Toggles the next sibling <code>.dropdown-menu</code>, or{' '}
                <code>data-oh-target</code>.{' '}
                <Link to='/docs/components/dropdown'>Dropdown</Link>
              </>
            ),
          },
          {
            name: 'data-oh-toggle="modal"',
            description: (
              <>
                Opens the target{' '}
                <code>&lt;dialog class=&quot;modal&quot;&gt;</code>.{' '}
                <Link to='/docs/components/modal'>Modal</Link>
              </>
            ),
          },
          {
            name: 'data-oh-toggle="tab"',
            description: (
              <>
                Selects this tab inside its <code>.tabs</code> list and shows
                the panel named by <code>aria-controls</code>.{' '}
                <Link to='/docs/components/tabs'>Tabs</Link>
              </>
            ),
          },
          {
            name: 'data-oh-toggle="theme"',
            description: (
              <>
                Sets <code>data-oh-value</code> as the page theme, or flips
                light/dark without a value.{' '}
                <Link to='/docs/dark-mode'>Dark mode</Link>
              </>
            ),
          },
          {
            name: 'data-oh-dismiss',
            description: (
              <>
                Closes the closest <code>.alert</code>, <code>.toast</code>,{' '}
                <code>.chip</code> or <code>[data-oh-dismissable]</code>. Use{' '}
                <code>=&quot;modal&quot;</code> for the closest dialog, or a
                selector.
              </>
            ),
          },
          {
            name: 'data-oh-tooltip="text"',
            description: (
              <>
                Shows a tooltip on hover (250ms delay) and focus.{' '}
                <Link to='/docs/components/tooltip'>Tooltip</Link>
              </>
            ),
          },
        ]}
      />
      <Ledger
        kind='attr'
        title='Options'
        rows={[
          {
            name: 'data-oh-target',
            description: 'Selector of the element a trigger controls.',
          },
          {
            name: 'data-oh-value',
            description: 'Theme to set: light, dark or auto.',
          },
          {
            name: 'data-oh-placement',
            description:
              'Dropdown or tooltip placement, e.g. bottom-end, top, right-start.',
          },
          {
            name: 'data-oh-offset',
            description: 'Dropdown: gap to the trigger in px. Default 6.',
          },
          {
            name: 'data-oh-auto-close',
            description:
              'Dropdown: "false" keeps the menu open after an item is clicked.',
          },
          {
            name: 'data-oh-parent',
            description:
              'Collapse: selector of a container; opening one closes its open siblings.',
          },
          {
            name: 'data-oh-backdrop-close',
            description: 'Modal: "false" ignores clicks on the backdrop.',
          },
        ]}
      />
      <p>
        Options are read once, when the instance is created. They are matched by
        name to the constructor options, so <code>data-oh-auto-close</code>{' '}
        becomes <code>autoClose</code>.
      </p>

      <Example title='Events, live' demo='js/EventLog'>
        <p>
          Open the filters and the export dialog; each component announces what
          it does. The Vanilla JS tab shows how to listen, cancel, and drive the
          same components from code.
        </p>
      </Example>

      <H2 id='events'>Events</H2>
      <p>
        Events are dispatched on the component's element as{' '}
        <code>CustomEvent</code>s and bubble, so you can listen on{' '}
        <code>document</code>. The <code>show</code>, <code>hide</code>,{' '}
        <code>change</code> and <code>dismiss</code> events fire before anything
        happens and can be cancelled with <code>preventDefault()</code>.
      </p>
      <CodeBlock code={EVENTS} lang='js' />
      <Ledger
        kind='event'
        rows={[
          {
            name: 'oh:show',
            type: 'cancelable',
            description:
              'Collapse, dropdown or modal is about to open. Fired on the collapse region, the dropdown trigger, or the dialog.',
          },
          { name: 'oh:shown', description: 'It is open.' },
          {
            name: 'oh:hide',
            type: 'cancelable',
            description: 'About to close.',
          },
          {
            name: 'oh:hidden',
            description:
              'Closed. For modals, fired after the dialog has closed and focus has returned.',
          },
          {
            name: 'oh:change',
            type: 'cancelable',
            description:
              'Tabs: a tab is about to be selected. Fired on the tab list; detail.tab is the new tab.',
          },
          {
            name: 'oh:dismiss',
            type: 'cancelable',
            description:
              'An alert, toast or chip is about to be removed. Fired on that element.',
          },
          {
            name: 'oh:dismissed',
            description:
              'It has left the DOM. Fired on document; detail.element is the removed node.',
          },
          {
            name: 'oh:theme',
            description:
              'Theme changed by setTheme / toggleTheme. Fired on the themed root; detail.theme.',
          },
        ]}
      />

      <H2 id='classes'>Driving components from code</H2>
      <p>
        Each behaviour is a class. Instances are stored per element, so the data
        API and your code share the same instance.
      </p>
      <CodeBlock code={CLASSES} lang='js' />
      <Ledger
        kind='prop'
        title='Classes'
        rows={[
          {
            name: 'Collapse(el, { parent })',
            type: 'show · hide · toggle · isOpen',
            description: 'el is the .collapse region.',
          },
          {
            name: 'Dropdown(trigger, { placement, offset, autoClose })',
            type: 'show(focus?) · hide(returnFocus?) · toggle · update · isOpen · menu',
            description: "show('first' | 'last') also focuses an item.",
          },
          {
            name: 'Modal(dialog, { backdropClose })',
            type: 'show(trigger?) · hide · toggle · isOpen',
            description:
              'el must be a <dialog>. Focus returns to trigger on close.',
          },
          {
            name: 'Tabs(list)',
            type: 'select(tab) · tabs()',
            description: 'list is the .tabs / role=tablist element.',
          },
          {
            name: 'getInstance(Class, el)',
            type: 'instance | null',
            description: 'Existing instance, never creates one.',
          },
          {
            name: 'getOrCreate(Class, el, options?)',
            type: 'instance',
            description: 'Existing instance, or a new one with these options.',
          },
        ]}
      />

      <H3 id='late-markup'>Markup added after initAll()</H3>
      <p>
        Clicks always work. Two things are set up ahead of time, though: tab
        lists present when <code>initAll()</code> runs get their roles and{' '}
        <code>tabindex</code>, and a dropdown trigger listens for{' '}
        <kbd>ArrowDown</kbd> only once its instance exists. For markup that
        arrives later, create the instances yourself:
      </p>
      <CodeBlock code={LATE} lang='js' />
      <Note title='Tabs that arrive later'>
        Until a <code>Tabs</code> instance exists, the panels'{' '}
        <code>hidden</code> attributes are whatever your markup says. Render the
        inactive panels with <code>hidden</code> and the inactive tabs with{' '}
        <code>tabindex=&quot;-1&quot;</code>, and the page looks right from the
        start.
      </Note>

      <H2 id='toast'>toast()</H2>
      <p>
        Toasts have no markup to write: <code>toast()</code> builds one, puts it
        in a stack in the chosen corner, and returns a function that closes it.
      </p>
      <CodeBlock code={TOAST} lang='js' />

      <H2 id='register-toggle'>Your own toggles</H2>
      <p>
        <code>registerToggle(name, handler)</code> adds a{' '}
        <code>data-oh-toggle</code> value. The handler gets the trigger and the
        click event, and runs through the same delegated listener.
      </p>
      <CodeBlock code={REGISTER} lang='js' />

      <H2 id='helpers'>Other helpers</H2>
      <CodeBlock code={HELPERS} lang='js' />
      <Ledger
        kind='prop'
        rows={[
          {
            name: 'dismiss(el)',
            type: 'boolean',
            description:
              'Fade out and remove. False if oh:dismiss was cancelled.',
          },
          {
            name: 'showTooltip(el, text?) / hideTooltip()',
            type: 'void',
            description: 'There is one shared tooltip bubble.',
          },
          {
            name: 'bindTooltips(root?)',
            type: '() => void',
            description:
              'Tooltip listeners only, without the rest of initAll().',
          },
          {
            name: 'closeDropdowns()',
            type: 'void',
            description: 'Close whichever menu is open.',
          },
          {
            name: 'resolveTarget(trigger)',
            type: 'HTMLElement | null',
            description: 'The target lookup the data API uses.',
          },
          {
            name: 'trapFocus(el) / lockScroll()',
            type: '() => void',
            description:
              'For custom overlays. Each returns its own release function.',
          },
          {
            name: 'computePosition(anchor, float, opts)',
            type: '{ x, y, placement }',
            description:
              'The positioning maths behind menus and tooltips, for position: fixed.',
          },
          {
            name: 'initials(name) / colorFor(name)',
            type: 'string / Color',
            description:
              'What Avatar uses: “Mona Adel” → “MA” and a stable colour.',
          },
          {
            name: 'cx(...values)',
            type: 'string',
            description: 'Tiny class-name joiner.',
          },
          {
            name: 'version',
            type: 'string',
            description: 'The installed version.',
          },
        ]}
      />
    </DocPage>
  );
}
