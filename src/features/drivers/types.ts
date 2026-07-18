export type DriverStatus = 'active' | 'inactive';

export interface Driver {
  id: string;
  name: string;
  phone: string;
  status: DriverStatus;
  working_hours_start: string;
  working_hours_end: string;
  break_start: string | null;
  break_end: string | null;
  max_working_minutes: number;
  created_at: string;
  updated_at: string;
}

export interface DriverCreate {
  name: string;
  phone: string;
  status?: DriverStatus;
  working_hours_start?: string;
  working_hours_end?: string;
  break_start?: string;
  break_end?: string;
  max_working_minutes?: number;
}
