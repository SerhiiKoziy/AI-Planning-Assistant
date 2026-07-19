import { useQuery } from '@tanstack/react-query';

import { apiClient } from '../../../api/client';
import type { Depot } from '../types';

async function fetchDepots(): Promise<Depot[]> {
  const { data } = await apiClient.get<Depot[]>('/depots');
  return data;
}

export function useDepots() {
  return useQuery({
    queryKey: ['depots'],
    queryFn: fetchDepots,
  });
}
