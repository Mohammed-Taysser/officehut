import type { ComponentPropsWithRef, ReactNode, SVGProps } from 'react';
import { cx } from '../../../shared/cx.js';
import type { Color } from '../../../shared/tokens.js';

/** An empty desk in-tray, drawn with a single pen weight. */
export function InTrayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 64 48'
      width='64'
      height='48'
      fill='none'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden
      focusable={false}
      {...props}
    >
      <path d='M14 8h36l8 16H6Z' />
      <path d='M6 24v13a2 2 0 0 0 2 2h48a2 2 0 0 0 2-2V24' />
      <path d='M6 24h15l2.5 5h17l2.5-5h15' />
      <path d='M19 14h26M16.5 19h31' strokeOpacity={0.45} />
      <path d='M12 44h40' strokeDasharray='2 3' strokeOpacity={0.5} />
    </svg>
  );
}

export interface EmptyStateProps extends Omit<
  ComponentPropsWithRef<'div'>,
  'title'
> {
  /** Defaults to the in-tray drawing. Pass `false` for none. */
  icon?: ReactNode | false;
  title?: ReactNode;
  /** A short handwritten line, e.g. "Nothing waiting on you." */
  note?: ReactNode;
  /** Buttons under the text. */
  actions?: ReactNode;
  /** Dashed outline. */
  bordered?: boolean;
  size?: 'sm' | 'md';
  /** Tints the drawing. */
  color?: Color;
  /** Heading level for the title. Default `h3`. */
  titleAs?: 'h2' | 'h3' | 'h4' | 'p';
}

/** "Nothing here" placeholder. `children` become the description. */
export function EmptyState({
  icon,
  title,
  note,
  actions,
  bordered,
  size = 'md',
  color,
  titleAs: Title = 'h3',
  className,
  children,
  ...rest
}: EmptyStateProps) {
  const drawing = icon === undefined ? <InTrayIcon /> : icon;
  return (
    <div
      {...rest}
      className={cx(
        'empty',
        bordered && 'empty-bordered',
        size === 'sm' && 'empty-sm',
        color && `empty-${color}`,
        className,
      )}
    >
      {drawing && <div className='empty-icon'>{drawing}</div>}
      {title && <Title className='empty-title'>{title}</Title>}
      {children && <p className='empty-text'>{children}</p>}
      {note && <p className='empty-note'>{note}</p>}
      {actions && <div className='empty-actions'>{actions}</div>}
    </div>
  );
}
