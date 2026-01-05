import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ client }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Client Details
                    </h2>
                    <div className="flex gap-2">
                        <Link
                            href={route('clients.edit', client.id)}
                            className="inline-flex items-center px-4 py-2 bg-yellow-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-700 focus:bg-yellow-700 active:bg-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                        >
                            Edit Client
                        </Link>
                        <Link
                            href={route('clients.index')}
                            className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                        >
                            Back to Clients
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Client - ${client.user?.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Client Information */}
                    <div className="mb-6 overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-lg">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Client Information
                            </h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Name
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {client.user?.name}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Email
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {client.user?.email}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Phone
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {client.user?.phone || 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Preferred Contact
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {client.preferred_contact}
                                    </p>
                                </div>
                                {client.user?.address && (
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Address
                                        </label>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {client.user.address}
                                            {client.user.city && `, ${client.user.city}`}
                                            {client.user.state && `, ${client.user.state}`}
                                            {client.user.zip_code && ` ${client.user.zip_code}`}
                                        </p>
                                    </div>
                                )}
                                {client.emergency_contact_name && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Emergency Contact
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {client.emergency_contact_name}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Emergency Phone
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {client.emergency_contact_phone}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Pets */}
                    <div className="mb-6 overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-lg">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Pets ({client.pets?.length || 0})
                            </h3>
                            <Link
                                href={route('pets.create', { client_id: client.id })}
                                className="inline-flex items-center px-3 py-1 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                Add Pet
                            </Link>
                        </div>
                        <div className="p-6">
                            {client.pets && client.pets.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {client.pets.map((pet) => (
                                        <Link
                                            key={pet.id}
                                            href={route('pets.show', pet.id)}
                                            className="p-4 border rounded-lg dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {pet.name}
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {pet.pet_type?.name}
                                                        {pet.breed && ` - ${pet.breed.name}`}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-500">
                                                        {pet.gender && pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1)}
                                                        {pet.date_of_birth && ` • ${new Date().getFullYear() - new Date(pet.date_of_birth).getFullYear()} years old`}
                                                    </p>
                                                </div>
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                    pet.is_active
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                                                }`}>
                                                    {pet.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                                    No pets registered yet.
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Recent Appointments */}
                        <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-lg">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Recent Appointments
                                </h3>
                                <Link
                                    href={route('appointments.create', { client_id: client.id })}
                                    className="inline-flex items-center px-3 py-1 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Book
                                </Link>
                            </div>
                            <div className="p-6">
                                {client.appointments && client.appointments.length > 0 ? (
                                    <div className="space-y-3">
                                        {client.appointments.slice(0, 5).map((appointment) => (
                                            <div
                                                key={appointment.id}
                                                className="p-3 border rounded-lg dark:border-gray-700"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">
                                                            {appointment.service?.name}
                                                        </p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {appointment.pet?.name}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-500">
                                                            {new Date(appointment.scheduled_at).toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                        appointment.status === 'completed'
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                            : appointment.status === 'scheduled'
                                                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                                                    }`}>
                                                        {appointment.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                                        No appointments yet.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Recent Invoices */}
                        <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-lg">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Recent Invoices
                                </h3>
                            </div>
                            <div className="p-6">
                                {client.invoices && client.invoices.length > 0 ? (
                                    <div className="space-y-3">
                                        {client.invoices.slice(0, 5).map((invoice) => (
                                            <div
                                                key={invoice.id}
                                                className="p-3 border rounded-lg dark:border-gray-700"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">
                                                            {invoice.invoice_number}
                                                        </p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {new Date(invoice.issue_date).toLocaleDateString()}
                                                        </p>
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                            ${Number(invoice.total || 0).toFixed(2)}
                                                        </p>
                                                    </div>
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                        invoice.status === 'paid'
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                            : invoice.status === 'sent'
                                                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                                                    }`}>
                                                        {invoice.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                                        No invoices yet.
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
