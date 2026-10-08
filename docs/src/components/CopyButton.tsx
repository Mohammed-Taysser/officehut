import { useState } from 'react';

export function CopyButton({
  text,
  label = 'Copy',
  className = 'doc-copy',
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [done, setDone] = useState(false);
  return (
    <button
      type='button'
      className={className}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1400);
        } catch {
          /* clipboard blocked — nothing useful to do */
        }
      }}
    >
      {done ? (label === 'copy' ? 'copied ✓' : 'Copied') : label}
    </button>
  );
}
