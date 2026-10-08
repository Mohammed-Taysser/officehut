import type { ComponentPropsWithRef } from 'react';
import { cx } from '../../../shared/cx.js';

export interface PencilLoaderProps extends ComponentPropsWithRef<'div'> {
  /** Visible handwritten label. Screen readers always hear it. */
  label?: string;
  /** Hide the label visually (still announced). */
  hideLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

// Joined-up "handwriting" loops: two short words on a 200×64 page.
const INK =
  'M24 44 c3 -2 7 -6 5 -9 c-2 -3 -6 1 -4 6 c1 3 4 3 9 3 c3 -4 8 -12 6 -18 c-2 -4 -6 2 -4 10 c1 6 4 8 8 8 c1 -4 2 -7 3 -7 c1 0 1 4 2 7 c1 -4 2 -7 3 -7 c1 0 1 4 2 7 c3 -2 7 -6 5 -9 c-2 -3 -6 1 -4 6 c1 3 4 3 9 3 c3 -4 8 -12 6 -18 c-2 -4 -6 2 -4 10 c1 6 4 8 8 8 c3 -2 7 -6 5 -9 c-2 -3 -6 1 -4 6 c1 3 4 3 9 3 m8 0 c1 -4 2 -7 3 -7 c1 0 1 4 2 7 c1 -4 2 -7 3 -7 c1 0 1 4 2 7 c3 -2 7 -6 5 -9 c-2 -3 -6 1 -4 6 c1 3 4 3 9 3 c3 -4 8 -12 6 -18 c-2 -4 -6 2 -4 10 c1 6 4 8 8 8 c3 -4 8 -12 6 -18 c-2 -4 -6 2 -4 10 c1 6 4 8 8 8 c3 -2 7 -6 5 -9 c-2 -3 -6 1 -4 6 c1 3 4 3 9 3 c1 -4 2 -7 3 -7 c1 0 1 4 2 7 c1 -4 2 -7 3 -7 c1 0 1 4 2 7 c3 -2 7 -6 5 -9 c-2 -3 -6 1 -4 6 c1 3 4 3 9 3';

/**
 * Loading indicator: a pencil writing on a ruled strip. Falls back to the
 * finished line when the user prefers reduced motion.
 */
export function PencilLoader({
  label = 'Loading',
  hideLabel,
  size = 'md',
  className,
  ...rest
}: PencilLoaderProps) {
  return (
    <div
      role='status'
      aria-live='polite'
      {...rest}
      className={cx(
        'loader-pencil',
        size !== 'md' && `loader-pencil-${size}`,
        className,
      )}
    >
      <svg
        className='loader-pencil-art'
        viewBox='0 0 200 64'
        aria-hidden
        focusable='false'
      >
        <line className='loader-pencil-rule' x1='0' x2='200' y1='22' y2='22' />
        <line className='loader-pencil-rule' x1='0' x2='200' y1='46' y2='46' />
        <line className='loader-pencil-margin' x1='14' x2='14' y1='0' y2='64' />
        <path className='loader-pencil-ink' d={INK} pathLength={1} />
        <g className='loader-pencil-tool'>
          <g transform='translate(24 44) rotate(-40)'>
            <path className='loader-pencil-lead' d='M0 0 L6 -2.2 L6 2.2 Z' />
            <path
              className='loader-pencil-wood'
              d='M6 -2.2 L14 -5 L14 5 L6 2.2 Z'
            />
            <rect
              className='loader-pencil-body'
              x='14'
              y='-5'
              width='40'
              height='10'
            />
            <rect
              className='loader-pencil-band'
              x='54'
              y='-5'
              width='4'
              height='10'
            />
            <rect
              className='loader-pencil-eraser'
              x='58'
              y='-5'
              width='6'
              height='10'
              rx='2'
            />
          </g>
        </g>
      </svg>
      <span
        className={cx('loader-pencil-label', hideLabel && 'visually-hidden')}
      >
        {label}
      </span>
    </div>
  );
}
