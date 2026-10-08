import { Status } from 'officehut/react';

export default function Pulse() {
  return (
    <div className='cluster gap-5'>
      <Status color='danger' pulse>
        Recording · Board meeting
      </Status>
      <Status color='primary' pulse>
        Deploying payroll-api v2.8
      </Status>
      <Status color='success' pulse>
        On call
      </Status>
    </div>
  );
}
