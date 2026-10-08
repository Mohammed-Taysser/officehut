export default function Logical() {
  return (
    <div className='grid cols-1 cols-md-2'>
      {(['ltr', 'rtl'] as const).map((dir) => (
        <div key={dir} dir={dir} className='border rounded p-3 bg-surface'>
          <div className='d-flex align-items-center gap-2'>
            <span className='badge badge-primary'>{dir}</span>
            <span className='ms-auto text-subtle fs-sm'>
              .ms-auto pushes me to the end
            </span>
          </div>
          <blockquote className='mt-3'>
            A blockquote rule sits on the start side.
          </blockquote>
        </div>
      ))}
    </div>
  );
}
