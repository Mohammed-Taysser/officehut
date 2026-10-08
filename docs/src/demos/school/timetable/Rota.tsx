import { Timetable } from 'officehut/react';

// Front-desk rota for week 41. Each slot is two hours; a shift can span several.
export default function Rota() {
  return (
    <Timetable
      caption='Front desk rota, week 41'
      days={['Sun', 'Mon', 'Tue', 'Wed', 'Thu']}
      slots={['08:00', '10:00', '12:00', '14:00', '16:00']}
      today='Tue'
      entries={[
        {
          day: 'Sun',
          slot: '08:00',
          span: 3,
          title: 'Salma',
          meta: 'reception',
          color: 'primary',
        },
        {
          day: 'Sun',
          slot: '14:00',
          span: 2,
          title: 'Omar',
          meta: 'reception',
          color: 'aurora',
        },
        {
          day: 'Mon',
          slot: '08:00',
          span: 3,
          title: 'Omar',
          meta: 'reception',
          color: 'aurora',
        },
        {
          day: 'Mon',
          slot: '14:00',
          span: 2,
          title: 'Youssef',
          meta: 'reception',
          color: 'success',
        },
        {
          day: 'Tue',
          slot: '08:00',
          span: 2,
          title: 'Salma',
          meta: 'reception',
          color: 'primary',
        },
        {
          day: 'Tue',
          slot: '12:00',
          title: 'Cover needed',
          meta: 'Salma at dentist',
          color: 'danger',
        },
        {
          day: 'Tue',
          slot: '14:00',
          span: 2,
          title: 'Youssef',
          meta: 'reception',
          color: 'success',
        },
        {
          day: 'Wed',
          slot: '08:00',
          span: 5,
          title: 'Temp: Nour',
          meta: 'agency, full day',
          color: 'warning',
        },
        {
          day: 'Thu',
          slot: '08:00',
          span: 3,
          title: 'Omar',
          meta: 'reception',
          color: 'aurora',
        },
        { day: 'Thu', slot: '14:00', span: 2, title: 'Closed', free: true },
      ]}
    />
  );
}
