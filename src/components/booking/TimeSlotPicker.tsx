import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { cn, generateTimeSlots, formatTime } from '../../lib/utils';
import type { TimeRange, Booking } from '../../types';

interface TimeSlotPickerProps {
    selectedDate: Date;
    timeRanges: TimeRange[];
    duration: number;
    existingBookings: Booking[];
    onSelectSlot: (time: string) => void;
    selectedSlot?: string | null;
}

export function TimeSlotPicker({
    selectedDate,
    timeRanges,
    duration,
    existingBookings,
    onSelectSlot,
    selectedSlot,
}: TimeSlotPickerProps) {
    const [use24h, setUse24h] = useState(false);
    const dateStr = format(selectedDate, 'yyyy-MM-dd');

    const slots = useMemo(
        () => generateTimeSlots(dateStr, timeRanges, duration, existingBookings),
        [dateStr, timeRanges, duration, existingBookings]
    );

    const availableSlots = slots.filter((s) => s.available);

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-cal-text-primary">
                    {format(selectedDate, 'EEE d')}
                </h3>
                <div className="flex items-center bg-cal-bg-subtle border border-cal-border rounded-[var(--radius-cal-sm)] overflow-hidden">
                    <button
                        onClick={() => setUse24h(false)}
                        className={cn(
                            'px-2.5 py-1 text-[10px] font-bold transition-all cursor-pointer tracking-wider',
                            !use24h
                                ? 'bg-cal-bg-emphasis text-cal-text-primary'
                                : 'text-cal-text-dimmed hover:text-cal-text-muted'
                        )}
                    >
                        12h
                    </button>
                    <button
                        onClick={() => setUse24h(true)}
                        className={cn(
                            'px-2.5 py-1 text-[10px] font-bold transition-all cursor-pointer tracking-wider',
                            use24h
                                ? 'bg-cal-bg-emphasis text-cal-text-primary'
                                : 'text-cal-text-dimmed hover:text-cal-text-muted'
                        )}
                    >
                        24h
                    </button>
                </div>
            </div>

            {/* Slots */}
            <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
                {availableSlots.length === 0 ? (
                    <div className="flex flex-col items-center py-8 text-center">
                        <p className="text-sm text-cal-text-muted">No available slots</p>
                        <p className="text-xs text-cal-text-dimmed mt-1">Try another date</p>
                    </div>
                ) : (
                    availableSlots.map((slot) => (
                        <button
                            key={slot.time}
                            onClick={() => onSelectSlot(slot.time)}
                            className={cn(
                                'w-full flex items-center gap-3 px-4 py-3 rounded-[var(--radius-cal-lg)] border transition-all duration-200 cursor-pointer group',
                                selectedSlot === slot.time
                                    ? 'bg-cal-bg-emphasis border-cal-border-emphasis text-cal-text-primary shadow-[0_0_0_1px_rgba(255,255,255,0.08)]'
                                    : 'bg-cal-bg-card border-cal-border text-cal-text-default hover:bg-cal-bg-subtle hover:border-cal-border-emphasis hover:shadow-[var(--shadow-cal-sm)]'
                            )}
                        >
                            <span className="w-2 h-2 rounded-full bg-cal-success flex-shrink-0 group-hover:shadow-[0_0_6px_rgba(34,197,94,0.4)]" />
                            <span className="text-sm font-semibold">
                                {formatTime(slot.time, use24h)}
                            </span>
                        </button>
                    ))
                )}
            </div>
        </div>
    );
}
