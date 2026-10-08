export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | Record<string, unknown>
  | ClassValue[];

/** Tiny `clsx`: joins truthy class names, flattens arrays, reads object keys. */
export function cx(...values: ClassValue[]): string {
  let out = '';
  for (const value of values) {
    if (!value) continue;
    let chunk = '';
    if (typeof value === 'string' || typeof value === 'number') {
      chunk = String(value);
    } else if (Array.isArray(value)) {
      chunk = cx(...value);
    } else {
      for (const key in value)
        if (value[key]) chunk += (chunk ? ' ' : '') + key;
    }
    if (chunk) out += (out ? ' ' : '') + chunk;
  }
  return out;
}
