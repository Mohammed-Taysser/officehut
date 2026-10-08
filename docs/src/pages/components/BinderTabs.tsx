import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function BinderTabsPage() {
  return (
    <DocPage
      title='Binder tabs'
      lead='A ring binder with coloured index dividers sticking out of the side. Each divider opens its section. For handbooks, policies and anything long that people dip into by chapter.'
      importLine="import { Tabs } from 'officehut/react';"
      cssFile='officehut/css/components/binder.css'
    >
      <p>
        Binder tabs are ordinary <a href='/docs/components/tabs'>Tabs</a> with{' '}
        <code>variant=&apos;index&apos;</code>, placed inside a{' '}
        <code>&lt;div className=&apos;binder&apos;&gt;</code>. The binder is a
        two-column grid: the sheet on the start side, the dividers on the end
        side.
      </p>

      <Example
        title='Employee handbook'
        demo='school/binder/Handbook'
        scene
        anatomy={[
          { selector: '.binder' },
          { selector: '.tabs-index' },
          { selector: '.tab[aria-selected="true"]', label: '.tab (selected)' },
          { selector: '.tab-panel' },
        ]}
      >
        <p>
          <code>Tabs.List</code> and the <code>Tabs.Panel</code>s must be direct
          children of <code>.binder</code> — the <code>Tabs</code> provider
          itself renders no element, so wrap it around the binder. The selected
          divider moves flush against the sheet.
        </p>
      </Example>
      <Note title='Keyboard'>
        The dividers run top to bottom, so Up/Down move between them (plus Home
        and End), and the list gets{' '}
        <code>aria-orientation=&quot;vertical&quot;</code> so screen readers
        announce the right arrows. Both the React{' '}
        <code>variant=&quot;index&quot;</code> and the vanilla{' '}
        <code>.tabs-index</code> do this for you.
      </Note>

      <Example title='Divider colours' demo='school/binder/Colors'>
        <p>
          Dividers cycle through the five sticky-note colours: yellow, pink,
          blue, green, orange. To pick one yourself, set <code>--_tab</code> on
          a tab — here the archive gets a plain grey divider.
        </p>
      </Example>
      <Note title='Short labels' tone='blue'>
        Dividers are at least 6.5rem wide and grow with their label. Keep labels
        to a word or a number and a word (&ldquo;3 · Expenses&rdquo;) so the
        binder doesn&apos;t get pushed narrow.
      </Note>

      <Example title='Plain HTML' demo='school/binder/Html'>
        <p>
          Without React: the same markup as plain tabs, with{' '}
          <code>.tabs-index</code> on the list and <code>.binder</code> around
          it. Add <code>data-oh-tabs</code> and <code>initAll()</code> wires up
          clicks and arrow keys. Inactive panels start <code>hidden</code>, so
          the page is right before any script runs.
        </p>
      </Example>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Props used here'
        rows={[
          {
            name: "Tabs.List variant='index'",
            type: "'underline' | 'folder' | 'segmented' | 'index'",
            description: 'Binder dividers. See Tabs for the rest of the API.',
          },
          {
            name: 'Tabs defaultValue / value / onChange',
            type: 'string',
            description: 'Which section is open.',
          },
          {
            name: 'Tabs.Panel keepMounted',
            type: 'boolean',
            description:
              'Keep hidden sections in the DOM (e.g. for scroll position).',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          {
            name: '.binder',
            description:
              'Grid: sheet (.tab-panel) and dividers (.tabs-index). Both direct children.',
          },
          {
            name: '.tabs-index',
            description: 'Vertical list of dividers, on a .tabs list.',
          },
          {
            name: '.tabs-index .tab',
            description: 'One divider. Colour cycles every five.',
          },
          { name: '.binder > .tab-panel', description: 'The sheet of paper.' },
        ]}
      />
      <Ledger
        kind='var'
        title='Custom properties'
        rows={[
          {
            name: '--_tab',
            description: 'Local: divider colour. Set on a .tab.',
          },
          {
            name: '--oh-sticky-*',
            description: 'The five default divider colours.',
          },
        ]}
      />
    </DocPage>
  );
}
