// data-oh-parent: opening one region closes the other open regions in #steps.
const steps = [
  {
    id: 'step-room',
    title: '1. Pick a room',
    body: 'Room 4B is free 10:00–12:00. Seats 6, has a screen.',
  },
  {
    id: 'step-guests',
    title: '2. Invite people',
    body: 'Add Mona, Karim and Laila. External guests need a visitor pass.',
  },
  {
    id: 'step-extras',
    title: '3. Extras',
    body: 'Coffee for 6, ready at 09:50. Facilities confirm by email.',
  },
];

export default function Parent() {
  return (
    <div id='steps' className='stack gap-2' style={{ maxWidth: 480 }}>
      {steps.map((s) => (
        <div key={s.id} className='border rounded bg-surface'>
          <button
            type='button'
            className='btn btn-ghost w-100 justify-content-start'
            data-oh-toggle='collapse'
            data-oh-target={`#${s.id}`}
            aria-expanded='false'
            aria-controls={s.id}
          >
            {s.title}
          </button>
          <div className='collapse' id={s.id} data-oh-parent='#steps'>
            <div>
              <p className='px-3 pb-3 text-muted'>{s.body}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
