import { Sticker } from 'officehut/react';

// Any palette tone, three sizes, and your own tilt.
export default function Colors() {
  return (
    <div className='stack gap-5'>
      <div className='d-flex flex-wrap align-items-center gap-5'>
        <Sticker color='primary'>New hire</Sticker>
        <Sticker color='success'>Paid</Sticker>
        <Sticker color='danger'>Urgent</Sticker>
        <Sticker color='aurora'>Beta</Sticker>
        <Sticker color='dark'>Final</Sticker>
      </div>
      <div className='d-flex flex-wrap align-items-center gap-5'>
        <Sticker size='sm' tilt={0}>
          Q3
        </Sticker>
        <Sticker tilt={6}>Q3</Sticker>
        <Sticker size='lg' shape='scallop' tilt={-16}>
          Top seller
        </Sticker>
      </div>
    </div>
  );
}
