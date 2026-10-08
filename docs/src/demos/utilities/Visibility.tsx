import { IconPrinter } from '@tabler/icons-react';

export default function Visibility() {
  return (
    <div className='stack gap-3'>
      <p>
        <span className='d-none d-md-inline'>Shown from 768px up. </span>
        <span className='d-md-none'>Shown below 768px. </span>
      </p>
      <button type='button' className='btn btn-icon'>
        <IconPrinter aria-hidden />
        <span className='visually-hidden'>Print invoice INV-2041</span>
      </button>
      <p className='d-print-none text-subtle fs-sm'>
        This line never reaches the printer.
      </p>
    </div>
  );
}
