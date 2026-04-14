import { cn } from '../../lib/utils';

interface Tab {
    id: string;
    label: string;
    count?: number;
}

interface TabsProps {
    tabs: Tab[];
    activeTab: string;
    onChange: (tabId: string) => void;
    className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
    return (
        <div className={cn('flex items-center gap-0.5 border-b border-cal-border', className)}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={cn(
                        'px-4 py-2.5 text-[13px] font-medium transition-all duration-200 relative cursor-pointer rounded-t-[var(--radius-cal-sm)]',
                        activeTab === tab.id
                            ? 'text-cal-text-primary'
                            : 'text-cal-text-muted hover:text-cal-text-default hover:bg-cal-bg-subtle/50'
                    )}
                >
                    {tab.label}
                    {tab.count !== undefined && (
                        <span className="ml-1.5 text-[11px] px-1.5 py-0.5 rounded-full bg-cal-bg-emphasis text-cal-text-muted">
                            {tab.count}
                        </span>
                    )}
                    {activeTab === tab.id && (
                        <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-cal-text-primary rounded-full" />
                    )}
                </button>
            ))}
        </div>
    );
}
