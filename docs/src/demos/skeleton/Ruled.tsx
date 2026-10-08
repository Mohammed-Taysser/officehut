import { Skeleton, SkeletonText } from 'officehut/react';

export default function Ruled() {
  return (
    <div className='grid cols-1 cols-sm-2'>
      <div>
        <Skeleton variant='rect' height='7rem' />
        <SkeletonText lines={2} className='mt-2' />
      </div>
      <SkeletonText ruled lines={5} static />
    </div>
  );
}
