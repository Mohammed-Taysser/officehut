import { Grade, Marker, MarginNote, Notebook, Sticky } from 'officehut/react';

// Legal's markup of a lease renewal before it goes back to the landlord.
export default function Contract() {
  return (
    <div className='d-flex flex-wrap align-items-start gap-5'>
      <Notebook style={{ maxWidth: 560, flex: '1 1 22rem' }}>
        <h3>
          <MarginNote>§4</MarginNote>
          Lease renewal, 12 Tahrir St.
        </h3>
        <p>
          The term runs for <Marker>three (3) years</Marker> from 1 January
          2027.
        </p>
        <p>
          Rent rises by <Marker color='pink'>10% each year</Marker>,{' '}
          <Marker variant='wavy'>unless agreed otherwise</Marker>.
        </p>
        <p>
          Either party may end the lease with{' '}
          <Marker variant='circle'>90</Marker> days&apos; notice.
        </p>
        <p>
          <Marker variant='strike'>
            The tenant pays for structural repairs.
          </Marker>
        </p>
      </Notebook>
      <div className='stack gap-5' style={{ flex: '0 1 14rem' }}>
        <Sticky as='aside' hand color='pink'>
          10% is above market. Ask for 7%.
        </Sticky>
        <Grade
          value='B'
          size='sm'
          label='Legal review: grade B'
          remark='two changes'
        />
      </div>
    </div>
  );
}
