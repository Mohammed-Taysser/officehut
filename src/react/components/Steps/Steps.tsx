import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cx } from '../../../shared/cx.js';

export type StepState = 'done' | 'current' | 'upcoming' | 'error';

export interface StepItem {
  title: ReactNode;
  /** Small line under the title: who signed, when. */
  description?: ReactNode;
  /** Sent back / rejected at this step. Overrides the computed state. */
  error?: boolean;
  /** Custom marker content instead of the step number. */
  icon?: ReactNode;
}

export interface StepsProps extends Omit<
  ComponentPropsWithRef<'ol'>,
  'children'
> {
  items: StepItem[];
  /**
   * Index of the current step (0-based). Earlier steps are done, later ones
   * upcoming. Use `items.length` when everything is finished.
   */
  current: number;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md';
  /** Words read to screen readers before each title. */
  stateLabels?: Partial<Record<StepState, string>>;
}

const LABELS: Record<StepState, string> = {
  done: 'Completed',
  current: 'Current',
  upcoming: 'Not started',
  error: 'Returned',
};

export function stepState(
  index: number,
  current: number,
  item?: Pick<StepItem, 'error'>,
): StepState {
  if (item?.error) return 'error';
  if (index < current) return 'done';
  return index === current ? 'current' : 'upcoming';
}

/** A routing slip: the desks a document passes, in order. */
export function Steps({
  items,
  current,
  orientation = 'horizontal',
  size = 'md',
  stateLabels,
  className,
  ...rest
}: StepsProps) {
  const labels = { ...LABELS, ...stateLabels };
  return (
    <ol
      {...rest}
      className={cx(
        'steps',
        orientation === 'vertical' && 'steps-vertical',
        size === 'sm' && 'steps-sm',
        className,
      )}
    >
      {items.map((item, i) => {
        const state = stepState(i, current, item);
        return (
          <li
            key={i}
            className={cx('step', state !== 'upcoming' && `is-${state}`)}
            aria-current={state === 'current' ? 'step' : undefined}
          >
            <span className='step-marker' aria-hidden>
              {item.icon ?? i + 1}
            </span>
            <span className='step-body'>
              <span className='step-title'>
                <span className='visually-hidden'>{labels[state]}: </span>
                {item.title}
              </span>
              {item.description && (
                <span className='step-meta'>{item.description}</span>
              )}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
