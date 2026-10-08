import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import { cx } from '../../../shared/cx.js';
import type { Color } from '../../../shared/tokens.js';
import type { PolymorphicProps } from '../../utils/types.js';

export type CardStatusPosition = 'top' | 'bottom' | 'start' | 'end';

export interface CardOwnProps {
  /** Coloured edge. */
  status?: Color;
  statusPosition?: CardStatusPosition;
  /** Sheets of paper peeking out underneath. */
  stacked?: boolean;
  borderless?: boolean;
  size?: 'sm' | 'md' | 'lg';
  /** Lift on hover — pair with a `stretched-link` inside. */
  interactive?: boolean;
  /** A paper clip over the top edge ("has attachments"). */
  clipped?: boolean;
  /** Manila folder tab above the card. */
  tab?: ReactNode;
  tabColor?: Color;
  /** Image beside the content instead of above it. */
  horizontal?: boolean;
  /** For horizontal cards: put the image at the end. */
  reversed?: boolean;

  // shorthands — when any is set, `children` go inside a Card.Body
  title?: ReactNode;
  subtitle?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  image?: string;
  imageAlt?: string;
  className?: string;
  children?: ReactNode;
}

export type CardProps<E extends ElementType = 'div'> = PolymorphicProps<
  E,
  CardOwnProps
>;

export function Card<E extends ElementType = 'div'>({
  as,
  status,
  statusPosition = 'top',
  stacked,
  borderless,
  size = 'md',
  interactive,
  tab,
  tabColor,
  clipped,
  horizontal,
  reversed,
  title,
  subtitle,
  header,
  footer,
  image,
  imageAlt = '',
  className,
  children,
  ...rest
}: CardProps<E>) {
  const Tag: ElementType = as ?? 'div';
  const shorthand =
    title !== undefined ||
    subtitle !== undefined ||
    header !== undefined ||
    footer !== undefined ||
    image !== undefined;

  return (
    <Tag
      {...rest}
      className={cx(
        'card',
        stacked && 'card-stacked',
        borderless && 'card-borderless',
        size !== 'md' && `card-${size}`,
        interactive && 'card-link',
        clipped && 'clipped',
        horizontal && 'card-horizontal',
        horizontal && reversed && 'is-reversed',
        className,
      )}
    >
      {tab && (
        <div className={cx('card-tab', tabColor && `card-tab-${tabColor}`)}>
          {tab}
        </div>
      )}
      {status && (
        <div
          className={cx(`card-status-${statusPosition}`, `bg-${status}`)}
          aria-hidden
        />
      )}
      {shorthand ? (
        <>
          {image && (
            <img
              className={horizontal ? 'card-img' : 'card-img-top'}
              src={image}
              alt={imageAlt}
            />
          )}
          {horizontal ? (
            <div className='d-flex flex-column flex-1 min-w-0'>
              <Inner
                header={header}
                title={title}
                subtitle={subtitle}
                footer={footer}
              >
                {children}
              </Inner>
            </div>
          ) : (
            <Inner
              header={header}
              title={title}
              subtitle={subtitle}
              footer={footer}
            >
              {children}
            </Inner>
          )}
        </>
      ) : (
        children
      )}
    </Tag>
  );
}

function Inner({
  header,
  title,
  subtitle,
  footer,
  children,
}: Pick<
  CardOwnProps,
  'header' | 'title' | 'subtitle' | 'footer' | 'children'
>) {
  return (
    <>
      {header && <div className='card-header'>{header}</div>}
      <div className='card-body'>
        {title && <h3 className='card-title'>{title}</h3>}
        {subtitle && <p className='card-subtitle'>{subtitle}</p>}
        {children}
      </div>
      {footer && <div className='card-footer'>{footer}</div>}
    </>
  );
}

type DivProps = ComponentPropsWithRef<'div'>;

function part(base: string, displayName: string) {
  const C = ({ className, ...rest }: DivProps) => (
    <div {...rest} className={cx(base, className)} />
  );
  C.displayName = displayName;
  return C;
}

export const CardHeader = part('card-header', 'Card.Header');
export const CardBody = part('card-body', 'Card.Body');
export const CardFooter = part('card-footer', 'Card.Footer');
export const CardActions = part('card-actions', 'Card.Actions');

export function CardTitle<E extends ElementType = 'h3'>({
  as,
  className,
  ...rest
}: PolymorphicProps<E, { className?: string }>) {
  const Tag: ElementType = as ?? 'h3';
  return <Tag {...rest} className={cx('card-title', className)} />;
}

export function CardSubtitle({
  className,
  ...rest
}: ComponentPropsWithRef<'p'>) {
  return <p {...rest} className={cx('card-subtitle', className)} />;
}

export function CardImage({
  position = 'top',
  className,
  alt = '',
  ...rest
}: ComponentPropsWithRef<'img'> & { position?: 'top' | 'bottom' | 'side' }) {
  return (
    <img
      alt={alt}
      {...rest}
      className={cx(
        position === 'side' ? 'card-img' : `card-img-${position}`,
        className,
      )}
    />
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Actions = CardActions;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
Card.Image = CardImage;
