import { Grade } from 'officehut/react';

// Sizes, and a short handwritten remark beside the mark.
export default function Remarks() {
  return (
    <div className='stack gap-5'>
      <div className='d-flex flex-wrap align-items-center gap-6'>
        <Grade value='A' size='sm' />
        <Grade value='A' />
        <Grade value='A' size='lg' />
      </div>
      <Grade
        value='B+'
        remark='good, but late twice'
        label='Delivery score: B plus'
      />
      <Grade value='7/10' pen='blue' remark='check the totals on page 2' />
    </div>
  );
}
