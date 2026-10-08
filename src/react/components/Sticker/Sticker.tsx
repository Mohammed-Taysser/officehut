import type { ComponentPropsWithRef } from 'react';
import { cx } from '../../../shared/cx.js';
import type { Color } from '../../../shared/tokens.js';

export interface StickerProps extends ComponentPropsWithRef<'span'> {
  /** Defaults to gold. */
  color?: Color;
  shape?: 'round' | 'scallop' | 'star';
  size?: 'sm' | 'md' | 'lg';
  /** Rotation in degrees. Default -10. */
  tilt?: number;
}

/** A reward sticker: "Well done", "Approved", "Top seller", a gold star. */
export function Sticker({
  color,
  shape = 'round',
  size = 'md',
  tilt,
  className,
  style,
  ...rest
}: StickerProps) {
  return (
    <span
      {...rest}
      style={
        tilt === undefined
          ? style
          : { ...style, ['--_tilt' as string]: `${tilt}deg` }
      }
      className={cx(
        'sticker',
        color && `sticker-${color}`,
        shape !== 'round' && `sticker-${shape}`,
        size !== 'md' && `sticker-${size}`,
        className,
      )}
    />
  );
}
