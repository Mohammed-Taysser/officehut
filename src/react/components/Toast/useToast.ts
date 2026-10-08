import { toast, type ToastOptions } from '../../../js/components/toast.js';

/**
 * Toasts are imperative, so React uses the same implementation as vanilla JS.
 *
 *   const notify = useToast();
 *   notify({ title: 'Saved', color: 'success' });
 */
export function useToast(): typeof toast {
  return toast;
}

export { toast, type ToastOptions };
