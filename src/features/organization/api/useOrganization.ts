import { useQuery } from '@tanstack/react-query';

import { apiClient } from '../../../api/client';
import type { Organization } from '../types';

async function fetchOrganization(): Promise<Organization> {
  const { data } = await apiClient.get<Organization>('/organizations/me');
  return data;
}

export function useOrganization() {
  return useQuery({ queryKey: ['organization-me'], queryFn: fetchOrganization });
}
