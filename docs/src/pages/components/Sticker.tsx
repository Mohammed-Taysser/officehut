import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function StickerPage() {
  return (
    <DocPage
      title='Sticker'
      lead='The reward stickers from the back of a teacher’s desk drawer: a gold circle, a scalloped “well done”, a star. For “Employee of the month”, “Approved”, “Top seller”.'
      importLine="import { Sticker } from 'officehut/react';"
      cssFile='officehut/css/components/sticker.css'
    >
      <Example title='Shapes' demo='school/sticker/Shapes' center>
        <p>
          <code>round</code> (default), <code>scallop</code> and{' '}
          <code>star</code>. Stickers are gold unless you give them a colour,
          and sit at a -10° tilt. Keep the text to one or two short words; it is
          set in small capitals.
        </p>
      </Example>

      <Example title='Colours, sizes and tilt' demo='school/sticker/Colors'>
        <p>
          <code>color</code> takes any palette tone. <code>size</code> is{' '}
          <code>sm</code>, <code>md</code> or <code>lg</code>, and{' '}
          <code>tilt</code> sets the angle in degrees — <code>0</code> for a
          straight sticker.
        </p>
      </Example>

      <Example
        title='Employee of the month'
        demo='school/sticker/EmployeeOfMonth'
        scene
        anatomy={[
          { selector: '.sticker' },
          { selector: '.avatar' },
          { selector: '.eyebrow' },
        ]}
      >
        <p>
          The monthly shout-out on the intranet home page. The card already says
          &ldquo;Employee of the month&rdquo; in text, so the sticker is marked{' '}
          <code>aria-hidden</code>.
        </p>
      </Example>
      <Note title='Decoration, not information'>
        A sticker is decoration. Repeat the state in text — a{' '}
        <a href='/docs/components/badge'>Badge</a>, a column, a sentence — so
        screen readers, printouts and people skimming the page all get it. Then
        hide the sticker with <code>aria-hidden</code> so the state isn&apos;t
        read twice.
      </Note>

      <Example title='Approved claims' demo='school/sticker/Claims'>
        <p>
          An expense claim gets an &ldquo;Approved&rdquo; sticker once the
          manager signs it off. The badge underneath carries the actual status
          for everyone, including claims that are still waiting.
        </p>
      </Example>

      <Example title='Plain HTML' demo='school/sticker/Html' center>
        <p>
          A <code>&lt;span class=&quot;sticker&quot;&gt;</code> with shape, tone
          and size classes. Set the angle with the <code>--_tilt</code> custom
          property.
        </p>
      </Example>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Sticker props'
        rows={[
          {
            name: 'shape',
            type: "'round' | 'scallop' | 'star'",
            default: "'round'",
            description: 'Outline.',
          },
          {
            name: 'color',
            type: 'Color',
            description: 'Palette tone. Gold when not set.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: '3rem, 4.5rem or 6.5rem.',
          },
          {
            name: 'tilt',
            type: 'number',
            default: '-10',
            description: 'Rotation in degrees.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          {
            name: '.sticker',
            description: 'Round gold sticker with a dashed inner ring.',
          },
          {
            name: '.sticker-scallop / .sticker-star',
            description: 'Shapes (clip-path).',
          },
          {
            name: '.sticker-{color}',
            description: 'Tone: primary, success, danger, aurora…',
          },
          { name: '.sticker-sm / .sticker-lg', description: 'Sizes.' },
        ]}
      />
      <Ledger
        kind='var'
        title='Custom properties'
        rows={[
          { name: '--oh-gold', description: 'Default sticker colour.' },
          { name: '--_tilt', description: 'Local: rotation. Default -10deg.' },
          {
            name: '--_size',
            description: 'Local: width and height; text size follows.',
          },
          {
            name: '--_bg / --_fg',
            description: 'Local: fill and text colour.',
          },
        ]}
      />
    </DocPage>
  );
}
