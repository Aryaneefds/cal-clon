import { NavLink } from 'react-router-dom';
import {
    Link as LinkIcon,
    Calendar,
    Clock,
    Users,
    Grid,
    Route,
    Workflow,
    BarChart2,
    ExternalLink,
    Settings,
} from 'lucide-react';
import { defaultUser } from '../../data/seed';
import { getInitials } from '../../lib/utils';
import { cn } from '../../lib/utils';

const MAIN_NAV = [
    { name: 'Event Types', href: '/event-types', icon: LinkIcon },
    { name: 'Bookings', href: '/bookings', icon: Calendar },
    { name: 'Availability', href: '/availability', icon: Clock },
];

const SECONDARY_NAV = [
    { name: 'Teams', href: '/teams', icon: Users, disabled: true },
    { name: 'Apps', href: '/apps', icon: Grid, disabled: true },
    { name: 'Routing', href: '/routing', icon: Route, disabled: true },
    { name: 'Workflows', href: '/workflows', icon: Workflow, disabled: true },
    { name: 'Insights', href: '/insights', icon: BarChart2, disabled: true },
];

export function Sidebar() {
    return (
        <aside className="w-60 bg-cal-bg-base border-r border-cal-border flex flex-col h-screen overflow-y-auto">
            <div className="p-4 flex flex-col h-full">

                {/* User Profile Header */}
                <div className="flex items-center gap-3 px-2 py-2 mb-6 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                    <div className="w-8 h-8 rounded-full bg-cal-bg-emphasis flex items-center justify-center text-xs font-bold text-cal-text-primary ring-1 ring-white/10">
                        {getInitials(defaultUser.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="text-sm font-semibold text-cal-text-primary truncate">{defaultUser.name}</h2>
                    </div>
                </div>

                {/* Main Navigation */}
                <nav className="space-y-0.5 mb-8">
                    {MAIN_NAV.map((item) => (
                        <NavLink
                            key={item.href}
                            to={item.href}
                            className={({ isActive }) =>
                                cn(
                                    'flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-[13.5px] font-medium outline-none',
                                    isActive
                                        ? 'bg-white/10 text-cal-text-primary'
                                        : 'text-cal-text-muted hover:text-cal-text-primary hover:bg-white/5'
                                )
                            }
                        >
                            <item.icon size={16} strokeWidth={2.5} />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                {/* Secondary Navigation */}
                <nav className="space-y-0.5 flex-1">
                    {SECONDARY_NAV.map((item) => (
                        <div
                            key={item.name}
                            className="flex items-center gap-3 px-3 py-2 rounded-md text-[13.5px] font-medium text-cal-text-dimmed cursor-not-allowed opacity-60"
                        >
                            <item.icon size={16} strokeWidth={2.5} />
                            {item.name}
                        </div>
                    ))}
                </nav>

                {/* Footer Links */}
                <div className="pt-4 border-t border-cal-border/50 mt-auto space-y-0.5">
                    <a
                        href={`/${defaultUser.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-[13.5px] font-medium text-cal-text-muted hover:text-cal-text-primary hover:bg-white/5 transition-all"
                    >
                        <ExternalLink size={16} strokeWidth={2.5} />
                        View public page
                    </a>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-[13.5px] font-medium text-cal-text-muted hover:text-cal-text-primary hover:bg-white/5 transition-all cursor-pointer">
                        <LinkIcon size={16} strokeWidth={2.5} />
                        Copy public page link
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-[13.5px] font-medium text-cal-text-muted hover:text-cal-text-primary hover:bg-white/5 transition-all cursor-pointer">
                        <Settings size={16} strokeWidth={2.5} />
                        Settings
                    </button>
                </div>
            </div>
        </aside>
    );
}
