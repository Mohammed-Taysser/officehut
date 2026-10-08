import { useState, type ComponentPropsWithRef, type ReactNode } from 'react';
import { cx } from '../../../shared/cx.js';
import type { Color } from '../../../shared/tokens.js';
import { iconForColor } from '../../utils/icons.js';

export type AlertVariant = 'soft' | 'note' | 'solid';

export interface AlertProps extends Omit<
  ComponentPropsWithRef<'div'>,
  'title'
> {
  color?: Color;
  /** `soft` tint (default), `note` paper with a coloured margin, or `solid`. */
  variant?: AlertVariant;
  title?: ReactNode;
  /** `true` picks an icon for the colour; pass a node to use your own. */
  icon?: ReactNode | boolean;
  /** Buttons rendered under the message. */
  actions?: ReactNode;
  /** Show a close button. */
  dismissible?: boolean;
  /** Called when closed. If omitted, the alert hides itself. */
  onDismiss?: () => void;
  /** Accessible label for the close button. */
  closeLabel?: string;
  size?: 'sm' | 'md';
}

export function Alert({
  color,
  variant = 'soft',
  title,
  icon,
  actions,
  dismissible,
  onDismiss,
  closeLabel = 'Dismiss',
  size = 'md',
  role,
  className,
  children,
  ...rest
}: AlertProps) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;

  const iconNode = icon === true ? iconForColor(color) : icon || null;

  return (
    <div
      {...rest}
      role={
        role ?? (color === 'danger' || color === 'warning' ? 'alert' : 'status')
      }
      className={cx(
        'alert',
        color && `alert-${color}`,
        variant !== 'soft' && `alert-${variant}`,
        size === 'sm' && 'alert-sm',
        className,
      )}
    >
      {iconNode && <span className='alert-icon'>{iconNode}</span>}
      <div className='alert-body'>
        {title && <p className='alert-title'>{title}</p>}
        {children}
        {actions && <div className='alert-actions'>{actions}</div>}
      </div>
      {dismissible && (
        <button
          type='button'
          className='btn-close'
          aria-label={closeLabel}
          onClick={() => (onDismiss ? onDismiss() : setHidden(true))}
        />
      )}
    </div>
  );
}
