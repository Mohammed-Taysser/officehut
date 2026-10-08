import type { ComponentPropsWithRef } from 'react';
import { cx } from '../../../shared/cx.js';

export interface DateTileProps extends Omit<
  ComponentPropsWithRef<'time'>,
  'dateTime'
> {
  date: Date | string | number;
  /** BCP 47 locale for month/weekday names. Defaults to the browser's. */
  locale?: string;
  size?: 'sm' | 'md' | 'lg';
  band?: 'red' | 'blue' | 'green' | 'dark';
}

/**
 * Turn the input into a local Date. A bare "YYYY-MM-DD" is a calendar day, so
 * it's read as local midnight (the Date constructor would read it as UTC and
 * show the previous day west of Greenwich).
 */
export function toLocalDate(date: Date | string | number): Date {
  if (date instanceof Date) return date;
  if (typeof date === 'string') {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date.trim());
    if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  }
  return new Date(date);
}

const pad = (n: number) => String(n).padStart(2, '0');

/** A tear-off desk calendar page for one date. */
export function DateTile({
  date,
  locale,
  size = 'md',
  band = 'red',
  className,
  ...rest
}: DateTileProps) {
  const d = toLocalDate(date);
  // Same local calendar day as the visible text — not the UTC day.
  const iso = Number.isNaN(d.getTime())
    ? undefined
    : `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const fmt = (o: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locale, o).format(d);
  return (
    <time
      dateTime={iso}
      aria-label={fmt({
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}
      {...rest}
      className={cx(
        'date-tile',
        size !== 'md' && `date-tile-${size}`,
        band !== 'red' && `date-tile-${band}`,
        className,
      )}
    >
      <span className='date-tile-month' aria-hidden>
        {fmt({ month: 'short' })}
      </span>
      <span className='date-tile-day' aria-hidden>
        {fmt({ day: 'numeric' })}
      </span>
      <span className='date-tile-weekday' aria-hidden>
        {fmt({ weekday: 'short' })}
      </span>
    </time>
  );
}
