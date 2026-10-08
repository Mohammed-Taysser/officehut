import { Marker } from 'officehut/react';

// A contract clause, highlighted with a colour code agreed by the legal team.
export default function Highlights() {
  return (
    <div className='stack gap-3' style={{ maxWidth: 640 }}>
      <p>
        <strong>7. Payment.</strong> The Client pays each invoice within{' '}
        <Marker>thirty (30) days</Marker> of receipt. Late payments carry
        interest of <Marker color='pink'>2% per month</Marker>. The Supplier may
        suspend the service after <Marker color='pink'>sixty (60) days</Marker>{' '}
        of non-payment, with <Marker color='green'>written notice</Marker> to
        the address in <Marker color='blue'>Schedule B</Marker>.
      </p>
      <p className='d-flex flex-wrap gap-4 fs-sm text-muted'>
        <span>
          <Marker>yellow</Marker> deadlines
        </span>
        <span>
          <Marker color='pink'>pink</Marker> money &amp; risk
        </span>
        <span>
          <Marker color='green'>green</Marker> agreed
        </span>
        <span>
          <Marker color='blue'>blue</Marker> cross-reference
        </span>
      </p>
    </div>
  );
}
