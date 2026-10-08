import { Divider } from 'officehut/react';

export default function Perforated() {
  return (
    <div className='card' style={{ maxWidth: 460 }}>
      <div className='card-body'>
        <p className='fw-semibold'>Delta Print House</p>
        <p className='text-subtle fs-sm'>
          Invoice INV-0421 · EGP 6,120.00 · due 20 Oct
        </p>
        <Divider variant='dotted' label='Detach and return with payment' />
        <div className='d-flex justify-content-between font-mono fs-sm'>
          <span>INV-0421</span>
          <span>EGP 6,120.00</span>
        </div>
        <Divider variant='dashed' />
        <p className='fs-xs text-subtle'>
          Dashed rules suit drafts and optional sections.
        </p>
      </div>
    </div>
  );
}
