import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function BrowserSupportPage() {
  return (
    <DocPage
      title='Browser support'
      lead='The last two versions of Chrome, Edge, Firefox and Safari. Office machines update slowly, so here is exactly which newer features the kit leans on and what happens without them.'
    >
      <H2 id='targets'>Targets</H2>
      <p>
        The <code>browserslist</code> in <code>package.json</code> is the last
        two versions of each evergreen browser, and not dead. The minified CSS
        is built for Chrome 111, Firefox 113 and Safari 16.4 or newer, which is
        when <code>color-mix()</code> arrived everywhere. Internet Explorer and
        pre-Chromium Edge are not supported.
      </p>

      <Example title='Your browser' demo='browser/Check' center>
        <p>
          A live check of the features below, in the browser you are reading
          this with.
        </p>
      </Example>

      <H2 id='features'>What the kit relies on</H2>
      <Ledger
        kind='prop'
        rows={[
          {
            name: 'color-mix()',
            type: 'required',
            description:
              'Every soft tint, border tint, ink and hover colour is mixed at runtime. Without it those colours are missing and tinted components lose their backgrounds.',
          },
          {
            name: 'Custom properties',
            type: 'required',
            description: 'All tokens and the tone system.',
          },
          {
            name: 'Logical properties',
            type: 'required',
            description:
              'margin-inline, inset-inline and friends; this is how RTL works.',
          },
          {
            name: '<dialog> + showModal()',
            type: 'required',
            description:
              'Modals and drawers. Focus trapping, Esc and the top layer come from the browser.',
          },
          {
            name: ':has()',
            type: 'required',
            description:
              'Layout tweaks such as a card making room for its folder tab. Without it those tweaks are skipped.',
          },
          {
            name: 'inert',
            type: 'required',
            description:
              'React Collapse keeps closed content out of the tab order with it.',
          },
          {
            name: '<details name>',
            type: 'enhancement',
            description:
              'Exclusive accordions (one open at a time). Older browsers let several items open at once.',
          },
          {
            name: 'interpolate-size, ::details-content',
            type: 'enhancement',
            description:
              'Smooth height animation for accordion items. Without them the items open instantly.',
          },
          {
            name: 'CSS grid rows 0fr → 1fr',
            type: 'required',
            description: 'The collapse height animation, with no JS measuring.',
          },
        ]}
      />

      <Note title='Progressive, not polyfilled'>
        The kit doesn't ship polyfills. Where a feature is an enhancement, the
        fallback is the plain version of the same thing: the accordion still
        opens, just without the slide.
      </Note>

      <H2 id='react'>React</H2>
      <p>
        The React bindings need React 19 or newer. They use <code>ref</code> as
        a regular prop, the <code>use()</code> hook and context providers
        written as <code>&lt;Context value&gt;</code>, which older versions
        don't have.
      </p>

      <H2 id='print'>Print</H2>
      <p>
        Print styles are on by default: colours become black on white, shadows
        go, navigation, buttons and toasts are hidden, and external links print
        their address. Add <code>.d-print-none</code> to anything else that
        shouldn't reach paper, or turn the layer off with{' '}
        <code>$enable-print: false</code>.
      </p>
    </DocPage>
  );
}
