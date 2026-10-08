import { Handwriting, MarginNote, Notebook } from 'officehut/react';

export default function Marked() {
  return (
    <Notebook style={{ maxWidth: 620 }}>
      <h3>
        <MarginNote>14/10</MarginNote>
        Month-end checklist
      </h3>
      <p className='notebook-check'>
        Bank statements reconciled{' '}
        <span className='visually-hidden'>(done)</span>
      </p>
      <p className='notebook-check'>
        Petty cash counted: 1,240.00{' '}
        <span className='visually-hidden'>(done)</span>
      </p>
      <p>
        <MarginNote>!</MarginNote>
        Accruals for CleanCo{' '}
        <Handwriting className='text-danger'>
          — still waiting on their invoice
        </Handwriting>
      </p>
      <p>Close the period in the ledger</p>
    </Notebook>
  );
}
