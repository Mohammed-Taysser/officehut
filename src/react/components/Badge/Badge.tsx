import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cx } from '../../../shared/cx.js';
import type { Color } from '../../../shared/tokens.js';

export type BadgeVariant = 'solid' | 'soft' | 'outline' | 'stamp';

export interface BadgeProps extends ComponentPropsWithRef<'span'> {
  color?: Color;
  /** Default `soft`. `stamp` looks like a rubber stamp — for PAID, VOID, etc. */
  variant?: BadgeVariant;
  pill?: boolean;
  /** Pin to the top corner of the nearest positioned parent (counters). */
  corner?: boolean;
  /** Play the stamp animation on mount (`variant="stamp"` only). */
  animate?: boolean;
  children?: ReactNode;
}

/** Small label. With no children it renders as a status dot. */
export function Badge({
  color,
  variant = 'soft',
  pill,
  corner,
  animate,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      {...rest}
      className={cx(
        'badge',
        color && `badge-${color}`,
        variant !== 'solid' && `badge-${variant}`,
        pill && 'badge-pill',
        corner && 'badge-corner',
        animate && variant === 'stamp' && 'is-animated',
        className,
      )}
    >
      {children}
    </span>
  );
}
