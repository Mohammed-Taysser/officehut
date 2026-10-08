/**
 * Design tokens shared by the vanilla and React entry points.
 * Keep in sync with `src/scss/_config.scss` — a unit test guards this.
 */
export const COLORS = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'danger',
  'light',
  'dark',
  'aurora',
] as const;
export type Color = (typeof COLORS)[number];

/** Colours that read well as an accent (excludes the neutrals). */
export const ACCENT_COLORS = [
  'primary',
  'success',
  'info',
  'warning',
  'danger',
  'aurora',
] as const satisfies readonly Color[];

export const SIZES = ['sm', 'md', 'lg'] as const;
export type Size = (typeof SIZES)[number];

export const AVATAR_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type AvatarSize = (typeof AVATAR_SIZES)[number];

export const THEMES = ['light', 'dark', 'auto'] as const;
export type Theme = (typeof THEMES)[number];

export const DENSITIES = ['comfortable', 'compact'] as const;
export type Density = (typeof DENSITIES)[number];

export const BREAKPOINTS = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
} as const;
export type Breakpoint = keyof typeof BREAKPOINTS;

export const PLACEMENTS = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
] as const;
export type Placement = (typeof PLACEMENTS)[number];

/** Attribute names used on `<html>` (or any subtree) to switch theme/density. */
export const THEME_ATTR = 'data-oh-theme';
export const DENSITY_ATTR = 'data-oh-density';
