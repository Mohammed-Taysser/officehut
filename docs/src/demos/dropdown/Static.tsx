// .is-static shows a menu in the page flow: handy for docs, or as a sidebar list.
export default function Static() {
  return (
    <div
      className='dropdown-menu is-static'
      role='menu'
      aria-label='Report'
      style={{ maxWidth: 260 }}
    >
      <span className='dropdown-header'>Report</span>
      <button
        type='button'
        className='dropdown-item active'
        role='menuitem'
        tabIndex={-1}
      >
        Monthly summary
        <kbd className='dropdown-shortcut'>M</kbd>
      </button>
      <button
        type='button'
        className='dropdown-item'
        role='menuitem'
        tabIndex={-1}
      >
        By department
        <kbd className='dropdown-shortcut'>D</kbd>
      </button>
      <hr className='dropdown-divider' />
      <button
        type='button'
        className='dropdown-item is-danger'
        role='menuitem'
        tabIndex={-1}
      >
        Delete saved report
      </button>
    </div>
  );
}
