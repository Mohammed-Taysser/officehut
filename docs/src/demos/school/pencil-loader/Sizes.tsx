import { PencilLoader } from 'officehut/react';

// Three sizes. The label is handwritten, and always announced.
export default function Sizes() {
  return (
    <div className='d-flex flex-wrap align-items-end gap-7'>
      <PencilLoader size='sm' label='Saving' />
      <PencilLoader label='Loading timesheets' />
      <PencilLoader size='lg' label='Preparing the payslips' />
    </div>
  );
}
