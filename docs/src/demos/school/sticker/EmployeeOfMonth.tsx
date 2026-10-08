import { Avatar, Card, Sticker } from 'officehut/react';

// The monthly shout-out on the intranet home page.
export default function EmployeeOfMonth() {
  return (
    <Card style={{ maxWidth: 420 }}>
      <Card.Body className='d-flex align-items-center gap-4'>
        <Avatar size='xl' circle name='Laila Samir' />
        <div className='flex-1'>
          <span className='eyebrow'>Employee of the month · October</span>
          <p className='fw-bold fs-lg mt-1'>Laila Samir</p>
          <p className='text-muted fs-sm'>
            Closed the September books two days early and trained both new
            accountants.
          </p>
        </div>
        <Sticker shape='scallop' size='lg' aria-hidden>
          Star of the month
        </Sticker>
      </Card.Body>
    </Card>
  );
}
