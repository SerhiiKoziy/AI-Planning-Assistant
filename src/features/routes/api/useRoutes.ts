import { useQuery } from '@tanstack/react-query';

import { apiClient } from '../../../api/client';
import type { Route } from '../types';

async function fetchRoutes(): Promise<Route[]> {
  // TODO: wire to real backend endpoint once available
  const { data } = await apiClient.get<Route[]>('/routes');
  return data;
}

export function useRoutes() {
  return useQuery({
    queryKey: ['routes'],
    queryFn: fetchRoutes,
  });
}
