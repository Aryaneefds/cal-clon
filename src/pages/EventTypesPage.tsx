import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Shell } from '../components/layout/Shell';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { EventTypeList } from '../components/event-types/EventTypeList';
import { CreateEventTypeDialog } from '../components/event-types/CreateEventTypeDialog';
import { useEventTypeStore } from '../stores/eventTypeStore';
import type { EventType } from '../types';

export function EventTypesPage() {
    const { eventTypes, addEventType, updateEventType, deleteEventType } = useEventTypeStore();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingEventType, setEditingEventType] = useState<EventType | null>(null);

    const handleEdit = (eventType: EventType) => {
        setEditingEventType(eventType);
        setDialogOpen(true);
    };

    const handleSave = (data: Omit<EventType, 'id' | 'createdAt'>) => {
        if (editingEventType) {
            updateEventType(editingEventType.id, data);
        } else {
            addEventType(data);
        }
        setEditingEventType(null);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this event type?')) {
            deleteEventType(id);
        }
    };

    return (
        <Shell>
            <PageHeader
                title="Event Types"
                subtitle="Create events to share for people to book on your calendar."
                actions={
                    <Button
                        icon={<Plus size={16} />}
                        onClick={() => {
                            setEditingEventType(null);
                            setDialogOpen(true);
                        }}
                    >
                        New
                    </Button>
                }
            />

            <EventTypeList
                eventTypes={eventTypes}
                onToggle={(id, isActive) => updateEventType(id, { isActive })}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <CreateEventTypeDialog
                open={dialogOpen}
                onClose={() => {
                    setDialogOpen(false);
                    setEditingEventType(null);
                }}
                onSave={handleSave}
                editingEventType={editingEventType}
            />
        </Shell>
    );
}
