import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function MarkerPage() {
  return (
    <DocPage
      title='Marker'
      lead='Mark up text the way you would on a printout: a highlighter swipe, a red-pen underline, a squiggle under something doubtful, a circle round the number that matters.'
      importLine="import { Marker } from 'officehut/react';"
      cssFile='officehut/css/components/marker.css'
    >
      <Example title='Highlighter' demo='school/marker/Highlights'>
        <p>
          The default <code>variant</code> is <code>highlight</code>: a soft,
          slightly uneven swipe behind the text, in yellow, <code>pink</code>,{' '}
          <code>green</code> or <code>blue</code>. It wraps across lines
          cleanly. In HTML it is{' '}
          <code>{'<mark class="highlight highlight-pink">'}</code>.
        </p>
      </Example>
      <Note title='Accessibility'>
        Only the highlighter renders a <code>&lt;mark&gt;</code>, because only a
        highlight means &ldquo;relevant here&rdquo;. Most screen readers
        don&apos;t announce <code>&lt;mark&gt;</code> by default, so if the
        colour code matters (pink = risk), say so in a legend or in the text.
      </Note>

      <Example title='Pen marks' demo='school/marker/PenMarks'>
        <p>
          <code>underline</code> (a ruler-straight line), <code>wavy</code>{' '}
          (&ldquo;check this&rdquo;), <code>double</code> (totals and final
          answers), <code>circle</code> and <code>strike</code>. These render a{' '}
          <code>&lt;span&gt;</code>, except <code>strike</code>, which renders{' '}
          <code>&lt;s&gt;</code> — text that is no longer accurate but still
          worth reading.
        </p>
      </Example>
      <Note title='Strike vs. delete' tone='blue'>
        <code>&lt;s&gt;</code> means &ldquo;no longer relevant&rdquo;. For
        tracked edits in a document, where something was removed, use{' '}
        <code>&lt;del&gt;</code> with the <code>.strike-pen</code> class
        instead.
      </Note>

      <Example title='Pen colour' demo='school/marker/Pens'>
        <p>
          Pen marks are red by default. <code>pen=&apos;blue&apos;</code> is a
          ballpoint and <code>pen=&apos;pencil&apos;</code> a soft grey — good
          for tentative notes. In HTML add <code>.pen-blue</code> or{' '}
          <code>.pen-pencil</code> next to the mark class.
        </p>
      </Example>

      <Example title='Reviewing a lease' demo='school/marker/Contract' scene>
        <p>
          Highlights for the terms, a squiggle under the vague wording, the
          notice period circled, and a clause crossed out — with a{' '}
          <a href='/docs/components/sticky-note'>sticky note</a> and a{' '}
          <a href='/docs/components/grade'>grade</a> beside it.
        </p>
      </Example>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Marker props'
        rows={[
          {
            name: 'variant',
            type: "'highlight' | 'underline' | 'wavy' | 'double' | 'circle' | 'strike'",
            default: "'highlight'",
            description:
              'Kind of mark. Element: <mark> for highlight, <s> for strike, <span> otherwise.',
          },
          {
            name: 'color',
            type: "'yellow' | 'pink' | 'green' | 'blue'",
            default: "'yellow'",
            description: 'Highlighter colour. Highlight only.',
          },
          {
            name: 'pen',
            type: "'red' | 'blue' | 'pencil'",
            default: "'red'",
            description: 'Pen colour. Every variant except highlight.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          {
            name: '.highlight',
            description: 'Highlighter swipe. Use on <mark>.',
          },
          {
            name: '.highlight-{pink|green|blue}',
            description: 'Highlighter colour.',
          },
          {
            name: '.underline-pen',
            description: 'Straight 2px pen underline.',
          },
          { name: '.underline-wavy', description: 'Wavy underline.' },
          {
            name: '.underline-double',
            description: 'Double underline (ink colour by default).',
          },
          {
            name: '.circled',
            description: 'Hand-drawn ellipse round the text (inline-block).',
          },
          { name: '.strike-pen', description: 'Crossed out in pen.' },
          {
            name: '.pen-blue / .pen-pencil',
            description: 'Pen colour for the marks above.',
          },
          {
            name: '.ink-pen / .ink-red',
            description: 'Text colour in blue or red pen.',
          },
        ]}
      />
      <Ledger
        kind='var'
        title='Custom properties'
        rows={[
          {
            name: '--oh-marker / -pink / -green / -blue',
            description: 'Highlighter colours (translucent).',
          },
          {
            name: '--oh-pen / --oh-pen-red / --oh-pencil',
            description: 'Pen colours.',
          },
          { name: '--_m', description: 'Local: this highlight’s colour.' },
          { name: '--_pen', description: 'Local: this pen mark’s colour.' },
        ]}
      />
    </DocPage>
  );
}
