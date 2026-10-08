import { IconCalendarEvent } from '@tabler/icons-react';
import { Avatar, AvatarList, Badge, Button, Card } from 'officehut/react';

const attendees = [
  'Mona Adel',
  'Karim Fawzy',
  'Laila Samir',
  'Omar Hany',
  'Salma Nour',
  'Youssef Ali',
];

export default function Meeting() {
  return (
    <Card tab='Room 4B' tabColor='aurora' style={{ maxWidth: 380 }}>
      <Card.Body className='stack gap-3'>
        <div className='hstack'>
          <IconCalendarEvent size={18} className='text-aurora' aria-hidden />
          <strong>Quarterly budget review</strong>
        </div>
        <p className='text-muted fs-sm'>Thu 16 Oct · 10:00 – 11:30</p>
        <div className='hstack'>
          <span className='fs-sm text-subtle'>Organiser</span>
          <Avatar name='Mona Adel' size='xs' circle presence='online' />
          <span className='fs-sm'>Mona Adel</span>
        </div>
        <div className='hstack'>
          <AvatarList stacked max={4} size='sm' aria-label='6 attendees'>
            {attendees.map((n) => (
              <Avatar key={n} name={n} size='sm' circle />
            ))}
          </AvatarList>
          <Badge color='success' className='ms-auto'>
            5 accepted
          </Badge>
        </div>
      </Card.Body>
      <Card.Footer>
        <Button size='sm' variant='ghost'>
          Decline
        </Button>
        <Button size='sm' color='primary' className='ms-auto'>
          Join
        </Button>
      </Card.Footer>
    </Card>
  );
}
