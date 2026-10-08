// Plain HTML, no JavaScript: .corkboard, .pinned (+ .pin-*, .tilt-*), .clipped.
export default function Html() {
  return (
    <div className='corkboard'>
      <div className='pinned pin-blue tilt-left' style={{ width: '14rem' }}>
        <div className='card card-sm clipped'>
          <div className='card-body'>
            <p className='fw-medium'>Car park closed Friday</p>
            <p className='text-subtle fs-sm'>Resurfacing. Map attached.</p>
          </div>
        </div>
      </div>
      <div className='pinned tilt-right' style={{ width: '12rem' }}>
        <div className='sticky sticky-pink sticky-hand sticky-straight'>
          Cake in the kitchen at 3!
        </div>
      </div>
    </div>
  );
}
