// A dialog shown in place (no showModal) so its parts can be labelled.
export default function Anatomy() {
  return (
    <dialog
      open
      className='modal'
      aria-labelledby='anatomy-title'
      style={{ position: 'static' }}
    >
      <div className='modal-header'>
        <h2 className='modal-title' id='anatomy-title'>
          Book Room 4B
        </h2>
        <button type='button' className='btn-close' aria-label='Close' />
      </div>
      <div className='modal-body'>
        Thursday 16 October, 10:00 – 11:30. Six seats, screen and whiteboard.
      </div>
      <div className='modal-footer'>
        <button type='button' className='btn btn-ghost'>
          Cancel
        </button>
        <button type='button' className='btn btn-primary'>
          Book room
        </button>
      </div>
    </dialog>
  );
}
