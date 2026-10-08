import { Button, Collapse, useDisclosure } from 'officehut/react';

export default function Basic() {
  const { open, onToggle } = useDisclosure();
  return (
    <div className='stack gap-2' style={{ maxWidth: 480 }}>
      <p>
        Invoice INV-2041 · 5,060.00 EGP{' '}
        <Button
          variant='link'
          size='sm'
          aria-expanded={open}
          aria-controls='inv-2041-lines'
          onClick={onToggle}
        >
          {open ? 'Hide lines' : 'Show lines'}
        </Button>
      </p>
      <Collapse open={open} id='inv-2041-lines'>
        <ul className='border rounded p-3 bg-surface list-unstyled stack gap-1 tabular-nums'>
          <li>Freight, Cairo → Alexandria · 4,200.00</li>
          <li>Storage, 12 pallets · 860.00</li>
        </ul>
      </Collapse>
    </div>
  );
}
