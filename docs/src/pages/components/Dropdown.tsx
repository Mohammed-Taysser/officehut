import { Link } from 'react-router';
import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function DropdownPage() {
  return (
    <DocPage
      title='Dropdown'
      lead='A short menu of actions that opens from a button: export formats, row actions, who to assign a ticket to. It positions itself, flips when there is no room, and works fully from the keyboard.'
      importLine="import { Dropdown } from 'officehut/react';"
      cssFile='officehut/css/components/dropdown.css'
    >
      <Example title='Basic' demo='dropdown/Basic' center minHeight={200}>
        <p>
          Pass the button as <code>trigger</code> and the items as children.
          Choosing an item closes the menu and returns focus to the button.{' '}
          <code>.dropdown-toggle</code> on the trigger adds the caret.
        </p>
      </Example>

      <Example
        title='Icons, shortcuts and groups'
        demo='dropdown/Items'
        center
        minHeight={300}
      >
        <p>
          Items take an <code>icon</code>, a <code>shortcut</code> hint,{' '}
          <code>danger</code> for destructive actions and <code>disabled</code>.{' '}
          <code>Dropdown.Header</code> labels a group and{' '}
          <code>Dropdown.Divider</code> separates groups.
        </p>
      </Example>
      <Note title='Shortcuts are only a hint'>
        <code>shortcut</code> prints the key; it doesn&apos;t bind it. Wire the
        real shortcut yourself, or leave the hint out.
      </Note>

      <Example
        title='Placement'
        demo='dropdown/Placement'
        center
        minHeight={220}
      >
        <p>
          Any of the twelve placements: <code>top</code>, <code>bottom</code>,{' '}
          <code>left</code>, <code>right</code>, each with <code>-start</code>{' '}
          or <code>-end</code>. If the menu would run off the screen it flips to
          the opposite side, then slides along to stay in view.
        </p>
      </Example>

      <Example
        title='Without React'
        demo='dropdown/DataApi'
        center
        minHeight={240}
      >
        <p>
          A <code>.dropdown</code> wrapper, a trigger with{' '}
          <code>data-oh-toggle=&quot;dropdown&quot;</code>, and the{' '}
          <code>.dropdown-menu</code> right after it. The script adds{' '}
          <code>aria-haspopup</code> and <code>aria-expanded</code> to the
          trigger; give the items <code>role=&quot;menuitem&quot;</code> and{' '}
          <code>tabindex=&quot;-1&quot;</code> yourself.
        </p>
      </Example>
      <Note title='Keyboard'>
        <kbd>ArrowDown</kbd> on the trigger opens the menu on the first item,{' '}
        <kbd>ArrowUp</kbd> on the last. Inside, arrows move and wrap,{' '}
        <kbd>Home</kbd>/<kbd>End</kbd> jump, <kbd>Esc</kbd> closes and returns
        focus, <kbd>Tab</kbd> closes and moves on. With the vanilla API,
        arrow-key opening starts working once the dropdown has been created; see{' '}
        <Link to='/docs/javascript#late-markup'>markup added later</Link>.
      </Note>

      <Example
        title='Static menu'
        demo='dropdown/Static'
        anatomy={[
          { selector: '.dropdown-header' },
          { selector: '.dropdown-item.active', label: '.dropdown-item.active' },
          { selector: '.dropdown-shortcut' },
          { selector: '.dropdown-divider' },
          { selector: '.dropdown-item.is-danger', label: '.is-danger' },
        ]}
      >
        <p>
          <code>.is-static</code> renders a menu in the page flow, which is
          useful for showing the parts.
        </p>
      </Example>

      <Example
        title='Row actions'
        demo='dropdown/RowActions'
        scene
        minHeight={320}
      >
        <p>
          An icon button per row with{' '}
          <code>placement=&quot;bottom-end&quot;</code> so the menu lines up
          with the end of the row. Each trigger has its own label, so a screen
          reader hears which vendor the actions are for.
        </p>
      </Example>
      <Note title='Menus render into body' tone='blue'>
        The React menu is portalled to <code>&lt;body&gt;</code> while open, so
        a parent with <code>overflow: hidden</code> can&apos;t clip it. The flip
        side: it takes the theme of the page, not of a{' '}
        <code>data-oh-theme</code> panel around the trigger.
      </Note>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Dropdown props'
        rows={[
          {
            name: 'trigger',
            type: 'ReactElement',
            description:
              'The element that opens the menu. Gets ref, aria-* and click/keyboard handlers merged in.',
          },
          {
            name: 'placement',
            type: 'Placement',
            default: "'bottom-start'",
            description: 'Where the menu opens.',
          },
          {
            name: 'open / defaultOpen',
            type: 'boolean',
            description: 'Controlled or initial state.',
          },
          {
            name: 'onOpenChange',
            type: '(open: boolean) => void',
            description: 'Called when it opens or closes.',
          },
          {
            name: 'keepOpen',
            type: 'boolean',
            description:
              'Stay open after an item is chosen (checkbox-like menus).',
          },
          {
            name: 'aria-label',
            type: 'string',
            description:
              'Name for the menu when the trigger text is not enough.',
          },
          {
            name: 'className',
            type: 'string',
            description: 'Extra classes on .dropdown-menu.',
          },
        ]}
      />
      <Ledger
        title='Dropdown.Item props'
        rows={[
          {
            name: 'icon',
            type: 'ReactNode',
            description: 'Leading icon, sized to 1rem.',
          },
          {
            name: 'shortcut',
            type: 'string',
            description: 'Key hint at the end.',
          },
          {
            name: 'danger',
            type: 'boolean',
            description: 'Destructive styling.',
          },
          {
            name: 'active',
            type: 'boolean',
            description: 'Current choice; sets aria-current.',
          },
          { name: 'href', type: 'string', description: 'Render as a link.' },
          {
            name: '...button props',
            type: 'ComponentProps<"button">',
            description: 'onClick, disabled…',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          {
            name: '.dropdown',
            description: 'Wrapper around trigger and menu (vanilla).',
          },
          {
            name: '.dropdown-toggle',
            description: 'Caret after the trigger label.',
          },
          {
            name: '.dropdown-menu',
            description:
              'The menu. .is-open shows it, .is-static puts it in the flow.',
          },
          {
            name: '.dropdown-item',
            description: 'An action. .active, .is-danger, .disabled.',
          },
          {
            name: '.dropdown-header / .dropdown-divider',
            description: 'Group label and separator.',
          },
          { name: '.dropdown-shortcut', description: 'Key hint (a <kbd>).' },
        ]}
      />
      <Ledger
        kind='attr'
        title='Data API (on the trigger)'
        rows={[
          {
            name: 'data-oh-toggle="dropdown"',
            description: 'Makes it a trigger.',
          },
          {
            name: 'data-oh-target',
            description:
              'Menu selector, when the menu is not the next sibling.',
          },
          {
            name: 'data-oh-placement',
            description: 'Placement. Default bottom-start.',
          },
          { name: 'data-oh-offset', description: 'Gap in px. Default 6.' },
          {
            name: 'data-oh-auto-close',
            description:
              '"false" keeps the menu open after an item is clicked.',
          },
        ]}
      />
      <Ledger
        kind='event'
        rows={[
          {
            name: 'oh:show / oh:hide',
            type: 'cancelable',
            description: 'On the trigger, before opening or closing.',
          },
          {
            name: 'oh:shown / oh:hidden',
            description: 'On the trigger, after.',
          },
        ]}
      />
    </DocPage>
  );
}
