import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '../../../api/client';

async function deleteDelivery(id: string): Promise<void> {
  await apiClient.delete(`/deliveries/${id}`);
}

export function useDeleteDelivery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDelivery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deliveries'] });
    },
  });
}
