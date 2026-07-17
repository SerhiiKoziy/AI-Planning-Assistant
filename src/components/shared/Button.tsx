import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ variant = 'primary', className, ...rest }: ButtonProps) {
  return <button className={`btn btn--${variant} ${className ?? ''}`} {...rest} />;
}
