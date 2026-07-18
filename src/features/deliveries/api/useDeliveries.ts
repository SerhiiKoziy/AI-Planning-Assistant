import { useQuery } from '@tanstack/react-query';

import { apiClient } from '../../../api/client';
import type { Delivery } from '../types';

async function fetchDeliveries(): Promise<Delivery[]> {
  const { data } = await apiClient.get<Delivery[]>('/deliveries');
  return data;
}

export function useDeliveries() {
  return useQuery({
    queryKey: ['deliveries'],
    queryFn: fetchDeliveries,
  });
}
