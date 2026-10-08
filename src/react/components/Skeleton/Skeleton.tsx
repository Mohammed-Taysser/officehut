import type { ComponentPropsWithRef, CSSProperties } from 'react';
import { cx } from '../../../shared/cx.js';

export interface SkeletonProps extends ComponentPropsWithRef<'span'> {
  /** `text` line (default), `circle` (avatar) or `rect` (image, chart). */
  variant?: 'text' | 'circle' | 'rect';
  /** CSS length or number of px. Circles use it for both sides. */
  width?: string | number;
  height?: string | number;
  /** Turn off the sheen. */
  static?: boolean;
}

const len = (v?: string | number) => (typeof v === 'number' ? `${v}px` : v);

/** A pencil-shaded placeholder. Always `aria-hidden`: mark the loading region with `aria-busy`. */
export function Skeleton({
  variant = 'text',
  width,
  height,
  static: still,
  className,
  style,
  ...rest
}: SkeletonProps) {
  const vars: Record<string, string | undefined> = {
    '--_w': len(width),
    '--_h': len(height),
  };
  return (
    <span
      aria-hidden
      {...rest}
      className={cx(
        'skeleton',
        `skeleton-${variant}`,
        still && 'skeleton-static',
        className,
      )}
      style={{ ...(vars as CSSProperties), ...style }}
    />
  );
}

// Varied but stable line lengths, so a paragraph doesn't look like a barcode.
const WIDTHS = ['100%', '94%', '97%', '89%', '96%', '91%'];

export interface SkeletonTextProps extends ComponentPropsWithRef<'div'> {
  lines?: number;
  /** Sit the lines on exercise-book ruling. */
  ruled?: boolean;
  static?: boolean;
}

/** A paragraph of placeholder lines; the last one stops short. */
export function SkeletonText({
  lines = 3,
  ruled,
  static: still,
  className,
  ...rest
}: SkeletonTextProps) {
  return (
    <div
      aria-hidden
      {...rest}
      className={cx('skeleton-paragraph', ruled && 'skeleton-ruled', className)}
    >
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          static={still}
          width={i === lines - 1 ? undefined : WIDTHS[i % WIDTHS.length]}
        />
      ))}
    </div>
  );
}

Skeleton.Text = SkeletonText;
