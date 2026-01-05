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
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md">
                <div className="flex items-center justify-between p-4">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                    <div className="flex items-center">
                        <ApplicationLogo className="h-8 w-auto" />
                        <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">PetCare Pro</span>
                    </div>
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                                    {auth.user?.name?.[0]?.toUpperCase()}
                                </div>
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                            <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 z-40 h-screen bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 ease-in-out ${
                sidebarOpen ? 'w-64' : 'w-20'
            } ${
                mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}>
                <div className="flex flex-col h-full">
                    {/* Logo Section */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                        {sidebarOpen && (
                            <div className="flex items-center animate-fade-in">
                                <ApplicationLogo className="h-10 w-auto" />
                                <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    PetCare Pro
                                </span>
                            </div>
                        )}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <svg className={`w-5 h-5 text-gray-600 dark:text-gray-300 transition-transform duration-300 ${sidebarOpen ? '' : 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                            </svg>
                        </button>
                    </div>

                    {/* Trial Badge */}
                    {isOnTrial && trialDaysRemaining > 0 && (
                        <div className={`m-4 p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white ${!sidebarOpen && 'hidden'} animate-fade-in`}>
                            <div className="flex items-center space-x-2 mb-1">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="font-bold text-sm">Trial Period</span>
                            </div>
                            <div className="text-xs opacity-90">
                                {trialDaysRemaining} {trialDaysRemaining === 1 ? 'day' : 'days'} remaining
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                        {filteredNavItems.map((item, index) => (
                            <div key={item.name}>
                                {item.divider && <div className="my-4 border-t border-gray-200 dark:border-gray-700"></div>}
                                <Link
                                    href={route(item.href)}
                                    className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                                        isActive(item.href)
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    <span className="text-2xl">{item.icon}</span>
                                    {sidebarOpen && (
                                        <span className="ml-3 font-medium animate-fade-in">{item.name}</span>
                                    )}
                                    {isActive(item.href) && (
                                        <div className="ml-auto">
                                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                        </div>
                                    )}
                                </Link>
                            </div>
                        ))}
                    </nav>

                    {/* User Profile Section */}
                    <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                        {sidebarOpen ? (
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="w-full flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                            {auth.user?.name?.[0]?.toUpperCase()}
                                        </div>
                                        <div className="ml-3 flex-1 text-left">
                                            <div className="font-semibold text-gray-900 dark:text-white text-sm">
                                                {auth.user?.name}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                                {auth.user?.role}
                                            </div>
                                        </div>
                                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>
                                        <div className="flex items-center">
                                            <span className="mr-2">👤</span> Profile Settings
                                        </div>
                                    </Dropdown.Link>
                                    <div className="border-t border-gray-100 dark:border-gray-700"></div>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        <div className="flex items-center text-red-600">
                                            <span className="mr-2">🚪</span> Log Out
                                        </div>
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg mx-auto">
                                {auth.user?.name?.[0]?.toUpperCase()}
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setMobileMenuOpen(false)}
                ></div>
            )}

            {/* Main Content */}
            <main className={`transition-all duration-300 pt-16 lg:pt-0 ${
                sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
            }`}>
                {header && (
                    <header className="bg-white dark:bg-gray-800 shadow-sm">
                        <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                <div className="p-4 sm:p-6 lg:p-8">
                    {children}
                </div>
            </main>

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}
