import {
  Button,
  Checkbox,
  Field,
  Input,
  Select,
  Textarea,
} from 'officehut/react';

const CATEGORIES = [
  'Travel',
  'Meals & entertainment',
  'Accommodation',
  'Office supplies',
];

export default function ExpenseClaim() {
  return (
    <form
      className='notebook notebook-holes'
      style={{ maxWidth: 640 }}
      onSubmit={(e) => e.preventDefault()}
    >
      <h2>
        <span className='notebook-margin'>#17</span>
        Expense claim
      </h2>
      <Field label='Date' horizontal className='notebook-tight'>
        <Input type='date' variant='line' defaultValue='2026-10-02' />
      </Field>
      <Field label='Merchant' horizontal className='notebook-tight'>
        <Input
          variant='line'
          defaultValue='Nile Ritz — client lunch, 4 people'
        />
      </Field>
      <Field label='Category' horizontal className='notebook-tight'>
        <Select
          variant='line'
          options={CATEGORIES}
          defaultValue='Meals & entertainment'
        />
      </Field>
      <Field
        label='Amount (EGP)'
        horizontal
        className='notebook-tight'
        remark='over 1,000 — Mona signs off'
      >
        <Input
          variant='line'
          inputMode='decimal'
          className='font-mono'
          defaultValue='1,840.00'
        />
      </Field>
      <Field label='Purpose' horizontal className='notebook-tight'>
        <Textarea
          variant='line'
          rows={2}
          defaultValue='Quarterly review with Delta Freight. Agreed the new rate card for Q4.'
        />
      </Field>
      <Checkbox
        defaultChecked
        hint='Photos are fine if the total and VAT number are readable.'
      >
        Original receipt attached
      </Checkbox>
      <Field label='Signed' horizontal className='notebook-tight'>
        <Input variant='signature' defaultValue='Salma Nour' />
      </Field>
      <div className='cluster'>
        <Button type='submit' color='primary'>
          Submit for approval
        </Button>
        <Button variant='ghost'>Save draft</Button>
      </div>
    </form>
  );
}
