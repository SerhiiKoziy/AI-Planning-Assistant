import { useQuery } from '@tanstack/react-query';

import { apiClient } from '../../../api/client';

export interface DailyUsagePoint {
  date: string;
  deliveriesCount: number;
  routesGenerated: number;
  distanceKm: number;
}

export interface DashboardUsageHistory {
  points: DailyUsagePoint[];
}

async function fetchDashboardUsageHistory(): Promise<DashboardUsageHistory> {
  const { data } = await apiClient.get<DashboardUsageHistory>('/dashboard/usage-history', {
    params: { days: 30 },
  });
  return data;
}

export function useDashboardUsageHistory() {
  return useQuery({
    queryKey: ['dashboard-usage-history'],
    queryFn: fetchDashboardUsageHistory,
  });
}
