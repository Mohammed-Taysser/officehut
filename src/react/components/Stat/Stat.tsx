import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cx } from '../../../shared/cx.js';
import type { Color } from '../../../shared/tokens.js';

export type StatTrend = 'up' | 'down' | 'flat';
export type StatSentiment = 'good' | 'bad' | 'neutral';

export interface StatProps extends ComponentPropsWithRef<'div'> {
  label: ReactNode;
  value: ReactNode;
  /** Small unit after the value: "EGP", "%", "days". */
  unit?: ReactNode;
  /** Change against the last period, e.g. "+12.4%". */
  delta?: ReactNode;
  trend?: StatTrend;
  /**
   * Colours the delta. Defaults from `trend` (up = good). Set `bad` for
   * figures where going up is worse — overdue invoices, open tickets.
   */
  sentiment?: StatSentiment;
  /** Muted text after the delta: "vs. September". */
  meta?: ReactNode;
  /** Handwritten margin note, e.g. "chase Nile Freight". */
  note?: ReactNode;
  /** Usually a `<Sparkline>`. */
  chart?: ReactNode;
  /** Coloured top edge (and sparkline colour). */
  color?: Color;
  /** No paper — for stats inside a card. */
  plain?: boolean;
}

const TREND_WORD: Record<StatTrend, string> = {
  up: 'up',
  down: 'down',
  flat: 'unchanged',
};

/** A KPI figure: label, value, change and an optional sparkline. */
export function Stat({
  label,
  value,
  unit,
  delta,
  trend,
  sentiment,
  meta,
  note,
  chart,
  color,
  plain,
  className,
  ...rest
}: StatProps) {
  const mood =
    sentiment ??
    (trend === 'up' ? 'good' : trend === 'down' ? 'bad' : 'neutral');
  return (
    <div
      {...rest}
      className={cx(
        'stat',
        color && `stat-${color}`,
        plain && 'stat-plain',
        className,
      )}
    >
      <p className='stat-label'>{label}</p>
      <p className='stat-value'>
        {value}
        {unit && <span className='stat-unit'>{unit}</span>}
      </p>
      {(delta !== undefined || meta) && (
        <div className='stat-foot'>
          {delta !== undefined && (
            <span
              className={cx(
                'stat-delta',
                trend && trend !== 'flat' && `is-${trend}`,
                mood !== 'neutral' && `stat-delta-${mood}`,
              )}
            >
              {trend && (
                <span className='visually-hidden'>{TREND_WORD[trend]} </span>
              )}
              {delta}
            </span>
          )}
          {meta && <span>{meta}</span>}
        </div>
      )}
      {note && (
        <p
          className={cx(
            'stat-note',
            mood !== 'neutral' && `stat-delta-${mood}`,
          )}
        >
          {note}
        </p>
      )}
      {chart && <div className='stat-chart'>{chart}</div>}
    </div>
  );
}

/** One sheet holding several stats, with rules between them. */
export function StatGroup({
  className,
  ...rest
}: ComponentPropsWithRef<'div'>) {
  return <div {...rest} className={cx('stat-group', className)} />;
}
