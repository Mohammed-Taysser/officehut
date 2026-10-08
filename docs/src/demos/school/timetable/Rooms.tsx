import { Timetable, type TimetableEntry } from 'officehut/react';

const ROOMS = ['4A · Nile', '4B · Delta', '5A · Board', 'Phone booth'];

const BOOKINGS: TimetableEntry[] = [
  {
    day: 0,
    slot: 0,
    title: 'Sales standup',
    meta: 'Mona · 6 people',
    color: 'primary',
  },
  {
    day: 0,
    slot: 2,
    span: 2,
    title: 'Q4 planning',
    meta: 'Karim · 10 people',
    color: 'aurora',
  },
  {
    day: 1,
    slot: 1,
    span: 3,
    title: 'Interview loop',
    meta: 'HR · 3 candidates',
    color: 'info',
  },
  {
    day: 2,
    slot: 0,
    span: 2,
    title: 'Board meeting',
    meta: 'CEO office',
    color: 'dark',
  },
  { day: 2, slot: 3, title: 'Under repair', meta: 'projector', free: true },
  { day: 3, slot: 1, title: 'Vendor call', meta: 'Laila', color: 'success' },
  { day: 3, slot: 4, title: 'Payroll call', meta: 'Omar', color: 'warning' },
];

// Today's room bookings: rooms across, hours down. Columns don't have to be days.
export default function Rooms() {
  return (
    <Timetable
      caption='Meeting room bookings, Thursday 8 October'
      days={ROOMS}
      slots={['09:00', '10:00', '11:00', '12:00', '13:00']}
      entries={BOOKINGS}
    />
  );
}
