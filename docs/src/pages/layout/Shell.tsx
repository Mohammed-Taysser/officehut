import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function ShellPage() {
  return (
    <DocPage
      title='App shell'
      lead='The desk the rest of the app sits on: a sidebar binder down one side, a navbar across the top, and the page underneath with a ruled header. It is one CSS grid, and the drawer on phones uses the stock collapse toggle.'
      cssFile='officehut/css/layout/shell.css'
    >
      <Example
        title='Sidebar + navbar'
        demo='shell/Combo'
        scene
        anatomy={[
          { selector: '.sidebar', label: '.sidebar' },
          { selector: '.navbar', label: '.navbar' },
          { selector: '.page-header', label: '.page-header' },
          { selector: '.shell-main', label: '.shell-main' },
        ]}
      >
        <p>
          <code>.shell</code> is a grid with three areas. From <code>lg</code>{' '}
          up the sidebar takes the first column at <code>--oh-sidebar-w</code>{' '}
          and stays pinned while the page scrolls. The navbar is sticky over{' '}
          <code>.shell-main</code>. Below <code>lg</code> the column goes away,
          the sidebar becomes a drawer, and <code>Navbar.Toggle</code> opens it.
        </p>
      </Example>
      <Note title='Previewing a shell in a box'>
        The pinned sidebar and the drawer use <code>position: fixed</code>, so
        on a real page they follow the window. These previews keep them inside
        the frame by giving the wrapper a fixed height and{' '}
        <code>contain: paint</code>, which makes it the containing block for
        fixed children. Do the same for a shell in a storybook or an iframe-less
        preview. You don't need it in your app.
      </Note>

      <Example title='Plain HTML' demo='shell/ComboHtml' scene>
        <p>
          The same layout without React. The navbar toggle, the{' '}
          <code>.sidebar-close</code> button and the{' '}
          <code>.sidebar-backdrop</code> are all{' '}
          <code>data-oh-toggle="collapse"</code> triggers aimed at the sidebar.
          Collapse flips <code>.is-open</code> on it, which is all the drawer
          needs. The group inside uses the same API.
        </p>
      </Example>

      <Example title='Top navigation only' demo='shell/TopNav' scene>
        <p>
          No sidebar? Skip <code>.shell</code>, because its grid would keep an
          empty sidebar column on wide screens. A <code>Navbar</code> with{' '}
          <code>sticky</code> over a <code>.container.page</code> is all you
          need, and its links fold into a menu on phones.
        </p>
      </Example>

      <H2 id='markup'>Markup order</H2>
      <p>
        Keep the sidebar first and the backdrop straight after it (the CSS finds
        it with <code>.sidebar.is-open + .sidebar-backdrop</code>). Then put the
        navbar, then <code>&lt;main class="shell-main"&gt;</code>. Inside main,
        a <code>.page</code> with a <code>.page-header</code>: eyebrow,{' '}
        <code>.page-title</code>, <code>.page-subtitle</code> and{' '}
        <code>.page-actions</code> pushed to the end.
      </p>
      <Note title='Accessibility' tone='blue'>
        Use <code>&lt;main&gt;</code> for <code>.shell-main</code> and label the
        sidebar's <code>&lt;aside&gt;</code> and <code>&lt;nav&gt;</code>. Add a
        "Skip to content" link as the first thing in <code>&lt;body&gt;</code> (
        <code>.visually-hidden-focusable</code>). The React sidebar closes on
        Escape. In plain HTML, add the small listener shown in the Vanilla JS
        tab above.
      </Note>

      <H2 id='reference'>Reference</H2>
      <Ledger
        kind='class'
        title='Shell classes'
        rows={[
          {
            name: '.shell',
            description:
              "Grid: 'navbar' / 'main', plus a 'sidebar' column from lg up.",
          },
          {
            name: '.shell > .sidebar',
            description: 'Pinned (position: fixed) from lg up; drawer below.',
          },
          { name: '.shell > .navbar', description: 'Sticky to the top.' },
          { name: '.shell-main', description: 'The page area. Use <main>.' },
          { name: '.page', description: 'Vertical padding for a page.' },
          {
            name: '.page-header',
            description: 'Title row with a ruled line under it.',
          },
          {
            name: '.page-title / .page-subtitle / .page-actions',
            description: 'Parts of the header.',
          },
          {
            name: '.section-title',
            description: 'Small caps heading with a rule after it.',
          },
        ]}
      />
      <Ledger
        kind='var'
        title='Tokens'
        rows={[
          { name: '--oh-sidebar-w', description: 'Sidebar column width.' },
          {
            name: '--oh-navbar-h',
            description: 'Navbar height; the sidebar brand row matches it.',
          },
          {
            name: '--oh-z-navbar / --oh-z-sticky',
            description: 'Navbar and pinned sidebar layers.',
          },
          {
            name: '--oh-z-backdrop',
            description: 'Drawer backdrop; the drawer sits one above.',
          },
        ]}
      />
    </DocPage>
  );
}
