import { Badge, Button, ButtonList } from 'officehut/react';

function Rows() {
  return (
    <div className='stack gap-2'>
      <ButtonList>
        <Button size='sm'>Export</Button>
        <Button>Filter</Button>
        <Button color='primary'>New expense</Button>
      </ButtonList>
      <p>
        Taxi to client site <Badge color='warning'>Receipt missing</Badge>
      </p>
    </div>
  );
}

export default function Density() {
  return (
    <div className='grid cols-1 cols-md-2'>
      <div className='stack gap-2'>
        <span className='eyebrow'>Comfortable</span>
        <Rows />
      </div>
      <div className='stack gap-2' data-oh-density='compact'>
        <span className='eyebrow'>data-oh-density="compact"</span>
        <Rows />
      </div>
    </div>
  );
}
