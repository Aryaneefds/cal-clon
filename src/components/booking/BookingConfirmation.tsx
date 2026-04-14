import { format, parse, addMinutes } from 'date-fns';
import { Check, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatTime } from '../../lib/utils';
import { defaultUser } from '../../data/seed';
import type { EventType } from '../../types';

interface BookingConfirmationProps {
    eventType: EventType;
    selectedDate: Date;
    selectedTime: string;
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
    const navigate = useNavigate();
    const endTime = format(
        addMinutes(parse(selectedTime, 'HH:mm', new Date()), eventType.duration),
        'HH:mm'
    );

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            {/* Back link */}
            <div className="w-full max-w-lg mb-4">
                <button
                    onClick={() => navigate('/bookings')}
                    className="text-sm text-cal-text-muted hover:text-cal-text-primary transition-colors cursor-pointer"
                >
                    ← Back to bookings
                </button>
            </div>

            <Card className="w-full max-w-lg">
                {/* Success icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-cal-success flex items-center justify-center">
                        <Check size={24} className="text-white" />
                    </div>
                </div>

                <h1 className="text-xl font-bold text-cal-text-primary text-center mb-2">
                    This meeting is scheduled
                </h1>
                <p className="text-sm text-cal-text-muted text-center mb-6">
                    We sent an email with a calendar invitation with the details to everyone.
                </p>

                <hr className="border-cal-border mb-6" />

                {/* Details table */}
                <div className="space-y-4">
                    <div className="flex">
                        <span className="w-16 text-sm font-semibold text-cal-text-primary flex-shrink-0">
                            What
                        </span>
                        <span className="text-sm text-cal-text-default">
                            {eventType.duration} min meeting between {defaultUser.name} and {bookerName}
                        </span>
                    </div>

                    <div className="flex">
                        <span className="w-16 text-sm font-semibold text-cal-text-primary flex-shrink-0">
                            When
                        </span>
                        <div className="text-sm text-cal-text-default">
                            <p>{format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
                            <p>
                                {formatTime(selectedTime, false)} - {formatTime(endTime, false)}{' '}
                                <span className="text-cal-text-muted">
                                    ({Intl.DateTimeFormat().resolvedOptions().timeZone})
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="flex">
                        <span className="w-16 text-sm font-semibold text-cal-text-primary flex-shrink-0">
                            Who
                        </span>
                        <div className="text-sm text-cal-text-default space-y-2">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span>{defaultUser.name}</span>
                                    <Badge variant="success" className="text-[10px] py-0">Host</Badge>
                                </div>
                            </div>
                            <div>
                                <p>{bookerName}</p>
                                <p className="text-cal-text-muted">{bookerEmail}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex">
                        <span className="w-16 text-sm font-semibold text-cal-text-primary flex-shrink-0">
                            Where
                        </span>
                        <span className="text-sm text-cal-text-default flex items-center gap-1">
                            Cal Video
                            <ExternalLink size={12} className="text-cal-text-muted" />
                        </span>
                    </div>
                </div>

                <hr className="border-cal-border my-6" />

                <p className="text-xs text-cal-text-muted text-center">
                    Need to make a change?{' '}
                    <button className="underline cursor-pointer hover:text-cal-text-default">Reschedule</button>
                    {' or '}
                    <button className="underline cursor-pointer hover:text-cal-text-default">Cancel</button>
                </p>
            </Card>

            <p className="text-xs text-cal-text-dimmed mt-4">Cal.com</p>
        </div>
    );
}
