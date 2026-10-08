import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function ChalkboardPage() {
  return (
    <DocPage
      title='Chalkboard'
      lead='Dark slate in a wooden frame, with two sticks of chalk on the ledge. For things written up for everyone to see: today’s agenda, the standup notes, the canteen menu.'
      importLine="import { Chalkboard } from 'officehut/react';"
      cssFile='officehut/css/components/chalkboard.css'
    >
      <Example title='Today’s agenda' demo='school/chalkboard/Agenda' scene>
        <p>
          <code>Chalkboard</code> renders a <code>.chalkboard</code>;{' '}
          <code>hand</code> writes everything in the hand font (
          <code>.chalkboard-hand</code>). Headings inside are always in chalk
          handwriting. There are no lines behind the text, so longer content
          stays easy to read.
        </p>
      </Example>

      <Example title='Coloured chalk' demo='school/chalkboard/Standup'>
        <p>
          Four chalk colours as text classes — <code>.chalk-yellow</code>,{' '}
          <code>.chalk-pink</code>, <code>.chalk-blue</code>,{' '}
          <code>.chalk-green</code> — plus <code>.chalk-dim</code> for secondary
          text and <code>.chalk-underline</code> for emphasis.
        </p>
      </Example>
      <Note title='Accessibility'>
        Chalk on slate is light text on a dark surface in both themes; the chalk
        colours are chosen to keep contrast above 4.5:1 there. Don&apos;t rely
        on the colour alone — &ldquo;Blocked:&rdquo; is written out in the
        standup above.
      </Note>

      <Example title='Canteen menu' demo='school/chalkboard/Menu' center>
        <p>
          <code>as=&apos;section&apos;</code> with <code>aria-labelledby</code>{' '}
          makes the board a named region. Buttons inside can use{' '}
          <code>.btn-chalk</code>: a dashed chalk outline that suits the slate.
        </p>
      </Example>

      <Example title='Codes and passwords' demo='school/chalkboard/Code'>
        <p>
          Leave out <code>hand</code> for anything people copy.{' '}
          <code>&lt;code&gt;</code> inside the board gets a faint chalk
          background.
        </p>
      </Example>
      <Note title='Plain HTML' tone='blue'>
        It is one class:{' '}
        <code>{'<div class="chalkboard chalkboard-hand">'}</code>. The ledge and
        chalk are pseudo-elements, and the board keeps a 10px bottom margin so
        the ledge has room.
      </Note>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Chalkboard props'
        rows={[
          {
            name: 'hand',
            type: 'boolean',
            description: 'Write the content in chalk handwriting.',
          },
          {
            name: 'as',
            type: 'ElementType',
            default: "'div'",
            description: "e.g. 'section', 'aside'.",
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          {
            name: '.chalkboard',
            description: 'Slate, frame, ledge and chalk.',
          },
          {
            name: '.chalkboard-hand',
            description: 'Hand font for all content.',
          },
          {
            name: '.chalk-{yellow|pink|blue|green}',
            description: 'Coloured chalk text.',
          },
          {
            name: '.chalk-dim',
            description: 'Faded chalk for secondary text.',
          },
          { name: '.chalk-underline', description: 'Chalk underline.' },
          {
            name: '.btn-chalk',
            description: 'Dashed chalk-outline button (inside a chalkboard).',
          },
        ]}
      />
      <Ledger
        kind='var'
        title='Custom properties'
        rows={[
          { name: '--oh-chalkboard', description: 'Slate colour.' },
          {
            name: '--oh-chalk / --oh-chalk-dim',
            description: 'Chalk text colours.',
          },
          {
            name: '--oh-frame',
            description: 'Wood colour (mixed lighter for the frame).',
          },
          { name: '--_pad', description: 'Local: inner padding.' },
        ]}
      />
    </DocPage>
  );
}
