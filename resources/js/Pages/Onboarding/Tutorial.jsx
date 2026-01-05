import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

const tutorialSteps = [
    {
        id: 1,
        title: 'Manage Your Clients',
        description: 'Add and track client information, contact details, and emergency contacts. Build lasting relationships with pet owners.',
        icon: '👥',
        color: 'from-blue-500 to-cyan-500',
        features: ['Client profiles', 'Contact management', 'History tracking'],
    },
    {
        id: 2,
        title: 'Register Pets',
        description: 'Create complete pet profiles with medical history, vaccinations, and behavioral notes. Everything in one place.',
        icon: '🐾',
        color: 'from-purple-500 to-pink-500',
        features: ['Pet profiles', 'Medical records', 'Vaccination tracking'],
    },
    {
        id: 3,
        title: 'Schedule Services',
        description: 'Book appointments and manage your calendar. Track grooming, vet visits, boarding, and more.',
        icon: '📅',
        color: 'from-green-500 to-emerald-500',
        features: ['Calendar view', 'Service booking', 'Staff assignment'],
    },
    {
        id: 4,
        title: 'Track Revenue',
        description: 'Monitor your business performance with detailed analytics. See trends, revenue, and growth metrics.',
        icon: '📊',
        color: 'from-orange-500 to-red-500',
        features: ['Revenue analytics', 'Performance metrics', 'Business insights'],
    },
    {
        id: 5,
        title: 'Get Paid',
        description: 'Generate professional invoices automatically. Track payments and never miss a collection.',
        icon: '💳',
        color: 'from-indigo-500 to-purple-500',
        features: ['Auto invoicing', 'Payment tracking', 'Financial reports'],
    },
];

export default function Tutorial() {
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState(0);

    const { post, processing } = useForm();

    const nextStep = () => {
        if (currentStep < tutorialSteps.length - 1) {
            setDirection(1);
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setDirection(-1);
            setCurrentStep(currentStep - 1);
        }
    };

    const skip = () => {
        post(route('onboarding.complete'));
    };

    const finish = () => {
        post(route('onboarding.complete'));
    };

    const currentTutorial = tutorialSteps[currentStep];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
            <Head title="App Tutorial" />

            <div className="w-full max-w-4xl">
                {/* Progress Indicator */}
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full px-6 py-3 shadow-lg">
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                            3
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Step 3 of 3
                        </span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in-up">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 animate-slide-in">
                            Welcome to PetCare Pro!
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Let's show you around with a quick tutorial
                        </p>
                    </div>

                    {/* Tutorial Card */}
                    <div className="relative min-h-[400px] mb-8">
                        <div
                            key={currentStep}
                            className={`absolute inset-0 transition-all duration-500 ${
                                direction === 1 ? 'animate-slide-in-right' : direction === -1 ? 'animate-slide-in-left' : 'animate-fade-in'
                            }`}
                        >
                            <div className={`relative h-full bg-gradient-to-br ${currentTutorial.color} p-8 rounded-2xl text-white overflow-hidden`}>
                                {/* Background Pattern */}
                                <div className="absolute inset-0 opacity-10">
                                    <div className="absolute inset-0" style={{
                                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                                        backgroundSize: '20px 20px',
                                    }}></div>
                                </div>

                                {/* Content */}
                                <div className="relative z-10 h-full flex flex-col">
                                    <div className="text-7xl mb-6 animate-bounce-slow">{currentTutorial.icon}</div>

                                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                        {currentTutorial.title}
                                    </h2>

                                    <p className="text-lg md:text-xl mb-8 text-white/90">
                                        {currentTutorial.description}
                                    </p>

                                    <div className="mt-auto space-y-3">
                                        {currentTutorial.features.map((feature, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center space-x-3 animate-fade-in-up"
                                                style={{ animationDelay: `${index * 100}ms` }}
                                            >
                                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <span className="text-white/90">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step Indicators */}
                    <div className="flex justify-center space-x-2 mb-8">
                        {tutorialSteps.map((step, index) => (
                            <button
                                key={step.id}
                                onClick={() => {
                                    setDirection(index > currentStep ? 1 : -1);
                                    setCurrentStep(index);
                                }}
                                className={`transition-all duration-300 ${
                                    index === currentStep
                                        ? 'w-12 h-3 bg-gradient-to-r from-indigo-600 to-purple-600'
                                        : 'w-3 h-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                                } rounded-full`}
                            ></button>
                        ))}
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={skip}
                            className="px-6 py-3 rounded-xl font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-all"
                            disabled={processing}
                        >
                            Skip Tutorial
                        </button>

                        <div className="flex items-center space-x-4">
                            {currentStep > 0 && (
                                <button
                                    onClick={prevStep}
                                    className="group px-6 py-3 rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                                >
                                    <span className="flex items-center space-x-2">
                                        <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                                        </svg>
                                        <span>Back</span>
                                    </span>
                                </button>
                            )}

                            {currentStep < tutorialSteps.length - 1 ? (
                                <button
                                    onClick={nextStep}
                                    className="group px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all"
                                >
                                    <span className="flex items-center space-x-2">
                                        <span>Next</span>
                                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                </button>
                            ) : (
                                <button
                                    onClick={finish}
                                    disabled={processing}
                                    className="group px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all disabled:opacity-50"
                                >
                                    <span className="flex items-center space-x-2">
                                        <span>{processing ? 'Loading...' : 'Get Started'}</span>
                                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>
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

                @keyframes slide-in-right {
                    from {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes slide-in-left {
                    from {
                        opacity: 0;
                        transform: translateX(-100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
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

                @keyframes bounce-slow {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out;
                }

                .animate-slide-in {
                    animation: slide-in 0.6s ease-out;
                }

                .animate-slide-in-right {
                    animation: slide-in-right 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
                }

                .animate-slide-in-left {
                    animation: slide-in-left 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
                }

                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }

                .animate-bounce-slow {
                    animation: bounce-slow 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
