/** A sheet of paper folded into a hut: the roof's right slope is the dog-ear. */
export function Logo({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 32 32'
      aria-hidden
      className='doc-logo-mark'
    >
      <path
        d='M4 14 16 4l12 10v14H4Z'
        fill='var(--oh-surface)'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinejoin='round'
      />
      <path
        d='M28 14h-8V7'
        fill='var(--oh-sunken)'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinejoin='round'
      />
      <path
        d='M9 19h9M9 23h14'
        stroke='var(--oh-aurora)'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </svg>
  );
}
