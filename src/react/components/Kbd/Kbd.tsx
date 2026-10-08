import { Fragment, type ComponentPropsWithRef, type ReactNode } from 'react';
import { cx } from '../../../shared/cx.js';

export interface KbdProps extends ComponentPropsWithRef<'kbd'> {
  /** A chord, e.g. `['Ctrl', 'Shift', 'P']`. Renders nested `<kbd>`s. */
  keys?: ReactNode[];
  /** Between keys of a chord. */
  separator?: ReactNode;
  /** `pencil` draws the key by hand, for notebook pages. */
  variant?: 'key' | 'dark' | 'pencil';
}

/** A keycap, or a chord of keycaps. */
export function Kbd({
  keys,
  separator = '+',
  variant = 'key',
  className,
  children,
  ...rest
}: KbdProps) {
  const cap = cx('kbd', variant !== 'key' && `kbd-${variant}`);
  if (!keys) {
    return (
      <kbd {...rest} className={cx(cap, className)}>
        {children}
      </kbd>
    );
  }
  return (
    <kbd {...rest} className={cx('kbd-combo', className)}>
      {keys.map((k, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <span className='kbd-sep' aria-hidden>
              {separator}
            </span>
          )}
          <kbd className={cap}>{k}</kbd>
        </Fragment>
      ))}
    </kbd>
  );
}
