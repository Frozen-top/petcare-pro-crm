import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Register({ trialDays = 14 }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [passwordStrength, setPasswordStrength] = useState(0);
    const [showErrors, setShowErrors] = useState({});

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            const newShowErrors = {};
            Object.keys(errors).forEach(key => {
                newShowErrors[key] = true;
                setTimeout(() => {
                    setShowErrors(prev => ({ ...prev, [key]: false }));
                }, 3000);
            });
            setShowErrors(newShowErrors);
        }
    }, [errors]);

    useEffect(() => {
        calculatePasswordStrength(data.password);
    }, [data.password]);

    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
        if (password.match(/\d/)) strength += 25;
        if (password.match(/[^a-zA-Z\d]/)) strength += 25;
        setPasswordStrength(strength);
    };

    const getStrengthColor = () => {
        if (passwordStrength <= 25) return 'bg-red-500';
        if (passwordStrength <= 50) return 'bg-orange-500';
        if (passwordStrength <= 75) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const getStrengthText = () => {
        if (passwordStrength === 0) return '';
        if (passwordStrength <= 25) return 'Weak';
        if (passwordStrength <= 50) return 'Fair';
        if (passwordStrength <= 75) return 'Good';
        return 'Strong';
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
                {/* Background Decorations */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>

                <div className="w-full max-w-md relative z-10">
                    {/* Trial Badge */}
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full px-6 py-2 shadow-lg animate-bounce-slow">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                            <span className="text-sm font-bold text-white">
                                🎉 Start Your {trialDays}-Day Free Trial
                            </span>
                        </div>
                    </div>

                    {/* Logo */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex flex-col items-center">
                            <ApplicationLogo className="h-16 w-auto mb-3" />
                            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                PetCare Pro
                            </span>
                        </Link>
                    </div>

                    {/* Registration Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 animate-fade-in-up">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                            Create Your Account
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
                            No credit card required
                        </p>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all ${
                                            errors.name
                                                ? 'border-red-500 shake'
                                                : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                                        } dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500`}
                                        placeholder="John Doe"
                                        required
                                        autoFocus
                                    />
                                </div>
                                {errors.name && (
                                    <div className={`mt-2 flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm ${showErrors.name ? 'animate-shake' : ''}`}>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <span>{errors.name}</span>
                                    </div>
                                )}
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all ${
                                            errors.email
                                                ? 'border-red-500 shake'
                                                : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                                        } dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500`}
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                                {errors.email && (
                                    <div className={`mt-2 flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm ${showErrors.email ? 'animate-shake' : ''}`}>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <span>{errors.email}</span>
                                    </div>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="password"
                                        id="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all ${
                                            errors.password
                                                ? 'border-red-500 shake'
                                                : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                                        } dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500`}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                {data.password && (
                                    <div className="mt-3">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs text-gray-600 dark:text-gray-400">
                                                Password Strength: <span className="font-semibold">{getStrengthText()}</span>
                                            </span>
                                            <span className="text-xs text-gray-600 dark:text-gray-400">
                                                {passwordStrength}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                                            <div
                                                className={`h-full ${getStrengthColor()} transition-all duration-300`}
                                                style={{ width: `${passwordStrength}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                            Use 8+ characters with mix of letters, numbers & symbols
                                        </p>
                                    </div>
                                )}
                                {errors.password && (
                                    <div className={`mt-2 flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm ${showErrors.password ? 'animate-shake' : ''}`}>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <span>{errors.password}</span>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="password"
                                        id="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all ${
                                            errors.password_confirmation
                                                ? 'border-red-500 shake'
                                                : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
                                        } dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500`}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                {errors.password_confirmation && (
                                    <div className={`mt-2 flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm ${showErrors.password_confirmation ? 'animate-shake' : ''}`}>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <span>{errors.password_confirmation}</span>
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {processing ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating Account...
                                    </span>
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </form>

                        {/* Sign In Link */}
                        <div className="mt-6 text-center">
                            <p className="text-gray-600 dark:text-gray-400">
                                Already have an account?{' '}
                                <Link
                                    href={route('login')}
                                    className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>

                        {/* Features */}
                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>No credit card</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Cancel anytime</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>24/7 support</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>All features</span>
                                </div>
                            </div>
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

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
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

                @keyframes shake {
                    0%, 100% {
                        transform: translateX(0);
                    }
                    10%, 30%, 50%, 70%, 90% {
                        transform: translateX(-5px);
                    }
                    20%, 40%, 60%, 80% {
                        transform: translateX(5px);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out;
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .animate-bounce-slow {
                    animation: bounce-slow 3s ease-in-out infinite;
                }

                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }

                .shake {
                    animation: shake 0.5s ease-in-out;
                }
            `}</style>
        </>
    );
}
