import { Button, Divider } from 'officehut/react';

export default function Vertical() {
  return (
    <div className='d-flex align-items-center' style={{ height: 36 }}>
      <Button size='sm' variant='ghost'>
        Bold
      </Button>
      <Button size='sm' variant='ghost'>
        Italic
      </Button>
      <Divider vertical />
      <Button size='sm' variant='ghost'>
        Attach file
      </Button>
      <Divider vertical />
      <span className='fs-xs text-subtle'>Saved 10:42</span>
    </div>
  );
}
