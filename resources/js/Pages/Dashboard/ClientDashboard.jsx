import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function ClientDashboard({
    stats,
    upcoming_appointments,
    pets,
    recent_invoices
}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    My Dashboard
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
                                My Pets
                            </div>
                            <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                {stats.total_pets}
                            </div>
                        </div>

                        <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-lg p-6">
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Upcoming Appointments
                            </div>
                            <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                {stats.upcoming_appointments}
                            </div>
                        </div>

                        <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-lg p-6">
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Total Spent
                            </div>
                            <div className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
                                ${Number(stats.total_spent || 0).toFixed(2)}
                            </div>
                        </div>

                        <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-lg p-6">
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Pending Invoices
                            </div>
                            <div className="mt-2 text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                                {stats.pending_invoices}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* My Pets */}
                        <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-lg">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    My Pets
                                </h3>
                            </div>
                            <div className="p-6">
                                {pets && pets.length > 0 ? (
                                    <div className="space-y-4">
                                        {pets.map((pet) => (
                                            <div
                                                key={pet.id}
                                                className="p-4 border rounded-lg dark:border-gray-700"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">
                                                            {pet.name}
                                                        </p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {pet.pet_type && pet.pet_type.name}
                                                            {pet.breed && ` - ${pet.breed.name}`}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-500">
                                                            {pet.gender && pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1)}
                                                            {pet.date_of_birth && ` • Born ${new Date(pet.date_of_birth).toLocaleDateString()}`}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                                            You haven't added any pets yet
                                        </p>
                                        <a
                                            href="/pets/create"
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                                        >
                                            Add Your First Pet
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Upcoming Appointments */}
                        <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-lg">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Upcoming Appointments
                                </h3>
                            </div>
                            <div className="p-6">
                                {upcoming_appointments && upcoming_appointments.length > 0 ? (
                                    <div className="space-y-4">
                                        {upcoming_appointments.map((appointment) => (
                                            <div
                                                key={appointment.id}
                                                className="p-4 border rounded-lg dark:border-gray-700"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">
                                                            {appointment.service && appointment.service.name}
                                                        </p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {appointment.pet && appointment.pet.name}
                                                        </p>
                                                        {appointment.staff && appointment.staff.user && (
                                                            <p className="text-sm text-gray-500 dark:text-gray-500">
                                                                with {appointment.staff.user.name}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {new Date(appointment.scheduled_at).toLocaleDateString()}
                                                        </p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
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
                                    <div className="text-center py-8">
                                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                                            No upcoming appointments
                                        </p>
                                        <a
                                            href="/appointments/create"
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                                        >
                                            Book Appointment
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Recent Invoices */}
                        <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-lg lg:col-span-2">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Recent Invoices
                                </h3>
                            </div>
                            <div className="p-6">
                                {recent_invoices && recent_invoices.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead>
                                                <tr>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                        Invoice
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                        Date
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                        Amount
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                {recent_invoices.map((invoice) => (
                                                    <tr key={invoice.id}>
                                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                            {invoice.invoice_number}
                                                        </td>
                                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                            {new Date(invoice.issue_date).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                            ${Number(invoice.total || 0).toFixed(2)}
                                                        </td>
                                                        <td className="px-4 py-4 whitespace-nowrap">
                                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                                invoice.status === 'paid'
                                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                            }`}>
                                                                {invoice.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400">
                                        No invoices yet
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
