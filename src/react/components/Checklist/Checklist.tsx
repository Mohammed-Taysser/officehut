import { useId, type ComponentPropsWithRef, type ReactNode } from 'react';
import { cx } from '../../../shared/cx.js';
import { useControllableState } from '../../hooks/useControllableState.js';

export interface ChecklistItem {
  id: string;
  label: ReactNode;
  /** Due date, owner… written at the end of the line. */
  meta?: ReactNode;
  /** Mark the meta in red pen. */
  late?: boolean;
  disabled?: boolean;
}

export interface ChecklistProps extends Omit<
  ComponentPropsWithRef<'ul'>,
  'onChange' | 'defaultValue'
> {
  items: ChecklistItem[];
  /** Ids of ticked items (controlled). */
  value?: string[];
  defaultValue?: string[];
  onChange?: (done: string[]) => void;
  /** No paper behind it — for use inside cards. */
  flush?: boolean;
}

/** Homework-style to-do list with pen ticks. Real checkboxes underneath. */
export function Checklist({
  items,
  value,
  defaultValue = [],
  onChange,
  flush,
  className,
  ...rest
}: ChecklistProps) {
  const [done, setDone] = useControllableState(value, defaultValue, onChange);
  const uid = useId();
  const toggle = (id: string) =>
    setDone(done.includes(id) ? done.filter((d) => d !== id) : [...done, id]);

  return (
    <ul
      {...rest}
      className={cx('checklist', flush && 'checklist-flush', className)}
    >
      {items.map((item) => {
        const inputId = `${uid}-${item.id}`;
        return (
          <li key={item.id} className='checklist-item'>
            <label className='checklist-label' htmlFor={inputId}>
              <input
                id={inputId}
                type='checkbox'
                className='checklist-box'
                checked={done.includes(item.id)}
                disabled={item.disabled}
                onChange={() => toggle(item.id)}
              />
              <span className='checklist-text'>{item.label}</span>
            </label>
            {item.meta && (
              <span className={cx('checklist-meta', item.late && 'is-late')}>
                {item.meta}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
