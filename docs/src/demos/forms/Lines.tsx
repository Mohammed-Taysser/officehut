import { Field, Input, Select } from 'officehut/react';

export default function Lines() {
  return (
    <div className='stack gap-4' style={{ maxWidth: 440 }}>
      <div className='grid cols-1 cols-sm-2'>
        <Field label='Received by'>
          <Input variant='line' defaultValue='Karim Fawzy' />
        </Field>
        <Field label='Delivery note'>
          <Select variant='line' options={['DN-7731', 'DN-7732', 'DN-7740']} />
        </Field>
      </div>
      <Field
        label='Signature'
        hint='Type your full name to sign the delivery note.'
      >
        <Input variant='signature' placeholder='Sign here' />
      </Field>
    </div>
  );
}
