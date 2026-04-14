import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { useEventTypeStore } from '../stores/eventTypeStore';
import { defaultUser } from '../data/seed';
import { getInitials } from '../lib/utils';
import { Badge } from '../components/ui/Badge';

export function PublicProfilePage() {
    const navigate = useNavigate();
    const { eventTypes } = useEventTypeStore();
    const activeEvents = eventTypes.filter((et) => et.isActive);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-cal-bg-base">
            <div className="w-full max-w-[480px]">
                {/* Profile card */}
                <div className="cal-card p-5 flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-cal-bg-emphasis flex items-center justify-center text-base font-bold text-cal-text-primary ring-2 ring-cal-border-emphasis flex-shrink-0">
                        {getInitials(defaultUser.name)}
                    </div>
                    <div>
                        <h1 className="text-base font-bold text-cal-text-primary">{defaultUser.name}</h1>
                        <p className="text-xs text-cal-text-muted mt-0.5">@{defaultUser.username}</p>
                    </div>
                </div>

                {/* Event types list */}
                {activeEvents.length === 0 ? (
                    <div className="cal-card p-8 text-center">
                        <p className="text-cal-text-muted text-sm">No event types available.</p>
                    </div>
                ) : (
                    <div className="cal-card overflow-hidden">
                        {activeEvents.map((et, index) => (
                            <button
                                key={et.id}
                                onClick={() => navigate(`/${defaultUser.username}/${et.slug}`)}
                                className={`w-full p-5 text-left hover:bg-cal-bg-subtle transition-all duration-200 cursor-pointer group ${index < activeEvents.length - 1 ? 'border-b border-cal-border' : ''
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-[15px] font-semibold text-cal-text-primary group-hover:text-white transition-colors">
                                            {et.title}
                                        </p>
                                        {et.description && (
                                            <p className="text-xs text-cal-text-muted mt-1 line-clamp-1">{et.description}</p>
                                        )}
                                        <div className="mt-2.5">
                                            <Badge icon={<Clock size={11} />}>{et.duration}m</Badge>
                                        </div>
                                    </div>
                                    <span className="text-cal-text-dimmed group-hover:text-cal-text-muted transition-colors text-lg">
                                        →
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                <p className="text-xs text-cal-text-dimmed text-center mt-6">
                    Powered by <span className="font-medium">Cal.com</span>
                </p>
            </div>
        </div>
    );
}
