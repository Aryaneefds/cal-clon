import { Plus } from 'lucide-react';
import { useAvailabilityStore } from '../stores/availabilityStore';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

export function AvailabilityPage() {
    const { availability, updateSchedule, updateTimezone } = useAvailabilityStore();

    const handleToggleDay = (dayIndex: number) => {
        const existing = availability.schedule.find((s) => s.day === dayIndex);
        if (existing) {
            updateSchedule(
                availability.schedule.map((s) =>
                    s.day === dayIndex ? { ...s, enabled: !s.enabled } : s
                )
            );
        } else {
            updateSchedule([
                ...availability.schedule,
                { day: dayIndex, enabled: true, timeRanges: [{ start: '09:00', end: '17:00' }] },
            ]);
        }
    };

    const handleTimeChange = (dayIndex: number, rangeIndex: number, field: 'start' | 'end', value: string) => {
        updateSchedule(
            availability.schedule.map((s) => {
                if (s.day === dayIndex) {
                    const newRanges = [...s.timeRanges];
                    newRanges[rangeIndex] = { ...newRanges[rangeIndex], [field]: value };
                    return { ...s, timeRanges: newRanges };
                }
                return s;
            })
        );
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-cal-text-primary tracking-tight mb-2">Availability</h1>
                <p className="text-sm text-cal-text-muted">
                    Configure times when you are available for bookings.
                </p>
            </div>

            <Card className="!p-0 overflow-hidden mb-6">
                <div className="p-6 md:p-8 border-b border-cal-border">
                    <h2 className="text-lg font-semibold text-cal-text-primary mb-1">Working Hours</h2>
                    <p className="text-sm text-cal-text-muted mb-6">Set your weekly recurring schedule</p>

                    <div className="max-w-xs">
                        <h3 className="text-xs font-semibold text-cal-text-dimmed uppercase tracking-widest mb-2">Timezone</h3>
                        <Input
                            value={availability.timezone}
                            onChange={(e) => updateTimezone(e.target.value)}
                            placeholder="Europe/London"
                        />
                    </div>
                </div>

                <div className="dev">
                    {DAYS.map((dayName, index) => {
                        const schedule = availability.schedule.find((s) => s.day === index);
                        const isEnabled = schedule?.enabled ?? false;

                        return (
                            <div
                                key={dayName}
                                className="flex items-start md:items-center py-5 px-6 md:px-8 border-b last:border-0 border-cal-border/50"
                            >
                                {/* Toggle & Day */}
                                <div className="w-40 flex items-center gap-4 flex-shrink-0">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={isEnabled}
                                            onChange={() => handleToggleDay(index)}
                                        />
                                        <div className="w-9 h-5 bg-cal-bg-emphasis peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cal-text-primary"></div>
                                    </label>
                                    <span
                                        className={`text-[15px] font-medium ${isEnabled ? 'text-cal-text-primary' : 'text-cal-text-dimmed'
                                            }`}
                                    >
                                        {dayName}
                                    </span>
                                </div>

                                {/* Time Ranges */}
                                <div className="flex-1 flex flex-col gap-3">
                                    {!isEnabled ? (
                                        <span className="text-[14.5px] italic text-cal-text-dimmed py-2">
                                            Unavailable
                                        </span>
                                    ) : (
                                        <>
                                            {schedule?.timeRanges.map((range, rIndex) => (
                                                <div key={rIndex} className="flex items-center gap-3">
                                                    <Input
                                                        type="time"
                                                        value={range.start}
                                                        onChange={(e) => handleTimeChange(index, rIndex, 'start', e.target.value)}
                                                        className="w-32 !h-9 text-center tracking-wide font-medium"
                                                    />
                                                    <span className="text-cal-text-dimmed font-medium">—</span>
                                                    <Input
                                                        type="time"
                                                        value={range.end}
                                                        onChange={(e) => handleTimeChange(index, rIndex, 'end', e.target.value)}
                                                        className="w-32 !h-9 text-center tracking-wide font-medium"
                                                    />
                                                </div>
                                            ))}
                                            <div className="flex items-center">
                                                <button className="text-[13px] font-medium text-cal-text-muted hover:text-cal-text-primary flex items-center gap-1.5 transition-colors cursor-pointer pt-1">
                                                    <Plus size={14} />
                                                    Add time range
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="p-4 md:p-6 bg-cal-bg-subtle/30 border-t border-cal-border flex justify-end">
                    <Button variant="primary">
                        Save changes
                    </Button>
                </div>
            </Card>
        </div>
    );
}
