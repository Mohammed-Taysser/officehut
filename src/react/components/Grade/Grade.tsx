import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cx } from '../../../shared/cx.js';

export interface GradeProps extends Omit<
  ComponentPropsWithRef<'span'>,
  'children'
> {
  /** "A+", "B", "9/10", 87… A "x/y" string renders as a fraction. */
  value: ReactNode;
  /** Red pen (default), green for a pass, or blue ballpoint. */
  pen?: 'red' | 'green' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  /** Short handwritten comment next to the grade. */
  remark?: ReactNode;
  /** Accessible label, e.g. "Vendor rating: A minus". Defaults to the value. */
  label?: string;
}

/** A teacher's mark, circled in pen — scores, ratings, reviews. */
export function Grade({
  value,
  pen = 'red',
  size = 'md',
  remark,
  label,
  className,
  ...rest
}: GradeProps) {
  const fraction =
    typeof value === 'string' && /^\s*[^/]+\/[^/]+\s*$/.test(value)
      ? value.split('/')
      : null;
  const grade = (
    <span
      role='img'
      aria-label={
        label ??
        (fraction
          ? `${fraction[0]!.trim()} out of ${fraction[1]!.trim()}`
          : String(value))
      }
      {...rest}
      className={cx(
        'grade',
        size !== 'md' && `grade-${size}`,
        pen === 'green' && 'grade-pass',
        pen === 'blue' && 'grade-blue',
        className,
      )}
    >
      {fraction ? (
        <span className='grade-fraction' aria-hidden>
          <span>{fraction[0]!.trim()}</span>
          <span>{fraction[1]!.trim()}</span>
        </span>
      ) : (
        <span aria-hidden>{value}</span>
      )}
    </span>
  );
  if (!remark) return grade;
  return (
    <span className='d-inline-flex align-items-center'>
      {grade}
      <span className='grade-remark'>{remark}</span>
    </span>
  );
}
