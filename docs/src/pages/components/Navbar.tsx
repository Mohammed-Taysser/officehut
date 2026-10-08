import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function NavbarPage() {
  return (
    <DocPage
      title='Navbar'
      lead='The bar along the top of the page: a brand, a few links and a slot at the end for search, notifications and the user. It sits on a hairline with a 1px darker edge underneath, like the top sheet of a pad.'
      importLine="import { Navbar } from 'officehut/react';"
      cssFile='officehut/css/components/navbar.css'
    >
      <Example
        title='Anatomy'
        demo='nav/NavbarBasic'
        anatomy={[
          { selector: '.navbar-brand' },
          { selector: '.navbar-nav' },
          {
            selector: '.navbar-link[aria-current]',
            label: '.navbar-link (current)',
          },
          { selector: '.navbar-end' },
        ]}
      >
        <p>
          <code>brand</code> goes first, <code>children</code> become the links,
          and <code>end</code> is pushed to the far edge. The current link gets{' '}
          <code>aria-current="page"</code> through <code>active</code>, and that
          draws a 2px rule on the bar's bottom edge.
        </p>
      </Example>

      <Example title='On phones' demo='nav/NavbarHtml'>
        <p>
          Below <code>lg</code> the links fold into a row under the bar. The
          fold is the ordinary <code>.collapse</code>: in HTML the toggle is a{' '}
          <code>data-oh-toggle="collapse"</code> trigger, and the vanilla data
          API opens it and keeps <code>aria-expanded</code> in sync. From{' '}
          <code>lg</code> up, the CSS ignores the collapse and shows the links
          inline. Narrow your window to try it.
        </p>
      </Example>
      <Note title='The toggle draws its own icon'>
        An empty <code>.navbar-toggle</code> draws three lines, and a cross
        while <code>aria-expanded="true"</code>. Put an <code>&lt;svg&gt;</code>{' '}
        inside to use your own icon. It always needs an <code>aria-label</code>.
      </Note>

      <H2 id='in-a-shell'>Inside the app shell</H2>
      <p>
        In <code>.shell</code> the navbar is sticky automatically and its bottom
        edge lines up with the sidebar's brand row. There it usually has no
        links, just a <code>Navbar.Toggle</code> in <code>start</code> that
        opens the sidebar drawer. See <a href='/docs/layout/shell'>App shell</a>
        . Outside a shell, add <code>sticky</code> (<code>.navbar-sticky</code>
        ).
      </p>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Navbar props'
        rows={[
          {
            name: 'brand',
            type: 'ReactNode',
            description: 'Usually <Navbar.Brand>.',
          },
          {
            name: 'start',
            type: 'ReactNode',
            description: 'Before the brand, e.g. a drawer toggle.',
          },
          {
            name: 'children',
            type: 'ReactNode',
            description:
              '<Navbar.Link>s. Folded behind a menu toggle below lg.',
          },
          {
            name: 'end',
            type: 'ReactNode',
            description: 'Pushed to the end: search, bell, user.',
          },
          {
            name: 'menuOpen / defaultMenuOpen / onMenuOpenChange',
            type: 'boolean / fn',
            default: 'false',
            description:
              'Phone menu state, controlled or not. Closes itself after a link is chosen.',
          },
          {
            name: 'menuLabel',
            type: 'string',
            default: "'Main'",
            description: 'aria-label of the <nav>.',
          },
          {
            name: 'toggleLabel',
            type: 'string',
            default: "'Menu'",
            description: 'aria-label of the menu toggle.',
          },
          {
            name: 'sticky',
            type: 'boolean',
            description: 'Stick to the top (automatic in .shell).',
          },
        ]}
      />
      <Ledger
        title='Parts'
        rows={[
          {
            name: 'Navbar.Brand',
            type: 'as?: ElementType',
            default: "'a'",
            description: 'Logo + name.',
          },
          {
            name: 'Navbar.Link',
            type: 'active?: boolean; as?: ElementType',
            default: "'a'",
            description: 'Pass a router Link through as.',
          },
          {
            name: 'Navbar.Toggle',
            type: '<button> props',
            description: 'Square menu / close toggle driven by aria-expanded.',
          },
          {
            name: 'Navbar.Text / Navbar.Divider',
            description: 'Muted text and a hairline between controls.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          { name: '.navbar', description: 'The bar. Sticky inside .shell.' },
          { name: '.navbar-sticky', description: 'Sticky anywhere else.' },
          {
            name: '.navbar-brand / .navbar-text / .navbar-divider',
            description: 'Brand, muted text, hairline.',
          },
          {
            name: '.navbar-collapse.collapse',
            description: 'Wraps the links; folds below lg.',
          },
          {
            name: '.navbar-nav / .navbar-link',
            description:
              'Links; current one has aria-current="page" or .active.',
          },
          { name: '.navbar-end', description: 'End slot.' },
          {
            name: '.navbar-toggle',
            description: 'Menu toggle; hidden from lg up.',
          },
        ]}
      />
      <Ledger
        kind='var'
        title='Local custom properties'
        rows={[
          {
            name: '--_h',
            description: 'Bar height. Defaults to --oh-navbar-h.',
          },
          { name: '--_px', description: 'Side padding.' },
          {
            name: '--_bg',
            description: 'Background. Defaults to --oh-surface.',
          },
        ]}
      />
    </DocPage>
  );
}
