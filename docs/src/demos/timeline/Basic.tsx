import { Timeline } from 'officehut/react';

export default function Basic() {
  return (
    <Timeline aria-label='Purchase order PO-7731' style={{ maxWidth: 460 }}>
      <Timeline.Item
        time='09:14'
        dateTime='2026-10-07T09:14'
        title='Request raised'
      >
        Laila asked for 12 ergonomic chairs for the 3rd floor.
      </Timeline.Item>
      <Timeline.Item
        time='10:02'
        dateTime='2026-10-07T10:02'
        color='primary'
        title='Quote attached'
      >
        Office Hub quote: EGP 46,800 incl. VAT.
      </Timeline.Item>
      <Timeline.Item
        time='11:30'
        dateTime='2026-10-07T11:30'
        color='success'
        title='Approved by Mona Adel'
      >
        Within the Facilities budget.
      </Timeline.Item>
      <Timeline.Item time='—' hollow title='Delivery'>
        Expected Thursday 16 Oct.
      </Timeline.Item>
    </Timeline>
  );
}
