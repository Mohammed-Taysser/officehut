import { useEffect, useState } from 'react';
import { highlight, type Lang } from '../lib/highlight';
import { CopyButton } from './CopyButton';

export interface CodeBlockProps {
  code: string;
  lang?: Lang;
  /** Small label in the corner, e.g. a file name. */
  label?: string;
  className?: string;
}

/** Highlighted, copyable code on ruled paper. Falls back to plain text while shiki loads. */
export function CodeBlock({
  code,
  lang = 'tsx',
  label,
  className,
}: CodeBlockProps) {
  const trimmed = code.trim();
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    highlight(trimmed, lang).then(
      (h) => live && setHtml(h),
      () => {},
    );
    return () => {
      live = false;
    };
  }, [trimmed, lang]);

  return (
    <div className={`chalkboard doc-code ${className ?? ''}`}>
      <div className='doc-code-bar'>
        <span className='doc-code-label'>{label ?? lang}</span>
        <CopyButton
          text={trimmed}
          label='copy'
          className='btn btn-sm btn-chalk'
        />
      </div>
      {html ? (
        <div
          className='doc-code-body'
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className='doc-code-body'>
          <code>{trimmed}</code>
        </pre>
      )}
    </div>
  );
}
