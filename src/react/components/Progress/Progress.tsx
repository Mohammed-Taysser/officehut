import {
  useId,
  type ComponentPropsWithRef,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { cx } from '../../../shared/cx.js';
import type { Color } from '../../../shared/tokens.js';

export interface ProgressSegment {
  value: number;
  color?: Color;
  /** Read out in `aria-valuetext` and shown as the segment's tooltip. */
  label?: string;
}

export interface ProgressProps extends Omit<
  ComponentPropsWithRef<'div'>,
  'children'
> {
  /** Omit (or set `indeterminate`) when the amount of work is unknown. */
  value?: number;
  min?: number;
  max?: number;
  /** Visible label above the bar; also its accessible name. Without it, pass `aria-label`. */
  label?: ReactNode;
  /** Figure shown at the end of the label row. `true` shows the percentage. */
  showValue?: boolean | ReactNode;
  /** Text read by screen readers instead of the percentage, e.g. "EGP 84,200 of 120,000". */
  valueText?: string;
  color?: Color;
  size?: 'sm' | 'md' | 'lg';
  /** Ruler ticks every 10%, a long one at 50%. */
  ruled?: boolean;
  /** Print 0 / 25 / 50 / 75 / 100 under a ruled bar. */
  scale?: boolean;
  indeterminate?: boolean;
  /** Stacked bar. Values share the same min/max as `value`. */
  segments?: ProgressSegment[];
}

const clamp = (n: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, n));

/** Percentage of `value` between `min` and `max`, clamped to 0–100. */
export function progressPercent(value: number, min = 0, max = 100): number {
  if (max <= min) return 0;
  return clamp(((value - min) / (max - min)) * 100, 0, 100);
}

const fmt = (n: number) => `${Math.round(n * 10) / 10}%`;

/**
 * A progress bar with `role="progressbar"` and aria-value* set for you.
 * `className` / `style` go on the outer element (the group when there is a
 * label row); other props go on the progressbar itself.
 */
export function Progress({
  value,
  min = 0,
  max = 100,
  label,
  showValue,
  valueText,
  color,
  size = 'md',
  ruled,
  scale,
  indeterminate,
  segments,
  className,
  style,
  ...rest
}: ProgressProps) {
  const labelId = useId();
  const stacked = Boolean(segments?.length);
  const total = stacked
    ? segments!.reduce((sum, s) => sum + s.value, 0)
    : value;
  const busy = indeterminate || total === undefined;
  const pct = busy ? 0 : progressPercent(total!, min, max);

  const text =
    valueText ??
    (stacked
      ? segments!
          .map(
            (s) =>
              `${s.label ? `${s.label} ` : ''}${fmt(progressPercent(min + s.value, min, max))}`,
          )
          .join(', ')
      : undefined);

  const valueNode =
    showValue === true ? (busy ? null : fmt(pct)) : showValue || null;
  // A large single bar prints the percentage inside the fill instead.
  const inside = size === 'lg' && showValue === true && !busy && !stacked;
  const hasRow = label !== undefined || (Boolean(valueNode) && !inside);

  const bar = (
    <div
      role='progressbar'
      aria-labelledby={
        label !== undefined && !rest['aria-label'] ? labelId : undefined
      }
      aria-valuemin={busy ? undefined : min}
      aria-valuemax={busy ? undefined : max}
      aria-valuenow={busy ? undefined : clamp(total!, min, max)}
      aria-valuetext={busy ? undefined : text}
      {...rest}
      className={cx(
        'progress',
        color && `progress-${color}`,
        size !== 'md' && `progress-${size}`,
        ruled && 'progress-ruled',
        busy && 'progress-indeterminate',
        !hasRow && !scale && className,
      )}
      style={!hasRow && !scale ? style : undefined}
    >
      {stacked ? (
        segments!.map((s, i) => (
          <div
            key={i}
            className={cx('progress-bar', s.color && `progress-bar-${s.color}`)}
            style={
              {
                '--_value': `${progressPercent(min + s.value, min, max)}%`,
              } as CSSProperties
            }
            title={s.label}
          />
        ))
      ) : (
        <div
          className='progress-bar'
          style={
            busy ? undefined : ({ '--_value': `${pct}%` } as CSSProperties)
          }
        >
          {inside ? fmt(pct) : null}
        </div>
      )}
    </div>
  );

  if (!hasRow && !scale) return bar;

  return (
    <div className={cx('progress-group', className)} style={style}>
      {hasRow && (
        <div className='progress-label'>
          <span id={labelId}>{label}</span>
          {valueNode && !inside && (
            <span className='progress-value'>{valueNode}</span>
          )}
        </div>
      )}
      {bar}
      {scale && (
        <div className='progress-scale' aria-hidden>
          {[0, 25, 50, 75, 100].map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
      )}
    </div>
  );
}
