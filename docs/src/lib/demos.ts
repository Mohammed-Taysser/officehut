import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

/**
 * Every file in `docs/src/demos/**` is both rendered (live preview) and shown
 * as source (React tab). Keys look like `button/Variants`.
 *
 * Everything is lazy: a page only downloads its own demos, and a broken demo
 * can't take the rest of the site down with it.
 */
const modules = import.meta.glob<{ default: ComponentType }>(
  '../demos/**/*.tsx',
);
const sources = import.meta.glob<string>('../demos/**/*.tsx', {
  query: '?raw',
  import: 'default',
});
const vanilla = import.meta.glob<string>('../demos/**/*.vanilla.js', {
  query: '?raw',
  import: 'default',
});

const path = (name: string) => `../demos/${name}.tsx`;

/** One lazy component per demo file, created once at module load. */
export const DEMOS: Record<
  string,
  LazyExoticComponent<ComponentType>
> = Object.fromEntries(
  Object.entries(modules).map(([file, load]) => [
    file.replace('../demos/', '').replace(/\.tsx$/, ''),
    lazy(load),
  ]),
);

export function hasDemo(name: string): boolean {
  return path(name) in modules;
}

export function hasVanilla(name: string): boolean {
  return `../demos/${name}.vanilla.js` in vanilla;
}

export async function demoSource(name: string): Promise<string> {
  return (await sources[path(name)]?.()) ?? '';
}

export async function demoVanilla(name: string): Promise<string> {
  return (await vanilla[`../demos/${name}.vanilla.js`]?.()) ?? '';
}
