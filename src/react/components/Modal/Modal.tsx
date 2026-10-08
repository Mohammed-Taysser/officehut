import {
  useEffect,
  useId,
  useRef,
  type ComponentPropsWithRef,
  type ReactNode,
} from 'react';
import { cx } from '../../../shared/cx.js';
import { lockScroll } from '../../../shared/focus.js';

export interface ModalProps extends Omit<
  ComponentPropsWithRef<'dialog'>,
  'title' | 'open'
> {
  open: boolean;
  /** Called on Esc, backdrop click or the close button. */
  onClose: () => void;
  title?: ReactNode;
  /** Footer content, usually buttons. */
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Slide in from the side instead of centring. */
  drawer?: boolean;
  /** Close when the backdrop is clicked. Default true. */
  backdropClose?: boolean;
  hideClose?: boolean;
  closeLabel?: string;
}

/** Native `<dialog>` modal: focus trap, Esc and top layer come from the browser. */
export function Modal({
  open,
  onClose,
  title,
  footer,
  size = 'md',
  drawer,
  backdropClose = true,
  hideClose,
  closeLabel = 'Close',
  className,
  children,
  ...rest
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.classList.remove('is-closing');
      dialog.showModal?.();
      if (!dialog.showModal) dialog.setAttribute('open', '');
      const unlock = lockScroll();
      return () => unlock();
    }
    if (!open && dialog.open) {
      dialog.classList.add('is-closing');
      const reduce = window.matchMedia?.(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      const t = setTimeout(
        () => {
          dialog.classList.remove('is-closing');
          dialog.close?.();
          dialog.removeAttribute('open');
        },
        reduce ? 0 : 140,
      );
      return () => clearTimeout(t);
    }
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={title ? titleId : undefined}
      {...rest}
      className={cx(
        'modal',
        size !== 'md' && `modal-${size}`,
        drawer && 'modal-drawer',
        className,
      )}
      onClose={() => {
        // Closed natively (e.g. <form method="dialog">) while we think it's open.
        if (open) onClose();
      }}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (!backdropClose || e.target !== e.currentTarget) return;
        const r = e.currentTarget.getBoundingClientRect();
        const inside =
          e.clientX >= r.left &&
          e.clientX <= r.right &&
          e.clientY >= r.top &&
          e.clientY <= r.bottom;
        if (!inside) onClose();
      }}
    >
      {(title || !hideClose) && (
        <div className='modal-header'>
          {title && (
            <h2 className='modal-title' id={titleId}>
              {title}
            </h2>
          )}
          {!hideClose && (
            <button
              type='button'
              className='btn-close'
              aria-label={closeLabel}
              onClick={() => onClose()}
            />
          )}
        </div>
      )}
      <div className='modal-body'>{children}</div>
      {footer && <div className='modal-footer'>{footer}</div>}
    </dialog>
  );
}
