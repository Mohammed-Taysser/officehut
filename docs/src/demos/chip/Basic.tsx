import { Chip, ChipList } from 'officehut/react';

export default function Basic() {
  return (
    <div className='stack gap-3'>
      <ChipList>
        <Chip>Cairo office</Chip>
        <Chip color='primary'>Finance</Chip>
        <Chip color='success'>Approved</Chip>
        <Chip color='warning'>Awaiting receipt</Chip>
        <Chip color='danger'>Over limit</Chip>
        <Chip color='aurora'>Board pack</Chip>
      </ChipList>
      <ChipList>
        <Chip size='sm'>Q3</Chip>
        <Chip size='sm' label='Cost centre'>
          CC-204
        </Chip>
      </ChipList>
    </div>
  );
}
