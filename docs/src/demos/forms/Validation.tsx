import { useState } from 'react';
import { Field, Input } from 'officehut/react';

const VAT = /^\d{3}-\d{3}-\d{3}$/;

export default function Validation() {
  const [vat, setVat] = useState('412-88');
  const error = VAT.test(vat) ? undefined : 'Use the format 123-456-789.';

  return (
    <div className='grid cols-1 cols-md-2'>
      <Field
        id='vat'
        label='Tax registration no.'
        error={error}
        hint='Printed under the vendor logo.'
      >
        <Input
          className='font-mono'
          value={vat}
          onChange={(e) => setVat(e.target.value)}
          valid={!error}
        />
      </Field>
      <Field label='Purchase order'>
        <Input className='font-mono' defaultValue='PO-2026-0418' valid />
      </Field>
      <Field label='Approver' disabled hint='Set by the cost centre.'>
        <Input defaultValue='Mona Adel' />
      </Field>
    </div>
  );
}
