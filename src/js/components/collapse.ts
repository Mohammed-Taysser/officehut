import { Component, getOrCreate } from '../core/component.js';

export interface CollapseOptions {
  /** Selector of an accordion-like parent; opening one closes its open siblings. */
  parent: string;
}

/**
 * Show / hide a `.collapse` region. Height animation is pure CSS.
 *
 *   <button data-oh-toggle="collapse" data-oh-target="#filters" aria-expanded="false">
 *   <div class="collapse" id="filters"><div>…</div></div>
 */
export class Collapse extends Component<CollapseOptions> {
  static override readonly NAME = 'collapse';

  constructor(el: HTMLElement, options: Partial<CollapseOptions> = {}) {
    super(el, { parent: '' }, options);
  }

  get isOpen(): boolean {
    return this.el.classList.contains('is-open');
  }

  show(): void {
    if (this.isOpen || !this.emit('show')) return;
    if (this.options.parent) {
      const parent = this.el.closest(this.options.parent);
      parent
        ?.querySelectorAll<HTMLElement>('.collapse.is-open')
        .forEach((other) => {
          if (other !== this.el) getOrCreate(Collapse, other).hide();
        });
    }
    this.el.classList.add('is-open');
    this.syncTriggers(true);
    this.emit('shown', undefined, false);
  }

  hide(): void {
    if (!this.isOpen || !this.emit('hide')) return;
    this.el.classList.remove('is-open');
    this.syncTriggers(false);
    this.emit('hidden', undefined, false);
  }

  toggle(): void {
    if (this.isOpen) this.hide();
    else this.show();
  }

  private syncTriggers(open: boolean) {
    const id = this.el.id;
    if (!id) return;
    document
      .querySelectorAll(
        `[data-oh-toggle="collapse"][data-oh-target="#${CSS.escape(id)}"], [data-oh-toggle="collapse"][href="#${CSS.escape(id)}"], [data-oh-toggle="collapse"][aria-controls="${CSS.escape(id)}"]`,
      )
      .forEach((t) => t.setAttribute('aria-expanded', String(open)));
  }
}
