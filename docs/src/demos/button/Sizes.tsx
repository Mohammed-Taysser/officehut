import { Button, ButtonList } from 'officehut/react';

export default function Sizes() {
  return (
    <div className='stack gap-3'>
      <ButtonList>
        <Button size='sm'>Small</Button>
        <Button>Medium</Button>
        <Button size='lg'>Large</Button>
      </ButtonList>
      <ButtonList>
        <Button pill color='aurora'>
          Pill
        </Button>
        <Button square color='dark'>
          Square
        </Button>
      </ButtonList>
      <Button block color='success' size='lg'>
        Approve all 12 timesheets
      </Button>
    </div>
  );
}
