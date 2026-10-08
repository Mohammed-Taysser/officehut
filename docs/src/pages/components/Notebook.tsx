import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function NotebookPage() {
  return (
    <DocPage
      title='Notebook'
      lead='A page from a school exercise book: blue ruling, a red margin, punched holes if you like. Text snaps to the lines, headings take two of them, and the margin is where dates, numbers and ticks go.'
      importLine="import { Notebook, MarginNote, Handwriting } from 'officehut/react';"
      cssFile='officehut/css/components/notebook.css'
    >
      <p>
        Use it where a screen is really a page of notes: meeting minutes, a
        checklist, an onboarding plan, an empty state that invites people to
        write something. It is not meant for forms or tables.
      </p>

      <Example title='A lined page' demo='notebook/Lined' scene>
        <p>
          <code>Notebook</code> renders a <code>.notebook</code>;{' '}
          <code>holes</code> adds the punched holes down the margin edge. Its
          direct children (headings, paragraphs, lists) are spaced in whole
          lines, so nothing drifts off the ruling however long the page gets.
        </p>
      </Example>
      <Note title='Keep children direct'>
        The snapping works on direct children. If you wrap a few paragraphs in a{' '}
        <code>&lt;div&gt;</code>, their margins no longer come in whole lines
        and the text slowly slides between the rules. Use{' '}
        <code>.notebook-tight</code> on a child that should sit on the very next
        line.
      </Note>

      <Example title='Squared maths paper' demo='notebook/Squared' scene>
        <p>
          <code>squared</code> swaps the lines for a grid at half the line
          height. With <code>.font-mono</code> and <code>.tabular-nums</code>,
          columns of figures line up like a sum worked out by hand.
        </p>
      </Example>

      <Example
        title='Margin notes and ticks'
        demo='notebook/Marked'
        scene
        anatomy={[
          { selector: '.notebook-margin', label: '.notebook-margin' },
          { selector: '.notebook-check', label: '.notebook-check' },
          { selector: '.handwriting' },
        ]}
      >
        <p>
          <code>MarginNote</code> writes in the margin on the same line as its
          parent, so put it inside the heading or paragraph it belongs to.{' '}
          <code>.notebook-check</code> puts a green teacher&apos;s tick in the
          margin. <code>Handwriting</code> is for short asides in the hand font.
        </p>
      </Example>
      <Note title='Accessibility'>
        <code>MarginNote</code> is <code>aria-hidden</code>: it is decoration
        for sighted readers. If the margin says something that matters
        (&ldquo;overdue&rdquo;, a step number people refer to), say it in the
        text too. The tick is drawn by CSS, so add <code>.visually-hidden</code>{' '}
        text such as &ldquo;(done)&rdquo; to checked lines.
      </Note>

      <Example title='Right-to-left' demo='notebook/Rtl' scene>
        <p>
          Under <code>dir=&quot;rtl&quot;</code> the margin line, the holes,
          margin notes and ticks all move to the right edge.
        </p>
      </Example>

      <Example title='Plain HTML' demo='notebook/Html'>
        <p>Classes only, no script. The HTML tab shows everything you need.</p>
      </Example>
      <Note title='The hand font' tone='blue'>
        <code>--oh-font-hand</code> starts with Patrick Hand, which the kit
        doesn&apos;t bundle. Install it (<code>@fontsource/patrick-hand</code>)
        or accept the fallback, which is whatever handwriting or cursive font
        the system has.
      </Note>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Notebook props'
        rows={[
          {
            name: 'holes',
            type: 'boolean',
            description: 'Punched holes down the margin edge.',
          },
          {
            name: 'squared',
            type: 'boolean',
            description: 'Squared maths paper instead of lines.',
          },
          {
            name: 'as',
            type: 'ElementType',
            default: "'div'",
            description: 'e.g. article or section.',
          },
        ]}
      />
      <Ledger
        title='Helpers'
        rows={[
          {
            name: 'MarginNote (Notebook.Margin)',
            type: 'span props',
            description:
              'Text in the margin, aligned with its parent line. aria-hidden by default.',
          },
          {
            name: 'Handwriting',
            type: 'span props',
            description: 'Inline text in the hand font.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          {
            name: '.notebook',
            description: 'The page: ruling, margin line, paper edge.',
          },
          { name: '.notebook-holes', description: 'Punched holes.' },
          { name: '.notebook-squared', description: 'Squared paper.' },
          {
            name: '.notebook-margin',
            description: 'Margin note, inside a heading or paragraph.',
          },
          {
            name: '.notebook-check',
            description: 'Tick in the margin for this line.',
          },
          { name: '.notebook-tight', description: 'No gap above this child.' },
          {
            name: '.handwriting',
            description:
              'Hand font at 1.15em. Works anywhere, not only in notebooks.',
          },
        ]}
      />
      <Ledger
        kind='var'
        rows={[
          {
            name: '--oh-ruling',
            default: '#c9daec',
            description: 'Line colour. #2b3644 in night shift.',
          },
          {
            name: '--oh-margin-line',
            default: '#e3a2a2',
            description: 'Margin line colour. #6a3a3d in night shift.',
          },
          {
            name: '--oh-font-hand',
            default: "'Patrick Hand', …, cursive",
            description: 'Hand font stack.',
          },
          {
            name: '--_rule',
            default: '1.75rem',
            description:
              'Line height of the page. Set on .notebook to rule wider or narrower.',
          },
          {
            name: '--_margin',
            default: '3.25rem',
            description: 'Distance of the margin line from the edge.',
          },
        ]}
      />
    </DocPage>
  );
}
