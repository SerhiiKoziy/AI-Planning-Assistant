import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '../../../api/client';
import type { Organization, SubscriptionPlan } from '../types';

async function changePlan(plan: SubscriptionPlan): Promise<Organization> {
  const { data } = await apiClient.post<Organization>('/organizations/me/plan', { plan });
  return data;
}

export function useChangePlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changePlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organization-me'] });
    },
  });
}
