import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Users({ users }) {
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const getStatusBadge = (user) => {
        if (user.subscription_status === 'active') {
            return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Active</span>;
        } else if (user.subscription_status === 'trial') {
            return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Trial</span>;
        } else if (user.subscription_status === 'expired') {
            return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Expired</span>;
        } else {
            return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400">Cancelled</span>;
        }
    };

    const getRoleBadge = (role) => {
        const colors = {
            admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
            staff: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
            client: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        };
        return <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${colors[role]}`}>{role}</span>;
    };

    const filteredUsers = users.data?.filter(user => {
        const matchesFilter = filter === 'all' || user.role === filter || user.subscription_status === filter;
        const matchesSearch = search === '' ||
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const totalRevenue = users.data?.reduce((sum, user) => {
        const revenue = user.client?.total_spent || user.staff?.total_revenue || 0;
        return sum + Number(revenue);
    }, 0) || 0;

    const totalUsers = users.data?.length || 0;
    const revenuePerUser = totalUsers > 0 ? totalRevenue / totalUsers : 0;

    const activeTrials = users.data?.filter(u => u.subscription_status === 'trial').length || 0;
    const activeSubscriptions = users.data?.filter(u => u.subscription_status === 'active').length || 0;

    return (
        <DashboardLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Users Management
                    </h2>
                </div>
            }
        >
            <Head title="Users Management" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Summary Stats */}
                    <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
                        <div className="overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg rounded-lg p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium opacity-90">
                                        Total Users
                                    </div>
                                    <div className="mt-2 text-3xl font-bold">
                                        {totalUsers}
                                    </div>
                                </div>
                                <div className="text-5xl opacity-20">
                                    👥
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden bg-gradient-to-br from-green-500 to-green-600 shadow-lg rounded-lg p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium opacity-90">
                                        Total Revenue
                                    </div>
                                    <div className="mt-2 text-3xl font-bold">
                                        ${totalRevenue.toFixed(2)}
                                    </div>
                                </div>
                                <div className="text-5xl opacity-20">
                                    💰
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg rounded-lg p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium opacity-90">
                                        Revenue Per User
                                    </div>
                                    <div className="mt-2 text-3xl font-bold">
                                        ${revenuePerUser.toFixed(2)}
                                    </div>
                                </div>
                                <div className="text-5xl opacity-20">
                                    📊
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg rounded-lg p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium opacity-90">
                                        Active Trials
                                    </div>
                                    <div className="mt-2 text-3xl font-bold">
                                        {activeTrials}
                                    </div>
                                    <div className="text-xs opacity-75 mt-1">
                                        {activeSubscriptions} paying
                                    </div>
                                </div>
                                <div className="text-5xl opacity-20">
                                    ⏰
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filters and Search */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex items-center space-x-2 overflow-x-auto">
                                {[
                                    { label: 'All Users', value: 'all' },
                                    { label: 'Admins', value: 'admin' },
                                    { label: 'Staff', value: 'staff' },
                                    { label: 'Clients', value: 'client' },
                                    { label: 'On Trial', value: 'trial' },
                                    { label: 'Active', value: 'active' },
                                ].map((f) => (
                                    <button
                                        key={f.value}
                                        onClick={() => setFilter(f.value)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                                            filter === f.value
                                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                    >
                                        {f.label}
                                    </button>
                                ))}
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full md:w-64 px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                />
                                <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Users Table */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-900">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                            User
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                            Trial Ends
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                            Metrics
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                            Joined
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {filteredUsers?.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                                        {user.name?.[0]?.toUpperCase()}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {user.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getRoleBadge(user.role)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(user)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {user.trial_ends_at ? (
                                                    <div>
                                                        <div>{formatDate(user.trial_ends_at)}</div>
                                                        {user.subscription_status === 'trial' && (
                                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                {user.trial_days_remaining || 0} days left
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400">N/A</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm">
                                                    {user.client && (
                                                        <div className="space-y-1">
                                                            <div className="text-gray-900 dark:text-white">
                                                                🐾 {user.client.pets_count || 0} pets
                                                            </div>
                                                            <div className="text-gray-600 dark:text-gray-400">
                                                                💰 ${Number(user.client.total_spent || 0).toFixed(2)} spent
                                                            </div>
                                                        </div>
                                                    )}
                                                    {user.staff && (
                                                        <div className="text-gray-900 dark:text-white">
                                                            💼 Staff member
                                                        </div>
                                                    )}
                                                    {user.role === 'admin' && (
                                                        <div className="text-purple-600 dark:text-purple-400 font-semibold">
                                                            ⚙️ Administrator
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {formatDate(user.created_at)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {filteredUsers?.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    No users found
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Try adjusting your filters or search query
                                </p>
                            </div>
                        )}

                        {/* Pagination */}
                        {users.links && users.links.length > 3 && (
                            <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-700 dark:text-gray-300">
                                        Showing <span className="font-semibold">{users.from}</span> to{' '}
                                        <span className="font-semibold">{users.to}</span> of{' '}
                                        <span className="font-semibold">{users.total}</span> users
                                    </div>
                                    <div className="flex space-x-2">
                                        {users.links.map((link, index) => (
                                            <button
                                                key={index}
                                                onClick={() => link.url && router.visit(link.url)}
                                                disabled={!link.url}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                                    link.active
                                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                                        : link.url
                                                        ? 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
