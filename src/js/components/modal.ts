import { Component } from '../core/component.js';
import { lockScroll } from '../../shared/focus.js';

export interface ModalOptions {
  /** Close when the backdrop is clicked. */
  backdropClose: boolean;
}

/**
 * Wraps a native `<dialog class="modal">`. The browser handles focus
 * trapping, Esc and the top layer; this adds open/close animation, scroll
 * lock, backdrop-click and `oh:*` events.
 */
export class Modal extends Component<ModalOptions> {
  static override readonly NAME = 'modal';
  declare readonly el: HTMLDialogElement;
  private unlock: (() => void) | null = null;
  private returnTo: HTMLElement | null = null;

  constructor(el: HTMLElement, options: Partial<ModalOptions> = {}) {
    if (!(el instanceof HTMLDialogElement)) {
      throw new Error('[officehut] Modal must be a <dialog> element');
    }
    super(el, { backdropClose: true }, options);
    el.addEventListener('cancel', this.onCancel);
    el.addEventListener('click', this.onClick);
    el.addEventListener('close', this.onClose);
  }

  get isOpen(): boolean {
    return this.el.open;
  }

  show(trigger?: HTMLElement | null): void {
    if (this.isOpen || !this.emit('show')) return;
    this.returnTo = trigger ?? (document.activeElement as HTMLElement | null);
    this.el.classList.remove('is-closing');
    this.el.showModal();
    this.unlock = lockScroll();
    this.emit('shown', undefined, false);
  }

  hide(): void {
    if (!this.isOpen || !this.emit('hide')) return;
    this.el.classList.add('is-closing');
    const done = () => {
      this.el.classList.remove('is-closing');
      this.el.close();
    };
    const reduce = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduce) done();
    else setTimeout(done, 140);
  }

  toggle(trigger?: HTMLElement | null): void {
    if (this.isOpen) this.hide();
    else this.show(trigger);
  }

  override destroy(): void {
    this.el.removeEventListener('cancel', this.onCancel);
    this.el.removeEventListener('click', this.onClick);
    this.el.removeEventListener('close', this.onClose);
    if (this.isOpen) this.el.close();
    super.destroy();
  }

  private onCancel = (e: Event) => {
    // Esc: animate instead of the instant native close.
    e.preventDefault();
    this.hide();
  };

  private onClick = (e: MouseEvent) => {
    // A click whose target is the <dialog> itself landed on the backdrop.
    if (e.target === this.el && this.options.backdropClose) {
      const r = this.el.getBoundingClientRect();
      const inside =
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom;
      if (!inside) this.hide();
    }
  };

  private onClose = () => {
    this.unlock?.();
    this.unlock = null;
    this.returnTo?.focus?.();
    this.returnTo = null;
    this.emit('hidden', undefined, false);
  };
}
