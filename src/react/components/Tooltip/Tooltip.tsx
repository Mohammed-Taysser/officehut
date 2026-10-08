import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import {
  computePosition,
  isRtl,
  rectOf,
  scopedTheme,
} from '../../../shared/position.js';
import type { Placement } from '../../../shared/tokens.js';

export interface TooltipProps {
  content: ReactNode;
  placement?: Placement;
  /** Hover delay in ms. Keyboard focus shows immediately. */
  delay?: number;
  children: ReactElement<Record<string, unknown>>;
}

type Handler = ((e: unknown) => void) | undefined;

export function Tooltip({
  content,
  placement = 'top',
  delay = 250,
  children,
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const [wait, setWait] = useState<number | null>(null);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const tip = useRef<HTMLDivElement>(null);
  const id = useId();

  // Delayed open lives in an effect, so handlers only set state.
  useEffect(() => {
    if (wait === null) return;
    const t = setTimeout(() => setOpen(true), wait);
    return () => clearTimeout(t);
  }, [wait]);

  useLayoutEffect(() => {
    if (!open || !anchor || !tip.current) return;
    const { x, y } = computePosition(rectOf(anchor), rectOf(tip.current), {
      placement,
      rtl: isRtl(anchor),
    });
    tip.current.style.transform = `translate(${x}px, ${y}px)`;
  }, [open, placement, anchor]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setWait(null);
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  if (!isValidElement(children)) return children;
  const p = children.props;
  const hide = () => {
    setWait(null);
    setOpen(false);
  };

  return (
    <>
      {cloneElement(children, {
        ref: setAnchor,
        'aria-describedby': open ? id : undefined,
        onMouseEnter: (e: unknown) => {
          (p.onMouseEnter as Handler)?.(e);
          setWait(delay);
        },
        onMouseLeave: (e: unknown) => {
          (p.onMouseLeave as Handler)?.(e);
          hide();
        },
        onFocus: (e: unknown) => {
          (p.onFocus as Handler)?.(e);
          setWait(0);
        },
        onBlur: (e: unknown) => {
          (p.onBlur as Handler)?.(e);
          hide();
        },
      })}
      {open &&
        createPortal(
          <div
            ref={tip}
            id={id}
            role='tooltip'
            className='tooltip is-open'
            data-oh-theme={scopedTheme(anchor)}
          >
            {content}
          </div>,
          document.body,
        )}
    </>
  );
}
