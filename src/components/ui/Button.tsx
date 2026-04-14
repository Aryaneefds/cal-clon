import { cn } from '../../lib/utils';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children: ReactNode;
    icon?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        'bg-cal-brand text-cal-brand-text hover:bg-white/90 active:bg-white/80 shadow-[0_1px_2px_rgba(0,0,0,0.3)]',
    secondary:
        'bg-cal-bg-subtle text-cal-text-primary border border-cal-border-emphasis hover:bg-cal-bg-emphasis active:bg-cal-bg-emphasis/80 shadow-[0_1px_2px_rgba(0,0,0,0.2)]',
    ghost:
        'bg-transparent text-cal-text-muted hover:text-cal-text-primary hover:bg-cal-bg-subtle/80',
    destructive:
        'bg-cal-error/90 text-white hover:bg-cal-error active:bg-red-700 shadow-[0_1px_2px_rgba(0,0,0,0.3)]',
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-sm gap-2',
};

export function Button({
    variant = 'primary',
    size = 'md',
    children,
    icon,
    className,
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                'inline-flex items-center justify-center font-medium rounded-[var(--radius-cal-md)] transition-all duration-200 cursor-pointer select-none',
                'disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none',
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
            disabled={disabled}
            {...props}
        >
            {icon && <span className="flex-shrink-0">{icon}</span>}
            {children}
        </button>
    );
}
