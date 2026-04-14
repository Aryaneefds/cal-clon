import { useNavigate } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { useEventTypeStore } from '../stores/eventTypeStore';
import { defaultUser } from '../data/seed';
import { getInitials } from '../lib/utils';
import { Card } from '../components/ui/Card';

export function PublicProfilePage() {
    const navigate = useNavigate();
    const { eventTypes } = useEventTypeStore();
    const activeEvents = eventTypes.filter((et) => et.isActive);

    return (
        <div className="min-h-screen bg-cal-bg-base flex flex-col items-center py-20 px-4">
            <div className="w-full max-w-[640px]">
                {/* Profile Header */}
                <div className="flex flex-col items-center mb-10 text-center animate-in fade-in duration-500">
                    <div className="w-20 h-20 rounded-full bg-cal-bg-emphasis flex items-center justify-center text-2xl font-bold text-cal-text-primary ring-[3px] ring-cal-bg-base shadow-xl flex-shrink-0 mb-4 overflow-hidden">
                        {/* Using a placeholder gradient pattern for "avatar graphic" */}
                        <div className="w-full h-full bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white">
                            {getInitials(defaultUser.name)}
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-cal-text-primary tracking-tight">{defaultUser.name}</h1>
                    <p className="text-cal-text-muted text-sm mt-1">Book a meeting quickly and easily.</p>
                </div>

                {/* Event types list */}
                {activeEvents.length === 0 ? (
                    <Card className="text-center py-16 px-8">
                        <p className="text-cal-text-muted text-[15px] font-medium">No event types available at the moment.</p>
                    </Card>
                ) : (
                    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both">
                        {activeEvents.map((et) => (
                            <button
                                key={et.id}
                                onClick={() => navigate(`/${defaultUser.username}/${et.slug}`)}
                                className="w-full text-left group cal-card !p-0 overflow-hidden transform transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] cursor-pointer"
                            >
                                <div className="flex items-center justify-between p-6">
                                    <div className="flex flex-col gap-1.5">
                                        <p className="text-lg font-semibold text-cal-text-primary group-hover:text-white transition-colors">
                                            {et.title}
                                        </p>
                                        <div className="flex items-center gap-1.5 text-sm font-medium text-cal-text-muted">
                                            <Clock size={15} />
                                            <span>{et.duration}m</span>
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-cal-text-primary group-hover:bg-white group-hover:text-black transition-all">
                                        <ArrowRight size={18} strokeWidth={2.5} className="transform group-hover:translate-x-0.5 transition-transform" />
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
