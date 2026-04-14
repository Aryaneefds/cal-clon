import { useState } from 'react';
import { format, parse, addMinutes } from 'date-fns';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import type { EventType } from '../../types';

interface BookingFormProps {
    eventType: EventType;
    selectedDate: Date;
    selectedTime: string;
    onBack: () => void;
    onConfirm: (data: { name: string; email: string; notes: string }) => void;
}

export function BookingForm({
    onBack,
    onConfirm,
}: BookingFormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm({ name, email, notes });
    };

    return (
        <div className="w-full max-w-[420px] animate-in fade-in slide-in-from-right-8 duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-lg font-bold text-cal-text-primary tracking-tight mb-2">
                    Your details
                </h2>
                <div className="space-y-4">
                    <Input
                        label="Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        autoFocus
                    />
                    <Input
                        label="Email Address"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                    />
                    <Textarea
                        label="Additional Notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Please share anything that will help prepare for our meeting."
                        rows={3}
                    />
                </div>

                <div className="pt-2">
                    <p className="text-xs text-cal-text-dimmed leading-relaxed mb-6">
                        By proceeding, you agree to our{' '}
                        <span className="text-cal-text-primary hover:text-white cursor-pointer transition-colors">Terms</span> and{' '}
                        <span className="text-cal-text-primary hover:text-white cursor-pointer transition-colors">Privacy Policy</span>.
                    </p>

                    <div className="flex items-center justify-between">
                        <Button variant="ghost" type="button" onClick={onBack} size="sm">
                            Back
                        </Button>
                        <Button type="submit" variant="primary">
                            Confirm Booking
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
