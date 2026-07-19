import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '../../../api/client';
import type { Depot, DepotCreate } from '../types';

async function createDepot(payload: DepotCreate): Promise<Depot> {
  const { data } = await apiClient.post<Depot>('/depots', payload);
  return data;
}

export function useCreateDepot() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDepot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['depots'] });
    },
  });
}
