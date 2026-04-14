import { Plus } from 'lucide-react';
import { useEventTypeStore } from '../stores/eventTypeStore';
import { EventTypeCard } from '../components/event-types/EventTypeCard';
import { Button } from '../components/ui/Button';

export function EventTypesPage() {
    const { eventTypes } = useEventTypeStore();

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-cal-text-primary tracking-tight mb-2">Event Types</h1>
                    <p className="text-sm text-cal-text-muted">
                        Create events to share for people to book on your calendar.
                    </p>
                </div>
                <Button icon={<Plus size={16} />} size="lg">
                    New
                </Button>
            </div>

            <div className="space-y-4">
                {eventTypes.map((et) => (
                    <EventTypeCard key={et.id} {...et} />
                ))}
                {eventTypes.length === 0 && (
                    <div className="text-center py-20 bg-cal-bg-card rounded-xl border border-cal-border border-dashed">
                        <h3 className="text-cal-text-primary font-medium mb-2">No event types</h3>
                        <p className="text-sm text-cal-text-muted">
                            Get started by creating your first event type.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
