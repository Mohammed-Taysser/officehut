export default function Lists() {
  return (
    <div className='grid cols-1 cols-md-3'>
      <div>
        <h6 className='mb-2'>Ordered</h6>
        <ol>
          <li>Book the room</li>
          <li>Send the agenda</li>
          <li>Order coffee</li>
        </ol>
      </div>
      <div>
        <h6 className='mb-2'>.list-unstyled</h6>
        <ul className='list-unstyled'>
          <li>Room 4B · 6 seats</li>
          <li>Room 2A · 12 seats</li>
          <li>Boardroom · 20 seats</li>
        </ul>
      </div>
      <div>
        <h6 className='mb-2'>.list-inline</h6>
        <ul className='list-inline'>
          <li>Screen</li>
          <li>Whiteboard</li>
          <li>Phone</li>
          <li>Step-free</li>
        </ul>
      </div>
    </div>
  );
}
