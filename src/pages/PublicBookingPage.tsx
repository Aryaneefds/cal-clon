import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Video, Globe, ChevronDown, HelpCircle } from 'lucide-react';
import { format, getDay } from 'date-fns';
import { getInitials } from '../lib/utils';
import { defaultUser } from '../data/seed';
import { useEventTypeStore } from '../stores/eventTypeStore';
import { useAvailabilityStore } from '../stores/availabilityStore';
import { useBookingStore } from '../stores/bookingStore';
import { BookingCalendar } from '../components/booking/BookingCalendar';
import { TimeSlotPicker } from '../components/booking/TimeSlotPicker';
import { BookingForm } from '../components/booking/BookingForm';
import { BookingConfirmation } from '../components/booking/BookingConfirmation';
import { addMinutes, parse } from 'date-fns';

type BookingStep = 'calendar' | 'form' | 'confirmation';

export function PublicBookingPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const eventType = useEventTypeStore((s) => s.getEventTypeBySlug(slug || ''));
    const { availability } = useAvailabilityStore();
    const { bookings, addBooking } = useBookingStore();

    const [step, setStep] = useState<BookingStep>('calendar');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [confirmedBooking, setConfirmedBooking] = useState<{
        name: string;
        email: string;
    } | null>(null);

    const timeRangesForDate = useMemo(() => {
        if (!selectedDate) return [];
        const dayOfWeek = getDay(selectedDate);
        const daySchedule = availability.schedule.find((s) => s.day === dayOfWeek);
        return daySchedule?.enabled ? daySchedule.timeRanges : [];
    }, [selectedDate, availability]);

    if (!eventType) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-xl font-bold text-cal-text-primary mb-2">Event not found</h1>
                    <p className="text-cal-text-muted text-sm mb-4">
                        This event type doesn&apos;t exist or has been deactivated.
                    </p>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-sm text-cal-info hover:underline cursor-pointer"
                    >
                        Go back
                    </button>
                </div>
            </div>
        );
    }

    if (step === 'confirmation' && confirmedBooking && selectedDate && selectedTime) {
        return (
            <BookingConfirmation
                eventType={eventType}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                bookerName={confirmedBooking.name}
                bookerEmail={confirmedBooking.email}
            />
        );
    }

    if (step === 'form' && selectedDate && selectedTime) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-3xl">
                    <BookingForm
                        eventType={eventType}
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        onBack={() => setStep('calendar')}
                        onConfirm={(data) => {
                            const endTime = format(
                                addMinutes(parse(selectedTime, 'HH:mm', new Date()), eventType.duration),
                                'HH:mm'
                            );
                            addBooking({
                                eventTypeId: eventType.id,
                                eventTitle: eventType.title,
                                date: format(selectedDate, 'yyyy-MM-dd'),
                                startTime: selectedTime,
                                endTime,
                                duration: eventType.duration,
                                bookerName: data.name,
                                bookerEmail: data.email,
                                notes: data.notes || undefined,
                                status: 'upcoming',
                            });
                            setConfirmedBooking({ name: data.name, email: data.email });
                            setStep('confirmation');
                        }}
                    />
                    <p className="text-xs text-cal-text-dimmed text-center mt-4">Cal.com</p>
                </div>
            </div>
        );
    }

    // Calendar view (Screenshot 5)
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            {/* Top bar */}
            <div className="w-full max-w-4xl flex justify-end mb-2 gap-2">
                <button className="text-xs text-cal-text-muted hover:text-cal-text-default flex items-center gap-1 cursor-pointer">
                    <HelpCircle size={14} />
                    Need help?
                </button>
            </div>

            <div className="cal-card w-full max-w-4xl overflow-hidden">
                <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-cal-border">
                    {/* Left panel — event info */}
                    <div className="w-full md:w-[200px] p-5 flex-shrink-0">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-full bg-cal-bg-emphasis flex items-center justify-center text-xs font-medium text-cal-text-primary">
                                {getInitials(defaultUser.name)}
                            </div>
                        </div>
                        <p className="text-sm text-cal-text-muted mb-1">{defaultUser.name}</p>
                        <h1 className="text-lg font-bold text-cal-text-primary mb-4">{eventType.title}</h1>

                        <div className="space-y-2.5">
                            <div className="flex items-center gap-2 text-sm text-cal-text-muted">
                                <Clock size={14} className="flex-shrink-0" />
                                <span>{eventType.duration}m</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-cal-text-muted">
                                <Video size={14} className="flex-shrink-0" />
                                <span>Cal Video</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-cal-text-muted">
                                <Globe size={14} className="flex-shrink-0" />
                                <span className="flex items-center gap-1">
                                    {availability.timezone}
                                    <ChevronDown size={12} />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Center panel — calendar */}
                    <div className="flex-1 p-5 min-w-0">
                        <BookingCalendar
                            selectedDate={selectedDate}
                            onSelectDate={(date) => {
                                setSelectedDate(date);
                                setSelectedTime(null);
                            }}
                            availability={availability}
                        />
                    </div>

                    {/* Right panel — time slots (show when date is selected) */}
                    {selectedDate && (
                        <div className="w-full md:w-[200px] p-5 flex-shrink-0">
                            <TimeSlotPicker
                                selectedDate={selectedDate}
                                timeRanges={timeRangesForDate}
                                duration={eventType.duration}
                                existingBookings={bookings}
                                selectedSlot={selectedTime}
                                onSelectSlot={(time) => {
                                    setSelectedTime(time);
                                    setStep('form');
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>

            <p className="text-xs text-cal-text-dimmed mt-4">Cal.com</p>
        </div>
    );
}
