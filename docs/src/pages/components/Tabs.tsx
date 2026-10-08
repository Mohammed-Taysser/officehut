import { Link } from 'react-router';
import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function TabsPage() {
  return (
    <DocPage
      title='Tabs'
      lead='Switch between views of the same thing without leaving the page. One markup, three looks: an underline for page sections, manila folder tabs for records, and a segmented control for ranges and filters.'
      importLine="import { Tabs } from 'officehut/react';"
      cssFile='officehut/css/components/tabs.css'
    >
      <Example
        title='Underline'
        demo='tabs/Underline'
        anatomy={[
          { selector: '.tabs', label: '.tabs' },
          {
            selector: '.tab[aria-selected="true"]',
            label: '.tab[aria-selected]',
          },
          { selector: '.tab-panel' },
        ]}
      >
        <p>
          <code>Tabs</code> holds the state, <code>Tabs.List</code> the buttons,{' '}
          <code>Tabs.Panel</code> the content. Tabs and panels are matched by{' '}
          <code>value</code>. Only the selected panel is mounted unless you pass{' '}
          <code>keepMounted</code>.
        </p>
      </Example>

      <Example title='Folder tabs' demo='tabs/Folder' scene>
        <p>
          <code>variant=&quot;folder&quot;</code> draws manila tabs that sit on
          the panel, like the dividers in a filing drawer. The panel right after
          the list becomes the sheet of paper.
        </p>
      </Example>

      <Example title='Segmented' demo='tabs/Segmented'>
        <p>
          <code>variant=&quot;segmented&quot;</code> is a compact switch for
          ranges and filters. Add <code>fill</code> to any variant to stretch
          the tabs across the row.
        </p>
      </Example>
      <Note title='Tabs or buttons?'>
        If the choice changes what the panel below shows, it is tabs. If it
        changes data elsewhere (a chart&apos;s range, a table filter), a{' '}
        <Link to='/docs/components/button'>button group</Link> with{' '}
        <code>aria-pressed</code> is more honest to screen reader users. Both
        can look segmented.
      </Note>

      <Example title='Without React' demo='tabs/DataApi'>
        <p>
          Write the roles and <code>aria-controls</code> yourself and add{' '}
          <code>data-oh-toggle=&quot;tab&quot;</code> to each tab. Mark the list
          with <code>data-oh-tabs</code> so <code>initAll()</code> sets up the
          keyboard on load.
        </p>
      </Example>
      <Note title='Keyboard'>
        Only the selected tab is in the Tab order. <kbd>ArrowLeft</kbd>/
        <kbd>ArrowRight</kbd> move and select at once (reversed in RTL),{' '}
        <kbd>Home</kbd>/<kbd>End</kbd> jump, and <kbd>Tab</kbd> moves into the
        panel. Disabled tabs are skipped.
      </Note>

      <Example title='A vendor record' demo='tabs/Settings' scene>
        <p>Folder tabs inside a card, one of them carrying a count.</p>
      </Example>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Tabs props'
        rows={[
          {
            name: 'defaultValue',
            type: 'string',
            description: 'Required. Initially selected tab.',
          },
          {
            name: 'value',
            type: 'string',
            description: 'Controlled selection.',
          },
          {
            name: 'onChange',
            type: '(value: string) => void',
            description: 'Called when a tab is selected.',
          },
        ]}
      />
      <Ledger
        title='Tabs.List props'
        rows={[
          {
            name: 'variant',
            type: "'underline' | 'folder' | 'segmented'",
            default: "'underline'",
            description: 'Look.',
          },
          {
            name: 'fill',
            type: 'boolean',
            description: 'Tabs share the full width.',
          },
          {
            name: 'aria-label',
            type: 'string',
            description: 'Name the group.',
          },
        ]}
      />
      <Ledger
        title='Tabs.Tab and Tabs.Panel props'
        rows={[
          {
            name: 'value',
            type: 'string',
            description: 'Required on both. Links a tab to its panel.',
          },
          {
            name: 'disabled',
            type: 'boolean',
            description: 'Tab only. Skipped by the arrow keys.',
          },
          {
            name: 'keepMounted',
            type: 'boolean',
            description:
              'Panel only. Keep it in the DOM while hidden, to preserve form state.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          {
            name: '.tabs',
            description:
              'The list (role="tablist"). Scrolls sideways when it overflows.',
          },
          { name: '.tabs-folder / .tabs-segmented', description: 'Variants.' },
          { name: '.tabs-fill', description: 'Stretch tabs.' },
          {
            name: '.tab',
            description:
              'A tab. Selected with aria-selected="true" (or .active for nav-style links).',
          },
          {
            name: '.tab-panel',
            description: 'A panel. Hidden with the hidden attribute.',
          },
        ]}
      />
      <Ledger
        kind='attr'
        title='Data API'
        rows={[
          {
            name: 'data-oh-tabs',
            description:
              'On the list: set up roles, tabindex and keys when initAll() runs.',
          },
          {
            name: 'data-oh-toggle="tab"',
            description: 'On each tab. aria-controls names its panel.',
          },
        ]}
      />
      <Ledger
        kind='event'
        rows={[
          {
            name: 'oh:change',
            type: 'cancelable',
            description:
              'On the list, before a tab is selected. detail.tab is the new tab.',
          },
        ]}
      />
    </DocPage>
  );
}
