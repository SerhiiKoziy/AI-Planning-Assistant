import type { ISODateString } from '../../types/common';

export type DeliveryPriority = 'low' | 'normal' | 'high' | 'vip';

export type DeliveryStatus =
  | 'pending'
  | 'assigned'
  | 'in_transit'
  | 'delivered'
  | 'failed';

export interface Delivery {
  id: string;
  customer_name: string;
  phone: string | null;
  address: string;
  order_number: string | null;
  priority: DeliveryPriority;
  unloading_minutes: number;
  weight_kg: number;
  volume_m3: number;
  delivery_window_start: string | null;
  delivery_window_end: string | null;
  notes: string | null;
  latitude: number | null;
  longitude: number | null;
  status: DeliveryStatus;
  created_at: ISODateString;
  updated_at: ISODateString;
}

export interface DeliveryCreate {
  customer_name: string;
  phone?: string;
  address: string;
  order_number?: string;
  priority?: DeliveryPriority;
  unloading_minutes?: number;
  weight_kg?: number;
  volume_m3?: number;
  delivery_window_start?: string;
  delivery_window_end?: string;
  notes?: string;
}
