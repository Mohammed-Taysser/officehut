// Plain HTML. The tick and the strike-through are pure CSS on :checked,
// so this list works with no JavaScript at all.
export default function Html() {
  return (
    <ul
      className='checklist'
      aria-label='Before you go on leave'
      style={{ maxWidth: 520 }}
    >
      <li className='checklist-item'>
        <label className='checklist-label'>
          <input
            type='checkbox'
            className='checklist-box'
            name='done'
            value='ooo'
            defaultChecked
          />
          <span className='checklist-text'>Set your out-of-office reply</span>
        </label>
      </li>
      <li className='checklist-item'>
        <label className='checklist-label'>
          <input
            type='checkbox'
            className='checklist-box'
            name='done'
            value='handover'
          />
          <span className='checklist-text'>Hand over open tickets</span>
        </label>
        <span className='checklist-meta'>to Salma</span>
      </li>
      <li className='checklist-item'>
        <label className='checklist-label'>
          <input
            type='checkbox'
            className='checklist-box'
            name='done'
            value='form'
          />
          <span className='checklist-text'>Submit the leave form</span>
        </label>
        <span className='checklist-meta is-late'>2 days late</span>
      </li>
    </ul>
  );
}
