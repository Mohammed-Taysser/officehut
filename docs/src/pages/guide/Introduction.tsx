import { Link } from 'react-router';
import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Note } from '../../components/Note';

export default function IntroductionPage() {
  return (
    <DocPage
      title='Introduction'
      lead='officehut is a small UI kit for dashboards and back-office screens: timesheets, invoices, tickets, room bookings. It is plain CSS first, with a few kilobytes of vanilla JS for the parts that need behaviour, and typed React components on top.'
    >
      <H2 id='what-you-get'>What you get</H2>
      <ul>
        <li>
          <strong>CSS.</strong> Design tokens as custom properties, a small
          reset, typography, a grid, components and utilities. Every component
          works from HTML classes alone.
        </li>
        <li>
          <strong>Vanilla JS.</strong> Dropdowns, modals, tabs, collapses,
          tooltips, toasts and the theme switch. You write{' '}
          <code>data-oh-*</code> attributes, call <code>initAll()</code> once,
          and you are done. The bundle has a 10&nbsp;kB budget.
        </li>
        <li>
          <strong>React.</strong> The same components as typed React 19
          components. They render the same class names, so the HTML you see in
          these docs is the HTML React produces.
        </li>
      </ul>
      <p>
        You can stop at any layer. A server-rendered admin page can use the CSS
        and the data attributes and never ship React. A React app can ignore the
        vanilla API entirely.
      </p>

      <Example title='A quick look' demo='intro/Desk' scene>
        <p>
          A timesheet card with a folder tab, a stamped approval and a short
          warning; next to it, a stacked card with segmented tabs. Use the
          switches above the preview to try night shift, compact density and
          right-to-left.
        </p>
      </Example>

      <H2 id='the-paper-idea'>The paper idea</H2>
      <p>
        The kit is styled after an office desk rather than a glass screen. That
        gives it a few habits you will see on every page:
      </p>
      <ul>
        <li>
          Surfaces are sheets of paper: a hairline border and a 1px darker
          bottom edge. No blur, no large shadows.
        </li>
        <li>
          Badges have a <Link to='/docs/components/badge'>stamp</Link> variant
          for document states such as PAID or VOID.
        </li>
        <li>
          Tabs and cards can wear a{' '}
          <Link to='/docs/components/tabs'>manila folder tab</Link>; cards can
          sit on a stack of other sheets.
        </li>
        <li>
          Buttons press down like a key. Alerts can look like a note with a
          coloured margin line.
        </li>
        <li>
          The dark theme is called <Link to='/docs/dark-mode'>night shift</Link>
          : a charcoal desk under a lamp, not pure black.
        </li>
      </ul>
      <p>
        Colours are muted ink tones. <code>aurora</code>, a dusty violet, is the
        house accent.
      </p>

      <H2 id='principles'>A few rules the kit follows</H2>
      <ul>
        <li>
          Native elements first. Modals are <code>&lt;dialog&gt;</code>,
          accordions are <code>&lt;details&gt;</code>. The browser handles focus
          trapping and Esc.
        </li>
        <li>
          Logical properties everywhere, so <code>dir=&quot;rtl&quot;</code>{' '}
          works without a second stylesheet.
        </li>
        <li>
          Theme and density are attributes (<code>data-oh-theme</code>,{' '}
          <code>data-oh-density</code>) that can be set on any element, not only
          on <code>&lt;html&gt;</code>.
        </li>
        <li>
          Dashboards are dense. The base font size is 14px and there is a
          compact density for tables and long forms.
        </li>
      </ul>

      <Note title='Where to start'>
        Read <Link to='/docs/installation'>Installation</Link>, then pick a
        component from the sidebar. Every example has HTML and React tabs, and a
        Vanilla JS tab where there is behaviour to wire up.
      </Note>
    </DocPage>
  );
}
