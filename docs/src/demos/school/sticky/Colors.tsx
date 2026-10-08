import { Sticky, StickyWall } from 'officehut/react';

export default function Colors() {
  return (
    <StickyWall>
      <Sticky title='Reception'>
        Courier from Nile Freight is coming at 14:00. Sign for two boxes.
      </Sticky>
      <Sticky color='pink' title='Payroll'>
        Overtime sheets close Thursday at noon.
      </Sticky>
      <Sticky color='blue' title='IT'>
        The guest Wi-Fi password changes on the 1st of every month.
      </Sticky>
      <Sticky color='green' title='Facilities'>
        Meeting room 4B has a new projector remote. It lives in the drawer.
      </Sticky>
      <Sticky color='orange' title='Kitchen'>
        Fridge gets cleared out every Thursday evening.
      </Sticky>
    </StickyWall>
  );
}
