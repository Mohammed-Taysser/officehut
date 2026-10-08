import { Button } from 'officehut/react';

export default function Flex() {
  return (
    <div className='stack gap-3'>
      <div className='d-flex align-items-center gap-2 border rounded p-2 bg-surface'>
        <strong>Vendor: Nile Office Supplies</strong>
        <span className='text-subtle fs-sm'>12 open orders</span>
        <Button size='sm' className='ms-auto'>
          View
        </Button>
      </div>
      <div className='d-flex flex-column flex-md-row justify-content-between gap-2 border rounded p-2 bg-surface'>
        <span>.flex-column on phones</span>
        <span>.flex-md-row from 768px</span>
      </div>
    </div>
  );
}
