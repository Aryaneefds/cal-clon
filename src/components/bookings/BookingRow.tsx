import { format, parse } from 'date-fns';
import { Video, MoreHorizontal } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { formatTime } from '../../lib/utils';
import { defaultUser } from '../../data/seed';
import type { Booking } from '../../types';
import { useState, useRef, useEffect } from 'react';

interface BookingRowProps {
    booking: Booking;
    onCancel: (id: string) => void;
}

export function BookingRow({ booking, onCancel }: BookingRowProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const dateObj = parse(booking.date, 'yyyy-MM-dd', new Date());

    return (
        <div className="flex items-center gap-4 px-5 py-4 border-b border-cal-border/60 last:border-b-0 hover:bg-cal-bg-subtle/40 transition-all duration-150 group">
            {/* Left — date & time */}
            <div className="w-[190px] flex-shrink-0">
                <p className="text-sm font-semibold text-cal-text-primary">
                    {format(dateObj, 'EEE, d MMM')}
                </p>
                <p className="text-xs text-cal-text-muted mt-1">
                    {formatTime(booking.startTime, false)} - {formatTime(booking.endTime, false)}
                </p>
                <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-xs text-cal-info hover:text-cyan-400 transition-colors mt-2 font-medium cursor-pointer"
                >
                    <Video size={13} />
                    Join Cal Video
                </a>
            </div>

            {/* Center — event info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm text-cal-text-primary font-medium truncate">
                        {booking.eventTitle} between {defaultUser.name} and {booking.bookerName}
                    </p>
                    {booking.status === 'rescheduled' && (
                        <Badge variant="warning">Rescheduled</Badge>
                    )}
                    {booking.status === 'cancelled' && (
                        <Badge variant="warning" className="bg-red-950/60 text-red-400 border-red-800/40">
                            Cancelled
                        </Badge>
                    )}
                </div>
                <p className="text-xs text-cal-text-muted mt-1">
                    You and {booking.bookerName}
                </p>
            </div>

            {/* Right — actions */}
            <div className="relative" ref={menuRef}>
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-2 rounded-[var(--radius-cal-md)] text-cal-text-dimmed hover:text-cal-text-primary hover:bg-cal-bg-emphasis opacity-0 group-hover:opacity-100 transition-all duration-150 cursor-pointer"
                >
                    <MoreHorizontal size={16} />
                </button>
                {menuOpen && (
                    <div className="absolute right-0 top-full mt-1 z-20 w-40 cal-card p-1.5 shadow-[var(--shadow-cal)]">
                        <button
                            onClick={() => {
                                onCancel(booking.id);
                                setMenuOpen(false);
                            }}
                            className="w-full px-3 py-2 text-sm text-cal-error hover:bg-cal-bg-subtle rounded-[var(--radius-cal-sm)] text-left transition-colors cursor-pointer font-medium"
                        >
                            Cancel booking
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
