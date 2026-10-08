import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import { cx } from '../../../shared/cx.js';
import type { PolymorphicProps } from '../../utils/types.js';

export type StickyColor = 'yellow' | 'pink' | 'blue' | 'green' | 'orange';

export interface StickyOwnProps {
  color?: StickyColor;
  title?: ReactNode;
  /** Write the note in handwriting. */
  hand?: boolean;
  /** A strip of tape across the top. */
  taped?: boolean;
  /** No tilt. */
  straight?: boolean;
  className?: string;
  children?: ReactNode;
}

export type StickyProps<E extends ElementType = 'div'> = PolymorphicProps<
  E,
  StickyOwnProps
>;

/** A sticky note. Use `as='aside'` when it's a side remark. */
export function Sticky<E extends ElementType = 'div'>({
  as,
  color = 'yellow',
  title,
  hand,
  taped,
  straight,
  className,
  children,
  ...rest
}: StickyProps<E>) {
  const Tag: ElementType = as ?? 'div';
  return (
    <Tag
      {...rest}
      className={cx(
        'sticky',
        color !== 'yellow' && `sticky-${color}`,
        hand && 'sticky-hand',
        taped && 'sticky-taped',
        straight && 'sticky-straight',
        className,
      )}
    >
      {title && <p className='sticky-title'>{title}</p>}
      {children}
    </Tag>
  );
}

/** Responsive wall of sticky notes. */
export function StickyWall({
  className,
  ...rest
}: ComponentPropsWithRef<'div'>) {
  return <div {...rest} className={cx('sticky-wall', className)} />;
}
