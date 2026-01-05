import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Settings() {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        trial_days: 14,
        monthly_price: 29.99,
    });

    // Load current settings
    useEffect(() => {
        fetch('/admin/settings/current')
            .then(res => res.json())
            .then(settings => {
                if (settings) {
                    setData({
                        trial_days: settings.trial_days || 14,
                        monthly_price: settings.monthly_price || 29.99,
                    });
                }
            })
            .catch(() => {});
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    App Settings
                </h2>
            }
        >
            <Head title="App Settings" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    {/* Success Message */}
                    {recentlySuccessful && (
                        <div className="mb-6 rounded-lg bg-green-50 dark:bg-green-900/20 p-4 animate-fade-in">
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-green-600 dark:text-green-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-green-800 dark:text-green-200 font-medium">
                                    Settings updated successfully! Changes will apply to all new registrations.
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Trial Settings */}
                    <div className="mb-6 overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-lg">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Trial Period Settings
                            </h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Configure the trial period for new user registrations. This will be displayed on the landing page and applied to all new sign-ups.
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="trial_days" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Trial Days
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            id="trial_days"
                                            min="1"
                                            max="90"
                                            value={data.trial_days}
                                            onChange={(e) => setData('trial_days', e.target.value)}
                                            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-12 text-lg"
                                            required
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <span className="text-gray-500 dark:text-gray-400">days</span>
                                        </div>
                                    </div>
                                    {errors.trial_days && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.trial_days}</p>
                                    )}
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                        Current value: <span className="font-semibold text-blue-600 dark:text-blue-400">{data.trial_days} days</span>
                                    </p>
                                </div>

                                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <div className="flex items-start">
                                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div className="text-sm text-blue-800 dark:text-blue-200">
                                            <p className="font-medium mb-1">How it works:</p>
                                            <ul className="list-disc list-inside space-y-1 ml-2">
                                                <li>This setting applies to all users who register after you save changes</li>
                                                <li>Existing users keep their original trial period</li>
                                                <li>The trial days are displayed dynamically on the landing page</li>
                                                <li>Users will see trial expiration warnings 3 days before it ends</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Pricing Settings */}
                    <div className="mb-6 overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-lg">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                <svg className="w-6 h-6 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Subscription Pricing
                            </h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Set the monthly subscription price for users after their trial ends.
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="monthly_price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Monthly Price (USD)
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <span className="text-gray-500 dark:text-gray-400">$</span>
                                        </div>
                                        <input
                                            type="number"
                                            id="monthly_price"
                                            step="0.01"
                                            min="0"
                                            value={data.monthly_price}
                                            onChange={(e) => setData('monthly_price', e.target.value)}
                                            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 pl-7 pr-12 text-lg"
                                            required
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <span className="text-gray-500 dark:text-gray-400">/month</span>
                                        </div>
                                    </div>
                                    {errors.monthly_price && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.monthly_price}</p>
                                    )}
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                        Current value: <span className="font-semibold text-green-600 dark:text-green-400">${Number(data.monthly_price).toFixed(2)}/month</span>
                                    </p>
                                </div>

                                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <div className="flex items-start">
                                        <svg className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div className="text-sm text-green-800 dark:text-green-200">
                                            <p className="font-medium mb-1">Pricing Information:</p>
                                            <ul className="list-disc list-inside space-y-1 ml-2">
                                                <li>This price is displayed on the pricing page</li>
                                                <li>Users are charged this amount after trial expiration</li>
                                                <li>Includes all features and unlimited pets</li>
                                                <li>Billed monthly via Stripe (when enabled)</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Preview Section */}
                    <div className="mb-6 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 shadow-sm rounded-lg border-2 border-blue-200 dark:border-blue-800">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Preview
                            </h3>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                                <div className="text-center">
                                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full px-6 py-2 mb-4">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                            🎉 Start your {data.trial_days}-day free trial today
                                        </span>
                                    </div>
                                    <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                                        ${Number(data.monthly_price).toFixed(2)}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400">per month after trial</p>
                                </div>
                            </div>
                            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
                                This is how your trial offer will appear to new users
                            </p>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex items-center justify-end bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={processing}
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 border border-transparent rounded-lg font-semibold text-white hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 transform hover:scale-105 disabled:opacity-50 shadow-lg"
                        >
                            {processing && (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            {processing ? 'Saving...' : 'Save Settings'}
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
