import { Field, Input, InputGroup } from 'officehut/react';

export default function Addons() {
  return (
    <div className='grid cols-1 cols-md-3'>
      <Field label='Amount'>
        <InputGroup>
          <InputGroup.Text>EGP</InputGroup.Text>
          <Input
            inputMode='decimal'
            className='font-mono'
            defaultValue='1,840.00'
          />
        </InputGroup>
      </Field>
      <Field label='Overtime' hint='Week of 12 October.'>
        <InputGroup>
          <Input inputMode='decimal' className='font-mono' defaultValue='6.5' />
          <InputGroup.Text>hours</InputGroup.Text>
        </InputGroup>
      </Field>
      <Field label='Work email'>
        <InputGroup>
          <Input defaultValue='salma.nour' autoComplete='username' />
          <InputGroup.Text>@cairo-tech.net</InputGroup.Text>
        </InputGroup>
      </Field>
    </div>
  );
}
