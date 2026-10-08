import type { ComponentPropsWithRef } from 'react';
import { cx } from '../../../shared/cx.js';

export type MarkerVariant =
  'highlight' | 'underline' | 'wavy' | 'double' | 'circle' | 'strike';
export type MarkerColor = 'yellow' | 'pink' | 'green' | 'blue';
export type PenColor = 'red' | 'blue' | 'pencil';

export interface MarkerProps extends ComponentPropsWithRef<'mark'> {
  /** Default `highlight` (a highlighter swipe). The rest are pen marks. */
  variant?: MarkerVariant;
  /** Highlighter colour (highlight only). */
  color?: MarkerColor;
  /** Pen colour for underline / wavy / double / circle / strike. */
  pen?: PenColor;
}

const CLASS: Record<MarkerVariant, string> = {
  highlight: 'highlight',
  underline: 'underline-pen',
  wavy: 'underline-wavy',
  double: 'underline-double',
  circle: 'circled',
  strike: 'strike-pen',
};

/**
 * Mark up text like a revision note. Renders `<mark>` for highlights (it means
 * "relevant") and `<span>` / `<s>` for pen marks, so semantics stay honest.
 */
export function Marker({
  variant = 'highlight',
  color = 'yellow',
  pen = 'red',
  className,
  ...rest
}: MarkerProps) {
  const classes = cx(
    CLASS[variant],
    variant === 'highlight' && color !== 'yellow' && `highlight-${color}`,
    variant !== 'highlight' && pen !== 'red' && `pen-${pen}`,
    className,
  );
  if (variant === 'highlight') return <mark {...rest} className={classes} />;
  if (variant === 'strike')
    return <s {...(rest as ComponentPropsWithRef<'s'>)} className={classes} />;
  return (
    <span {...(rest as ComponentPropsWithRef<'span'>)} className={classes} />
  );
}
