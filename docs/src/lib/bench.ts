export interface BenchState {
  theme: 'light' | 'dark';
  density: 'comfortable' | 'compact';
  dir: 'ltr' | 'rtl';
  width: number; // percent
  anatomy: boolean;
}

export const BENCH_DEFAULT: BenchState = {
  theme: 'light',
  density: 'comfortable',
  dir: 'ltr',
  width: 100,
  anatomy: false,
};
