import type { ComponentPropsWithRef } from 'react';
import { cx } from '../../../shared/cx.js';

export interface CollapseProps extends ComponentPropsWithRef<'div'> {
  open: boolean;
}

/** Animated show/hide region (pure CSS height animation). */
export function Collapse({
  open,
  className,
  children,
  ...rest
}: CollapseProps) {
  return (
    <div
      {...rest}
      className={cx('collapse', open && 'is-open', className)}
      inert={!open}
    >
      <div>{children}</div>
    </div>
  );
}
