import { useState } from 'react';
import { Button, ButtonList, Steps } from 'officehut/react';

const route = [
  { title: 'Submitted', description: 'Salma Nour · 02 Oct' },
  { title: 'Manager', description: 'Omar Fathy' },
  { title: 'Finance', description: 'Accounts payable' },
  { title: 'Paid', description: 'Next pay run' },
];

export default function StepsBasic() {
  const [current, setCurrent] = useState(1);

  return (
    <div className='stack gap-5'>
      <Steps
        items={route}
        current={current}
        aria-label='INV-2041 approval route'
      />
      <ButtonList>
        <Button
          size='sm'
          variant='ghost'
          disabled={current === 0}
          onClick={() => setCurrent(current - 1)}
        >
          Send back
        </Button>
        <Button
          size='sm'
          color='success'
          disabled={current >= route.length}
          onClick={() => setCurrent(current + 1)}
        >
          {current >= route.length - 1 ? 'Mark paid' : 'Approve & pass on'}
        </Button>
      </ButtonList>
    </div>
  );
}
