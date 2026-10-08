export default function Spacing() {
  return (
    <div className='stack gap-2'>
      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
        <div key={n} className='hstack'>
          <code className='fs-xs' style={{ width: '3.5rem' }}>
            .p-{n}
          </code>
          <span className={`p-${n} bg-primary-soft rounded-sm`}>
            <span className='d-block bg-surface border fs-xs px-1'>slip</span>
          </span>
        </div>
      ))}
    </div>
  );
}
