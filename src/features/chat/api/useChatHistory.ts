import { useQuery } from '@tanstack/react-query';

import { apiClient } from '../../../api/client';
import type { ChatMessage } from '../types';

async function fetchChatHistory(routeId: string): Promise<ChatMessage[]> {
  const { data } = await apiClient.get<ChatMessage[]>(`/ai/chat/${routeId}/history`);
  return data;
}

export function useChatHistory(routeId: string | null) {
  return useQuery({
    queryKey: ['chat-history', routeId],
    queryFn: () => fetchChatHistory(routeId!),
    enabled: Boolean(routeId),
  });
}
