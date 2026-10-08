import {
  Card,
  Corkboard,
  DateTile,
  Pinned,
  Sticker,
  Sticky,
} from 'officehut/react';

// The noticeboard by the lifts, as the intranet's "Announcements" page.
export default function Board() {
  return (
    <Corkboard aria-label='Office announcements'>
      <Pinned as='article' tilt='left' style={{ width: '15rem' }}>
        <Card size='sm'>
          <Card.Body className='d-flex align-items-center gap-3'>
            <DateTile date='2026-10-14T12:00' locale='en-GB' />
            <div>
              <p className='fw-medium'>Fire drill</p>
              <p className='text-subtle fs-sm'>10:30 · meet at gate B</p>
            </div>
          </Card.Body>
        </Card>
      </Pinned>

      <Pinned as='article' pin='blue' tilt='right' style={{ width: '17rem' }}>
        <Card size='sm' clipped>
          <Card.Body>
            <span className='eyebrow'>HR · 2 attachments</span>
            <p className='fw-medium mt-1'>New leave policy</p>
            <p className='text-muted fs-sm'>
              Carry-over goes up to 10 days from January. Form and FAQ attached.
            </p>
          </Card.Body>
        </Card>
      </Pinned>

      <Pinned as='aside' pin='yellow' style={{ width: '12rem' }}>
        <Sticky hand straight>
          Lost: black umbrella, 3rd floor kitchen. Ext. 214
        </Sticky>
      </Pinned>

      <Pinned as='article' pin='green' tilt='left' style={{ width: '16rem' }}>
        <Card size='sm'>
          <Card.Body className='d-flex align-items-center gap-3'>
            <div className='flex-1'>
              <span className='eyebrow'>Sales · October</span>
              <p className='fw-medium mt-1'>Top seller: Mona Adel</p>
              <p className='text-subtle fs-sm'>38 new contracts</p>
            </div>
            <Sticker shape='star' size='sm' aria-hidden>
              1st
            </Sticker>
          </Card.Body>
        </Card>
      </Pinned>
    </Corkboard>
  );
}
