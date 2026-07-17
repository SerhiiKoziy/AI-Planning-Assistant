import type { ISODateString } from '../../types/common';

export interface RouteStop {
  id: string;
  deliveryId: string;
  sequence: number;
  estimatedArrival?: ISODateString;
  lat: number;
  lng: number;
}

export interface Route {
  id: string;
  driverId: string;
  vehicleId: string;
  date: ISODateString;
  stops: RouteStop[];
  totalDistanceKm: number;
  totalDurationMinutes: number;
}
