import { MarginNote, Notebook } from 'officehut/react';

export default function Squared() {
  return (
    <Notebook squared style={{ maxWidth: 520 }}>
      <h3>
        <MarginNote>Q3</MarginNote>
        VAT on INV-2041
      </h3>
      <p className='font-mono tabular-nums'>
        Net&nbsp;&nbsp;&nbsp;&nbsp;5,060.00
      </p>
      <p className='font-mono tabular-nums'>VAT 14%&nbsp;&nbsp;&nbsp;708.40</p>
      <p className='font-mono tabular-nums fw-bold'>
        Total&nbsp;&nbsp;&nbsp;5,768.40
      </p>
    </Notebook>
  );
}
