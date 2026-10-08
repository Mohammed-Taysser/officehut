import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cx } from '../../../shared/cx.js';
import type { Color } from '../../../shared/tokens.js';

export interface TrackingItem {
  /** Colour of the block, or `empty` for no data. */
  status: Color | 'empty';
  /** Tooltip and accessible name: "Tue 7 Oct — 99.98% uptime". */
  label: string;
}

export interface TrackingProps extends Omit<
  ComponentPropsWithRef<'ul'>,
  'children'
> {
  items: readonly TrackingItem[];
  size?: 'sm' | 'md' | 'lg';
  /** Caption under the strip, at the start: "30 days ago". */
  startLabel?: ReactNode;
  /** Caption under the strip, at the end: "Today". */
  endLabel?: ReactNode;
}

/**
 * A strip of blocks, one per day or check — an uptime bar or punch card.
 * Name the strip with `aria-label`; each block is a list item named by its label.
 */
export function Tracking({
  items,
  size = 'md',
  startLabel,
  endLabel,
  className,
  ...rest
}: TrackingProps) {
  const strip = (
    <ul
      {...rest}
      className={cx(
        'tracking',
        size !== 'md' && `tracking-${size}`,
        !(startLabel || endLabel) && className,
      )}
    >
      {items.map((it, i) => (
        <li
          key={i}
          className={cx(
            'tracking-block',
            it.status !== 'empty' && `tracking-block-${it.status}`,
          )}
          title={it.label}
          aria-label={it.label}
        />
      ))}
    </ul>
  );
  if (!startLabel && !endLabel) return strip;
  return (
    <div className={className}>
      {strip}
      <div className='tracking-legend' aria-hidden>
        <span>{startLabel}</span>
        <span>{endLabel}</span>
      </div>
    </div>
  );
}
