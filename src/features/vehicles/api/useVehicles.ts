import { useQuery } from '@tanstack/react-query';

import { apiClient } from '../../../api/client';
import type { Vehicle } from '../types';

async function fetchVehicles(): Promise<Vehicle[]> {
  const { data } = await apiClient.get<Vehicle[]>('/vehicles');
  return data;
}

export function useVehicles() {
  return useQuery({
    queryKey: ['vehicles'],
    queryFn: fetchVehicles,
  });
}
