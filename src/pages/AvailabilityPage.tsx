import { Plus, Trash2 } from 'lucide-react';
import { Shell } from '../components/layout/Shell';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Switch } from '../components/ui/Switch';
import { Button } from '../components/ui/Button';
import { useAvailabilityStore } from '../stores/availabilityStore';

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dayAbbr = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function generateTimeOptions(): { value: string; label: string }[] {
    const options: { value: string; label: string }[] = [];
    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 15) {
            const val = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
            const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
            const ampm = h < 12 ? 'am' : 'pm';
            const label = `${hour12}:${String(m).padStart(2, '0')} ${ampm}`;
            options.push({ value: val, label });
        }
    }
    return options;
}

const timeOptions = generateTimeOptions();

export function AvailabilityPage() {
    const {
        availability,
        updateAvailability,
        toggleDay,
        addTimeRange,
        removeTimeRange,
        updateTimeRange,
    } = useAvailabilityStore();

    const timezones = (() => {
        try {
            return Intl.supportedValuesOf('timeZone');
        } catch {
            return [availability.timezone];
        }
    })();

    return (
        <Shell>
            <PageHeader
                title="Availability"
                subtitle="Configure times when you are available for bookings."
            />

            <Card>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-base font-semibold text-cal-text-primary">{availability.name}</h2>
                        <p className="text-sm text-cal-text-muted mt-0.5">Set your weekly recurring schedule</p>
                    </div>
                </div>

                {/* Timezone selector */}
                <div className="mb-8">
                    <label className="text-xs font-semibold text-cal-text-muted uppercase tracking-wider block mb-2">
                        Timezone
                    </label>
                    <select
                        value={availability.timezone}
                        onChange={(e) => updateAvailability({ timezone: e.target.value })}
                        className="cal-input max-w-sm appearance-none"
                    >
                        {timezones.map((tz) => (
                            <option key={tz} value={tz}>{tz.replace(/_/g, ' ')}</option>
                        ))}
                    </select>
                </div>

                {/* Day schedules */}
                <div className="space-y-1">
                    {availability.schedule.map((daySchedule) => (
                        <div
                            key={daySchedule.day}
                            className="flex items-start gap-4 py-4 border-b border-cal-border/60 last:border-b-0"
                        >
                            {/* Day toggle */}
                            <div className="w-36 flex items-center gap-3 pt-1 flex-shrink-0">
                                <Switch
                                    checked={daySchedule.enabled}
                                    onChange={() => toggleDay(daySchedule.day)}
                                />
                                <span className={`text-sm font-medium ${daySchedule.enabled ? 'text-cal-text-primary' : 'text-cal-text-dimmed'
                                    }`}>
                                    {dayNames[daySchedule.day]}
                                </span>
                            </div>

                            {/* Time ranges */}
                            <div className="flex-1">
                                {!daySchedule.enabled ? (
                                    <p className="text-sm text-cal-text-dimmed pt-1 italic">Unavailable</p>
                                ) : (
                                    <div className="space-y-2.5">
                                        {daySchedule.timeRanges.map((range, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <select
                                                    value={range.start}
                                                    onChange={(e) =>
                                                        updateTimeRange(daySchedule.day, index, 'start', e.target.value)
                                                    }
                                                    className="cal-input text-sm appearance-none w-[130px]"
                                                >
                                                    {timeOptions.map((opt) => (
                                                        <option key={opt.value} value={opt.value}>
                                                            {opt.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <span className="text-cal-text-dimmed text-sm font-medium">—</span>
                                                <select
                                                    value={range.end}
                                                    onChange={(e) =>
                                                        updateTimeRange(daySchedule.day, index, 'end', e.target.value)
                                                    }
                                                    className="cal-input text-sm appearance-none w-[130px]"
                                                >
                                                    {timeOptions.map((opt) => (
                                                        <option key={opt.value} value={opt.value}>
                                                            {opt.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                {daySchedule.timeRanges.length > 1 && (
                                                    <button
                                                        onClick={() => removeTimeRange(daySchedule.day, index)}
                                                        className="p-1.5 rounded-[var(--radius-cal-sm)] text-cal-text-dimmed hover:text-cal-error hover:bg-cal-bg-subtle transition-colors cursor-pointer"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => addTimeRange(daySchedule.day)}
                                            className="flex items-center gap-1.5 text-xs font-medium text-cal-text-muted hover:text-cal-info transition-colors cursor-pointer mt-1"
                                        >
                                            <Plus size={13} />
                                            <span>Add time range</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Save button inside card */}
                <div className="flex justify-end pt-6 mt-4 border-t border-cal-border">
                    <Button onClick={() => alert('Schedule saved!')}>
                        Save changes
                    </Button>
                </div>
            </Card>
        </Shell>
    );
}
