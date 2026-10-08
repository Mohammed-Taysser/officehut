import { Badge, Button, Card } from 'officehut/react';

function Shift({ label }: { label: string }) {
  return (
    <Card>
      <Card.Body className='stack gap-2'>
        <span className='eyebrow'>{label}</span>
        <div className='hstack'>
          <strong>Server room B-2</strong>
          <Badge color='success' className='ms-auto'>
            22.4 °C
          </Badge>
        </div>
        <p className='text-muted fs-sm'>Checked by Karim Fawzy at 23:40.</p>
        <Button size='sm' color='primary' variant='soft'>
          Log a reading
        </Button>
      </Card.Body>
    </Card>
  );
}

export default function Scoped() {
  return (
    <div className='grid cols-1 cols-md-2'>
      <div data-oh-theme='light' className='p-4 rounded'>
        <Shift label='Day shift' />
      </div>
      <div data-oh-theme='dark' className='p-4 rounded'>
        <Shift label='Night shift' />
      </div>
    </div>
  );
}
