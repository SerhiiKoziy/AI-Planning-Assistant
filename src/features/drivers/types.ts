export interface Vehicle {
  id: string;
  licensePlate: string;
  capacity: number;
}

export interface Driver {
  id: string;
  name: string;
  phone?: string;
  vehicle?: Vehicle;
  isActive: boolean;
}
