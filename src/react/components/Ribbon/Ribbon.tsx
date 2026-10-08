import type { ComponentPropsWithRef } from 'react';
import { cx } from '../../../shared/cx.js';
import type { Color } from '../../../shared/tokens.js';

export interface RibbonProps extends ComponentPropsWithRef<'span'> {
  /** Default plain masking tape. */
  color?: Color;
  /** `end` corner (default), `start` corner, or straddling the `top` edge. */
  placement?: 'end' | 'start' | 'top';
}

/**
 * A strip of tape across a corner of a positioned parent (e.g. a Card),
 * trimmed to the corner. `placement="top"` is a short piece on the top edge.
 */
export function Ribbon({
  color,
  placement = 'end',
  className,
  children,
  ...rest
}: RibbonProps) {
  const classes = cx(
    'ribbon',
    color && `ribbon-${color}`,
    placement !== 'end' && `ribbon-${placement}`,
    className,
  );
  if (placement === 'top') {
    return (
      <span {...rest} className={classes}>
        {children}
      </span>
    );
  }
  return (
    <span {...rest} className={classes}>
      <span>{children}</span>
    </span>
  );
}
