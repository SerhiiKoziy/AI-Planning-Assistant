import { useQuery } from '@tanstack/react-query';

import { apiClient } from '../../../api/client';

export interface DashboardOverview {
  deliveriesToday: number;
  activeDrivers: number;
  totalDistanceKm: number;
  lateDeliveries: number;
  activeVehicles: number;
  driversOnRouteToday: number;
  driversIdleToday: number;
  vehiclesInUseToday: number;
  vehiclesAvailableToday: number;
}

async function fetchDashboardOverview(): Promise<DashboardOverview> {
  const { data } = await apiClient.get<DashboardOverview>('/dashboard/overview');
  return data;
}

export function useDashboardOverview() {
  return useQuery({
    queryKey: ['dashboard-overview'],
    queryFn: fetchDashboardOverview,
  });
}
