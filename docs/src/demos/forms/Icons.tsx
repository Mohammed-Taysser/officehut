import { useState } from 'react';
import { IconEye, IconEyeOff, IconMail, IconSearch } from '@tabler/icons-react';
import { Button, Field, Input } from 'officehut/react';

export default function Icons() {
  const [shown, setShown] = useState(false);

  return (
    <div className='grid cols-1 cols-md-3'>
      <Field label='Find an invoice'>
        <Input
          type='search'
          placeholder='Number, vendor or amount'
          icon={<IconSearch />}
        />
      </Field>
      <Field label='Notify'>
        <Input
          type='email'
          defaultValue='accounts@deltafreight.eg'
          icon={<IconMail />}
        />
      </Field>
      <Field label='Portal password'>
        <Input
          type={shown ? 'text' : 'password'}
          defaultValue='quarter-close-26'
          autoComplete='current-password'
          iconEnd={
            <Button
              variant='ghost'
              iconOnly
              size='sm'
              aria-label={shown ? 'Hide password' : 'Show password'}
              aria-pressed={shown}
              onClick={() => setShown((s) => !s)}
            >
              {shown ? <IconEyeOff /> : <IconEye />}
            </Button>
          }
        />
      </Field>
    </div>
  );
}
