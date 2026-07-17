import type { PropsWithChildren, ReactNode } from 'react';

export interface CardProps extends PropsWithChildren {
  title?: ReactNode;
}

export function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      {title && <div className="card__title">{title}</div>}
      <div className="card__body">{children}</div>
    </div>
  );
}
