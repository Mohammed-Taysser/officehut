import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cx } from '../../../shared/cx.js';
import type { Color } from '../../../shared/tokens.js';

export interface TimelineProps extends ComponentPropsWithRef<'ol'> {
  /** Logbook paper: blue ruling under each entry, red margin after the times. */
  ruled?: boolean;
  /** No timestamp column. */
  plain?: boolean;
}

/** An ordered log of events. Fill with `Timeline.Item` and `Timeline.Day`. */
export function Timeline({ ruled, plain, className, ...rest }: TimelineProps) {
  return (
    <ol
      {...rest}
      className={cx(
        'timeline',
        ruled && 'timeline-ruled',
        plain && 'timeline-plain',
        className,
      )}
    />
  );
}

export interface TimelineItemProps extends Omit<
  ComponentPropsWithRef<'li'>,
  'title'
> {
  /** Shown in the margin, e.g. "09:14". */
  time?: ReactNode;
  /** Machine-readable value for the `<time>` element. */
  dateTime?: string;
  color?: Color;
  /** Outlined marker — for planned or pending entries. */
  hollow?: boolean;
  title?: ReactNode;
  children?: ReactNode;
}

export function TimelineItem({
  time,
  dateTime,
  color,
  hollow,
  title,
  className,
  children,
  ...rest
}: TimelineItemProps) {
  return (
    <li
      {...rest}
      className={cx(
        'timeline-item',
        color && `timeline-item-${color}`,
        className,
      )}
    >
      {time !== undefined && (
        <time className='timeline-time' dateTime={dateTime}>
          {time}
        </time>
      )}
      <span
        className={cx('timeline-marker', hollow && 'is-hollow')}
        aria-hidden
      />
      <div className='timeline-body'>
        {title && <p className='timeline-title'>{title}</p>}
        {typeof children === 'string' ? (
          <p className='timeline-text'>{children}</p>
        ) : (
          children
        )}
      </div>
    </li>
  );
}

/** Date separator row, e.g. "Tue 7 Oct". */
export function TimelineDay({
  className,
  ...rest
}: ComponentPropsWithRef<'li'>) {
  return <li {...rest} className={cx('timeline-day', className)} />;
}

Timeline.Item = TimelineItem;
Timeline.Day = TimelineDay;
