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
        <div className="w-full flex md:pl-8 md:border-l border-cal-border flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 px-1">
                <h3 className="text-base font-semibold text-cal-text-primary tracking-tight">
                    {format(selectedDate, 'EEEE, MMM dd')}
                </h3>
                <div className="flex items-center bg-cal-bg-subtle/50 rounded-md p-0.5 shadow-sm border border-cal-border">
                    <button
                        onClick={() => setUse24h(false)}
                        className={cn(
                            'px-2 py-1 text-[11px] font-semibold transition-all cursor-pointer rounded-[4px]',
                            !use24h
                                ? 'bg-cal-bg-emphasis text-cal-text-primary shadow-sm'
                                : 'text-cal-text-muted hover:text-cal-text-primary'
                        )}
                    >
                        12h
                    </button>
                    <button
                        onClick={() => setUse24h(true)}
                        className={cn(
                            'px-2 py-1 text-[11px] font-semibold transition-all cursor-pointer rounded-[4px]',
                            use24h
                                ? 'bg-cal-bg-emphasis text-cal-text-primary shadow-sm'
                                : 'text-cal-text-muted hover:text-cal-text-primary'
                        )}
                    >
                        24h
                    </button>
                </div>
            </div>

            {/* Slots */}
            <div className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
                {availableSlots.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                        <p className="text-sm font-medium text-cal-text-muted">No slots available</p>
                    </div>
                ) : (
                    availableSlots.map((slot) => (
                        <button
                            key={slot.time}
                            onClick={() => onSelectSlot(slot.time)}
                            className={cn(
                                'w-full flex items-center justify-center gap-2.5 py-3 rounded-lg border transition-all duration-200 cursor-pointer text-sm font-semibold tracking-tight',
                                selectedSlot === slot.time
                                    ? 'bg-cal-text-primary border-cal-text-primary text-cal-text-inverted shadow-[0_4px_14px_rgba(255,255,255,0.1)]'
                                    : 'bg-transparent border-white/10 text-cal-text-primary hover:bg-white/5 hover:border-white/20'
                            )}
                        >
                            <span
                                className={cn(
                                    "w-2 h-2 rounded-full flex-shrink-0 transition-colors",
                                    selectedSlot === slot.time ? "bg-cal-bg-base" : "bg-cal-success"
                                )}
                            />
                            <span>
                                {formatTime(slot.time, use24h)}
                            </span>
                        </button>
                    ))
                )}
            </div>
        </div>
    );
}
