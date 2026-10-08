import {
  Suspense,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { ErrorBoundary, PencilLoader } from 'officehut/react';
import { DEMOS, demoSource, demoVanilla, hasVanilla } from '../lib/demos';
import { formatHtml } from '../lib/formatHtml';
import { slug } from '../lib/slug';
import { Anatomy, type AnatomyPart } from './Anatomy';
import { Bench } from './Bench';
import { BENCH_DEFAULT, type BenchState } from '../lib/bench';
import { CodeBlock } from './CodeBlock';

type Pane = 'preview' | 'html' | 'react' | 'vanilla';

export interface ExampleProps {
  /** Demo key: file under `docs/src/demos` without extension, e.g. `button/Variants`. */
  demo: string;
  title: string;
  children?: ReactNode;
  anatomy?: AnatomyPart[];
  /** Composed "desk scene" — graph-paper background, more room. */
  scene?: boolean;
  /** Centre the preview content. */
  center?: boolean;
  /** Minimum preview height (px). */
  minHeight?: number;
  /** Hide the HTML tab (for demos that only make sense in React). */
  noHtml?: boolean;
}

/**
 * A demo in a manila folder: Preview · HTML · React · Vanilla JS tabs,
 * bench switches (theme / density / direction / width) and an anatomy overlay.
 */
export function Example({
  demo,
  title,
  children,
  anatomy,
  scene,
  center,
  minHeight,
  noHtml,
}: ExampleProps) {
  const Component = DEMOS[demo];
  const [pane, setPane] = useState<Pane>('preview');
  const [source, setSource] = useState('');
  const [vanilla, setVanilla] = useState('');
  const [bench, setBench] = useState<BenchState>(BENCH_DEFAULT);
  const [html, setHtml] = useState('');
  const stage = useRef<HTMLDivElement>(null);
  const id = slug(title);
  const tabsId = useId();

  useEffect(() => {
    let live = true;
    if (pane === 'react' && !source)
      demoSource(demo).then((s) => live && setSource(s));
    if (pane === 'vanilla' && !vanilla)
      demoVanilla(demo).then((s) => live && setVanilla(s));
    return () => {
      live = false;
    };
  }, [pane, demo, source, vanilla]);

  if (!Component) {
    return (
      <div className='error-slip' role='alert'>
        <span className='handwriting'>✗ missing</span>
        <span>
          No demo file at <code>docs/src/demos/{demo}.tsx</code>
        </span>
      </div>
    );
  }

  const panes: [Pane, string][] = [
    ['preview', 'Preview'],
    ...(!noHtml ? ([['html', 'HTML']] as [Pane, string][]) : []),
    ['react', 'React'],
    ...(hasVanilla(demo)
      ? ([['vanilla', 'Vanilla JS']] as [Pane, string][])
      : []),
  ];

  const open = (p: Pane) => {
    if (p === 'html' && stage.current)
      setHtml(formatHtml(stage.current.querySelector('.doc-stage-inner')!));
    setPane(p);
  };

  return (
    <section
      className={`doc-example ${scene ? 'is-scene' : ''}`}
      aria-labelledby={id}
    >
      <h2 className='doc-h2' id={id}>
        <a href={`#${id}`} className='doc-anchor'>
          {title}
        </a>
      </h2>
      {children && <div className='doc-prose'>{children}</div>}

      <div className='doc-folder'>
        <div className='doc-folder-head'>
          <div
            className='doc-folder-tabs'
            role='tablist'
            aria-label={`${title} views`}
          >
            {panes.map(([p, label]) => (
              <button
                key={p}
                type='button'
                role='tab'
                id={`${tabsId}-${p}`}
                aria-selected={pane === p}
                aria-controls={`${tabsId}-panel`}
                className='doc-folder-tab'
                onClick={() => open(p)}
              >
                {label}
              </button>
            ))}
          </div>
          {pane === 'preview' && (
            <Bench
              state={bench}
              onChange={setBench}
              hasAnatomy={Boolean(anatomy?.length)}
            />
          )}
        </div>

        <div
          className='doc-folder-sheet'
          role='tabpanel'
          id={`${tabsId}-panel`}
          aria-labelledby={`${tabsId}-${pane}`}
        >
          <div
            ref={stage}
            className={`doc-stage ${center ? 'is-center' : ''}`}
            hidden={pane !== 'preview'}
            data-oh-theme={bench.theme}
            data-oh-density={
              bench.density === 'compact' ? 'compact' : undefined
            }
            dir={bench.dir}
            style={{ minHeight }}
          >
            <div
              className='doc-stage-inner'
              style={{ maxWidth: `${bench.width}%` }}
            >
              <ErrorBoundary variant='slip' resetKeys={[demo]}>
                <Suspense
                  fallback={
                    <PencilLoader size='sm' label='Drawing the example' />
                  }
                >
                  <Component />
                </Suspense>
              </ErrorBoundary>
            </div>
            {bench.anatomy && anatomy && (
              <Anatomy stage={stage} parts={anatomy} />
            )}
          </div>
          {pane === 'html' && (
            <CodeBlock code={html} lang='html' label='index.html' />
          )}
          {pane === 'react' && (
            <CodeBlock
              code={source || '// loading…'}
              lang='tsx'
              label={`${demo.split('/').pop()}.tsx`}
            />
          )}
          {pane === 'vanilla' && (
            <CodeBlock
              code={vanilla || '// loading…'}
              lang='js'
              label='main.js'
            />
          )}
        </div>
      </div>
    </section>
  );
}
