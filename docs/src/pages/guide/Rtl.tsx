import { CodeBlock } from '../../components/CodeBlock';
import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

const HTML = `<html lang="ar" dir="rtl" data-oh-theme="light">`;

const FONT = `:root {
  /* Ubuntu has no Arabic glyphs. Put an Arabic face first for RTL pages. */
  --oh-font-sans: 'IBM Plex Sans Arabic', 'Ubuntu', system-ui, sans-serif;
}`;

const OWN_CSS = `/* Write your own styles the same way. */
.ticket-meta {
  margin-inline-start: auto;   /* not margin-left */
  padding-inline: 0.75rem;     /* not padding-left/right */
  border-inline-start: 3px solid var(--oh-warning);
  text-align: start;           /* not left */
}`;

export default function RtlPage() {
  return (
    <DocPage
      title='Right-to-left'
      lead='The kit is written with logical properties (start and end instead of left and right), so Arabic, Hebrew and Persian pages work by setting dir="rtl". There is no separate RTL stylesheet.'
    >
      <H2 id='turning-it-on'>Turning it on</H2>
      <p>Set the direction and language on the root element:</p>
      <CodeBlock code={HTML} lang='html' />
      <p>
        <code>dir</code> also works on any element, so a mostly English admin
        can show an Arabic letter or address block in place.
      </p>

      <Example title='An Arabic leave request' demo='rtl/Arabic' scene>
        <p>
          Breadcrumb, card with a status edge on the start side, avatar, badge,
          alert and footer buttons. Nothing here has RTL-specific classes; the
          status edge, icon and <code>.ms-auto</code> all follow the direction.
          Flip the bench direction switch to see the same markup in LTR.
        </p>
      </Example>

      <H2 id='what-flips'>What flips for you</H2>
      <ul>
        <li>
          Paddings, margins, borders and positions in every component: alert
          note margins, card status edges and folder tabs, avatar presence dots,
          corner badges, the drawer side, toast edges.
        </li>
        <li>
          Spacing utilities: <code>ms-*</code> and <code>me-*</code> mean
          margin-inline-start and end; <code>ps-*</code>, <code>pe-*</code>,{' '}
          <code>border-start</code>, <code>border-end</code>,{' '}
          <code>text-start</code> and <code>text-end</code> likewise.
        </li>
        <li>Grid offsets and the order of flex rows.</li>
        <li>
          Arrow keys in tabs. Right arrow moves to the next tab in LTR and to
          the previous one in RTL, because &ldquo;next&rdquo; is on the left.
        </li>
        <li>
          The notebook margin line and margin notes move to the right edge.
        </li>
      </ul>

      <Example title='Logical utilities' demo='rtl/Logical'>
        <p>
          The same markup in both directions. <code>.ms-auto</code> pushes the
          hint to the end of the line, and the blockquote rule sits on the start
          side.
        </p>
      </Example>
      <CodeBlock code={OWN_CSS} lang='scss' label='your.css' />

      <H2 id='what-does-not'>What you still handle</H2>
      <ul>
        <li>
          <strong>Fonts.</strong> Ubuntu has no Arabic glyphs, so browsers fall
          back to a system font. Put an Arabic face at the front of{' '}
          <code>--oh-font-sans</code>.
        </li>
        <li>
          <strong>Directional icons.</strong> An arrow meaning
          &ldquo;next&rdquo; should point left in RTL. Flip it with{' '}
          <code>
            [dir=&apos;rtl&apos;] .icon-next {'{ transform: scaleX(-1) }'}
          </code>{' '}
          or swap the icon. Icons that aren't about direction (a printer, a
          clock) should not flip.
        </li>
        <li>
          <strong>Numbers and dates.</strong> Whether you show ٢١ or 21 is a
          content decision. Use <code>Intl.NumberFormat</code> and{' '}
          <code>Intl.DateTimeFormat</code> with the user's locale.
        </li>
        <li>
          <strong>Mixed text.</strong> Invoice numbers, emails and code inside
          Arabic sentences can reorder oddly. Wrap them in{' '}
          <code>&lt;bdi&gt;</code> or give them <code>dir=&quot;ltr&quot;</code>
          .
        </li>
      </ul>
      <CodeBlock code={FONT} lang='scss' />
      <Note title='Placement is physical'>
        Dropdown and tooltip placements such as <code>bottom-start</code>{' '}
        currently mean &ldquo;aligned to the left edge&rdquo; in both
        directions. In an RTL layout, use <code>bottom-end</code> when you want
        a menu to line up with the start of its trigger.
      </Note>

      <H2 id='reference'>Reference</H2>
      <Ledger
        kind='class'
        title='Direction-aware utilities'
        rows={[
          {
            name: '.ms-{0-7|auto} / .me-*',
            description: 'margin-inline-start / end.',
          },
          {
            name: '.ps-{0-7} / .pe-*',
            description: 'padding-inline-start / end.',
          },
          { name: '.mx-* / .px-*', description: 'Both inline sides.' },
          {
            name: '.border-start / .border-end',
            description: 'Border on one inline side.',
          },
          {
            name: '.text-start / .text-end',
            description:
              'Text alignment; responsive variants like .text-md-end.',
          },
          {
            name: '.offset-{n}',
            description: 'Grid offset, from the start side.',
          },
        ]}
      />
    </DocPage>
  );
}
