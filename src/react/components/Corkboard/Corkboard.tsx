import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import { cx } from '../../../shared/cx.js';
import type { PolymorphicProps } from '../../utils/types.js';

export function Corkboard({
  className,
  ...rest
}: ComponentPropsWithRef<'div'>) {
  return <div {...rest} className={cx('corkboard', className)} />;
}

export interface PinnedOwnProps {
  pin?: 'red' | 'blue' | 'green' | 'yellow';
  tilt?: 'left' | 'right' | 'none';
  className?: string;
  children?: ReactNode;
}

/** Wrap anything to pin it to a Corkboard. */
export function Pinned<E extends ElementType = 'div'>({
  as,
  pin = 'red',
  tilt = 'none',
  className,
  ...rest
}: PolymorphicProps<E, PinnedOwnProps>) {
  const Tag: ElementType = as ?? 'div';
  return (
    <Tag
      {...rest}
      className={cx(
        'pinned',
        pin !== 'red' && `pin-${pin}`,
        tilt !== 'none' && `tilt-${tilt}`,
        className,
      )}
    />
  );
}

Corkboard.Pinned = Pinned;
