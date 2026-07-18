export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  content: string;
  created_at: string;
}

export interface ChatRequest {
  route_id: string;
  message: string;
}

export interface ChatResponse {
  reply: string;
}
