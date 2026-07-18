import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '../../../api/client';
import type { ChatRequest, ChatResponse } from '../types';

async function sendChatMessage(payload: ChatRequest): Promise<ChatResponse> {
  const { data } = await apiClient.post<ChatResponse>('/ai/chat', payload);
  return data;
}

export function useSendChatMessage(routeId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendChatMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-history', routeId] });
    },
  });
}
