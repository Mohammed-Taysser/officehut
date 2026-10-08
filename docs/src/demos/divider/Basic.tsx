import { Divider } from 'officehut/react';

export default function Basic() {
  return (
    <div style={{ maxWidth: 460 }}>
      <p>Meeting notes — weekly ops sync</p>
      <Divider />
      <p className='text-subtle fs-sm'>A plain hairline between sections.</p>
      <Divider label='Action items' />
      <Divider label='Today' align='start' />
      <Divider label='Archived' align='end' variant='strong' />
    </div>
  );
}
