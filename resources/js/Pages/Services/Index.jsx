import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const categoryColors = {
    grooming: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200 border-pink-500',
    veterinary: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-500',
    boarding: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-500',
    training: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-500',
    daycare: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-500',
};

export default function Index({ services, categories, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [category, setCategory] = useState(filters?.category || '');

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(route('services.index'), { search, category }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setSearch('');
        setCategory('');
        router.get(route('services.index'));
    };

    const handleDelete = (service) => {
        if (confirm(`Are you sure you want to delete ${service.name}?`)) {
            router.delete(route('services.destroy', service.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Services Management
                    </h2>
                    <Link
                        href={route('services.create')}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                    >
                        Add New Service
                    </Link>
                </div>
            }
        >
            <Head title="Services" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-lg">
                        {/* Filters */}
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <form onSubmit={handleFilter} className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div>
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search services..."
                                        className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="">All Categories</option>
                                        {categories && categories.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Filter
                                    </button>
                                    {(search || category) && (
                                        <button
                                            type="button"
                                            onClick={clearFilters}
                                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                        >
                                            Clear
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* Services Grid */}
                        <div className="p-6">
                            {services && services.data && services.data.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                        {services.data.map((service) => (
                                            <div
                                                key={service.id}
                                                className={`p-6 border-l-4 rounded-lg shadow-sm hover:shadow-md transition ${categoryColors[service.category]} bg-white dark:bg-gray-700`}
                                            >
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                            {service.name}
                                                        </h3>
                                                        <span className={`inline-block px-2 py-1 mt-1 text-xs font-semibold rounded-full ${categoryColors[service.category]}`}>
                                                            {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                                                        </span>
                                                    </div>
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                        service.is_active
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                                                    }`}>
                                                        {service.is_active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>

                                                {service.description && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                                                        {service.description}
                                                    </p>
                                                )}

                                                <div className="flex items-center justify-between mb-4">
                                                    <div>
                                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                                            ${Number(service.base_price || 0).toFixed(2)}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            Base Price
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                                            {service.duration_minutes} min
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            Duration
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex gap-2">
                                                    <Link
                                                        href={route('services.edit', service.id)}
                                                        className="flex-1 text-center px-3 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 text-xs font-semibold uppercase tracking-widest transition"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(service)}
                                                        className="flex-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-xs font-semibold uppercase tracking-widest transition"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {services.links && services.links.length > 3 && (
                                        <div className="mt-6 flex justify-center">
                                            <nav className="flex gap-2">
                                                {services.links.map((link, index) => (
                                                    <Link
                                                        key={index}
                                                        href={link.url || '#'}
                                                        className={`px-4 py-2 rounded-md ${
                                                            link.active
                                                                ? 'bg-indigo-600 text-white'
                                                                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                                                        } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                ))}
                                            </nav>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                                        No services found
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        {search || category ? 'Try adjusting your filters.' : 'Get started by adding a new service.'}
                                    </p>
                                    {!search && !category && (
                                        <div className="mt-6">
                                            <Link
                                                href={route('services.create')}
                                                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                                            >
                                                Add New Service
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
