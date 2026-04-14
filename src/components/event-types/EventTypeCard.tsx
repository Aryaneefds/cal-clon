import { Link } from 'react-router-dom';
import { Clock, Copy, Settings, Plus, Play } from 'lucide-react';
import { useEventTypeStore } from '../../stores/eventTypeStore';
import { defaultUser } from '../../data/seed';
import { Button } from '../ui/Button';

export function EventTypeCard({
    id,
    title,
    slug,
    duration,
    isActive,
}: {
    id: string;
    title: string;
    slug: string;
    duration: number;
    isActive: boolean;
}) {
    const { toggleEventType } = useEventTypeStore();
    const publicLink = `/${defaultUser.username}/${slug}`;

    return (
        <div className="cal-card group p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-300">
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-base font-semibold text-cal-text-primary">{title}</h3>
                    {!isActive && (
                        <span className="px-2 py-0.5 rounded-full bg-cal-bg-emphasis text-[11px] font-semibold text-cal-text-muted uppercase tracking-wider">
                            Hidden
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-4 text-[13px] font-medium text-cal-text-dimmed">
                    <Link
                        to={publicLink}
                        target="_blank"
                        className="hover:text-cal-text-primary truncate"
                    >
                        {publicLink}
                    </Link>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                        <Clock size={14} />
                        <span>{duration}m</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
                {/* Elite Minimalist Toggle */}
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isActive}
                        onChange={() => toggleEventType(id)}
                    />
                    <div className="w-9 h-5 bg-cal-bg-emphasis peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cal-text-primary"></div>
                </label>

                <div className="h-6 w-[1px] bg-cal-border hidden md:block"></div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" icon={<Copy size={14} />}>
                        Copy link
                    </Button>
                    <Button variant="ghost" size="sm" className="hidden sm:inline-flex px-2">
                        <Settings size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
