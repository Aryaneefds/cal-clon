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
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm text-cal-text-primary">
                    <span className="font-bold">{format(currentMonth, 'MMMM')}</span>{' '}
                    <span className="text-cal-text-muted">{format(currentMonth, 'yyyy')}</span>
                </h2>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                        className="p-1.5 rounded-[var(--radius-cal-md)] text-cal-text-muted hover:text-cal-text-primary hover:bg-cal-bg-subtle transition-colors cursor-pointer"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                        className="p-1.5 rounded-[var(--radius-cal-md)] text-cal-text-muted hover:text-cal-text-primary hover:bg-cal-bg-subtle transition-colors cursor-pointer"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {DAY_HEADERS.map((day) => (
                    <div
                        key={day}
                        className="text-center text-[10px] font-bold text-amber-600 py-1 tracking-wider"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Date cells */}
            <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                    if (!day) {
                        return <div key={`empty-${index}`} className="w-full aspect-square" />;
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
                                'w-full aspect-square flex flex-col items-center justify-center text-[13px] rounded-[var(--radius-cal-md)] transition-all duration-200 relative font-medium',
                                selected
                                    ? 'bg-cal-bg-inverted text-cal-text-inverted font-bold shadow-[0_2px_8px_rgba(255,255,255,0.15)]'
                                    : available
                                        ? 'bg-cal-bg-emphasis text-cal-text-primary hover:bg-cal-bg-emphasis/70 hover:scale-105 cursor-pointer'
                                        : past
                                            ? 'text-cal-text-dimmed/50 cursor-not-allowed'
                                            : 'text-cal-text-dimmed cursor-not-allowed'
                            )}
                        >
                            <span>{format(day, 'd')}</span>
                            {todayDate && !selected && (
                                <span className="absolute bottom-1.5 w-1 h-1 rounded-full bg-cal-info" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
