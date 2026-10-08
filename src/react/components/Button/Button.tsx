import type {
  ComponentPropsWithRef,
  ElementType,
  ReactElement,
  ReactNode,
} from 'react';
import { cx } from '../../../shared/cx.js';
import type { Color, Size } from '../../../shared/tokens.js';
import type { PolymorphicProps } from '../../utils/types.js';

export type ButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost' | 'link';

export interface ButtonOwnProps {
  /** Palette colour. Leave empty for the neutral paper button. */
  color?: Color;
  /** `solid` (default) fills with `color`; the others tint it. */
  variant?: ButtonVariant;
  size?: Size;
  pill?: boolean;
  /** Sharp corners. */
  square?: boolean;
  /** Full width. */
  block?: boolean;
  /** Shows a spinner, keeps the width, blocks clicks. */
  loading?: boolean;
  /** Icon before the label. */
  icon?: ReactNode;
  /** Icon after the label. */
  iconEnd?: ReactNode;
  /** Square icon-only button — pass `aria-label`. */
  iconOnly?: boolean;
  /** Renders an `<a>` when set (unless `as` says otherwise). */
  href?: string;
  className?: string;
  children?: ReactNode;
}

export type ButtonProps<E extends ElementType = 'button'> = PolymorphicProps<
  E,
  ButtonOwnProps
>;

/** Props when `href` is given without `as`: an anchor. */
export type ButtonLinkProps = ButtonOwnProps & {
  href: string;
  as?: never;
} & Omit<ComponentPropsWithRef<'a'>, keyof ButtonOwnProps | 'as'>;

/**
 * Renders a `<button>` by default, an `<a>` when given `href`, or any
 * component via `as` (e.g. a router `Link`).
 */
export function Button(props: ButtonLinkProps): ReactElement;
export function Button<E extends ElementType = 'button'>(
  props: ButtonProps<E>,
): ReactElement;
export function Button<E extends ElementType = 'button'>({
  as,
  color,
  variant = 'solid',
  size = 'md',
  pill,
  square,
  block,
  loading,
  icon,
  iconEnd,
  iconOnly,
  className,
  children,
  ...rest
}: ButtonProps<E>): ReactElement {
  const props = rest as Record<string, unknown>;
  const Tag: ElementType = as ?? (props.href ? 'a' : 'button');
  const isNative = Tag === 'button';
  const disabled = Boolean(props.disabled) || loading;

  return (
    <Tag
      {...(isNative ? { type: 'button' } : {})}
      {...props}
      {...(!isNative && disabled
        ? { 'aria-disabled': true, tabIndex: -1 }
        : {})}
      disabled={isNative ? disabled : undefined}
      aria-busy={loading || undefined}
      className={cx(
        'btn',
        color && `btn-${color}`,
        variant !== 'solid' && `btn-${variant}`,
        size !== 'md' && `btn-${size}`,
        pill && 'btn-pill',
        square && 'btn-square',
        block && 'btn-block',
        iconOnly && 'btn-icon',
        loading && 'is-loading',
        className,
      )}
    >
      {icon}
      {children}
      {iconEnd}
    </Tag>
  );
}

export interface ButtonListProps {
  /** Join buttons into one segmented group instead of spacing them. */
  attached?: boolean;
  className?: string;
  children?: ReactNode;
  'aria-label'?: string;
}

export function ButtonList({
  attached,
  className,
  children,
  ...rest
}: ButtonListProps) {
  return (
    <div
      role={attached ? 'group' : undefined}
      className={cx(attached ? 'btn-group' : 'btn-list', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
