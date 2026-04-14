import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface ShellProps {
    children: ReactNode;
}

export function Shell({ children }: ShellProps) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 overflow-auto">
                <div className="max-w-5xl mx-auto p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
