import { useState, useMemo } from 'react';
import { Shell } from '../components/layout/Shell';
import { PageHeader } from '../components/layout/PageHeader';
import { Tabs } from '../components/ui/Tabs';
import { BookingList } from '../components/bookings/BookingList';
import { useBookingStore } from '../stores/bookingStore';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const tabs = [
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'past', label: 'Past' },
    { id: 'cancelled', label: 'Cancelled' },
];

export function BookingsPage() {
    const { bookings, cancelBooking } = useBookingStore();
    const [activeTab, setActiveTab] = useState('upcoming');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredBookings = useMemo(() => {
        if (activeTab === 'upcoming') {
            return bookings.filter((b) => b.status === 'upcoming' || b.status === 'rescheduled');
        }
        return bookings.filter((b) => b.status === activeTab);
    }, [bookings, activeTab]);

    const totalPages = Math.ceil(filteredBookings.length / rowsPerPage);
    const paginatedBookings = filteredBookings.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handleCancel = (id: string) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            cancelBooking(id);
        }
    };

    return (
        <Shell>
            <PageHeader
                title="Bookings"
                subtitle="See upcoming and past events booked through your event type links."
            />

            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onChange={(tab) => {
                    setActiveTab(tab);
                    setCurrentPage(1);
                }}
                className="mb-6"
            />

            <BookingList bookings={paginatedBookings} onCancel={handleCancel} />

            {/* Pagination */}
            {filteredBookings.length > 0 && (
                <div className="flex items-center justify-between mt-4 text-sm text-cal-text-muted">
                    <div className="flex items-center gap-1">
                        <select
                            value={rowsPerPage}
                            onChange={(e) => {
                                setRowsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="bg-transparent border border-cal-border rounded-[var(--radius-cal-sm)] px-2 py-1 text-sm text-cal-text-default appearance-none cursor-pointer"
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                        <span className="flex items-center text-xs">
                            rows per page
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-xs">
                            {(currentPage - 1) * rowsPerPage + 1}-
                            {Math.min(currentPage * rowsPerPage, filteredBookings.length)} of{' '}
                            {filteredBookings.length}
                        </span>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-1 rounded-[var(--radius-cal-sm)] hover:bg-cal-bg-subtle disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                            >
                                <ChevronLeft size={14} />
                            </button>
                            <button
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages || totalPages === 0}
                                className="p-1 rounded-[var(--radius-cal-sm)] hover:bg-cal-bg-subtle disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                            >
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Shell>
    );
}
