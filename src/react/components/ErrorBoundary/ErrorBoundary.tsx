import { Component, type ErrorInfo, type ReactNode } from 'react';
import { cx } from '../../../shared/cx.js';

export interface ErrorSheetProps {
  error?: unknown;
  title?: ReactNode;
  /** Teacher's remark in red pen. */
  remark?: ReactNode;
  /** What the user can do next. */
  children?: ReactNode;
  onRetry?: () => void;
  retryLabel?: string;
  /** Show a "Reload page" button. Turn off for embedded widgets. Default true. */
  showReload?: boolean;
  /** Show the error message and stack in a fold-out. */
  showDetails?: boolean;
  className?: string;
}

function describe(error: unknown): { message: string; stack?: string } {
  if (error instanceof Error)
    return { message: error.message, stack: error.stack };
  if (typeof error === 'string') return { message: error };
  if (error && typeof error === 'object' && 'statusText' in error) {
    const e = error as { status?: number; statusText?: string };
    return { message: `${e.status ?? ''} ${e.statusText ?? ''}`.trim() };
  }
  return { message: 'Unknown error' };
}

/** Presentational error page: a notebook sheet marked in red pen. */
export function ErrorSheet({
  error,
  title = 'Something went wrong on this page',
  remark = 'see me after class',
  children,
  onRetry,
  retryLabel = 'Try again',
  showReload = true,
  showDetails = false,
  className,
}: ErrorSheetProps) {
  const { message, stack } = describe(error);
  return (
    <div
      role='alert'
      className={cx('notebook notebook-holes error-sheet', className)}
    >
      <h2 className='error-sheet-title'>
        <span className='notebook-margin' aria-hidden>
          ✗
        </span>
        {title}
      </h2>
      <p className='error-sheet-remark'>{remark}</p>
      <p className='text-muted'>
        {children ??
          'The rest of the app is fine. Trying again usually helps; if it keeps happening, let us know what you were doing.'}
      </p>
      <div className='error-sheet-actions'>
        {onRetry && (
          <button
            type='button'
            className='btn btn-dark btn-sm'
            onClick={onRetry}
          >
            {retryLabel}
          </button>
        )}
        {showReload && (
          <button
            type='button'
            className='btn btn-sm btn-outline'
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        )}
      </div>
      {showDetails && error !== undefined && (
        <details className='error-sheet-detail'>
          <summary>what the computer said</summary>
          <pre>{stack ?? message}</pre>
        </details>
      )}
    </div>
  );
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  /** Custom fallback. A function receives the error and a reset callback. */
  fallback?: ReactNode | ((error: unknown, reset: () => void) => ReactNode);
  /** Report the error (Sentry, console, …). */
  onError?: (error: unknown, info: ErrorInfo) => void;
  /** When any of these values change, the boundary resets itself. */
  resetKeys?: readonly unknown[];
  /** `sheet` (full page, default) or `slip` (small inline notice). */
  variant?: 'sheet' | 'slip';
  /** Message for the default fallback (slip text or sheet title). */
  title?: ReactNode;
  /** Show the sheet's "Reload page" button. Default true. */
  showReload?: boolean;
}

interface State {
  /** Separate flag: code may throw falsy values like 0 or ''. */
  hasError: boolean;
  error: unknown;
  keys?: readonly unknown[];
}

const changed = (a: readonly unknown[] = [], b: readonly unknown[] = []) =>
  a.length !== b.length || a.some((v, i) => !Object.is(v, b[i]));

/**
 * Catches render errors below it and shows an ErrorSheet (or your fallback).
 * Pass `resetKeys` (e.g. the route path) to recover automatically.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  override state: State = {
    hasError: false,
    error: null,
    keys: this.props.resetKeys,
  };

  static getDerivedStateFromError(error: unknown): Partial<State> {
    return { hasError: true, error };
  }

  static getDerivedStateFromProps(
    props: ErrorBoundaryProps,
    state: State,
  ): Partial<State> | null {
    if (state.hasError && changed(props.resetKeys, state.keys)) {
      return { hasError: false, error: null, keys: props.resetKeys };
    }
    if (changed(props.resetKeys, state.keys)) return { keys: props.resetKeys };
    return null;
  }

  override componentDidCatch(error: unknown, info: ErrorInfo): void {
    this.props.onError?.(error, info);
  }

  reset = (): void => this.setState({ hasError: false, error: null });

  override render(): ReactNode {
    const { hasError, error } = this.state;
    if (!hasError) return this.props.children;
    const { fallback, variant = 'sheet', title, showReload } = this.props;
    if (typeof fallback === 'function') return fallback(error, this.reset);
    if (fallback !== undefined) return fallback;
    if (variant === 'slip') {
      return (
        <div role='alert' className='error-slip'>
          <span className='handwriting'>✗ oops</span>
          <span className='flex-1'>
            {title ?? "This part couldn't be shown."}
          </span>
          <button
            type='button'
            className='btn btn-sm btn-ghost'
            onClick={this.reset}
          >
            Try again
          </button>
        </div>
      );
    }
    return (
      <ErrorSheet
        error={error}
        onRetry={this.reset}
        showReload={showReload}
        {...(title ? { title } : {})}
      />
    );
  }
}
