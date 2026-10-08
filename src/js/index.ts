/**
 * officehut — vanilla JS entry.
 *
 *   import 'officehut/css';
 *   import { initAll, toast } from 'officehut';
 *   initAll();
 */
export { initAll, registerToggle } from './core/data-api.js';
export { Component, getInstance, getOrCreate } from './core/component.js';
export { resolveTarget, afterTransition, ensureId } from './core/dom.js';

export { Collapse, type CollapseOptions } from './components/collapse.js';
export {
  Dropdown,
  closeDropdowns,
  type DropdownOptions,
} from './components/dropdown.js';
export { Modal, type ModalOptions } from './components/modal.js';
export { Tabs } from './components/tabs.js';
export { toast, type ToastOptions } from './components/toast.js';
export { dismiss } from './components/dismiss.js';
export {
  showTooltip,
  hideTooltip,
  bindTooltips,
} from './components/tooltip.js';
export {
  getTheme,
  setTheme,
  toggleTheme,
  restoreTheme,
  resolvedTheme,
  setDensity,
} from './components/theme.js';

export * from '../shared/tokens.js';
export { cx, type ClassValue } from '../shared/cx.js';
export { initials, colorFor } from '../shared/initials.js';
export {
  computePosition,
  type Rect,
  type PositionOptions,
} from '../shared/position.js';
export { trapFocus, lockScroll } from '../shared/focus.js';

export const version: string = __OH_VERSION__;
