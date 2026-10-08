import type { ComponentPropsWithRef } from 'react';
import { cx } from '../../../shared/cx.js';
import type { Color } from '../../../shared/tokens.js';

export type SparkPoint = [x: number, y: number];

const round = (n: number) => Math.round(n * 100) / 100;

/**
 * Map a series onto an SVG box: first value at the left, last at the right,
 * highest value at the top. Non-finite values are skipped. A flat series sits
 * on the middle line; a single value is placed in the centre.
 */
export function sparklinePoints(
  values: readonly number[],
  width = 96,
  height = 28,
  padding = 2,
): SparkPoint[] {
  const data = values.filter(Number.isFinite);
  if (data.length === 0) return [];
  if (data.length === 1) return [[round(width / 2), round(height / 2)]];
  const lo = Math.min(...data);
  const hi = Math.max(...data);
  const w = width - padding * 2;
  const h = height - padding * 2;
  const step = w / (data.length - 1);
  return data.map((v, i) => [
    round(padding + i * step),
    round(hi === lo ? height / 2 : padding + (1 - (v - lo) / (hi - lo)) * h),
  ]);
}

/** `points` attribute for `<polyline>`: "x,y x,y …". */
export function sparklinePolyline(points: readonly SparkPoint[]): string {
  return points.map(([x, y]) => `${x},${y}`).join(' ');
}

/** SVG path data: "M x y L x y …". With `close`, drops to the baseline to make an area. */
export function sparklinePath(
  points: readonly SparkPoint[],
  close?: { baseline: number },
): string {
  if (points.length === 0) return '';
  const line = points.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ');
  if (!close) return line;
  const first = points[0]!;
  const last = points[points.length - 1]!;
  return `${line} L${last[0]} ${close.baseline} L${first[0]} ${close.baseline} Z`;
}

export interface SparklineProps extends Omit<
  ComponentPropsWithRef<'svg'>,
  'values'
> {
  values: readonly number[];
  width?: number;
  height?: number;
  color?: Color;
  /** Faint fill under the line. */
  area?: boolean;
  /** Dot on the latest value. Default true. */
  dot?: boolean;
  /** Dashed reference line at the first value. */
  baseline?: boolean;
  /** Accessible description, e.g. "Overdue invoices, last 12 weeks, rising". Omit to hide from AT. */
  label?: string;
}

/** A tiny trend line drawn with a single SVG polyline. No chart library. */
export function Sparkline({
  values,
  width = 96,
  height = 28,
  color,
  area,
  dot = true,
  baseline,
  label,
  className,
  ...rest
}: SparklineProps) {
  const pts = sparklinePoints(values, width, height);
  const last = pts[pts.length - 1];
  const first = pts[0];
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable={false}
      {...rest}
      className={cx('sparkline', color && `sparkline-${color}`, className)}
    >
      {baseline && first && (
        <line
          className='sparkline-base'
          x1={0}
          x2={width}
          y1={first[1]}
          y2={first[1]}
        />
      )}
      {area && pts.length > 1 && (
        <path
          className='sparkline-area'
          d={sparklinePath(pts, { baseline: height })}
        />
      )}
      {pts.length > 1 && (
        <polyline className='sparkline-line' points={sparklinePolyline(pts)} />
      )}
      {dot && last && (
        <circle className='sparkline-dot' cx={last[0]} cy={last[1]} r={2.25} />
      )}
    </svg>
  );
}
