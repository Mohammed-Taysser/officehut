import type { CSSProperties } from 'react';
import { COLORS } from 'officehut/react';

export default function Palette() {
  return (
    <div className='grid-auto' style={{ '--min': '9rem' } as CSSProperties}>
      {COLORS.map((name) => (
        <div key={name} className='border rounded overflow-hidden bg-surface'>
          <div className={`bg-${name} p-3 fw-medium`}>{name}</div>
          <div className={`bg-${name}-soft px-3 py-2 fs-sm`}>soft · ink</div>
          <code className='d-block px-3 py-2 fs-xs'>--oh-{name}</code>
        </div>
      ))}
    </div>
  );
}
