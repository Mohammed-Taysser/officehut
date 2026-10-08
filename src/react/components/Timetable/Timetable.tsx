import type { ReactNode } from 'react';
import { cx } from '../../../shared/cx.js';
import type { Color } from '../../../shared/tokens.js';

export interface TimetableEntry {
  /** Day index or day label from `days`. */
  day: number | string;
  /** Slot index or slot label from `slots`. */
  slot: number | string;
  /** How many slots it covers. Default 1. */
  span?: number;
  title: ReactNode;
  meta?: ReactNode;
  color?: Color;
  /** Render as a hatched "free" period. */
  free?: boolean;
}

export interface TimetableProps {
  days: string[];
  /** Row labels, usually start times ("08:00"). */
  slots: string[];
  entries: TimetableEntry[];
  /** Highlight a column (index or label). */
  today?: number | string;
  /** Accessible caption. */
  caption?: string;
  className?: string;
}

/** Resolve entries into a day×slot grid with rowspans. Exported for tests. */
export function timetableGrid(
  days: string[],
  slots: string[],
  entries: TimetableEntry[],
) {
  const idx = (v: number | string, list: string[]) =>
    typeof v === 'number' ? v : list.indexOf(v);
  type Cell = { entry: TimetableEntry; span: number } | 'covered' | null;
  const grid: Cell[][] = slots.map(() => days.map(() => null));
  for (const entry of entries) {
    const d = idx(entry.day, days);
    const s = idx(entry.slot, slots);
    if (d < 0 || s < 0 || !grid[s]) continue;
    const span = Math.max(1, Math.min(entry.span ?? 1, slots.length - s));
    grid[s]![d] = { entry, span };
    for (let k = 1; k < span; k++) grid[s + k]![d] = 'covered';
  }
  return grid;
}

/** School-style weekly grid — rotas, room bookings, training schedules. */
export function Timetable({
  days,
  slots,
  entries,
  today,
  caption,
  className,
}: TimetableProps) {
  const grid = timetableGrid(days, slots, entries);
  const todayIdx = typeof today === 'string' ? days.indexOf(today) : today;

  return (
    <div className={cx('timetable-wrap', className)}>
      <table className='timetable'>
        {caption && <caption className='visually-hidden'>{caption}</caption>}
        <thead>
          <tr>
            <th scope='col' className='timetable-time'>
              <span className='visually-hidden'>Time</span>
            </th>
            {days.map((d, i) => (
              <th
                key={d}
                scope='col'
                className={cx(i === todayIdx && 'is-today')}
                aria-current={i === todayIdx ? 'date' : undefined}
              >
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {grid.map((row, s) => (
            <tr key={slots[s]}>
              <th scope='row' className='timetable-time'>
                {slots[s]}
              </th>
              {row.map((cell, d) => {
                if (cell === 'covered') return null;
                if (!cell) return <td key={d} />;
                const { entry, span } = cell;
                return (
                  <td key={d} rowSpan={span > 1 ? span : undefined}>
                    <div
                      className={cx(
                        'lesson',
                        entry.free
                          ? 'lesson-free'
                          : entry.color && `lesson-${entry.color}`,
                      )}
                    >
                      <span className='lesson-title'>{entry.title}</span>
                      {entry.meta && (
                        <span className='lesson-meta'>{entry.meta}</span>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
