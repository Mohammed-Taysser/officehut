import { Input, Select } from 'officehut/react';

export default function Sizes() {
  return (
    <div className='stack gap-3' style={{ maxWidth: 380 }}>
      <Input
        size='sm'
        aria-label='Filter timesheets'
        placeholder='Filter timesheets…'
      />
      <Input aria-label='Employee' placeholder='Employee name' />
      <Select
        size='lg'
        aria-label='Pay period'
        options={['1–15 October', '16–31 October']}
      />
    </div>
  );
}
