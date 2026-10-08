import type { ComponentPropsWithRef } from 'react';
import { cx } from '../../../shared/cx.js';
import type { Color } from '../../../shared/tokens.js';

export interface SpinnerProps extends ComponentPropsWithRef<'span'> {
  /** `ring` (default) or three blinking `dots`. */
  variant?: 'ring' | 'dots';
  size?: 'sm' | 'md' | 'lg';
  /** Defaults to the current text colour. */
  color?: Color;
  /** Read by screen readers; visually hidden. */
  label?: string;
}

/** Loading indicator with `role="status"` and a visually hidden label. */
export function Spinner({
  variant = 'ring',
  size = 'md',
  color,
  label = 'Loading…',
  className,
  ...rest
}: SpinnerProps) {
  return (
    <span
      role='status'
      {...rest}
      className={cx(
        'spinner',
        variant === 'dots' && 'spinner-dots',
        size !== 'md' && `spinner-${size}`,
        color && `spinner-${color}`,
        className,
      )}
    >
      {variant === 'dots' && (
        <>
          <span />
          <span />
          <span />
        </>
      )}
      <span className='visually-hidden'>{label}</span>
    </span>
  );
}
