import { ACCENT_COLORS, type Color } from './tokens.js';

/** "Nadia El-Sayed" → "NE", "kareem" → "KA", "" → "?" */
export function initials(name: string, max = 2): string {
  const words = name
    .trim()
    .split(/[\s._-]+/u)
    .filter(Boolean);
  if (words.length === 0) return '?';
  if (words.length === 1) return words[0]!.slice(0, max).toUpperCase();
  return words
    .slice(0, max)
    .map((w) => [...w][0])
    .join('')
    .toUpperCase();
}

/** Same name → same colour, so a person keeps their colour across screens. */
export function colorFor(seed: string): Color {
  let hash = 0;
  for (let i = 0; i < seed.length; i++)
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  return ACCENT_COLORS[Math.abs(hash) % ACCENT_COLORS.length]!;
}
