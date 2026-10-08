import { Checkbox } from 'officehut/react';

export default function Checklist() {
  return (
    <div className='notebook' style={{ maxWidth: 520 }}>
      <h3>
        <span className='notebook-margin'>Mon</span>
        First-day checklist — Youssef Kamal
      </h3>
      <Checkbox defaultChecked className='notebook-tight'>
        Laptop and badge collected from IT
      </Checkbox>
      <Checkbox defaultChecked className='notebook-tight'>
        Signed the equipment form
      </Checkbox>
      <Checkbox className='notebook-tight'>
        Desk 3-14 set up with a second screen
      </Checkbox>
      <Checkbox className='notebook-tight' color='danger'>
        Payroll details sent to HR{' '}
        <span className='handwriting text-danger'>by Weds!</span>
      </Checkbox>
    </div>
  );
}
