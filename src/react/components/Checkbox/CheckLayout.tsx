import type { ReactNode, Ref, RefCallback } from 'react';
import { cx } from '../../../shared/cx.js';

/**
 * Shared markup for Checkbox, Radio and Switch:
 *   <div class="{base}"> input · label · hint · aside </div>
 * The label is a sibling (not a wrapper) so the hint can be linked with
 * aria-describedby instead of being read as part of the name.
 */
export function CheckLayout({
  base,
  className,
  inputId,
  label,
  hint,
  hintId,
  aside,
  input,
}: {
  base: 'check' | 'switch';
  className?: string;
  inputId: string;
  label?: ReactNode;
  hint?: ReactNode;
  hintId?: string;
  aside?: ReactNode;
  input: ReactNode;
}) {
  return (
    <div className={className}>
      {input}
      {label != null && label !== false && (
        <label className={`${base}-label`} htmlFor={inputId}>
          {label}
        </label>
      )}
      {hint && (
        <p className={`${base}-hint`} id={hintId}>
          {hint}
        </p>
      )}
      {aside && <span className={cx(`${base}-card-aside`)}>{aside}</span>}
    </div>
  );
}

/** Point several refs (callback or object) at one node. Honours React 19 ref cleanups. */
export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> {
  return (node) => {
    const cleanups = refs.map((r) => {
      if (typeof r === 'function') return r(node);
      if (r) r.current = node;
      return undefined;
    });
    return () => {
      refs.forEach((r, i) => {
        const cleanup = cleanups[i];
        if (typeof cleanup === 'function') cleanup();
        else if (typeof r === 'function') r(null);
        else if (r) r.current = null;
      });
    };
  };
}
