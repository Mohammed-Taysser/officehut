import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router';
import { FLAT_NAV, NAV } from '../content/nav';
import { CopyButton } from './CopyButton';

export interface DocPageProps {
  title: string;
  lead?: ReactNode;
  /** Import line shown as a label sticker, e.g. `import { Button } from 'officehut/react'`. */
  importLine?: string;
  /** CSS file for cherry-picking, e.g. `officehut/css/components/button.css`. */
  cssFile?: string;
  children: ReactNode;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function DocPage({
  title,
  lead,
  importLine,
  cssFile,
  children,
}: DocPageProps) {
  const { pathname } = useLocation();
  const body = useRef<HTMLDivElement>(null);
  const [toc, setToc] = useState<Heading[]>([]);
  const [active, setActive] = useState('');

  const index = FLAT_NAV.findIndex((n) => n.path === pathname);
  const item = FLAT_NAV[index];
  const section = NAV.find((s) => s.items.includes(item!));
  const lesson = section && item ? section.items.indexOf(item) + 1 : 0;
  const prev = index > 0 ? FLAT_NAV[index - 1] : undefined;
  const next = index >= 0 ? FLAT_NAV[index + 1] : undefined;

  useEffect(() => {
    document.title = `${title} · officehut`;
    const hs = [
      ...(body.current?.querySelectorAll<HTMLElement>('h2[id], h3[id]') ?? []),
    ];
    setToc(
      hs.map((h) => ({
        id: h.id,
        text: h.textContent ?? '',
        level: h.tagName === 'H2' ? 2 : 3,
      })),
    );
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -65% 0px' },
    );
    hs.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [title, pathname]);

  return (
    <div className='doc-page'>
      <article className='doc-article'>
        <header className='notebook notebook-holes doc-header'>
          <p className='doc-dateline handwriting'>
            {section
              ? `${section.title} · page ${lesson} of ${section.items.length}`
              : 'officehut'}
          </p>
          <h1 className='doc-title'>
            {lesson > 0 && (
              <span className='notebook-margin' aria-hidden>
                {lesson}.
              </span>
            )}
            {title}
            {item?.status && (
              <span className='badge badge-aurora badge-stamp'>
                {item.status}
              </span>
            )}
          </h1>
          {lead && <p className='doc-lead'>{lead}</p>}
          {(importLine || cssFile) && (
            <div className='doc-imports'>
              {importLine && (
                <p>
                  <span className='doc-imports-label handwriting'>use it:</span>
                  <code>{importLine}</code>
                  <CopyButton text={importLine} />
                </p>
              )}
              {cssFile && (
                <p>
                  <span className='doc-imports-label handwriting'>
                    or just the css:
                  </span>
                  <code>{`@import '${cssFile}';`}</code>
                </p>
              )}
            </div>
          )}
        </header>

        <div
          ref={body}
          className='doc-body'
          style={{ ['--lesson' as string]: `'${lesson || ''}'` }}
        >
          {children}
        </div>

        <nav className='doc-pager' aria-label='Previous and next page'>
          {prev ? (
            <Link to={prev.path} className='doc-pager-link'>
              <span className='handwriting doc-pager-hint'>
                ← previous lesson
              </span>
              {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={next.path} className='doc-pager-link is-next'>
              <span className='handwriting doc-pager-hint'>next lesson →</span>
              {next.title}
            </Link>
          )}
        </nav>
      </article>

      {toc.length > 1 && (
        <nav className='doc-toc' aria-label='On this page'>
          <p className='doc-toc-title handwriting'>Contents</p>
          <ol>
            {toc.map((h) => (
              <li key={h.id} className={h.level === 3 ? 'is-sub' : undefined}>
                <a
                  href={`#${h.id}`}
                  aria-current={active === h.id ? 'true' : undefined}
                >
                  <span className='doc-toc-text'>{h.text}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </div>
  );
}

/** Section heading inside prose with an anchor. */
export function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 className='doc-h2' id={id}>
      <a href={`#${id}`} className='doc-anchor'>
        {children}
      </a>
    </h2>
  );
}

export function H3({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h3 className='doc-h3' id={id}>
      <a href={`#${id}`} className='doc-anchor'>
        {children}
      </a>
    </h3>
  );
}
