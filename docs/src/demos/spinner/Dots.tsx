import { Spinner } from 'officehut/react';

export default function Dots() {
  return (
    <div className='stack gap-3'>
      <p className='hstack text-subtle fs-sm'>
        Mona is typing{' '}
        <Spinner variant='dots' size='sm' label='Mona is typing' />
      </p>
      <div className='cluster'>
        <Spinner variant='dots' />
        <Spinner variant='dots' size='lg' color='aurora' />
      </div>
    </div>
  );
}
