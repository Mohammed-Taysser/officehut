import { Spinner } from 'officehut/react';

export default function Basic() {
  return (
    <div className='cluster gap-5'>
      <Spinner size='sm' />
      <Spinner />
      <Spinner size='lg' />
      <Spinner color='primary' label='Saving draft' />
      <Spinner color='success' label='Syncing' />
      <Spinner color='danger' label='Retrying' />
    </div>
  );
}
