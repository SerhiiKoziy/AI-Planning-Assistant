export interface Depot {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
}

export interface DepotCreate {
  address: string;
  latitude: number;
  longitude: number;
}
