import { Corkboard, Pinned, Sticky } from 'officehut/react';

// Four pin colours, three tilts. Anything can be pinned.
export default function Pins() {
  return (
    <Corkboard>
      <Pinned style={{ width: '10rem' }}>
        <Sticky straight>red · none</Sticky>
      </Pinned>
      <Pinned pin='blue' tilt='left' style={{ width: '10rem' }}>
        <Sticky color='blue' straight>
          blue · left
        </Sticky>
      </Pinned>
      <Pinned pin='green' tilt='right' style={{ width: '10rem' }}>
        <Sticky color='green' straight>
          green · right
        </Sticky>
      </Pinned>
      <Pinned pin='yellow' style={{ width: '10rem' }}>
        <Sticky color='orange' straight>
          yellow · none
        </Sticky>
      </Pinned>
    </Corkboard>
  );
}
