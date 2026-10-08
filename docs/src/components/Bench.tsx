import {
  IconLayoutDistributeHorizontal,
  IconMoon,
  IconSun,
  IconTextDirectionRtl,
  IconTarget,
} from '@tabler/icons-react';

import type { BenchState } from '../lib/bench';

interface Props {
  state: BenchState;
  onChange: (next: BenchState) => void;
  hasAnatomy: boolean;
}

/** The little row of switches above every preview. */
export function Bench({ state, onChange, hasAnatomy }: Props) {
  const set = <K extends keyof BenchState>(k: K, v: BenchState[K]) =>
    onChange({ ...state, [k]: v });
  return (
    <div className='doc-bench' role='toolbar' aria-label='Preview settings'>
      <button
        type='button'
        className='doc-bench-btn'
        aria-pressed={state.theme === 'dark'}
        title='Night shift'
        onClick={() => set('theme', state.theme === 'dark' ? 'light' : 'dark')}
      >
        {state.theme === 'dark' ? (
          <IconMoon size={15} />
        ) : (
          <IconSun size={15} />
        )}
        <span className='visually-hidden'>Toggle night shift</span>
      </button>
      <button
        type='button'
        className='doc-bench-btn'
        aria-pressed={state.density === 'compact'}
        title='Compact density'
        onClick={() =>
          set(
            'density',
            state.density === 'compact' ? 'comfortable' : 'compact',
          )
        }
      >
        <IconLayoutDistributeHorizontal size={15} />
        <span className='visually-hidden'>Toggle compact density</span>
      </button>
      <button
        type='button'
        className='doc-bench-btn'
        aria-pressed={state.dir === 'rtl'}
        title='Right-to-left'
        onClick={() => set('dir', state.dir === 'rtl' ? 'ltr' : 'rtl')}
      >
        <IconTextDirectionRtl size={15} />
        <span className='visually-hidden'>Toggle right-to-left</span>
      </button>
      {hasAnatomy && (
        <button
          type='button'
          className='doc-bench-btn'
          aria-pressed={state.anatomy}
          title='Anatomy: label the parts'
          onClick={() => set('anatomy', !state.anatomy)}
        >
          <IconTarget size={15} />
          <span className='visually-hidden'>Toggle anatomy labels</span>
        </button>
      )}
      <label className='doc-bench-width' title='Preview width'>
        <span className='visually-hidden'>Preview width</span>
        <input
          type='range'
          min={30}
          max={100}
          step={5}
          value={state.width}
          onChange={(e) => set('width', Number(e.target.value))}
        />
        <output className='font-mono'>{state.width}%</output>
      </label>
    </div>
  );
}
