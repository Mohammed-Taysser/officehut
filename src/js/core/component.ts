const registry = new WeakMap<Element, Map<string, Component>>();

/**
 * Base for every vanilla behaviour.
 *
 * - one instance per (element, component) pair — `getOrCreate` is idempotent
 * - options merge: defaults ← `data-oh-*` attributes ← constructor argument
 * - events are dispatched on the element as `oh:<name>` and bubble
 */
export abstract class Component<Options extends object = object> {
  /** Unique component name, also used as the registry key. */
  static readonly NAME: string = 'component';

  readonly el: HTMLElement;
  options: Options;

  constructor(
    el: HTMLElement,
    defaults: Options,
    options: Partial<Options> = {},
  ) {
    this.el = el;
    this.options = {
      ...defaults,
      ...readDataOptions(el, defaults),
      ...options,
    };
    const name = (this.constructor as typeof Component).NAME;
    let map = registry.get(el);
    if (!map) registry.set(el, (map = new Map()));
    map.get(name)?.destroy();
    map.set(name, this);
  }

  /**
   * Dispatch `oh:<name>` from the element. Returns `false` if a listener
   * called `preventDefault()` — callers use this to cancel show/hide.
   */
  protected emit<D = undefined>(
    name: string,
    detail?: D,
    cancelable = true,
  ): boolean {
    return this.el.dispatchEvent(
      new CustomEvent(`oh:${name}`, { bubbles: true, cancelable, detail }),
    );
  }

  destroy(): void {
    registry.get(this.el)?.delete((this.constructor as typeof Component).NAME);
  }
}

type Ctor<T extends Component> = (new (
  el: HTMLElement,
  options?: object,
) => T) & {
  NAME: string;
};

export function getInstance<T extends Component>(
  ctor: Ctor<T>,
  el: Element | null,
): T | null {
  if (!el) return null;
  return (registry.get(el)?.get(ctor.NAME) as T | undefined) ?? null;
}

export function getOrCreate<T extends Component>(
  ctor: Ctor<T>,
  el: HTMLElement,
  options?: object,
): T {
  return getInstance(ctor, el) ?? new ctor(el, options);
}

/** Read `data-oh-<option>` attributes whose names match keys in `defaults`. */
function readDataOptions<O extends object>(
  el: HTMLElement,
  defaults: O,
): Partial<O> {
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(defaults)) {
    const attr = `oh${key[0]!.toUpperCase()}${key.slice(1)}`;
    const raw = el.dataset[attr];
    if (raw === undefined) continue;
    const fallback = (defaults as Record<string, unknown>)[key];
    out[key] =
      typeof fallback === 'number'
        ? Number(raw)
        : typeof fallback === 'boolean'
          ? raw !== 'false'
          : raw;
  }
  return out as Partial<O>;
}
