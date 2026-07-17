export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

/** ISO-8601 date-time string, e.g. "2026-07-17T09:00:00Z" */
export type ISODateString = string;
