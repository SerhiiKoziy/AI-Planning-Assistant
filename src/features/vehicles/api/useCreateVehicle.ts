import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '../../../api/client';
import type { Vehicle, VehicleCreate } from '../types';

async function createVehicle(payload: VehicleCreate): Promise<Vehicle> {
  const { data } = await apiClient.post<Vehicle>('/vehicles', payload);
  return data;
}

export function useCreateVehicle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
  });
}
