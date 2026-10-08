import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function KbdPage() {
  return (
    <DocPage
      title='Kbd'
      lead='Keycaps for shortcuts. Small paper keys with a 1px bottom edge, or drawn in pencil on a notebook page.'
      importLine="import { Kbd } from 'officehut/react';"
      cssFile='officehut/css/components/kbd.css'
    >
      <Example title='Keys and chords' demo='kbd/Basic'>
        <p>
          Wrap one key in <code>Kbd</code>, or pass <code>keys</code> for a
          chord. Chords render as nested <code>&lt;kbd&gt;</code> elements,
          which is how HTML describes a key combination. <code>separator</code>{' '}
          changes the "+" — use "then" for sequences.
        </p>
      </Example>

      <Example title='Pencil' demo='kbd/Pencil'>
        <p>
          <code>variant="pencil"</code> draws the key by hand, for notes and
          notebook pages.
        </p>
      </Example>
      <Note title='Platform keys'>
        Show <Kbd0>⌘</Kbd0> on macOS and <Kbd0>Ctrl</Kbd0> elsewhere — check{' '}
        <code>navigator.userAgentData?.platform</code> (or{' '}
        <code>navigator.platform</code>) once and pass the right label.
      </Note>

      <Example title='Shortcut sheet' demo='kbd/Shortcuts' scene center />

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Kbd props'
        rows={[
          {
            name: 'keys',
            type: 'ReactNode[]',
            description: 'A chord of keys.',
          },
          {
            name: 'separator',
            type: 'ReactNode',
            default: "'+'",
            description: 'Between chord keys.',
          },
          {
            name: 'variant',
            type: "'key' | 'dark' | 'pencil'",
            default: "'key'",
            description: 'Look.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          { name: '.kbd', description: 'A keycap.' },
          {
            name: '.kbd-combo / .kbd-sep',
            description: 'Chord wrapper and separator.',
          },
          { name: '.kbd-dark / .kbd-pencil', description: 'Variants.' },
        ]}
      />
    </DocPage>
  );
}

function Kbd0({ children }: { children: string }) {
  return <kbd className='kbd'>{children}</kbd>;
}
