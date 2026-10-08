import { Grade } from 'officehut/react';

// Letters, numbers and "x/y" fractions. Red pen by default, green for a pass, blue ballpoint.
export default function Values() {
  return (
    <div className='d-flex flex-wrap align-items-center gap-6'>
      <Grade value='A+' pen='green' />
      <Grade value='B' />
      <Grade value='C-' label='C minus' />
      <Grade value={87} pen='blue' label='87 percent' />
      <Grade value='9/10' />
      <Grade value='42/50' pen='green' />
    </div>
  );
}
