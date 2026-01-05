import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

const activities = [
    {
        id: 'grooming_boarding',
        name: 'Grooming & Boarding',
        description: '170,000+ businesses nationwide',
        icon: '✂️',
        color: 'from-pink-500 to-rose-500',
    },
    {
        id: 'sitting_daycare',
        name: 'Pet Sitting & Daycare',
        description: '55,000+ businesses nationwide',
        icon: '🏠',
        color: 'from-blue-500 to-cyan-500',
    },
    {
        id: 'transportation',
        name: 'Pet Transportation',
        description: '22,000+ businesses nationwide',
        icon: '🚗',
        color: 'from-purple-500 to-indigo-500',
    },
    {
        id: 'veterinary',
        name: 'Veterinary Care',
        description: 'Comprehensive medical services',
        icon: '⚕️',
        color: 'from-green-500 to-emerald-500',
    },
    {
        id: 'training',
        name: 'Pet Training',
        description: 'Behavior & obedience training',
        icon: '🎓',
        color: 'from-yellow-500 to-orange-500',
    },
    {
        id: 'walking',
        name: 'Dog Walking',
        description: 'Exercise & outdoor activities',
        icon: '🐕',
        color: 'from-teal-500 to-cyan-500',
    },
    {
        id: 'other',
        name: 'Other',
        description: 'Tell us your specialty',
        icon: '✨',
        color: 'from-gray-500 to-slate-500',
    },
];

export default function CoreActivity() {
    const [selected, setSelected] = useState('');
    const [customActivity, setCustomActivity] = useState('');
    const [showOtherInput, setShowOtherInput] = useState(false);

    const { data, setData, post, processing } = useForm({
        core_activity: '',
    });

    const handleSelect = (activityId, activityName) => {
        setSelected(activityId);
        if (activityId === 'other') {
            setShowOtherInput(true);
            setData('core_activity', '');
        } else {
            setShowOtherInput(false);
            setData('core_activity', activityName);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (showOtherInput && customActivity) {
            setData('core_activity', customActivity);
            post(route('onboarding.core-activity'));
        } else if (!showOtherInput && data.core_activity) {
            post(route('onboarding.core-activity'));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
            <Head title="Choose Your Core Activity" />

            <div className="w-full max-w-6xl">
                {/* Progress Indicator */}
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full px-6 py-3 shadow-lg">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                            1
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Step 1 of 3
                        </span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in-up">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 animate-slide-in">
                            What's Your Core Activity?
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Help us personalize your experience by telling us what you do
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Activity Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {activities.map((activity, index) => (
                                <button
                                    key={activity.id}
                                    type="button"
                                    onClick={() => handleSelect(activity.id, activity.name)}
                                    className={`relative group p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                                        selected === activity.id
                                            ? 'border-transparent shadow-2xl'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                    }`}
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                    }}
                                >
                                    {/* Gradient Background for Selected */}
                                    {selected === activity.id && (
                                        <div className={`absolute inset-0 bg-gradient-to-br ${activity.color} opacity-10 rounded-2xl`}></div>
                                    )}

                                    {/* Content */}
                                    <div className="relative">
                                        <div className="text-5xl mb-4">{activity.icon}</div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                            {activity.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {activity.description}
                                        </p>

                                        {/* Check Mark */}
                                        {selected === activity.id && (
                                            <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center animate-scale-in">
                                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Custom Input for "Other" */}
                        {showOtherInput && (
                            <div className="mb-8 animate-fade-in">
                                <label htmlFor="customActivity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Please specify your core activity
                                </label>
                                <input
                                    type="text"
                                    id="customActivity"
                                    value={customActivity}
                                    onChange={(e) => {
                                        setCustomActivity(e.target.value);
                                        setData('core_activity', e.target.value);
                                    }}
                                    placeholder="e.g., Pet Photography, Mobile Grooming, etc."
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
                                    required={showOtherInput}
                                />
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing || (!data.core_activity && !customActivity)}
                                className={`group relative px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                                    processing || (!data.core_activity && !customActivity)
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-2xl transform hover:scale-105'
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
            `}</style>
        </div>
    );
}
