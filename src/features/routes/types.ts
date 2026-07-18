export interface RouteStop {
  id: string;
  delivery_id: string;
  sequence: number;
  estimated_arrival: string;
  estimated_departure: string;
  distance_from_previous_km: number;
  status: string;
  latitude: number | null;
  longitude: number | null;
}

export interface Route {
  id: string;
  driver_id: string | null;
  vehicle_id: string | null;
  depot_id: string;
  status: string;
  return_to_depot: boolean;
  total_distance_km: number;
  total_duration_minutes: number;
  created_at: string;
  updated_at: string;
  stops: RouteStop[];
}

export interface OptimizeRequest {
  delivery_ids: string[];
  vehicle_ids: string[];
  depot_id: string;
  return_to_depot?: boolean;
}

export interface OptimizeResult {
  routes: Route[];
  unassigned_delivery_ids: string[];
  skipped_not_geocoded: string[];
  vehicles_without_driver: string[];
}
