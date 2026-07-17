import { useQuery } from '@tanstack/react-query';

import { apiClient } from '../../../api/client';

export interface DashboardOverview {
  deliveriesToday: number;
  activeDrivers: number;
  totalDistanceKm: number;
  lateDeliveries: number;
}

async function fetchDashboardOverview(): Promise<DashboardOverview> {
  // TODO: wire to real backend endpoint once available
  const { data } = await apiClient.get<DashboardOverview>('/dashboard/overview');
  return data;
}

export function useDashboardOverview() {
  return useQuery({
    queryKey: ['dashboard-overview'],
    queryFn: fetchDashboardOverview,
  });
}
