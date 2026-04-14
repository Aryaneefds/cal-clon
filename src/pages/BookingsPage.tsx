import { useState } from 'react';
import { Search } from 'lucide-react';
import { useBookingStore } from '../stores/bookingStore';
import { BookingRow } from '../components/bookings/BookingRow';
import { Tabs } from '../components/ui/Tabs';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

const TABS = [
    { id: 'upcoming', label: 'Upcoming', filter: (b: any) => b.status === 'upcoming' },
    { id: 'past', label: 'Past', filter: (b: any) => b.status === 'past' },
    { id: 'cancelled', label: 'Cancelled', filter: (b: any) => b.status === 'cancelled' },
];

export function BookingsPage() {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [search, setSearch] = useState('');
    const { bookings } = useBookingStore();

    const activeFilter = TABS.find((t) => t.id === activeTab)?.filter;
    let filteredBookings = bookings.filter(activeFilter || Boolean);

    if (search) {
        const s = search.toLowerCase();
        filteredBookings = filteredBookings.filter(
            (b) =>
                b.bookerName.toLowerCase().includes(s) ||
                b.bookerEmail.toLowerCase().includes(s) ||
                b.eventTitle.toLowerCase().includes(s)
        );
    }

    // Calculate counts
    const counts = TABS.reduce((acc, tab) => {
        acc[tab.id] = bookings.filter(tab.filter).length;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-cal-text-primary tracking-tight mb-2">Bookings</h1>
                <p className="text-sm text-cal-text-muted">
                    See upcoming and past events booked through your event type links.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="w-full sm:w-auto relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cal-text-dimmed w-4 h-4" />
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search bookings..."
                        className="pl-9 !w-full sm:!w-[280px]"
                    />
                </div>

                <Tabs tabs={TABS} counts={counts} activeTab={activeTab} onChange={setActiveTab} />
            </div>

            {filteredBookings.length === 0 ? (
                <Card className="text-center py-20 bg-cal-bg-card rounded-xl border border-cal-border/50 border-dashed">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="text-cal-text-muted w-6 h-6" />
                    </div>
                    <h3 className="text-cal-text-primary font-medium mb-1">No bookings found</h3>
                    <p className="text-sm text-cal-text-muted">
                        {search ? 'Try adjusting your search query.' : 'Share your links to get your first booking.'}
                    </p>
                </Card>
            ) : (
                <Card className="!p-0 overflow-hidden divide-y divide-cal-border/60">
                    {filteredBookings.map((booking) => (
                        <BookingRow key={booking.id} {...booking} />
                    ))}
                </Card>
            )}
        </div>
    );
}
