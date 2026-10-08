import { PencilLoader } from 'officehut/react';

// For a server-rendered page, copy the markup from the HTML tab:
// a .loader-pencil wrapper with role="status", the SVG, and a label.
// hideLabel keeps the text for screen readers only.
export default function Html() {
  return (
    <div className='d-flex flex-wrap align-items-center gap-6'>
      <PencilLoader size='sm' hideLabel label='Uploading receipt' />
      <span className='text-subtle fs-sm'>Uploading receipt_0412.jpg</span>
    </div>
  );
}
