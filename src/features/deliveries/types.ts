import type { ISODateString } from '../../types/common';

export type DeliveryPriority = 'low' | 'normal' | 'high' | 'urgent';

export type DeliveryStatus =
  | 'pending'
  | 'assigned'
  | 'in_transit'
  | 'delivered'
  | 'failed'
  | 'late';

export interface Delivery {
  id: string;
  address: string;
  customerName: string;
  notes?: string;
  priority: DeliveryPriority;
  status: DeliveryStatus;
  timeWindowStart?: ISODateString;
  timeWindowEnd?: ISODateString;
  driverId?: string;
}
