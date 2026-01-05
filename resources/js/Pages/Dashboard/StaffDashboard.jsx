import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function StaffDashboard({
    stats,
    todays_appointments,
    upcoming_appointments,
    recent_clients,
    pending_invoices
}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
                        <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-lg p-6">
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Total Clients
                            </div>
                            <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                {stats.total_clients}
                            </div>
                        </div>

                        <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-lg p-6">
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Total Pets
                            </div>
                            <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                {stats.total_pets}
                            </div>
                        </div>

                        <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-lg p-6">
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Today's Appointments
                            </div>
                            <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                {stats.today_appointments}
                            </div>
                        </div>

                        <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-lg p-6">
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Total Revenue
                            </div>
                            <div className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
                                ${Number(stats.total_revenue || 0).toFixed(2)}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Today's Appointments */}
                        <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-lg">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Today's Appointments
                                </h3>
                            </div>
                            <div className="p-6">
                                {todays_appointments && todays_appointments.length > 0 ? (
                                    <div className="space-y-4">
                                        {todays_appointments.map((appointment) => (
                                            <div
                                                key={appointment.id}
                                                className="p-4 border rounded-lg dark:border-gray-700"
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
                                                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                            {appointment.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400">
                                        No appointments scheduled for today
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Upcoming Appointments */}
                        <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-lg">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Upcoming This Week
                                </h3>
                            </div>
                            <div className="p-6">
                                {upcoming_appointments && upcoming_appointments.length > 0 ? (
                                    <div className="space-y-3">
                                        {upcoming_appointments.slice(0, 5).map((appointment) => (
                                            <div
                                                key={appointment.id}
                                                className="flex justify-between items-center py-2 border-b last:border-b-0 dark:border-gray-700"
                                            >
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {appointment.pet && appointment.pet.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {appointment.service && appointment.service.name}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        {new Date(appointment.scheduled_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400">
                                        No upcoming appointments
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
                                                className="flex items-center justify-between py-2"
                                            >
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {client.user && client.user.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {client.user && client.user.email}
                                                    </p>
                                                </div>
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

                        {/* Pending Invoices */}
                        <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-lg">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Pending Invoices
                                </h3>
                            </div>
                            <div className="p-6">
                                {pending_invoices && pending_invoices.length > 0 ? (
                                    <div className="space-y-3">
                                        {pending_invoices.slice(0, 5).map((invoice) => (
                                            <div
                                                key={invoice.id}
                                                className="flex items-center justify-between py-2"
                                            >
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {invoice.invoice_number}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {invoice.client && invoice.client.user && invoice.client.user.name}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        ${Number(invoice.total || 0).toFixed(2)}
                                                    </p>
                                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                                        {invoice.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400">
                                        No pending invoices
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
