import { useState } from 'react';
import { Badge, Button } from 'officehut/react';

export default function Stamp() {
  const [paid, setPaid] = useState(0);
  return (
    <div className='stack gap-4 align-items-center'>
      <div className='cluster gap-4 justify-content-center'>
        <Badge variant='stamp' color='success'>
          Paid
        </Badge>
        <Badge variant='stamp' color='danger'>
          Overdue
        </Badge>
        <Badge variant='stamp' color='primary'>
          Approved
        </Badge>
        <Badge variant='stamp' color='warning'>
          Copy
        </Badge>
        <Badge variant='stamp'>Void</Badge>
        <Badge variant='stamp' color='aurora'>
          Confidential
        </Badge>
      </div>
      <div className='hstack gap-3'>
        <Button size='sm' onClick={() => setPaid((n) => n + 1)}>
          Mark INV-2041 as paid
        </Button>
        {paid > 0 && (
          <Badge key={paid} variant='stamp' color='success' animate>
            Paid
          </Badge>
        )}
      </div>
    </div>
  );
}
