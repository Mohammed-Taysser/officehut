import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import { cx } from '../../../shared/cx.js';
import type { Color } from '../../../shared/tokens.js';
import type { PolymorphicProps } from '../../utils/types.js';

export interface ChipOwnProps {
  color?: Color;
  /** Muted prefix, e.g. "Status" in "Status: Overdue". */
  label?: ReactNode;
  icon?: ReactNode;
  /** Shows a remove (×) button. Don't combine with `as='button'`. */
  onRemove?: () => void;
  /** Accessible name of the remove button. Defaults to "Remove <text>". */
  removeLabel?: string;
  size?: 'sm' | 'md';
  className?: string;
  children?: ReactNode;
}

export type ChipProps<E extends ElementType = 'span'> = PolymorphicProps<
  E,
  ChipOwnProps
>;

/** A filter token. Render `as='button'` with `aria-pressed` for a toggle chip. */
export function Chip<E extends ElementType = 'span'>({
  as,
  color,
  label,
  icon,
  onRemove,
  removeLabel,
  size = 'md',
  className,
  children,
  ...rest
}: ChipProps<E>) {
  const Tag: ElementType = as ?? 'span';
  const text =
    typeof children === 'string' || typeof children === 'number'
      ? String(children)
      : '';
  return (
    <Tag
      {...(Tag === 'button' ? { type: 'button' } : null)}
      {...rest}
      className={cx(
        'chip',
        color && `chip-${color}`,
        size === 'sm' && 'chip-sm',
        className,
      )}
    >
      {icon}
      {label && <span className='chip-label'>{label}:</span>}
      <span className='chip-text'>{children}</span>
      {onRemove && (
        <button
          type='button'
          className='btn-close'
          aria-label={removeLabel ?? (text ? `Remove ${text}` : 'Remove')}
          onClick={onRemove}
        />
      )}
    </Tag>
  );
}

/** Wraps chips in a list. */
export function ChipList({ className, ...rest }: ComponentPropsWithRef<'div'>) {
  return <div {...rest} className={cx('chip-list', className)} />;
}
