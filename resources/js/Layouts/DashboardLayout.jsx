import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';

export default function DashboardLayout({ header, children }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isAdmin = auth.user?.role === 'admin';
    const isStaff = auth.user?.role === 'staff';
    const trialDaysRemaining = auth.user?.trial_days_remaining || 0;
    const isOnTrial = auth.user?.subscription_status === 'trial';

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [usePage().url]);

    const navItems = [
        { name: 'Dashboard', href: 'dashboard', icon: '📊', roles: ['admin', 'staff', 'client'] },
        { name: 'Clients', href: 'clients.index', icon: '👥', roles: ['admin', 'staff'] },
        { name: 'Pets', href: 'pets.index', icon: '🐾', roles: ['admin', 'staff', 'client'] },
        { name: 'Appointments', href: 'appointments.index', icon: '📅', roles: ['admin', 'staff', 'client'] },
        { name: 'Services', href: 'services.index', icon: '✂️', roles: ['admin', 'staff'] },
        { name: 'Staff', href: 'staff.index', icon: '👔', roles: ['admin'] },
        { name: 'Medical Records', href: 'medical-records.index', icon: '📋', roles: ['admin', 'staff'] },
        { name: 'Vaccinations', href: 'vaccinations.index', icon: '💉', roles: ['admin', 'staff'] },
        { name: 'Invoices', href: 'invoices.index', icon: '💰', roles: ['admin', 'staff', 'client'] },
        { name: 'Admin Settings', href: 'admin.settings', icon: '⚙️', roles: ['admin'], divider: true },
        { name: 'Users Management', href: 'admin.users', icon: '👨‍💼', roles: ['admin'] },
    ];

    const filteredNavItems = navItems.filter(item =>
        item.roles.includes(auth.user?.role)
    );

    const isActive = (routeName) => {
        return route().current(routeName) || route().current(`${routeName}.*`);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Top Header - Always visible on all screens */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between h-16 px-4">
                    {/* Left side - Menu button and logo */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>

                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        <div className="flex items-center lg:hidden">
                            <ApplicationLogo className="h-8 w-auto" />
                            <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white">PetCare Pro</span>
                        </div>
                    </div>

                    {/* Right side - Trial badge and user profile */}
                    <div className="flex items-center space-x-4">
                        {/* Trial Badge */}
                        {isOnTrial && trialDaysRemaining > 0 && (
                            <div className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                                <svg className="w-4 h-4 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                                    {trialDaysRemaining} {trialDaysRemaining === 1 ? 'day' : 'days'} left
                                </span>
                            </div>
                        )}

                        {/* User Profile Dropdown - Always visible */}
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                                        {auth.user?.name?.[0]?.toUpperCase()}
                                    </div>
                                    <div className="hidden md:block text-left">
                                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                            {auth.user?.name}
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                            {auth.user?.role}
                                        </div>
                                    </div>
                                    <svg className="hidden md:block w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content align="right">
                                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {auth.user?.name}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {auth.user?.email}
                                    </div>
                                </div>
                                <Dropdown.Link href={route('profile.edit')}>
                                    <div className="flex items-center">
                                        <span className="mr-2">👤</span> Profile Settings
                                    </div>
                                </Dropdown.Link>
                                <div className="border-t border-gray-100 dark:border-gray-700"></div>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    <div className="flex items-center text-red-600 dark:text-red-400">
                                        <span className="mr-2">🚪</span> Log Out
                                    </div>
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <aside className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-200 ${
                sidebarOpen ? 'w-64' : 'w-20'
            } ${
                mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}>
                <div className="flex flex-col h-full">
                    {/* Logo Section - Desktop only */}
                    <div className="hidden lg:flex items-center justify-center p-4 border-b border-gray-200 dark:border-gray-700">
                        {sidebarOpen ? (
                            <div className="flex items-center">
                                <ApplicationLogo className="h-10 w-auto" />
                                <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    PetCare Pro
                                </span>
                            </div>
                        ) : (
                            <ApplicationLogo className="h-8 w-auto" />
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                        {filteredNavItems.map((item) => (
                            <div key={item.name}>
                                {item.divider && <div className="my-3 border-t border-gray-200 dark:border-gray-700"></div>}
                                <Link
                                    href={route(item.href)}
                                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                                        isActive(item.href)
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                    title={!sidebarOpen ? item.name : ''}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    {sidebarOpen && (
                                        <span className="ml-3 font-medium">{item.name}</span>
                                    )}
                                </Link>
                            </div>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 top-16"
                    onClick={() => setMobileMenuOpen(false)}
                ></div>
            )}

            {/* Main Content */}
            <main className={`transition-all duration-200 pt-16 ${
                sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
            }`}>
                {header && (
                    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                        <div className="mx-auto px-4 py-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                <div className="p-4 sm:p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
