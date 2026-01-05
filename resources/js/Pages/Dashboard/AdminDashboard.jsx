import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function AdminDashboard({
    stats,
    revenue_trend,
    todays_appointments,
    upcoming_appointments,
    recent_clients,
    overdue_invoices
}) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Admin Dashboard
                    </h2>
                    <div className="flex gap-2">
                        <Link
                            href="/clients"
                            className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            Manage Clients
                        </Link>
                        <Link
                            href="/services"
                            className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            Manage Services
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Main Stats Grid */}
                    <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
                        <div className="overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg rounded-lg p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium opacity-90">
                                        Total Clients
                                    </div>
                                    <div className="mt-2 text-3xl font-bold">
                                        {stats.total_clients}
                                    </div>
                                </div>
                                <svg className="w-12 h-12 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                </svg>
                            </div>
                        </div>

                        <div className="overflow-hidden bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg rounded-lg p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium opacity-90">
                                        Total Pets
                                    </div>
                                    <div className="mt-2 text-3xl font-bold">
                                        {stats.total_pets}
                                    </div>
                                </div>
                                <svg className="w-12 h-12 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>

                        <div className="overflow-hidden bg-gradient-to-br from-green-500 to-green-600 shadow-lg rounded-lg p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium opacity-90">
                                        Total Revenue
                                    </div>
                                    <div className="mt-2 text-3xl font-bold">
                                        ${Number(stats.total_revenue || 0).toFixed(2)}
                                    </div>
                                    <div className="text-xs mt-1 opacity-75">
                                        This month: ${Number(stats.this_month_revenue || 0).toFixed(2)}
                                    </div>
                                </div>
                                <svg className="w-12 h-12 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>

                        <div className="overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg rounded-lg p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium opacity-90">
                                        Today's Appointments
                                    </div>
                                    <div className="mt-2 text-3xl font-bold">
                                        {stats.today_appointments}
                                    </div>
                                    <div className="text-xs mt-1 opacity-75">
                                        Total: {stats.total_appointments}
                                    </div>
                                </div>
                                <svg className="w-12 h-12 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Stats */}
                    <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
                        <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Pending Invoices
                                </h3>
                                <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                    {stats.pending_invoices_count}
                                </span>
                            </div>
                            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                                ${Number(stats.pending_invoices_amount || 0).toFixed(2)}
                            </div>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Awaiting payment
                            </p>
                        </div>

                        <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Revenue Trend (Last 6 Months)
                            </h3>
                            <div className="space-y-2">
                                {revenue_trend && revenue_trend.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {item.month}
                                        </span>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                            ${Number(item.revenue || 0).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Today's Appointments */}
                        <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-lg">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Today's Schedule
                                </h3>
                            </div>
                            <div className="p-6 max-h-96 overflow-y-auto">
                                {todays_appointments && todays_appointments.length > 0 ? (
                                    <div className="space-y-3">
                                        {todays_appointments.map((appointment) => (
                                            <div
                                                key={appointment.id}
                                                className="p-3 border rounded-lg dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">
                                                            {appointment.pet && appointment.pet.name}
                                                        </p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {appointment.client && appointment.client.user && appointment.client.user.name}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-500">
                                                            {appointment.service && appointment.service.name}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {new Date(appointment.scheduled_at).toLocaleTimeString([], {
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </p>
                                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                            appointment.status === 'completed'
                                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                        }`}>
                                                            {appointment.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                                        No appointments today
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Recent Clients */}
                        <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-lg">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Recent Clients
                                </h3>
                            </div>
                            <div className="p-6">
                                {recent_clients && recent_clients.length > 0 ? (
                                    <div className="space-y-3">
                                        {recent_clients.map((client) => (
                                            <div
                                                key={client.id}
                                                className="flex items-center justify-between py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded px-2 transition"
                                            >
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {client.user && client.user.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {client.user && client.user.email}
                                                    </p>
                                                </div>
                                                <Link
                                                    href={`/clients/${client.id}`}
                                                    className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                                >
                                                    View
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400">
                                        No recent clients
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Overdue Invoices */}
                        {overdue_invoices && overdue_invoices.length > 0 && (
                            <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-lg lg:col-span-2">
                                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Overdue Invoices
                                        </h3>
                                        <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                            {overdue_invoices.length} Overdue
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead>
                                                <tr>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                                                        Invoice
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                                                        Client
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                                                        Due Date
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                                                        Amount
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                {overdue_invoices.map((invoice) => (
                                                    <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                            {invoice.invoice_number}
                                                        </td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                            {invoice.client && invoice.client.user && invoice.client.user.name}
                                                        </td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600 dark:text-red-400">
                                                            {new Date(invoice.due_date).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                                                            ${Number(invoice.total || 0).toFixed(2)}
                                                        </td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                            <Link
                                                                href={`/invoices/${invoice.id}`}
                                                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                                            >
                                                                View
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Upcoming Appointments */}
                        <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-lg lg:col-span-2">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Upcoming This Week
                                </h3>
                            </div>
                            <div className="p-6">
                                {upcoming_appointments && upcoming_appointments.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {upcoming_appointments.map((appointment) => (
                                            <div
                                                key={appointment.id}
                                                className="p-3 border rounded-lg dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">
                                                            {appointment.pet && appointment.pet.name}
                                                        </p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {appointment.service && appointment.service.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-500">
                                                            {appointment.client && appointment.client.user && appointment.client.user.name}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {new Date(appointment.scheduled_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {new Date(appointment.scheduled_at).toLocaleTimeString([], {
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                                        No upcoming appointments this week
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
