import { Button, Input, InputGroup } from 'officehut/react';

export default function GroupSizes() {
  return (
    <div className='stack gap-3' style={{ maxWidth: 420 }}>
      <InputGroup size='sm'>
        <InputGroup.Text>Room</InputGroup.Text>
        <Input aria-label='Room' defaultValue='4B' />
        <Button>Check</Button>
      </InputGroup>
      <InputGroup>
        <InputGroup.Text>Room</InputGroup.Text>
        <Input aria-label='Room' defaultValue='4B' />
        <Button>Check</Button>
      </InputGroup>
      <InputGroup size='lg'>
        <InputGroup.Text>Room</InputGroup.Text>
        <Input aria-label='Room' defaultValue='4B' />
        <Button>Check</Button>
      </InputGroup>
    </div>
  );
}
