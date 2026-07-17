import { useQuery } from '@tanstack/react-query';

import { apiClient } from '../../../api/client';
import type { Driver } from '../types';

async function fetchDrivers(): Promise<Driver[]> {
  // TODO: wire to real backend endpoint once available
  const { data } = await apiClient.get<Driver[]>('/drivers');
  return data;
}

export function useDrivers() {
  return useQuery({
    queryKey: ['drivers'],
    queryFn: fetchDrivers,
  });
}
