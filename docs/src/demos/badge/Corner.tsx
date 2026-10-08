import { IconBell, IconInbox } from '@tabler/icons-react';
import { Avatar, Badge, Button } from 'officehut/react';

export default function Corner() {
  return (
    <div className='hstack gap-5'>
      <Button
        iconOnly
        aria-label='Notifications, 3 unread'
        className='position-relative'
      >
        <IconBell />
        <Badge color='danger' corner aria-hidden>
          3
        </Badge>
      </Button>
      <Button className='position-relative' icon={<IconInbox />}>
        Approvals
        <Badge color='primary' corner aria-hidden>
          12
        </Badge>
      </Button>
      <span className='position-relative d-inline-block'>
        <Avatar name='Laila Samir' circle />
        <Badge color='success' corner>
          <span className='visually-hidden'>New message</span>
        </Badge>
      </span>
      <span className='hstack'>
        <Badge color='warning' />
        <span>Unsaved changes</span>
      </span>
    </div>
  );
}
