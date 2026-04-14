import { useState } from 'react';
import { format, parse, addMinutes } from 'date-fns';
import { Calendar, Clock, Video, Globe } from 'lucide-react';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { getInitials, formatTime } from '../../lib/utils';
import { defaultUser } from '../../data/seed';
import type { EventType } from '../../types';

interface BookingFormProps {
    eventType: EventType;
    selectedDate: Date;
    selectedTime: string;
    onBack: () => void;
    onConfirm: (data: { name: string; email: string; notes: string }) => void;
}

export function BookingForm({
    eventType,
    selectedDate,
    selectedTime,
    onBack,
    onConfirm,
}: BookingFormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [notes, setNotes] = useState('');

    const endTime = format(
        addMinutes(parse(selectedTime, 'HH:mm', new Date()), eventType.duration),
        'HH:mm'
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm({ name, email, notes });
    };

    return (
        <div className="cal-card overflow-hidden">
            <div className="flex flex-col md:flex-row">
                {/* Left panel — event info */}
                <div className="w-full md:w-[300px] p-6 md:border-r border-b md:border-b-0 border-cal-border flex-shrink-0">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-full bg-cal-bg-emphasis flex items-center justify-center text-sm font-semibold text-cal-text-primary ring-2 ring-cal-border-emphasis">
                            {getInitials(defaultUser.name)}
                        </div>
                        <span className="text-sm text-cal-text-muted font-medium">{defaultUser.name}</span>
                    </div>

                    <h2 className="text-xl font-bold text-cal-text-primary mb-5">{eventType.title}</h2>

                    <div className="space-y-3.5">
                        <div className="flex items-start gap-3 text-sm text-cal-text-default">
                            <Calendar size={16} className="text-cal-text-muted mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="font-medium">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
                                <p className="text-cal-text-muted">
                                    {formatTime(selectedTime, false)} – {formatTime(endTime, false)}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-cal-text-muted">
                            <Clock size={16} className="flex-shrink-0" />
                            <span>{eventType.duration}m</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-cal-text-muted">
                            <Video size={16} className="flex-shrink-0" />
                            <span>Cal Video</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-cal-text-muted">
                            <Globe size={16} className="flex-shrink-0" />
                            <span>{defaultUser.timezone}</span>
                        </div>
                    </div>
                </div>

                {/* Right panel — form */}
                <div className="flex-1 p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            label="Your name"
                            required
                            variant="light"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                        />
                        <Input
                            label="Email address"
                            required
                            variant="light"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                        />
                        <Textarea
                            label="Additional notes"
                            variant="light"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Please share anything that will help prepare for our meeting."
                        />

                        <button
                            type="button"
                            className="text-sm text-cal-text-muted hover:text-cal-info transition-colors cursor-pointer font-medium"
                        >
                            + Add guests
                        </button>

                        <p className="text-xs text-cal-text-dimmed leading-relaxed">
                            By proceeding, you agree to Cal.com&apos;s{' '}
                            <span className="underline cursor-pointer hover:text-cal-text-muted">Terms</span> and{' '}
                            <span className="underline cursor-pointer hover:text-cal-text-muted">Privacy Policy</span>.
                        </p>

                        <div className="flex justify-end gap-3 pt-3 border-t border-cal-border">
                            <Button variant="ghost" type="button" onClick={onBack}>
                                Back
                            </Button>
                            <Button type="submit" variant="secondary">
                                Confirm
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
