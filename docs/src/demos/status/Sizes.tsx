import { Status } from 'officehut/react';

export default function Sizes() {
  return (
    <div className='stack gap-2'>
      <Status size='sm' color='success'>
        VPN connected
      </Status>
      <Status color='success'>VPN connected</Status>
      <Status size='lg' color='success'>
        VPN connected
      </Status>
      <p className='hstack fs-sm'>
        Dot only, labelled for screen readers:{' '}
        <Status color='warning' aria-label='Degraded' />
      </p>
    </div>
  );
}
