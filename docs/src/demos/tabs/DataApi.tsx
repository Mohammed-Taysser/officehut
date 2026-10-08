import { getOrCreate, Tabs } from 'officehut';

const PERIODS = [
  {
    id: 'week',
    label: 'This week',
    text: '32 of 40 hours logged. Friday is still empty.',
  },
  { id: 'last', label: 'Last week', text: '40 hours, approved by Mona Adel.' },
  { id: 'month', label: 'October', text: '112 hours so far this month.' },
];

// Plain HTML: inactive panels start `hidden` and inactive tabs start with
// tabindex -1, so the page is right before any script runs.
// React renders this after initAll() has run, so the ref creates the Tabs
// instance (for the arrow keys) up front. On a static page initAll() does it.
export default function DataApi() {
  return (
    <div>
      <div
        className='tabs'
        role='tablist'
        aria-label='Timesheet period'
        data-oh-tabs=''
        ref={(el) => {
          if (el) getOrCreate(Tabs, el);
        }}
      >
        {PERIODS.map((p, i) => (
          <button
            key={p.id}
            type='button'
            className='tab'
            role='tab'
            id={`ts-tab-${p.id}`}
            aria-controls={`ts-${p.id}`}
            aria-selected={i === 0}
            tabIndex={i === 0 ? 0 : -1}
            data-oh-toggle='tab'
          >
            {p.label}
          </button>
        ))}
      </div>
      {PERIODS.map((p, i) => (
        <div
          key={p.id}
          className='tab-panel'
          role='tabpanel'
          id={`ts-${p.id}`}
          aria-labelledby={`ts-tab-${p.id}`}
          hidden={i !== 0}
        >
          {p.text}
        </div>
      ))}
    </div>
  );
}
