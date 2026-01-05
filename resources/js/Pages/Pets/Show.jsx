import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ pet }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Pet Details
                    </h2>
                    <div className="flex gap-2">
                        <Link
                            href={route('pets.edit', pet.id)}
                            className="inline-flex items-center px-4 py-2 bg-yellow-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-700 focus:bg-yellow-700 active:bg-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                        >
                            Edit Pet
                        </Link>
                        <Link
                            href={route('pets.index')}
                            className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                        >
                            Back to Pets
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Pet - ${pet.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Pet Information */}
                    <div className="mb-6 overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-lg">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {pet.name}
                                </h3>
                                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                    pet.is_active
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                                }`}>
                                    {pet.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Owner
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                        <Link
                                            href={route('clients.show', pet.client.id)}
                                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                        >
                                            {pet.client?.user?.name}
                                        </Link>
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Pet Type
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {pet.pet_type?.name}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Breed
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {pet.breed?.name || 'Mixed'}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Gender
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {pet.gender && pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1)}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Date of Birth
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {pet.date_of_birth
                                            ? `${new Date(pet.date_of_birth).toLocaleDateString()} (${new Date().getFullYear() - new Date(pet.date_of_birth).getFullYear()} years)`
                                            : 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Color
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {pet.color || 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Weight
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {pet.weight ? `${pet.weight} kg` : 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Microchip Number
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {pet.microchip_number || 'N/A'}
                                    </p>
                                </div>
                            </div>

                            {(pet.medical_notes || pet.behavioral_notes) && (
                                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {pet.medical_notes && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Medical Notes
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
                                                {pet.medical_notes}
                                            </p>
                                        </div>
                                    )}
                                    {pet.behavioral_notes && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Behavioral Notes
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
                                                {pet.behavioral_notes}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Appointments */}
                        <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-lg">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Appointments ({pet.appointments?.length || 0})
                                </h3>
                                <Link
                                    href={route('appointments.create', { pet_id: pet.id })}
                                    className="inline-flex items-center px-3 py-1 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Book
                                </Link>
                            </div>
                            <div className="p-6">
                                {pet.appointments && pet.appointments.length > 0 ? (
                                    <div className="space-y-3">
                                        {pet.appointments.slice(0, 5).map((appointment) => (
                                            <div
                                                key={appointment.id}
                                                className="p-3 border rounded-lg dark:border-gray-700"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">
                                                            {appointment.service?.name}
                                                        </p>
                                                        {appointment.staff?.user && (
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                with {appointment.staff.user.name}
                                                            </p>
                                                        )}
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

                        {/* Vaccinations */}
                        <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-lg">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Vaccinations ({pet.vaccinations?.length || 0})
                                </h3>
                                <Link
                                    href={route('vaccinations.create', { pet_id: pet.id })}
                                    className="inline-flex items-center px-3 py-1 bg-orange-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-orange-700 focus:bg-orange-700 active:bg-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Add
                                </Link>
                            </div>
                            <div className="p-6">
                                {pet.vaccinations && pet.vaccinations.length > 0 ? (
                                    <div className="space-y-3">
                                        {pet.vaccinations.map((vaccination) => (
                                            <div
                                                key={vaccination.id}
                                                className="p-3 border rounded-lg dark:border-gray-700"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">
                                                            {vaccination.vaccine_name}
                                                        </p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            Administered: {new Date(vaccination.administered_date).toLocaleDateString()}
                                                        </p>
                                                        {vaccination.next_due_date && (
                                                            <p className="text-sm text-gray-500 dark:text-gray-500">
                                                                Next Due: {new Date(vaccination.next_due_date).toLocaleDateString()}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                                        No vaccination records yet.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Medical Records */}
                        <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-lg lg:col-span-2">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Medical Records ({pet.medical_records?.length || 0})
                                </h3>
                                <Link
                                    href={route('medical-records.create', { pet_id: pet.id })}
                                    className="inline-flex items-center px-3 py-1 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Add Record
                                </Link>
                            </div>
                            <div className="p-6">
                                {pet.medical_records && pet.medical_records.length > 0 ? (
                                    <div className="space-y-4">
                                        {pet.medical_records.map((record) => (
                                            <div
                                                key={record.id}
                                                className="p-4 border rounded-lg dark:border-gray-700"
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">
                                                            {record.record_type && record.record_type.charAt(0).toUpperCase() + record.record_type.slice(1)} - {new Date(record.visit_date).toLocaleDateString()}
                                                        </p>
                                                        {record.diagnosis && (
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                Diagnosis: {record.diagnosis}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                {record.treatment && (
                                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                                                        Treatment: {record.treatment}
                                                    </p>
                                                )}
                                                {record.notes && (
                                                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                                                        Notes: {record.notes}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                                        No medical records yet.
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
