import { Field, Input } from 'officehut/react';

export default function FieldAnatomy() {
  return (
    <div style={{ maxWidth: 360 }}>
      <Field
        label='Cost centre'
        required
        hint='Four digits, from your department code sheet.'
        remark='Facilities is 4120'
        error='4102 is closed — ask finance for the new code.'
      >
        <Input defaultValue='4102' inputMode='numeric' className='font-mono' />
      </Field>
    </div>
  );
}
