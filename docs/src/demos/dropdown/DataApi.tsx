// Plain HTML: initAll() opens the next .dropdown-menu sibling of the trigger.
export default function DataApi() {
  return (
    <div className='dropdown'>
      <button
        type='button'
        className='btn dropdown-toggle'
        data-oh-toggle='dropdown'
        data-oh-placement='bottom-start'
      >
        Assign to
      </button>
      <div className='dropdown-menu' role='menu' aria-label='Assign ticket'>
        <span className='dropdown-header'>Facilities</span>
        <button
          type='button'
          className='dropdown-item'
          role='menuitem'
          tabIndex={-1}
        >
          Karim Fawzy
        </button>
        <button
          type='button'
          className='dropdown-item'
          role='menuitem'
          tabIndex={-1}
        >
          Omar Hany
        </button>
        <hr className='dropdown-divider' />
        <button
          type='button'
          className='dropdown-item'
          role='menuitem'
          tabIndex={-1}
        >
          Leave unassigned
        </button>
      </div>
    </div>
  );
}
