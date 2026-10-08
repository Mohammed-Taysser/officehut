import { PencilLoader } from 'officehut/react';

/** Shown while a page chunk loads: a pencil writing on a ruled strip. */
export function RouteFallback() {
  return (
    <div className='doc-loading'>
      <PencilLoader label='Turning to the page' />
    </div>
  );
}
