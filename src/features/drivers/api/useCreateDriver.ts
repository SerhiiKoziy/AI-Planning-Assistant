import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '../../../api/client';
import type { Driver, DriverCreate } from '../types';

async function createDriver(payload: DriverCreate): Promise<Driver> {
  const { data } = await apiClient.post<Driver>('/drivers', payload);
  return data;
}

export function useCreateDriver() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDriver,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
    },
  });
}
