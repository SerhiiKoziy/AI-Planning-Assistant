import { useEffect, useRef, useState } from 'react';

import { Button } from '../../../components/shared';
import { useQuotaExhausted } from '../../organization';
import { getApiErrorMessage } from '../../../utils/getApiErrorMessage';
import { useChatHistory } from '../api/useChatHistory';
import { useSendChatMessage } from '../api/useSendChatMessage';

interface Props {
  routeId: string;
}

const inputCls =
  'bg-panel border border-edge rounded-lg px-3.5 py-2 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-primary transition-colors';

export function ChatPanel({ routeId }: Props) {
  const { data: messages = [], isLoading, isError } = useChatHistory(routeId);
  const sendMessage = useSendChatMessage(routeId);
  const quotaExhausted = useQuotaExhausted();
  const [text, setText] = useState('');
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, sendMessage.isPending]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = text.trim();
    if (!message || sendMessage.isPending || quotaExhausted) return;
    setText('');
    sendMessage.mutate({ route_id: routeId, message });
  };

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="px-4 py-3 border-b border-edge">
        <span className="font-semibold text-ink">AI Assistant</span>
      </div>

      <div ref={listRef} className="flex-1 overflow-y-auto flex flex-col gap-3 p-4">
        {isLoading && (
          <div className="flex items-center justify-center gap-2 py-8 text-ink-muted text-sm">
            <div className="w-4 h-4 border-2 border-edge border-t-primary rounded-full animate-spin" />
            <span>Loading conversation…</span>
          </div>
        )}

        {isError && (
          <p className="text-sm text-danger text-center py-8">Failed to load chat history.</p>
        )}

        {!isLoading && !isError && messages.length === 0 && (
          <p className="text-sm text-ink-muted text-center py-8">
            Ask the assistant anything about this route — stop order, timing, or how to handle a
            change.
          </p>
        )}

        {messages.map((message, i) => (
          <div
            key={`${message.created_at}-${i}`}
            className={`max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
              message.role === 'user'
                ? 'self-end bg-primary text-white'
                : 'self-start bg-panel text-ink border border-edge'
            }`}
          >
            {message.content}
          </div>
        ))}

        {sendMessage.isPending && (
          <div className="self-start bg-panel text-ink-muted border border-edge rounded-lg px-3 py-2 text-sm">
            Thinking…
          </div>
        )}
      </div>

      {sendMessage.isError && (
        <p className="px-4 pb-2 text-sm text-danger">
          {getApiErrorMessage(sendMessage.error, 'Failed to send message.')}
        </p>
      )}

      {quotaExhausted && (
        <p className="px-4 pb-2 text-sm text-danger">
          Trial request limit reached — upgrade your plan to keep chatting.
        </p>
      )}

      <form className="flex gap-2 p-3 border-t border-edge" onSubmit={handleSubmit}>
        <input
          className={`${inputCls} flex-1`}
          placeholder="Ask about this route…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={sendMessage.isPending || quotaExhausted}
        />
        <Button type="submit" disabled={sendMessage.isPending || quotaExhausted || !text.trim()}>
          Send
        </Button>
      </form>
    </div>
  );
}
