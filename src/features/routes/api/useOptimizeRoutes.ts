import { useMutation } from '@tanstack/react-query';

import { apiClient } from '../../../api/client';
import type { OptimizeRequest, OptimizeResult } from '../types';

async function optimizeRoutes(payload: OptimizeRequest): Promise<OptimizeResult> {
  const { data } = await apiClient.post<OptimizeResult>('/routes/optimize', payload);
  return data;
}

export function useOptimizeRoutes() {
  return useMutation({ mutationFn: optimizeRoutes });
}
