import { DocPage, H2 } from '../../components/DocPage';
import { Example } from '../../components/Example';
import { Ledger } from '../../components/Ledger';
import { Note } from '../../components/Note';

export default function SpinnerPage() {
  return (
    <DocPage
      title='Spinner'
      lead='For short waits where there is nothing to count. A thin ring, or three dots that blink in turn like someone typing.'
      importLine="import { Spinner } from 'officehut/react';"
      cssFile='officehut/css/components/spinner.css'
    >
      <Example title='Ring' demo='spinner/Basic' center>
        <p>
          The ring takes the current text colour, so it fits inside buttons and
          links. Add a <code>color</code> to tone it.
        </p>
      </Example>

      <Example title='Dots' demo='spinner/Dots' center>
        <p>
          <code>variant="dots"</code> suits chat and "someone is typing"
          indicators.
        </p>
      </Example>
      <Note title='Accessibility'>
        Each spinner is a <code>role="status"</code> with a visually hidden{' '}
        <code>label</code> (default "Loading…"). Make the label specific —
        "Saving draft" tells a screen-reader user much more. For work that takes
        longer than a few seconds, use a{' '}
        <a href='/docs/components/progress'>Progress</a> bar instead.
      </Note>

      <Example title='In context' demo='spinner/InContext' scene center>
        <p>
          A spinner beside a sentence that says what is happening and how far
          along it is. Buttons have their own <code>loading</code> state.
        </p>
      </Example>

      <H2 id='reference'>Reference</H2>
      <Ledger
        title='Spinner props'
        rows={[
          {
            name: 'variant',
            type: "'ring' | 'dots'",
            default: "'ring'",
            description: 'Shape.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: '14px / 20px / 32px.',
          },
          {
            name: 'color',
            type: 'Color',
            description: 'Defaults to the text colour.',
          },
          {
            name: 'label',
            type: 'string',
            default: "'Loading…'",
            description: 'Visually hidden status text.',
          },
        ]}
      />
      <Ledger
        kind='class'
        title='Classes'
        rows={[
          {
            name: '.spinner',
            description:
              'Ring. Add role="status" and a .visually-hidden label.',
          },
          {
            name: '.spinner-dots',
            description: 'Three dots: put three empty <span>s inside.',
          },
          { name: '.spinner-sm / .spinner-lg', description: 'Sizes.' },
          { name: '.spinner-{color}', description: 'Tone.' },
        ]}
      />
    </DocPage>
  );
}
