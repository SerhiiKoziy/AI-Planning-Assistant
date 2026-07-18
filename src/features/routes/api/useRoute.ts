import { useQuery } from '@tanstack/react-query';

import { apiClient } from '../../../api/client';
import type { Route } from '../types';

async function fetchRoute(id: string): Promise<Route> {
  const { data } = await apiClient.get<Route>(`/routes/${id}`);
  return data;
}

export function useRoute(id: string | null) {
  return useQuery({
    queryKey: ['route', id],
    queryFn: () => fetchRoute(id!),
    enabled: Boolean(id),
  });
}
