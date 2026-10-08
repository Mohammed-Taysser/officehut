import { getOrCreate, Tabs } from 'officehut';

const PARTS = [
  {
    id: 'scope',
    label: 'Scope',
    text: 'Applies to all staff and contractors with a company laptop.',
  },
  {
    id: 'rules',
    label: 'Rules',
    text: 'No personal USB drives. Report a lost device to IT within one hour.',
  },
  {
    id: 'contacts',
    label: 'Contacts',
    text: 'IT desk: ext. 200 · security@ (email) · Omar Hany, ext. 214.',
  },
];

// Plain HTML with the data API: initAll() wires up [data-oh-tabs] lists.
// React renders this after initAll() ran, so the ref sets it up instead.
export default function Html() {
  return (
    <div className='binder' style={{ maxWidth: 560 }}>
      <div
        className='tabs tabs-index'
        role='tablist'
        aria-label='IT policy'
        data-oh-tabs=''
        ref={(el) => {
          if (el) getOrCreate(Tabs, el);
        }}
      >
        {PARTS.map((p, i) => (
          <button
            key={p.id}
            type='button'
            className='tab'
            role='tab'
            id={`itp-tab-${p.id}`}
            aria-controls={`itp-${p.id}`}
            aria-selected={i === 0}
            tabIndex={i === 0 ? 0 : -1}
            data-oh-toggle='tab'
          >
            {p.label}
          </button>
        ))}
      </div>
      {PARTS.map((p, i) => (
        <div
          key={p.id}
          className='tab-panel'
          role='tabpanel'
          id={`itp-${p.id}`}
          aria-labelledby={`itp-tab-${p.id}`}
          hidden={i !== 0}
        >
          {p.text}
        </div>
      ))}
    </div>
  );
}
