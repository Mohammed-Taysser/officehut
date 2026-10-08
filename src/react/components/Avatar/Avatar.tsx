import {
  Children,
  useState,
  type ComponentPropsWithRef,
  type ReactNode,
} from 'react';
import { cx } from '../../../shared/cx.js';
import { colorFor, initials } from '../../../shared/initials.js';
import type { AvatarSize, Color } from '../../../shared/tokens.js';

export type Presence = 'online' | 'busy' | 'away' | 'offline';

export interface AvatarProps extends ComponentPropsWithRef<'span'> {
  /** Full name: used for initials, alt text and (if no `color`) a stable colour. */
  name?: string;
  src?: string;
  /** Icon instead of initials. */
  icon?: ReactNode;
  size?: AvatarSize;
  /** Defaults to a colour derived from `name`. */
  color?: Color;
  circle?: boolean;
  presence?: Presence;
}

export function Avatar({
  name,
  src,
  icon,
  size = 'md',
  color,
  circle,
  presence,
  className,
  children,
  ...rest
}: AvatarProps) {
  const [broken, setBroken] = useState(false);
  const tone = color ?? (name ? colorFor(name) : undefined);
  const showImage = src && !broken;

  return (
    <span
      role={showImage ? undefined : 'img'}
      aria-label={showImage ? undefined : name}
      title={name}
      {...rest}
      className={cx(
        'avatar',
        size !== 'md' && `avatar-${size}`,
        tone && `avatar-${tone}`,
        circle && 'avatar-circle',
        className,
      )}
    >
      {showImage ? (
        <img src={src} alt={name ?? ''} onError={() => setBroken(true)} />
      ) : (
        (children ??
        icon ??
        (name ? <span aria-hidden>{initials(name)}</span> : null))
      )}
      {presence && (
        <span
          className={cx('avatar-presence', `is-${presence}`)}
          aria-label={presence}
          role='img'
        />
      )}
    </span>
  );
}

export interface AvatarListProps extends ComponentPropsWithRef<'div'> {
  /** Overlap the avatars. */
  stacked?: boolean;
  /** Show at most this many, then a "+N" chip. */
  max?: number;
  /** Size for the "+N" chip — match your avatars. */
  size?: AvatarSize;
}

export function AvatarList({
  stacked,
  max,
  size = 'md',
  className,
  children,
  ...rest
}: AvatarListProps) {
  const items = Children.toArray(children);
  const shown = max && items.length > max ? items.slice(0, max) : items;
  const extra = items.length - shown.length;

  return (
    <div
      {...rest}
      className={cx('avatar-list', stacked && 'avatar-list-stacked', className)}
    >
      {shown}
      {extra > 0 && (
        <span
          className={cx(
            'avatar avatar-more',
            size !== 'md' && `avatar-${size}`,
            'avatar-circle',
          )}
          aria-label={`${extra} more`}
        >
          +{extra}
        </span>
      )}
    </div>
  );
}
