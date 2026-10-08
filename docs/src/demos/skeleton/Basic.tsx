import { Skeleton, SkeletonText } from 'officehut/react';

export default function Basic() {
  return (
    <div className='hstack align-items-start gap-3' style={{ maxWidth: 420 }}>
      <Skeleton variant='circle' width='2.5rem' />
      <div className='flex-1'>
        <Skeleton width='40%' height='0.75rem' />
        <SkeletonText lines={3} />
      </div>
    </div>
  );
}
