import type { ComponentPropsWithRef, CSSProperties } from 'react';
import { cx } from '../../../shared/cx.js';

export interface TableProps extends ComponentPropsWithRef<'table'> {
  striped?: boolean;
  hover?: boolean;
  bordered?: boolean;
  size?: 'sm' | 'md';
  /** Accounts-book page: ruled rows, red double margin, double-ruled totals. */
  ledger?: boolean;
  /** Keep the header row in view while the wrapper scrolls (needs `responsive`). */
  stickyHeader?: boolean;
  /**
   * Wrap in `.table-responsive` so wide tables scroll sideways. A CSS length
   * also caps the height (pair with `stickyHeader`).
   */
  responsive?: boolean | string;
}

/** A styled `<table>`. Write the rows yourself; mark figure cells with `className="num"`. */
export function Table({
  striped,
  hover,
  bordered,
  size = 'md',
  ledger,
  stickyHeader,
  responsive,
  className,
  ...rest
}: TableProps) {
  const table = (
    <table
      {...rest}
      className={cx(
        'table',
        striped && 'table-striped',
        hover && 'table-hover',
        bordered && 'table-bordered',
        size === 'sm' && 'table-sm',
        ledger && 'table-ledger',
        stickyHeader && 'table-sticky',
        className,
      )}
    />
  );
  if (!responsive) return table;
  const style =
    typeof responsive === 'string'
      ? ({ '--_max-h': responsive } as CSSProperties)
      : undefined;
  return (
    <div className='table-responsive' style={style}>
      {table}
    </div>
  );
}
