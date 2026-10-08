import type { ReactNode } from 'react';

/** A sticky note taped to the page — for gotchas and accessibility tips. */
export function Note({
  title = 'Note',
  tone = 'yellow',
  children,
}: {
  title?: string;
  tone?: 'yellow' | 'pink' | 'blue';
  children: ReactNode;
}) {
  return (
    <aside className={`doc-note handwriting is-${tone}`}>
      <p className='doc-note-title'>{title}</p>
      <div>{children}</div>
    </aside>
  );
}
