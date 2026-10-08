import { useEffect, useRef, useState } from 'react';

const EVENTS = ['oh:show', 'oh:shown', 'oh:hide', 'oh:hidden', 'oh:change'];

// Plain data-API markup; the effect only listens and writes a log.
export default function EventLog() {
  const root = useRef<HTMLDivElement>(null);
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    const el = root.current!;
    const onEvent = (e: Event) => {
      const target = e.target as HTMLElement;
      setLog((l) =>
        [`${e.type}  ← #${target.id || target.className}`, ...l].slice(0, 6),
      );
    };
    EVENTS.forEach((name) => el.addEventListener(name, onEvent));
    return () =>
      EVENTS.forEach((name) => el.removeEventListener(name, onEvent));
  }, []);

  return (
    <div ref={root} className='grid cols-1 cols-md-2'>
      <div className='stack gap-3'>
        <div className='hstack'>
          <button
            type='button'
            className='btn'
            data-oh-toggle='collapse'
            data-oh-target='#js-filters'
            aria-expanded='false'
            aria-controls='js-filters'
          >
            Filters
          </button>
          <button
            type='button'
            className='btn btn-primary'
            data-oh-toggle='modal'
            data-oh-target='#js-export'
          >
            Export…
          </button>
        </div>
        <div className='collapse' id='js-filters'>
          <div>
            <p className='border rounded p-3 bg-surface'>
              Status: open · Department: facilities
            </p>
          </div>
        </div>
        <dialog
          className='modal modal-sm'
          id='js-export'
          aria-labelledby='js-export-title'
        >
          <div className='modal-header'>
            <h2 className='modal-title' id='js-export-title'>
              Export tickets
            </h2>
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              data-oh-dismiss='modal'
            />
          </div>
          <div className='modal-body'>42 tickets will be exported as CSV.</div>
        </dialog>
      </div>
      <pre className='fs-xs' aria-live='polite' style={{ minHeight: '9rem' }}>
        {log.length ? log.join('\n') : 'Events will appear here.'}
      </pre>
    </div>
  );
}
