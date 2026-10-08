import type { SVGProps } from 'react';
import type { Color } from '../../shared/tokens.js';

type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 20 20',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

export const InfoIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx='10' cy='10' r='7.5' />
    <path d='M10 9v4.5M10 6.5v.01' />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx='10' cy='10' r='7.5' />
    <path d='m6.8 10.2 2.2 2.2 4.2-4.6' />
  </svg>
);

export const WarningIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d='M8.7 3.3 2.4 14.4A1.5 1.5 0 0 0 3.7 16.6h12.6a1.5 1.5 0 0 0 1.3-2.2L11.3 3.3a1.5 1.5 0 0 0-2.6 0Z' />
    <path d='M10 8v3.5M10 13.8v.01' />
  </svg>
);

export const DangerIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d='M7 2.5h6L17.5 7v6L13 17.5H7L2.5 13V7Z' />
    <path d='M10 6.5v4M10 13.5v.01' />
  </svg>
);

export const NoteIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d='M4.5 3.5h11v9l-4 4h-7Z' />
    <path d='M11.5 16.5v-4h4M7.5 7.5h5M7.5 10.5h3' />
  </svg>
);

/** The icon an alert/toast uses when `icon` is `true`. */
export function iconForColor(color?: Color) {
  switch (color) {
    case 'success':
      return <CheckIcon />;
    case 'warning':
      return <WarningIcon />;
    case 'danger':
      return <DangerIcon />;
    case 'info':
    case 'primary':
      return <InfoIcon />;
    default:
      return <NoteIcon />;
  }
}
