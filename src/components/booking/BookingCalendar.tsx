import { useState, useMemo } from 'react';
import {
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    getDay,
    format,
    addMonths,
    subMonths,
    isSameDay,
    isBefore,
    startOfDay,
    isToday,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Availability } from '../../types';

interface BookingCalendarProps {
    selectedDate: Date | null;
    onSelectDate: (date: Date) => void;
    availability: Availability;
}

const DAY_HEADERS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export function BookingCalendar({
    selectedDate,
    onSelectDate,
    availability,
}: BookingCalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const today = useMemo(() => startOfDay(new Date()), []);

    const calendarDays = useMemo(() => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(currentMonth);
        const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
        const startPadding = getDay(monthStart);
        const paddedDays: (Date | null)[] = [
            ...Array(startPadding).fill(null),
            ...days,
        ];
        return paddedDays;
    }, [currentMonth]);

    const isAvailable = (date: Date): boolean => {
        if (isBefore(date, today)) return false;
        const dayOfWeek = getDay(date);
        const daySchedule = availability.schedule.find((s) => s.day === dayOfWeek);
        return daySchedule?.enabled === true && daySchedule.timeRanges.length > 0;
    };

    return (
        <div className="w-full">
            {/* Month header */}
            <div className="flex items-center justify-between mb-6 px-1">
                <h2 className="text-base text-cal-text-primary flex items-center gap-1.5 tracking-tight">
                    <span className="font-semibold">{format(currentMonth, 'MMMM')}</span>
                    <span className="text-cal-text-muted font-medium">{format(currentMonth, 'yyyy')}</span>
                </h2>
                <div className="flex items-center gap-0.5">
                    <button
                        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                        className="p-1.5 rounded-md text-cal-text-muted hover:text-cal-text-primary hover:bg-white/5 transition-colors cursor-pointer"
                    >
                        <ChevronLeft size={18} strokeWidth={2} />
                    </button>
                    <button
                        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                        className="p-1.5 rounded-md text-cal-text-muted hover:text-cal-text-primary hover:bg-white/5 transition-colors cursor-pointer"
                    >
                        <ChevronRight size={18} strokeWidth={2} />
                    </button>
                </div>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-y-2 mb-2">
                {DAY_HEADERS.map((day) => (
                    <div
                        key={day}
                        className="text-center text-[11px] font-semibold text-cal-text-dimmed uppercase tracking-widest py-1"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Date cells */}
            <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                    if (!day) {
                        return <div key={`empty-${index}`} className="w-full aspect-[1.05] md:aspect-square" />;
                    }

                    const available = isAvailable(day);
                    const selected = selectedDate ? isSameDay(day, selectedDate) : false;
                    const todayDate = isToday(day);
                    const past = isBefore(day, today);

                    return (
                        <button
                            key={day.toISOString()}
                            onClick={() => available && onSelectDate(day)}
                            disabled={!available}
                            className={cn(
                                'w-full aspect-[1.05] md:aspect-square flex flex-col items-center justify-center text-[14px] rounded-lg transition-all duration-200 relative font-medium outline-none select-none',
                                selected
                                    ? 'bg-cal-text-primary text-cal-text-inverted shadow-[0_4px_14px_rgba(255,255,255,0.2)] font-semibold'
                                    : available
                                        ? 'bg-transparent text-cal-text-default hover:bg-white/5 cursor-pointer hover:text-cal-text-primary'
                                        : past
                                            ? 'text-cal-text-dimmed/30 cursor-not-allowed'
                                            : 'text-cal-text-dimmed/40 cursor-not-allowed'
                            )}
                        >
                            <span>{format(day, 'd')}</span>
                            {todayDate && !selected && (
                                <span className="absolute bottom-1.5 w-1 h-1 rounded-full bg-cal-text-primary" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
