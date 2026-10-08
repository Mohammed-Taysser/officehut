import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cx } from '../../../shared/cx.js';

export interface DividerProps extends ComponentPropsWithRef<'div'> {
  /** Text on the line. Strings also become the separator's accessible name. */
  label?: ReactNode;
  /** Where the label sits. */
  align?: 'start' | 'center' | 'end';
  /** `dotted` reads as a perforation ("detach here"). */
  variant?: 'solid' | 'dashed' | 'dotted' | 'strong';
  vertical?: boolean;
}

/** A hairline rule, optionally carrying a label. */
export function Divider({
  label,
  align = 'center',
  variant = 'solid',
  vertical,
  className,
  ...rest
}: DividerProps) {
  return (
    <div
      role='separator'
      aria-orientation={vertical ? 'vertical' : undefined}
      aria-label={typeof label === 'string' ? label : undefined}
      {...rest}
      className={cx(
        'divider',
        label !== undefined && align !== 'center' && `divider-${align}`,
        variant !== 'solid' && `divider-${variant}`,
        vertical && 'divider-vertical',
        className,
      )}
    >
      {label}
    </div>
  );
}
