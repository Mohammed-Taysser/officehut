import { Progress } from 'officehut/react';

export default function Indeterminate() {
  return (
    <div className='stack' style={{ maxWidth: 420 }}>
      <Progress label='Importing payroll_october.csv' />
      <Progress size='sm' aria-label='Checking bank feed' color='info' />
    </div>
  );
}
