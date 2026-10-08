import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function StickyNotePage() {
  return (
    <DocPage
      title='Sticky note'
      lead='A square of coloured paper stuck to the screen: a reminder, a review comment, a message for whoever sits here next. Five colours, a slight tilt, and a lifted corner.'
      importLine="import { Sticky, StickyWall } from 'officehut/react';"
      cssFile='officehut/css/components/sticky.css'
    >
      <p>
        Use a sticky note for a short remark that sits <em>beside</em> the main
        content rather than inside it. If the message is part of the page&apos;s
        job (a failed payment, a closed office), an{' '}
        <a href='/docs/components/alert'>Alert</a> is the better choice.
      </p>

      <Example title='Five colours' demo='school/sticky/Colors'>
        <p>
          Yellow is the default; <code>pink</code>, <code>blue</code>,{' '}
          <code>green</code> and <code>orange</code> each come with their own
          small tilt, so a row of notes never looks lined up with a ruler.{' '}
          <code>StickyWall</code> lays them out in a grid that fills the width.
          In HTML that is <code>.sticky-wall</code> around{' '}
          <code>.sticky.sticky-pink</code> and friends.
        </p>
      </Example>

      <Example
        title='Handwritten, taped, straight'
        demo='school/sticky/Hand'
        anatomy={[
          { selector: '.sticky-hand' },
          { selector: '.sticky-taped' },
          { selector: '.sticky-title' },
        ]}
      >
        <p>
          <code>hand</code> writes the note in the hand font. <code>taped</code>{' '}
          adds a strip of clear tape across the top. <code>straight</code>{' '}
          removes the tilt, which helps for long text and tidy grids.{' '}
          <code>title</code> renders a bold first line (
          <code>.sticky-title</code>).
        </p>
      </Example>
      <Note title='Keep handwriting short'>
        The hand font is slower to read than the body font. Use it for a
        sentence or two, and keep anything people copy (order numbers, codes,
        phone numbers) in the typed note.
      </Note>

      <Example title='Comments on a document' demo='school/sticky/Review' scene>
        <p>
          Reviewers&apos; comments stuck beside the paragraphs they refer to.{' '}
          <code>as=&apos;aside&apos;</code> renders an{' '}
          <code>&lt;aside&gt;</code>, which is what a side remark is. Give each
          one an <code>aria-label</code> naming who wrote it and what it refers
          to, so it makes sense out of context in a screen reader&apos;s
          landmark list.
        </p>
      </Example>
      <Note title='Accessibility' tone='blue'>
        The note colour carries no meaning for screen readers. If pink means
        &ldquo;blocking&rdquo; in your team, write &ldquo;Blocking:&rdquo; in
        the note as well. The tilt is a CSS transform only, so text still
        selects and wraps normally.
      </Note>

      <Example title='Plain HTML' demo='school/sticky/Html'>
        <p>
          No JavaScript involved: a <code>.sticky</code> element with modifier
          classes. The HTML tab has the markup to copy.
        </p>
      </Example>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Sticky props'
        rows={[
          {
            name: 'color',
            type: "'yellow' | 'pink' | 'blue' | 'green' | 'orange'",
            default: "'yellow'",
            description: 'Paper colour. Each has its own tilt.',
          },
          {
            name: 'title',
            type: 'ReactNode',
            description: 'Bold first line (.sticky-title).',
          },
          {
            name: 'hand',
            type: 'boolean',
            description: 'Write the note in the hand font.',
          },
          {
            name: 'taped',
            type: 'boolean',
            description: 'A strip of clear tape across the top.',
          },
          { name: 'straight', type: 'boolean', description: 'No tilt.' },
          {
            name: 'as',
            type: 'ElementType',
            default: "'div'",
            description: "Use 'aside' for side remarks, 'li' inside a list.",
          },
        ]}
      />
      <Ledger
        title='StickyWall props'
        rows={[
          {
            name: 'className / children',
            type: 'string / ReactNode',
            description:
              'A responsive grid of notes (.sticky-wall), about 12rem per column.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          { name: '.sticky', description: 'The note. Yellow by default.' },
          {
            name: '.sticky-{pink|blue|green|orange|yellow}',
            description: 'Colour.',
          },
          { name: '.sticky-title', description: 'Bold first line.' },
          {
            name: '.sticky-hand',
            description: 'Hand font; the title becomes underlined.',
          },
          {
            name: '.sticky-taped',
            description: 'Tape strip, drawn with ::before.',
          },
          { name: '.sticky-straight', description: 'No tilt.' },
          { name: '.sticky-wall', description: 'Auto-fill grid of notes.' },
        ]}
      />
      <Ledger
        kind='var'
        title='Custom properties'
        rows={[
          {
            name: '--oh-sticky-{yellow|pink|blue|green|orange}',
            description: 'Paper colours. Darker in night shift.',
          },
          {
            name: '--oh-sticky-ink',
            description: 'Text colour on every note.',
          },
          { name: '--_bg', description: 'Local: this note’s paper colour.' },
          {
            name: '--_tilt',
            description: 'Local: rotation, e.g. style="--_tilt: 3deg".',
          },
        ]}
      />
    </DocPage>
  );
}
