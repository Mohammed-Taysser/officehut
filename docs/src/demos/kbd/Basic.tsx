import { Kbd } from 'officehut/react';

export default function Basic() {
  return (
    <div className='stack gap-3'>
      <p>
        Press <Kbd>Esc</Kbd> to close the dialog, or <Kbd>Enter</Kbd> to save.
      </p>
      <p>
        Search everything with <Kbd keys={['Ctrl', 'K']} />. Print with{' '}
        <Kbd keys={['Ctrl', 'P']} />.
      </p>
      <p>
        Next ticket <Kbd>J</Kbd>, previous <Kbd>K</Kbd>. Go to the inbox with{' '}
        <Kbd keys={['G', 'I']} separator='then' />.
      </p>
      <p>
        On dark surfaces use <Kbd variant='dark'>Tab</Kbd>.
      </p>
    </div>
  );
}
