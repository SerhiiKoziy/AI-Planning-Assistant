export interface Vehicle {
  id: string;
  plate_number: string;
  status: string;
  capacity_weight_kg: number;
  capacity_volume_m3: number;
  driver_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface VehicleCreate {
  plate_number: string;
  capacity_weight_kg: number;
  capacity_volume_m3: number;
  driver_id?: string;
}
