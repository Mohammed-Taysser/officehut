import { Status } from 'officehut/react';

export default function Basic() {
  return (
    <div className='cluster gap-5'>
      <Status color='success'>Online</Status>
      <Status color='warning'>Away</Status>
      <Status color='danger'>In a meeting</Status>
      <Status>Offline</Status>
      <Status color='info'>On leave until 14 Oct</Status>
    </div>
  );
}
