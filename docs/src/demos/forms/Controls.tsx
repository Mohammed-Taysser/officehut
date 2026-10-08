import { Field, Input, Select, Textarea } from 'officehut/react';

export default function Controls() {
  return (
    <div className='grid cols-1 cols-md-2'>
      <Field label='Vendor name'>
        <Input placeholder='e.g. Delta Freight' />
      </Field>
      <Field
        label='Invoice number'
        hint='Exactly as printed, including the prefix.'
      >
        <Input className='font-mono' placeholder='INV-' />
      </Field>
      <Field label='Payment terms'>
        <Select
          placeholder='Choose terms…'
          options={['Due on receipt', 'Net 15', 'Net 30', 'Net 60']}
        />
      </Field>
      <Field label='Due date'>
        <Input type='date' defaultValue='2026-11-01' />
      </Field>
      <Field label='Scanned invoice' optional>
        <Input type='file' accept='application/pdf,image/*' />
      </Field>
      <Field label='Bank account' hint='Taken from the vendor record.'>
        <Input
          readOnly
          className='font-mono'
          value='EG38 0019 0005 0000 0000 2631 8000 2'
        />
      </Field>
      <Field label='Note to accounts payable' optional className='span-md-2'>
        <Textarea placeholder='Anything finance should know before paying this.' />
      </Field>
    </div>
  );
}
