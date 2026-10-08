import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import { cx } from '../../../shared/cx.js';
import type { PolymorphicProps } from '../../utils/types.js';

export interface NotebookOwnProps {
  /** Punched holes down the margin edge. */
  holes?: boolean;
  /** Squared maths paper instead of lines. */
  squared?: boolean;
  className?: string;
  children?: ReactNode;
}

export type NotebookProps<E extends ElementType = 'div'> = PolymorphicProps<
  E,
  NotebookOwnProps
>;

/**
 * An exercise-book page: blue ruling, red margin. Direct children snap to the
 * lines; headings take two lines.
 */
export function Notebook<E extends ElementType = 'div'>({
  as,
  holes,
  squared,
  className,
  ...rest
}: NotebookProps<E>) {
  const Tag: ElementType = as ?? 'div';
  return (
    <Tag
      {...rest}
      className={cx(
        'notebook',
        holes && 'notebook-holes',
        squared && 'notebook-squared',
        className,
      )}
    />
  );
}

/** Handwritten note in the margin of the line it's placed in. */
export function MarginNote({
  className,
  ...rest
}: ComponentPropsWithRef<'span'>) {
  return (
    <span aria-hidden {...rest} className={cx('notebook-margin', className)} />
  );
}

/** Inline handwriting, for short annotations. */
export function Handwriting({
  className,
  ...rest
}: ComponentPropsWithRef<'span'>) {
  return <span {...rest} className={cx('handwriting', className)} />;
}

Notebook.Margin = MarginNote;
