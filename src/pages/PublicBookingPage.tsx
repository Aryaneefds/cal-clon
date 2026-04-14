import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Video, Globe, Calendar as CalendarIcon } from 'lucide-react';
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
import { Card } from '../components/ui/Card';

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
            <div className="min-h-screen bg-cal-bg-base flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-xl font-bold text-cal-text-primary mb-2">Event not found</h1>
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

    // Layout for Left Panel Event Info
    const EventInfoPanel = () => (
        <div className="w-full md:w-[300px] flex-shrink-0 flex flex-col md:pr-8 md:border-r border-cal-border">
            <div className="flex items-center gap-2.5 mb-6">
                <div className="w-7 h-7 rounded-full bg-cal-bg-emphasis flex items-center justify-center text-[11px] font-bold text-cal-text-primary ring-1 ring-white/10">
                    {getInitials(defaultUser.name)}
                </div>
                <span className="text-sm text-cal-text-muted font-medium">{defaultUser.name}</span>
            </div>
            <h1 className="text-2xl font-bold text-cal-text-primary tracking-tight mb-8 leading-tight">
                {eventType.title}
            </h1>

            <div className="space-y-5">
                <div className="flex items-start gap-3 text-[14.5px] font-medium text-cal-text-primary">
                    <Clock size={18} className="text-cal-text-muted flex-shrink-0 mt-0.5" />
                    <span>{eventType.duration} min</span>
                </div>
                <div className="flex items-start gap-3 text-[14.5px] font-medium text-cal-text-primary">
                    <Video size={18} className="text-cal-text-muted flex-shrink-0 mt-0.5" />
                    <span>Cal Video</span>
                </div>
                <div className="flex items-start gap-3 text-[14.5px] font-medium text-cal-text-primary">
                    <Globe size={18} className="text-cal-text-muted flex-shrink-0 mt-0.5" />
                    <span className="leading-snug text-cal-text-muted">
                        {availability.timezone}
                    </span>
                </div>

                {/* Show selected date details contextually if in form state */}
                {step === 'form' && selectedDate && selectedTime && (
                    <div className="pt-2">
                        <div className="flex items-start gap-3 text-[14.5px] font-medium text-cal-text-primary text-cal-text-success">
                            <CalendarIcon size={18} className="text-cal-success flex-shrink-0 mt-0.5" />
                            <div className="text-cal-success font-semibold">
                                {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                                <br />
                                {format(parse(selectedTime, 'HH:mm', new Date()), 'h:mm a')} –{' '}
                                {format(addMinutes(parse(selectedTime, 'HH:mm', new Date()), eventType.duration), 'h:mm a')}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-cal-bg-base flex items-center justify-center p-4">
            <div className="w-full max-w-[1060px] animate-in fade-in zoom-in-95 duration-500">
                <Card className="flex flex-col md:flex-row gap-8 p-6 md:p-10" noPadding>
                    <EventInfoPanel />

                    {/* Right Content Area */}
                    <div className="flex-1 flex justify-center">
                        {step === 'form' && selectedDate && selectedTime ? (
                            <BookingForm
                                eventType={eventType}
                                selectedDate={selectedDate}
                                selectedTime={selectedTime}
                                onBack={() => setStep('calendar')}
                                onConfirm={(data) => {
                                    const endTime = format(addMinutes(parse(selectedTime, 'HH:mm', new Date()), eventType.duration), 'HH:mm');
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
                        ) : (
                            <div className="flex flex-col md:flex-row gap-8 w-full max-w-[700px] justify-between">
                                <div className="flex-1 max-w-[380px]">
                                    <BookingCalendar
                                        selectedDate={selectedDate}
                                        onSelectDate={(date) => {
                                            setSelectedDate(date);
                                            setSelectedTime(null);
                                        }}
                                        availability={availability}
                                    />
                                </div>
                                {selectedDate && (
                                    <div className="w-full md:w-[280px]">
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
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}
