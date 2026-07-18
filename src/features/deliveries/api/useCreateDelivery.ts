import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '../../../api/client';
import type { Delivery, DeliveryCreate } from '../types';

async function createDelivery(payload: DeliveryCreate): Promise<Delivery> {
  const { data } = await apiClient.post<Delivery>('/deliveries', payload);
  return data;
}

export function useCreateDelivery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDelivery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deliveries'] });
    },
  });
}
