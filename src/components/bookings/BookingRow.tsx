import { cn } from '../../lib/utils';
import { format, parseISO } from 'date-fns';
import { Clock, Video, MoreHorizontal, User, Mail, Ban, Calendar } from 'lucide-react';
import type { Booking } from '../../types';
import { Badge } from '../ui/Badge';
import { getInitials } from '../../lib/utils';
import { defaultUser } from '../../data/seed';

export function BookingRow({
    eventTitle,
    date,
    startTime,
    endTime,
    bookerName,
    bookerEmail,
    duration,
    status,
}: Booking) {
    const d = parseISO(date);

    return (
        <div className="p-6 hover:bg-white/[0.02] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-colors group">
            {/* Date/Time Left Column */}
            <div className="flex items-start gap-5 min-w-[200px]">
                {/* Date block */}
                <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex-shrink-0">
                    <span className="text-[10px] uppercase font-bold text-cal-text-muted tracking-wide">{format(d, 'MMM')}</span>
                    <span className="text-lg font-bold text-cal-text-primary leading-tight">{format(d, 'd')}</span>
                </div>

                {/* Title & Time */}
                <div className="flex flex-col gap-1.5">
                    <h4 className="text-[15px] font-semibold text-cal-text-primary tracking-tight">{eventTitle}</h4>
                    <div className="flex items-center gap-1.5 text-[13px] text-cal-text-dimmed font-medium">
                        <span>{startTime} - {endTime}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20 mx-0.5" />
                        <span className="flex items-center gap-1"><Clock size={12} strokeWidth={2.5} /> {duration}m</span>
                    </div>
                </div>
            </div>

            {/* User Center Column */}
            <div className="flex-1 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cal-bg-emphasis flex items-center justify-center text-xs font-bold text-cal-text-primary ring-1 ring-white/10 hidden sm:flex">
                    {getInitials(bookerName)}
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-cal-text-primary">{bookerName}</span>
                    <span className="text-[13px] text-cal-text-muted">{bookerEmail}</span>
                </div>
            </div>

            {/* Actions / Status Right Column */}
            <div className="flex items-center gap-4 w-full md:w-auto mt-2 md:mt-0 pt-4 md:pt-0 border-t border-white/5 md:border-0 justify-between md:justify-end">
                <div className="flex items-center gap-2">
                    {status === 'upcoming' && <Badge variant="success">Upcoming</Badge>}
                    {status === 'past' && <Badge variant="neutral">Past</Badge>}
                    {status === 'cancelled' && <Badge variant="error" icon={<Ban size={12} />}>Cancelled</Badge>}
                </div>

                <div className="flex items-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                    {status === 'upcoming' && (
                        <button className="h-8 px-3 rounded-md bg-white hover:bg-zinc-200 text-black text-xs font-semibold transition-colors shadow-sm cursor-pointer">
                            Reschedule
                        </button>
                    )}
                    <button className="w-8 h-8 flex items-center justify-center rounded-md text-cal-text-muted hover:text-cal-text-primary hover:bg-white/10 transition-colors cursor-pointer">
                        <MoreHorizontal size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
