import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
    Link2,
    Calendar,
    Clock,
    Users,
    LayoutGrid,
    GitBranch,
    Workflow,
    BarChart3,
    ExternalLink,
    Copy,
    Settings,
    Search,
    ChevronDown,
} from 'lucide-react';
import { cn, getInitials } from '../../lib/utils';
import { defaultUser } from '../../data/seed';

const navItems = [
    { to: '/event-types', label: 'Event Types', icon: Link2 },
    { to: '/bookings', label: 'Bookings', icon: Calendar },
    { to: '/availability', label: 'Availability', icon: Clock },
    { to: '/teams', label: 'Teams', icon: Users, disabled: true },
    { to: '/apps', label: 'Apps', icon: LayoutGrid, disabled: true },
    { to: '/routing', label: 'Routing', icon: GitBranch, disabled: true },
    { to: '/workflows', label: 'Workflows', icon: Workflow, disabled: true },
    { to: '/insights', label: 'Insights', icon: BarChart3, disabled: true },
];

export function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/${defaultUser.username}`);
    };

    return (
        <aside className="w-[220px] min-h-screen bg-cal-bg-card border-r border-cal-border flex flex-col">
            {/* User section */}
            <div className="p-4 border-b border-cal-border">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-cal-bg-emphasis flex items-center justify-center text-xs font-semibold text-cal-text-primary ring-2 ring-cal-border-emphasis flex-shrink-0">
                        {getInitials(defaultUser.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                            <span className="text-[13px] font-semibold text-cal-text-primary truncate">
                                {defaultUser.name}
                            </span>
                            <ChevronDown size={12} className="text-cal-text-dimmed flex-shrink-0" />
                        </div>
                    </div>
                    <button className="p-1.5 rounded-[var(--radius-cal-sm)] text-cal-text-dimmed hover:text-cal-text-primary hover:bg-cal-bg-subtle transition-colors cursor-pointer">
                        <Search size={15} />
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-3 space-y-0.5">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname.startsWith(item.to);
                    return (
                        <NavLink
                            key={item.to}
                            to={item.disabled ? '#' : item.to}
                            onClick={(e) => item.disabled && e.preventDefault()}
                            className={cn(
                                'flex items-center gap-3 px-3 py-2 rounded-[var(--radius-cal-md)] text-[13px] font-medium transition-all duration-150',
                                isActive
                                    ? 'bg-cal-sidebar-active text-white shadow-[0_1px_3px_rgba(37,99,235,0.4)]'
                                    : item.disabled
                                        ? 'text-cal-text-dimmed cursor-not-allowed'
                                        : 'text-cal-text-muted hover:text-cal-text-primary hover:bg-cal-bg-subtle'
                            )}
                        >
                            <Icon size={16} className="flex-shrink-0" strokeWidth={1.8} />
                            <span>{item.label}</span>
                        </NavLink>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="px-3 pb-3 pt-2 border-t border-cal-border space-y-0.5">
                {[
                    { icon: ExternalLink, label: 'View public page', onClick: () => navigate(`/${defaultUser.username}`) },
                    { icon: Copy, label: 'Copy public page link', onClick: handleCopyLink },
                    { icon: Settings, label: 'Settings', onClick: () => { } },
                ].map(({ icon: Icon, label, onClick }) => (
                    <button
                        key={label}
                        onClick={onClick}
                        className="flex items-center gap-3 px-3 py-2 w-full rounded-[var(--radius-cal-md)] text-[13px] text-cal-text-dimmed hover:text-cal-text-muted hover:bg-cal-bg-subtle transition-colors cursor-pointer"
                    >
                        <Icon size={15} strokeWidth={1.8} />
                        <span>{label}</span>
                    </button>
                ))}
            </div>
        </aside>
    );
}
