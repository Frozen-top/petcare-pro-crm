import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Edit({ pet, clients, petTypes, breeds }) {
    const { data, setData, put, processing, errors } = useForm({
        client_id: pet.client_id || '',
        pet_type_id: pet.pet_type_id || '',
        breed_id: pet.breed_id || '',
        name: pet.name || '',
        date_of_birth: pet.date_of_birth || '',
        gender: pet.gender || 'male',
        color: pet.color || '',
        weight: pet.weight || '',
        microchip_number: pet.microchip_number || '',
        medical_notes: pet.medical_notes || '',
        behavioral_notes: pet.behavioral_notes || '',
        is_active: pet.is_active ?? true,
    });

    const [filteredBreeds, setFilteredBreeds] = useState([]);

    useEffect(() => {
        if (data.pet_type_id && breeds) {
            setFilteredBreeds(breeds.filter(breed => breed.pet_type_id == data.pet_type_id));
        } else {
            setFilteredBreeds([]);
        }
    }, [data.pet_type_id, breeds]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('pets.update', pet.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Edit Pet
                    </h2>
                    <Link
                        href={route('pets.show', pet.id)}
                        className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                    >
                        Back to Details
                    </Link>
                </div>
            }
        >
            <Head title={`Edit Pet - ${pet.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-lg">
                        <form onSubmit={handleSubmit} className="p-6">
                            {/* Basic Information */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Basic Information
                                </h3>
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label htmlFor="client_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Owner *
                                        </label>
                                        <select
                                            id="client_id"
                                            value={data.client_id}
                                            onChange={(e) => setData('client_id', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                            required
                                        >
                                            <option value="">Select Owner</option>
                                            {clients && clients.map((client) => (
                                                <option key={client.id} value={client.id}>
                                                    {client.user?.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.client_id && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.client_id}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Pet Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                            required
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div>
                                            <label htmlFor="pet_type_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Pet Type *
                                            </label>
                                            <select
                                                id="pet_type_id"
                                                value={data.pet_type_id}
                                                onChange={(e) => {
                                                    setData('pet_type_id', e.target.value);
                                                    setData('breed_id', ''); // Reset breed when type changes
                                                }}
                                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                                required
                                            >
                                                <option value="">Select Pet Type</option>
                                                {petTypes && petTypes.map((type) => (
                                                    <option key={type.id} value={type.id}>
                                                        {type.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.pet_type_id && (
                                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.pet_type_id}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="breed_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Breed
                                            </label>
                                            <select
                                                id="breed_id"
                                                value={data.breed_id}
                                                onChange={(e) => setData('breed_id', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                                disabled={!data.pet_type_id}
                                            >
                                                <option value="">Select Breed (Optional)</option>
                                                {filteredBreeds.map((breed) => (
                                                    <option key={breed.id} value={breed.id}>
                                                        {breed.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.breed_id && (
                                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.breed_id}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                        <div>
                                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Gender *
                                            </label>
                                            <select
                                                id="gender"
                                                value={data.gender}
                                                onChange={(e) => setData('gender', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                                required
                                            >
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                            {errors.gender && (
                                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.gender}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Date of Birth
                                            </label>
                                            <input
                                                type="date"
                                                id="date_of_birth"
                                                value={data.date_of_birth}
                                                onChange={(e) => setData('date_of_birth', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                            />
                                            {errors.date_of_birth && (
                                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.date_of_birth}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Weight (kg)
                                            </label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                id="weight"
                                                value={data.weight}
                                                onChange={(e) => setData('weight', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                            />
                                            {errors.weight && (
                                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.weight}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div>
                                            <label htmlFor="color" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Color
                                            </label>
                                            <input
                                                type="text"
                                                id="color"
                                                value={data.color}
                                                onChange={(e) => setData('color', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                            />
                                            {errors.color && (
                                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.color}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="microchip_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Microchip Number
                                            </label>
                                            <input
                                                type="text"
                                                id="microchip_number"
                                                value={data.microchip_number}
                                                onChange={(e) => setData('microchip_number', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                            />
                                            {errors.microchip_number && (
                                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.microchip_number}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Additional Notes
                                </h3>
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label htmlFor="medical_notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Medical Notes
                                        </label>
                                        <textarea
                                            id="medical_notes"
                                            rows="3"
                                            value={data.medical_notes}
                                            onChange={(e) => setData('medical_notes', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                        />
                                        {errors.medical_notes && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.medical_notes}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="behavioral_notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Behavioral Notes
                                        </label>
                                        <textarea
                                            id="behavioral_notes"
                                            rows="3"
                                            value={data.behavioral_notes}
                                            onChange={(e) => setData('behavioral_notes', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                        />
                                        {errors.behavioral_notes && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.behavioral_notes}</p>
                                        )}
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="is_active"
                                            checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                            className="rounded border-gray-300 dark:border-gray-600 text-purple-600 shadow-sm focus:ring-purple-500"
                                        />
                                        <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                            Active
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex items-center justify-end gap-4">
                                <Link
                                    href={route('pets.show', pet.id)}
                                    className="inline-flex items-center px-4 py-2 bg-gray-300 dark:bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-gray-700 dark:text-gray-200 uppercase tracking-widest hover:bg-gray-400 dark:hover:bg-gray-500 focus:bg-gray-400 dark:focus:bg-gray-500 active:bg-gray-500 dark:active:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center px-4 py-2 bg-purple-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-purple-700 focus:bg-purple-700 active:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 disabled:opacity-50"
                                >
                                    {processing ? 'Updating...' : 'Update Pet'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
