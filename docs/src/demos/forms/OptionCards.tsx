import { Radio, RadioGroup } from 'officehut/react';

const ROOMS = [
  {
    id: '4B',
    name: 'Room 4B',
    detail: 'Screen, whiteboard. Free until 14:00.',
    seats: '6 seats',
  },
  {
    id: '5A',
    name: 'Room 5A',
    detail: 'Video call kit, window side.',
    seats: '12 seats',
  },
  {
    id: 'board',
    name: 'Boardroom',
    detail: 'Needs approval from the office manager.',
    seats: '20 seats',
  },
];

export default function OptionCards() {
  return (
    <RadioGroup
      label='Book a room for Thursday, 10:00'
      defaultValue='4B'
      style={{ maxWidth: 480 }}
    >
      {ROOMS.map((r) => (
        <Radio key={r.id} value={r.id} card hint={r.detail} aside={r.seats}>
          {r.name}
        </Radio>
      ))}
    </RadioGroup>
  );
}
