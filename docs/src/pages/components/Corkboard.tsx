import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function CorkboardPage() {
  return (
    <DocPage
      title='Corkboard'
      lead='The noticeboard by the lifts: cork in a wooden frame, notices held up with push pins, and a paper clip on anything that has attachments.'
      importLine="import { Corkboard, Pinned, Card } from 'officehut/react';"
      cssFile='officehut/css/components/corkboard.css'
    >
      <p>
        A corkboard suits a page of loosely related notices — announcements, a
        team&apos;s wins, lost property. For a list people need to scan or sort,
        use a <a href='/docs/components/table'>Table</a> or a list of cards
        instead.
      </p>

      <Example
        title='Announcements board'
        demo='school/corkboard/Board'
        scene
        anatomy={[
          { selector: '.corkboard' },
          { selector: '.pinned' },
          { selector: '.clipped' },
        ]}
      >
        <p>
          <code>Corkboard</code> is a wrapping flex row on cork. Wrap each
          notice in <code>Pinned</code> to push a pin through its top edge — a
          card, a <a href='/docs/components/sticky-note'>sticky note</a>, a{' '}
          <a href='/docs/components/date-tile'>date tile</a>, anything. Give
          pinned items a width; the board doesn&apos;t size them for you.
        </p>
      </Example>

      <Example title='Pins and tilt' demo='school/corkboard/Pins'>
        <p>
          <code>pin</code> is <code>red</code> (default), <code>blue</code>,{' '}
          <code>green</code> or <code>yellow</code>. <code>tilt</code> is{' '}
          <code>none</code>, <code>left</code> or <code>right</code>. Mix them
          so the board doesn&apos;t look printed.
        </p>
      </Example>
      <Note title='Accessibility'>
        The cork, pins and paper clips are drawn with CSS and say nothing to
        screen readers. Give the board an <code>aria-label</code> if it is a
        region of its own, and render notices as <code>&lt;article&gt;</code> (
        <code>as=&apos;article&apos;</code>) so each is a unit. If a pin colour
        means something (blue = HR), write that in the notice as well.
      </Note>

      <Example title='Paper clip' demo='school/corkboard/Clipped'>
        <p>
          <code>Card</code>&apos;s <code>clipped</code> prop puts a paper clip
          over the top edge, meaning &ldquo;something is attached&rdquo;. It
          works on any element with the <code>.clipped</code> class, on or off a
          corkboard. Say how many attachments there are in the text.
        </p>
      </Example>

      <Example title='Plain HTML' demo='school/corkboard/Html'>
        <p>
          All of this is classes: <code>.corkboard</code>, <code>.pinned</code>{' '}
          with <code>.pin-*</code> and <code>.tilt-*</code>, and{' '}
          <code>.clipped</code>. No script.
        </p>
      </Example>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Corkboard props'
        rows={[
          {
            name: '…div props',
            type: 'ComponentPropsWithRef<div>',
            description: 'Renders a div.corkboard.',
          },
        ]}
      />
      <Ledger
        title='Pinned props (also Corkboard.Pinned)'
        rows={[
          {
            name: 'pin',
            type: "'red' | 'blue' | 'green' | 'yellow'",
            default: "'red'",
            description: 'Push-pin colour.',
          },
          {
            name: 'tilt',
            type: "'left' | 'right' | 'none'",
            default: "'none'",
            description: 'Rotation.',
          },
          {
            name: 'as',
            type: 'ElementType',
            default: "'div'",
            description: "e.g. 'article', 'li'.",
          },
        ]}
      />
      <Ledger
        title='Card'
        rows={[
          {
            name: 'clipped',
            type: 'boolean',
            description: 'Paper clip over the top edge (.clipped).',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          {
            name: '.corkboard',
            description: 'Cork in a wooden frame; wrapping flex row.',
          },
          { name: '.pinned', description: 'Red push pin on the top edge.' },
          { name: '.pin-{blue|green|yellow}', description: 'Pin colour.' },
          {
            name: '.tilt-left / .tilt-right',
            description: 'Rotate -2.5° / 2°.',
          },
          {
            name: '.clipped',
            description: 'Paper clip at the top end corner (::after).',
          },
        ]}
      />
      <Ledger
        kind='var'
        title='Custom properties'
        rows={[
          {
            name: '--oh-cork / --oh-cork-dot',
            description: 'Cork colour and its speckles.',
          },
          { name: '--oh-frame', description: 'Wooden frame.' },
          { name: '--_pin', description: 'Local: pin colour, any CSS colour.' },
          { name: '--_tilt', description: 'Local: rotation of a pinned item.' },
        ]}
      />
    </DocPage>
  );
}
