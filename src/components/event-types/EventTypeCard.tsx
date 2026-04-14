import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Copy, Pencil, Trash2, ExternalLink } from 'lucide-react';
import type { EventType } from '../../types';
import { cn } from '../../lib/utils';
import { Switch } from '../ui/Switch';
import { Badge } from '../ui/Badge';
import { defaultUser } from '../../data/seed';

interface EventTypeCardProps {
    eventType: EventType;
    onToggle: (id: string, isActive: boolean) => void;
    onEdit: (eventType: EventType) => void;
    onDelete: (id: string) => void;
}

export function EventTypeCard({ eventType, onToggle, onEdit, onDelete }: EventTypeCardProps) {
    const [hovering, setHovering] = useState(false);
    const navigate = useNavigate();

    const handleCopyLink = (e: React.MouseEvent) => {
        e.stopPropagation();
        const link = `${window.location.origin}/${defaultUser.username}/${eventType.slug}`;
        navigator.clipboard.writeText(link);
    };

    return (
        <div
            className={cn(
                'group flex items-center justify-between p-4 border-b border-cal-border last:border-b-0 transition-colors',
                hovering && 'bg-cal-bg-subtle/50'
            )}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-6 rounded-full bg-cal-sidebar-active flex-shrink-0" />
                    <div>
                        <button
                            onClick={() => navigate(`/${defaultUser.username}/${eventType.slug}`)}
                            className="text-sm font-medium text-cal-text-primary hover:underline text-left cursor-pointer"
                        >
                            {eventType.title}
                        </button>
                        <p className="text-xs text-cal-text-muted mt-0.5">
                            /{defaultUser.username}/{eventType.slug}
                        </p>
                    </div>
                </div>
                <div className="mt-2 ml-3">
                    <Badge icon={<Clock size={12} />}>{eventType.duration}m</Badge>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {/* Action buttons (visible on hover) */}
                <div
                    className={cn(
                        'flex items-center gap-1 transition-opacity',
                        hovering ? 'opacity-100' : 'opacity-0'
                    )}
                >
                    <button
                        onClick={() => navigate(`/${defaultUser.username}/${eventType.slug}`)}
                        className="p-1.5 rounded-[var(--radius-cal-sm)] text-cal-text-muted hover:text-cal-text-primary hover:bg-cal-bg-emphasis transition-colors cursor-pointer"
                        title="Preview"
                    >
                        <ExternalLink size={14} />
                    </button>
                    <button
                        onClick={handleCopyLink}
                        className="p-1.5 rounded-[var(--radius-cal-sm)] text-cal-text-muted hover:text-cal-text-primary hover:bg-cal-bg-emphasis transition-colors cursor-pointer"
                        title="Copy link"
                    >
                        <Copy size={14} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onEdit(eventType); }}
                        className="p-1.5 rounded-[var(--radius-cal-sm)] text-cal-text-muted hover:text-cal-text-primary hover:bg-cal-bg-emphasis transition-colors cursor-pointer"
                        title="Edit"
                    >
                        <Pencil size={14} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(eventType.id); }}
                        className="p-1.5 rounded-[var(--radius-cal-sm)] text-cal-text-muted hover:text-cal-error hover:bg-cal-bg-emphasis transition-colors cursor-pointer"
                        title="Delete"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>

                <Switch
                    checked={eventType.isActive}
                    onChange={(checked) => onToggle(eventType.id, checked)}
                />
            </div>
        </div>
    );
}
