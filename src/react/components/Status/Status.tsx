import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cx } from '../../../shared/cx.js';
import type { Color } from '../../../shared/tokens.js';

export interface StatusProps extends ComponentPropsWithRef<'span'> {
  color?: Color;
  /** Soft ring around the dot — for things that are live right now. */
  pulse?: boolean;
  size?: 'sm' | 'md' | 'lg';
  /** The label. With no children, give the dot an `aria-label`. */
  children?: ReactNode;
}

/** Coloured dot + label. */
export function Status({
  color,
  pulse,
  size = 'md',
  className,
  children,
  ...rest
}: StatusProps) {
  const dotOnly = children === undefined || children === null;
  return (
    <span
      role={dotOnly && rest['aria-label'] ? 'img' : undefined}
      {...rest}
      className={cx(
        'status',
        color && `status-${color}`,
        pulse && 'status-pulse',
        size !== 'md' && `status-${size}`,
        className,
      )}
    >
      <span className='status-dot' aria-hidden />
      {children}
    </span>
  );
}
