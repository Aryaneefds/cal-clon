import { format, parse, addMinutes } from 'date-fns';
import { ExternalLink, Check } from 'lucide-react';
import type { EventType } from '../../types';
import { defaultUser } from '../../data/seed';
import { Card } from '../ui/Card';

interface BookingConfirmationProps {
    eventType: EventType;
    selectedDate: Date | null;
    selectedTime: string | null;
    bookerName: string;
    bookerEmail: string;
}

export function BookingConfirmation({
    eventType,
    selectedDate,
    selectedTime,
    bookerName,
    bookerEmail,
}: BookingConfirmationProps) {
    if (!selectedDate || !selectedTime) return null;

    const startObj = parse(selectedTime, 'HH:mm', new Date());
    const endObj = addMinutes(startObj, eventType.duration);
    const startTime = format(startObj, 'h:mm a');
    const endTime = format(endObj, 'h:mm a');

    return (
        <div className="min-h-screen bg-cal-bg-base flex items-center justify-center p-4">
            <div className="w-full max-w-[620px] animate-in fade-in zoom-in-95 duration-500">
                <Card className="px-8 py-12 md:px-12 md:py-16">
                    <div className="flex flex-col items-center text-center mb-12">
                        <div className="w-14 h-14 rounded-full bg-cal-success/10 flex items-center justify-center text-cal-success mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                            <Check strokeWidth={3} size={24} />
                        </div>
                        <h1 className="text-2xl font-bold text-cal-text-primary tracking-tight mb-3">
                            This meeting is scheduled
                        </h1>
                        <p className="text-[15px] text-cal-text-muted">
                            We sent an email with a calendar invitation with the details to everyone.
                        </p>
                    </div>

                    <div className="space-y-6 text-[15px] max-w-sm mx-auto w-full border-t border-white/5 pt-8">
                        <div className="flex flex-row justify-between">
                            <div className="font-semibold text-cal-text-dimmed">What</div>
                            <div className="font-medium text-cal-text-primary text-right">
                                {eventType.title}
                            </div>
                        </div>

                        <div className="flex flex-row justify-between">
                            <div className="font-semibold text-cal-text-dimmed">When</div>
                            <div className="font-medium text-cal-text-primary text-right leading-tight">
                                {format(selectedDate, 'EEEE, MMM d, yyyy')}
                                <br />
                                <span className="text-cal-text-muted">{startTime} - {endTime}</span>
                            </div>
                        </div>

                        <div className="flex flex-row justify-between">
                            <div className="font-semibold text-cal-text-dimmed">Who</div>
                            <div className="font-medium text-cal-text-primary text-right">
                                <div>{defaultUser.name} <span className="text-cal-text-muted text-xs bg-white/5 px-1.5 py-0.5 rounded ml-1">Host</span></div>
                                <div className="mt-2">{bookerName}</div>
                            </div>
                        </div>

                        <div className="flex flex-row justify-between">
                            <div className="font-semibold text-cal-text-dimmed">Where</div>
                            <div className="font-medium text-cal-text-primary text-right flex items-center gap-1.5 justify-end">
                                Cal Video
                                <ExternalLink size={14} className="text-cal-text-muted" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-14 text-center text-sm">
                        <span className="text-cal-text-dimmed">Need to make a change? </span>
                        <span className="text-cal-text-primary font-medium hover:text-white hover:underline cursor-pointer transition-colors">Reschedule</span>
                        <span className="text-cal-text-dimmed mx-1"> or </span>
                        <span className="text-cal-text-primary font-medium hover:text-white hover:underline cursor-pointer transition-colors">Cancel</span>
                    </div>
                </Card>
            </div>
        </div>
    );
}
