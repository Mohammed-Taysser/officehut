import { DateTile } from 'officehut/react';

// Sizes and band colours. A bare YYYY-MM-DD is read as that local calendar day.
export default function Basic() {
  return (
    <div
      className='d-flex flex-wrap align-items-end gap-5'
      style={{ paddingTop: '0.5rem' }}
    >
      <DateTile date='2026-10-14' size='sm' />
      <DateTile date='2026-10-14' />
      <DateTile date='2026-10-14' size='lg' />
      <DateTile date='2026-10-20' band='blue' />
      <DateTile date='2026-10-27' band='green' />
      <DateTile date='2026-10-30' band='dark' />
    </div>
  );
}
