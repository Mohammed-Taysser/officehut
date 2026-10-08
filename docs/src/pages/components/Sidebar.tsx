import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function SidebarPage() {
  return (
    <DocPage
      title='Sidebar'
      lead='The binder down the side of the app. Section labels are handwritten like chapter titles, and the page you are on is swiped with a highlighter.'
      importLine="import { Sidebar, Nav } from 'officehut/react';"
      cssFile='officehut/css/components/sidebar.css'
    >
      <Example
        title='Anatomy'
        demo='nav/SidebarBasic'
        anatomy={[
          { selector: '.sidebar-header' },
          { selector: '.nav-label' },
          { selector: '.nav-toggle', label: '.nav-toggle (group)' },
          { selector: '.nav-link[aria-current]', label: '.nav-link (current)' },
          { selector: '.nav-badge' },
          { selector: '.sidebar-footer' },
        ]}
      >
        <p>
          <code>Sidebar</code> gives you the frame: <code>brand</code> on top
          (level with the navbar), a scrolling body, and a <code>footer</code>.
          Put a <code>Nav</code> in the body. It takes plain data: links,{' '}
          <code>{'{ heading }'}</code> labels, and items with <code>items</code>{' '}
          that become collapsible groups. Pass <code>currentHref</code> and it
          marks the matching link and opens the group that holds it.
        </p>
      </Example>

      <Example title='Plain HTML groups' demo='nav/SidebarHtml'>
        <p>
          Groups need no JavaScript of their own. The toggle is a{' '}
          <code>data-oh-toggle="collapse"</code> trigger and the children sit in
          a stock <code>.collapse</code>, so the data API handles them. Wrap
          each label in <code>.nav-text</code> so the highlighter covers just
          the words.
        </p>
      </Example>

      <Example title='Router links' demo='nav/NavRouter' center>
        <p>
          <code>linkAs</code> swaps the <code>&lt;a&gt;</code> for your router's
          link. It receives <code>href</code>, so map that to <code>to</code> in
          a small wrapper. Feed the router's location into{' '}
          <code>currentHref</code>. The links in this demo really move between
          these docs pages.
        </p>
      </Example>

      <H2 id='responsive'>Phones and tablets</H2>
      <p>
        From <code>lg</code> up the sidebar is part of the page. Inside{' '}
        <code>.shell</code> it is pinned to the start edge at full height while
        the page scrolls. Below <code>lg</code> it is hidden, and adding{' '}
        <code>.is-open</code> slides it in as a drawer over a backdrop. In HTML,
        point any collapse trigger at it:{' '}
        <code>data-oh-toggle="collapse" data-oh-target="#sidebar"</code>. Use it
        on the navbar toggle, the <code>.sidebar-close</code> button and the{' '}
        <code>.sidebar-backdrop</code>. In React, pass <code>open</code> and{' '}
        <code>onClose</code>. That adds the close button and the backdrop, and
        closes on Escape. <a href='/docs/layout/shell'>App shell</a> shows the
        whole set-up.
      </p>
      <Note title='Not a drawer?'>
        For a sidebar that belongs to the content, like settings sections or a
        filter column, add <code>static</code> (<code>.sidebar-static</code>).
        It stays in the flow at every width and never becomes a drawer.
      </Note>
      <Note title='Accessibility' tone='blue'>
        Give the <code>&lt;aside&gt;</code> and the <code>&lt;nav&gt;</code>{' '}
        labels, especially if the page has another nav. Group toggles are real
        buttons with <code>aria-expanded</code> and <code>aria-controls</code>.
        Closed groups are <code>inert</code> in React and{' '}
        <code>visibility: hidden</code> in CSS, so hidden links never take
        focus.
      </Note>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Sidebar props'
        rows={[
          {
            name: 'brand',
            type: 'ReactNode',
            description: 'Top row. Usually <Sidebar.Brand>.',
          },
          {
            name: 'children',
            type: 'ReactNode',
            description: 'Scrolling body, usually a <Nav>.',
          },
          {
            name: 'footer',
            type: 'ReactNode',
            description: 'Pinned to the bottom.',
          },
          {
            name: 'open',
            type: 'boolean',
            default: 'false',
            description: 'Drawer state below lg.',
          },
          {
            name: 'onClose',
            type: '() => void',
            description:
              'Adds a close button and backdrop; also called on Escape.',
          },
          {
            name: 'closeLabel',
            type: 'string',
            default: "'Close menu'",
            description: 'aria-label of the close button.',
          },
          {
            name: 'static',
            type: 'boolean',
            description: 'Always in the flow; never a drawer or pinned.',
          },
        ]}
      />
      <Ledger
        title='Nav props'
        rows={[
          {
            name: 'items',
            type: 'NavEntry[]',
            description:
              'Links, { heading } labels and groups (items with items).',
          },
          {
            name: 'currentHref',
            type: 'string',
            description: 'Marks the link with this href as the current page.',
          },
          {
            name: 'linkAs',
            type: 'ElementType',
            default: "'a'",
            description: 'Router link component. Receives href.',
          },
          {
            name: 'openGroups / defaultOpenGroups / onOpenGroupsChange',
            type: 'string[] / fn',
            description:
              'Open group ids. Defaults to the groups holding the current page.',
          },
          {
            name: 'label',
            type: 'string',
            default: "'Main'",
            description: 'aria-label of the <nav>.',
          },
        ]}
      />
      <Ledger
        title='NavLinkItem'
        rows={[
          { name: 'label', type: 'ReactNode', description: 'Link text.' },
          {
            name: 'href',
            type: 'string',
            description: 'Without it the item renders as a button.',
          },
          {
            name: 'icon / badge',
            type: 'ReactNode',
            description: 'Leading icon, trailing count.',
          },
          {
            name: 'current / disabled',
            type: 'boolean',
            description: 'Overrides currentHref / greys the item out.',
          },
          {
            name: 'items',
            type: 'NavLinkItem[]',
            description: 'Makes it a collapsible group.',
          },
          {
            name: 'id',
            type: 'string',
            description:
              'Stable key and group id. Defaults to href, then the label.',
          },
          {
            name: 'onClick',
            type: '(event) => void',
            description: 'Called on click.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          {
            name: '.sidebar',
            description:
              'The panel. Drawer below lg; pinned in .shell from lg up.',
          },
          { name: '.sidebar.is-open', description: 'Drawer shown (below lg).' },
          {
            name: '.sidebar-static',
            description: 'Opt out of the drawer and pinning.',
          },
          {
            name: '.sidebar-header / .sidebar-brand / .sidebar-close',
            description: 'Top row, brand link, drawer close button.',
          },
          {
            name: '.sidebar-body / .sidebar-footer',
            description: 'Scrolling middle, bottom row.',
          },
          {
            name: '.sidebar-backdrop',
            description:
              'Next sibling of the sidebar; shown while the drawer is open.',
          },
          {
            name: '.nav-list / .nav-item / .nav-link',
            description:
              'The list. Current link: aria-current="page" or .active.',
          },
          {
            name: '.nav-icon / .nav-text / .nav-badge',
            description: 'Parts of a link.',
          },
          { name: '.nav-label', description: 'Handwritten section heading.' },
          {
            name: '.nav-group / .nav-toggle(.has-current)',
            description: 'Collapsible group and its button.',
          },
        ]}
      />
      <Ledger
        kind='var'
        title='Local custom properties'
        rows={[
          { name: '--_w', description: 'Width. Defaults to --oh-sidebar-w.' },
          { name: '--_bg', description: 'Panel background.' },
          { name: '--_px', description: 'Side padding of the body.' },
          {
            name: '--_marker',
            description: 'Highlighter colour (on .nav-list).',
          },
        ]}
      />
    </DocPage>
  );
}
