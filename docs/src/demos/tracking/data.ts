import type { TrackingItem } from 'officehut/react';

const DAY = 86_400_000;
const fmt = new Intl.DateTimeFormat('en-GB', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
});

/**
 * Build `days` of uptime blocks ending on 7 Oct 2026. `incidents` maps
 * "days ago" to a status and note; every other day is operational.
 */
export function uptime(
  days: number,
  incidents: Record<number, [TrackingItem['status'], string]> = {},
): TrackingItem[] {
  const end = Date.UTC(2026, 9, 7);
  return Array.from({ length: days }, (_, i) => {
    const ago = days - 1 - i;
    const date = fmt.format(new Date(end - ago * DAY));
    const [status, note] = incidents[ago] ?? ['success', 'operational'];
    return { status, label: `${date} — ${note}` };
  });
}
