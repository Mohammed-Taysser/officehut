import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import { cx } from '../../../shared/cx.js';
import { useControllableState } from '../../hooks/useControllableState.js';

export type PaginationRangeItem = number | 'ellipsis';

/**
 * The page numbers to show: always the first and last page, `siblings` pages
 * either side of the current one, and `'ellipsis'` for the gaps. Once
 * `total` is large enough the result always has `2 * siblings + 5` entries,
 * so the control keeps its width while you page through.
 *
 *   paginationRange(6, 12)  // [1, 'ellipsis', 5, 6, 7, 'ellipsis', 12]
 */
export function paginationRange(
  page: number,
  total: number,
  siblings = 1,
): PaginationRangeItem[] {
  const last = Math.max(0, Math.floor(total));
  if (last === 0) return [];
  const s = Math.max(0, Math.floor(siblings));
  const current = Math.min(Math.max(1, Math.floor(page)), last);
  const slots = 2 * s + 5;
  const span = (from: number, to: number) =>
    Array.from({ length: to - from + 1 }, (_, i) => from + i);

  if (last <= slots) return span(1, last);

  const left = Math.max(current - s, 1);
  const right = Math.min(current + s, last);
  const leftGap = left > 3;
  const rightGap = right < last - 2;
  const edge = 3 + 2 * s; // pages shown on the side without a gap

  if (!leftGap && rightGap) return [...span(1, edge), 'ellipsis', last];
  if (leftGap && !rightGap)
    return [1, 'ellipsis', ...span(last - edge + 1, last)];
  return [1, 'ellipsis', ...span(left, right), 'ellipsis', last];
}

export interface PaginationProps extends Omit<
  ComponentPropsWithRef<'nav'>,
  'onChange' | 'children'
> {
  /** Number of pages. */
  total: number;
  /** Current page, 1-based (controlled). */
  page?: number;
  defaultPage?: number;
  onChange?: (page: number) => void;
  /** Pages shown either side of the current one. */
  siblings?: number;
  /** `numbers` (default) or `compact`: ‹ page 3 of 12 › */
  variant?: 'numbers' | 'compact';
  /** Joined ledger cells instead of loose numbers. */
  boxed?: boolean;
  size?: 'sm' | 'md' | 'lg';
  /** Render real links instead of buttons. */
  getHref?: (page: number) => string;
  /** Component used for links, e.g. a router Link. Receives `href`. */
  linkAs?: ElementType;
  /** Accessible name of the `<nav>`. */
  label?: string;
  prevLabel?: ReactNode;
  nextLabel?: ReactNode;
  /** Accessible name of a numbered link. */
  pageLabel?: (page: number) => string;
  /** Text of the compact summary. */
  summary?: (page: number, total: number) => ReactNode;
}

const defaultSummary = (page: number, total: number) => (
  <>
    page <strong>{page}</strong> of {total}
  </>
);

export function Pagination({
  total,
  page: pageProp,
  defaultPage = 1,
  onChange,
  siblings = 1,
  variant = 'numbers',
  boxed,
  size = 'md',
  getHref,
  linkAs: Link = 'a',
  label = 'Pagination',
  prevLabel = 'Previous',
  nextLabel = 'Next',
  pageLabel = (n) => `Page ${n}`,
  summary = defaultSummary,
  className,
  ...rest
}: PaginationProps) {
  const [rawPage, setPage] = useControllableState(
    pageProp,
    defaultPage,
    onChange,
  );
  const last = Math.max(1, Math.floor(total));
  const page = Math.min(Math.max(1, rawPage), last);

  const go = (n: number) => {
    if (n !== page) setPage(n);
  };

  const pageControl = (
    n: number,
    content: ReactNode,
    extra: Record<string, unknown>,
  ) => {
    const disabled = n < 1 || n > last;
    const className = cx('page-link', extra.className as string | undefined);
    const props = { ...extra, className };
    if (getHref) {
      if (disabled) {
        return (
          <a role='link' aria-disabled='true' {...props}>
            {content}
          </a>
        );
      }
      return (
        <Link href={getHref(n)} {...props} onClick={() => go(n)}>
          {content}
        </Link>
      );
    }
    return (
      <button
        type='button'
        disabled={disabled}
        {...props}
        onClick={() => go(n)}
      >
        {content}
      </button>
    );
  };

  const prev = (
    <li>
      {pageControl(page - 1, prevLabel, {
        className: 'page-prev',
        rel: getHref ? 'prev' : undefined,
      })}
    </li>
  );
  const next = (
    <li>
      {pageControl(page + 1, nextLabel, {
        className: 'page-next',
        rel: getHref ? 'next' : undefined,
      })}
    </li>
  );

  return (
    <nav aria-label={label} {...rest} className={className}>
      <ul
        className={cx(
          'pagination',
          boxed && 'pagination-boxed',
          size !== 'md' && `pagination-${size}`,
        )}
      >
        {prev}
        {variant === 'compact' ? (
          <li className='pagination-summary'>{summary(page, last)}</li>
        ) : (
          paginationRange(page, last, siblings).map((item, i) =>
            item === 'ellipsis' ? (
              <li key={`e${i}`}>
                <span className='page-ellipsis' aria-hidden>
                  …
                </span>
              </li>
            ) : (
              <li key={item}>
                {pageControl(item, item, {
                  'aria-label': pageLabel(item),
                  'aria-current': item === page ? 'page' : undefined,
                })}
              </li>
            ),
          )
        )}
        {next}
      </ul>
    </nav>
  );
}
