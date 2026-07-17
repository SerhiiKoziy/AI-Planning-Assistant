import type { ISODateString } from '../types/common';

/**
 * Formats an ISO date-time string for display, e.g. "Jul 17, 2026, 09:00".
 * Returns an empty string for falsy input.
 */
export function formatDate(isoDate: ISODateString | null | undefined): string {
  if (!isoDate) return '';

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(isoDate));
}
