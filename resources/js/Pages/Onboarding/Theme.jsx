import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

const themes = [
    {
        id: 'white',
        name: 'White',
        description: 'Clean & Bright',
        preview: {
            bg: 'bg-white',
            text: 'text-gray-900',
            accent: 'bg-blue-500',
        },
        gradient: 'from-gray-100 to-gray-200',
    },
    {
        id: 'gray',
        name: 'Gray',
        description: 'Professional (Current)',
        preview: {
            bg: 'bg-gray-50',
            text: 'text-gray-900',
            accent: 'bg-indigo-500',
        },
        gradient: 'from-gray-200 to-gray-300',
    },
    {
        id: 'black',
        name: 'Black',
        description: 'Dark Mode',
        preview: {
            bg: 'bg-gray-900',
            text: 'text-white',
            accent: 'bg-purple-500',
        },
        gradient: 'from-gray-800 to-gray-900',
    },
    {
        id: 'system',
        name: 'System',
        description: 'Follow Device Settings',
        preview: {
            bg: 'bg-gradient-to-br from-white to-gray-900',
            text: 'text-gray-700',
            accent: 'bg-blue-500',
        },
        gradient: 'from-blue-200 to-purple-300',
    },
];

export default function Theme() {
    const [selected, setSelected] = useState('gray');

    const { data, setData, post, processing } = useForm({
        theme_preference: 'gray',
    });

    const handleSelect = (themeId) => {
        setSelected(themeId);
        setData('theme_preference', themeId);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('onboarding.theme'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
            <Head title="Choose Your Theme" />

            <div className="w-full max-w-5xl">
                {/* Progress Indicator */}
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full px-6 py-3 shadow-lg">
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-sm">
                            2
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Step 2 of 3
                        </span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in-up">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 animate-slide-in">
                            Customize Your Theme
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Choose a theme that matches your style and preferences
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Theme Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            {themes.map((theme, index) => (
                                <button
                                    key={theme.id}
                                    type="button"
                                    onClick={() => handleSelect(theme.id)}
                                    className={`relative group p-6 rounded-2xl border-2 transition-all duration-500 transform hover:scale-105 ${
                                        selected === theme.id
                                            ? 'border-transparent shadow-2xl ring-4 ring-purple-500 ring-opacity-50'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                    }`}
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                    }}
                                >
                                    {/* Gradient Background for Selected */}
                                    {selected === theme.id && (
                                        <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-5 rounded-2xl animate-pulse-slow`}></div>
                                    )}

                                    {/* Content */}
                                    <div className="relative">
                                        {/* Theme Name */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                                    {theme.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {theme.description}
                                                </p>
                                            </div>

                                            {/* Check Mark */}
                                            {selected === theme.id && (
                                                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center animate-scale-in">
                                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>

                                        {/* Theme Preview */}
                                        <div className="relative h-48 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                                            <div className={`absolute inset-0 ${theme.preview.bg} p-4`}>
                                                {/* Mini UI Preview */}
                                                <div className="space-y-3">
                                                    {/* Header */}
                                                    <div className={`h-3 ${theme.preview.text} opacity-20 rounded`}></div>

                                                    {/* Cards */}
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className={`h-16 ${theme.preview.accent} opacity-80 rounded`}></div>
                                                        <div className={`h-16 ${theme.preview.accent} opacity-60 rounded`}></div>
                                                    </div>

                                                    {/* Content */}
                                                    <div className="space-y-2">
                                                        <div className={`h-2 ${theme.preview.text} opacity-10 rounded`}></div>
                                                        <div className={`h-2 ${theme.preview.text} opacity-10 rounded w-4/5`}></div>
                                                        <div className={`h-2 ${theme.preview.text} opacity-10 rounded w-3/5`}></div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Selection Overlay */}
                                            {selected === theme.id && (
                                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-10 animate-fade-in"></div>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between">
                            <a
                                href={route('onboarding.core-activity')}
                                className="group px-6 py-3 rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                            >
                                <span className="flex items-center space-x-2">
                                    <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                                    </svg>
                                    <span>Back</span>
                                </span>
                            </a>

                            <button
                                type="submit"
                                disabled={processing}
                                className={`group relative px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                                    processing
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-2xl transform hover:scale-105'
                                }`}
                            >
                                <span className="flex items-center space-x-2">
                                    <span>{processing ? 'Saving...' : 'Continue'}</span>
                                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slide-in {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes scale-in {
                    from {
                        transform: scale(0);
                    }
                    to {
                        transform: scale(1);
                    }
                }

                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes pulse-slow {
                    0%, 100% {
                        opacity: 0.05;
                    }
                    50% {
                        opacity: 0.1;
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out;
                }

                .animate-slide-in {
                    animation: slide-in 0.6s ease-out;
                }

                .animate-scale-in {
                    animation: scale-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }

                .animate-pulse-slow {
                    animation: pulse-slow 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
