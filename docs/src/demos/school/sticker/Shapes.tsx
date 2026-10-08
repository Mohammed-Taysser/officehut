import { Sticker } from 'officehut/react';

export default function Shapes() {
  return (
    <div className='d-flex flex-wrap align-items-center gap-6'>
      <Sticker>Approved</Sticker>
      <Sticker shape='scallop' color='success'>
        Well done
      </Sticker>
      <Sticker shape='star'>Top</Sticker>
    </div>
  );
}
