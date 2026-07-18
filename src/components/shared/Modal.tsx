import type { PropsWithChildren, ReactNode } from 'react';
import { useEffect } from 'react';

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  footer?: ReactNode;
}

export function Modal({ isOpen, onClose, title, footer, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6"
      onClick={onClose}
    >
      <div
        className="bg-card border border-edge rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-edge">
          <span className="font-semibold text-ink">{title}</span>
          <button
            className="text-ink-muted hover:text-ink transition-colors px-2 py-1 rounded cursor-pointer bg-transparent border-none"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="p-5 overflow-y-auto flex-1">{children}</div>

        {footer && (
          <div className="flex justify-end gap-2.5 px-5 py-3 border-t border-edge">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
