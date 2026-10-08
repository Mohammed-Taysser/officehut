import { useLayoutEffect, useState, type RefObject } from 'react';

export interface AnatomyPart {
  selector: string;
  /** Defaults to the selector. */
  label?: string;
}

interface Box {
  top: number;
  left: number;
  width: number;
  height: number;
  label: string;
}

/**
 * Draws labelled outlines over the parts of a component inside `stage`.
 * Labels alternate sides so neighbours don't collide; clicking one copies it.
 */
export function Anatomy({
  stage,
  parts,
}: {
  stage: RefObject<HTMLElement | null>;
  parts: AnatomyPart[];
}) {
  const [boxes, setBoxes] = useState<Box[]>([]);

  useLayoutEffect(() => {
    const root = stage.current;
    if (!root) return;
    const measure = () => {
      const base = root.getBoundingClientRect();
      const next: Box[] = [];
      for (const part of parts) {
        const el = root.querySelector(part.selector);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        next.push({
          top: r.top - base.top,
          left: r.left - base.left,
          width: r.width,
          height: r.height,
          label: part.label ?? part.selector,
        });
      }
      setBoxes(next);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    return () => ro.disconnect();
  }, [stage, parts]);

  return (
    <div className='doc-anatomy' aria-hidden>
      {boxes.map((b, i) => (
        <div
          key={i}
          className='doc-anatomy-box'
          style={{ top: b.top, left: b.left, width: b.width, height: b.height }}
        >
          <button
            type='button'
            tabIndex={-1}
            className={`doc-anatomy-label ${i % 2 ? 'is-end' : ''}`}
            onClick={() =>
              navigator.clipboard?.writeText(b.label.replace(/^\./, ''))
            }
          >
            {b.label}
          </button>
        </div>
      ))}
    </div>
  );
}
