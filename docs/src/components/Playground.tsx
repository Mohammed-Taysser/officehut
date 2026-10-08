import { useMemo, useRef, useState, type ReactNode } from 'react';
import { formatHtml } from '../lib/formatHtml';
import { CodeBlock } from './CodeBlock';

type Control =
  | {
      type: 'select';
      options: readonly string[];
      default?: string;
      label?: string;
    }
  | { type: 'toggle'; default?: boolean; label?: string }
  | { type: 'text'; default?: string; label?: string };

type Values = Record<string, string | boolean>;

export interface PlaygroundProps {
  /** Component name used in the generated JSX. */
  component: string;
  controls: Record<string, Control>;
  /** Which control becomes the JSX children. */
  childrenProp?: string;
  render: (props: Values) => ReactNode;
}

function initial(controls: Record<string, Control>): Values {
  const out: Values = {};
  for (const [k, c] of Object.entries(controls)) {
    out[k] =
      c.type === 'toggle'
        ? (c.default ?? false)
        : (c.default ?? (c.type === 'select' ? c.options[0]! : ''));
  }
  return out;
}

function toJsx(
  name: string,
  values: Values,
  controls: Record<string, Control>,
  childrenProp?: string,
) {
  const props = Object.entries(values)
    .filter(
      ([k, v]) =>
        k !== childrenProp &&
        v !== '' &&
        v !== false &&
        v !== controls[k]?.default,
    )
    .map(([k, v]) => (v === true ? k : `${k}='${v}'`));
  const open = props.length ? `<${name} ${props.join(' ')}` : `<${name}`;
  const children = childrenProp ? values[childrenProp] : '';
  return children ? `${open}>${children}</${name}>` : `${open} />`;
}

/**
 * The switchboard: a strip of labelled switches and dials wired to a live
 * component, with the JSX and HTML regenerated as you flip them.
 */
export function Playground({
  component,
  controls,
  childrenProp,
  render,
}: PlaygroundProps) {
  const [values, setValues] = useState<Values>(() => initial(controls));
  const [view, setView] = useState<'jsx' | 'html'>('jsx');
  const stage = useRef<HTMLDivElement>(null);
  const jsx = useMemo(
    () => toJsx(component, values, controls, childrenProp),
    [component, values, controls, childrenProp],
  );
  const [html, setHtml] = useState('');

  const set = (k: string, v: string | boolean) =>
    setValues((s) => ({ ...s, [k]: v }));

  return (
    <div className='doc-board'>
      <div
        className='doc-board-panel'
        role='group'
        aria-label={`${component} props`}
      >
        {Object.entries(controls).map(([k, c]) => (
          <div className='doc-knob' key={k}>
            <span className='doc-knob-label' id={`knob-${k}`}>
              {c.label ?? k}
            </span>
            {c.type === 'toggle' && (
              <button
                type='button'
                role='switch'
                aria-checked={values[k] === true}
                aria-labelledby={`knob-${k}`}
                className='doc-rocker'
                onClick={() => set(k, !values[k])}
              >
                <span className='doc-led' />
                <span>{values[k] ? 'on' : 'off'}</span>
              </button>
            )}
            {c.type === 'select' && (
              <select
                className='doc-dial'
                aria-labelledby={`knob-${k}`}
                value={String(values[k])}
                onChange={(e) => set(k, e.target.value)}
              >
                {c.options.map((o) => (
                  <option key={o} value={o}>
                    {o || '—'}
                  </option>
                ))}
              </select>
            )}
            {c.type === 'text' && (
              <input
                className='doc-dial'
                aria-labelledby={`knob-${k}`}
                value={String(values[k])}
                onChange={(e) => set(k, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      <div className='doc-board-stage' ref={stage}>
        <div className='doc-stage-inner'>{render(values)}</div>
      </div>

      <div className='doc-board-code'>
        <div className='tabs tabs-segmented' role='tablist' aria-label='Output'>
          <button
            type='button'
            role='tab'
            className='tab'
            aria-selected={view === 'jsx'}
            onClick={() => setView('jsx')}
          >
            JSX
          </button>
          <button
            type='button'
            role='tab'
            className='tab'
            aria-selected={view === 'html'}
            onClick={() => {
              if (stage.current)
                setHtml(
                  formatHtml(stage.current.querySelector('.doc-stage-inner')!),
                );
              setView('html');
            }}
          >
            HTML
          </button>
        </div>
        <CodeBlock
          code={view === 'jsx' ? jsx : html}
          lang={view === 'jsx' ? 'tsx' : 'html'}
        />
      </div>
    </div>
  );
}
