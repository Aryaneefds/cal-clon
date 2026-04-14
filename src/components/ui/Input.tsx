import { cn } from '../../lib/utils';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    variant?: 'dark' | 'light';
}

export function Input({ label, error, className, required, id, variant = 'dark', ...props }: InputProps) {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label htmlFor={inputId} className="text-sm font-semibold text-cal-text-primary">
                    {label}
                    {required && <span className="text-cal-error ml-1">*</span>}
                </label>
            )}
            <input
                id={inputId}
                className={cn(
                    'cal-input',
                    'w-full',
                    error && 'border-cal-error! focus:border-cal-error! focus:ring-cal-error!',
                    className
                )}
                required={required}
                {...props}
            />
            {error && <p className="text-xs text-cal-error mt-0.5">{error}</p>}
        </div>
    );
}
