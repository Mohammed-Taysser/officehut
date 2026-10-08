import type { ElementType, ReactNode } from 'react';
import { cx } from '../../../shared/cx.js';
import type { PolymorphicProps } from '../../utils/types.js';

export interface ChalkboardOwnProps {
  /** Write the content in chalk handwriting. */
  hand?: boolean;
  className?: string;
  children?: ReactNode;
}

/** A classroom chalkboard — announcements, agendas, code. */
export function Chalkboard<E extends ElementType = 'div'>({
  as,
  hand,
  className,
  ...rest
}: PolymorphicProps<E, ChalkboardOwnProps>) {
  const Tag: ElementType = as ?? 'div';
  return (
    <Tag
      {...rest}
      className={cx('chalkboard', hand && 'chalkboard-hand', className)}
    />
  );
}
