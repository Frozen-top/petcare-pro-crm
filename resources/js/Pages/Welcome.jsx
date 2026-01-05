import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Welcome({ auth, trialDays = 14 }) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const parallaxX = (mousePosition.x - window.innerWidth / 2) / 50;
    const parallaxY = (mousePosition.y - window.innerHeight / 2) / 50;

    return (
        <>
            <Head title="PetCare Pro - Professional Pet Care Management System" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        PetCare Pro
                                    </span>
                                </div>
                            </div>

                            <div className="hidden md:flex items-center space-x-8">
                                <Link href={route('features')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">
                                    Features
                                </Link>
                                <Link href={route('pricing')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">
                                    Pricing
                                </Link>
                                <Link href={route('about')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">
                                    About
                                </Link>
                                <Link href={route('contact')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">
                                    Contact
                                </Link>
                            </div>

                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href="/dashboard"
                                        className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2 font-medium transition"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section with 3D Animation */}
                <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                    {/* Floating Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
                            style={{
                                transform: `translate(${parallaxX}px, ${parallaxY}px)`,
                                animationDelay: '0s',
                            }}
                        ></div>
                        <div
                            className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
                            style={{
                                transform: `translate(${-parallaxX}px, ${-parallaxY}px)`,
                                animationDelay: '2s',
                            }}
                        ></div>
                        <div
                            className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
                            style={{
                                transform: `translate(${parallaxX * 0.5}px, ${parallaxY * 0.5}px)`,
                                animationDelay: '4s',
                            }}
                        ></div>
                    </div>

                    <div className="max-w-7xl mx-auto relative">
                        <div className="text-center">
                            {/* Trial Badge */}
                            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full px-6 py-2 mb-8 animate-bounce-slow">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                    🎉 Start your {trialDays}-day free trial today
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 animate-fade-in-up">
                                Professional Pet Care
                                <span className="block mt-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                                    Management System
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                                Streamline your pet care business with our comprehensive CRM. Manage clients, pets, appointments, medical records, and invoicing all in one place.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                                <Link
                                    href="/register"
                                    className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition duration-300 shadow-2xl hover:shadow-blue-500/50 text-lg transform hover:scale-105 overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center">
                                        Start {trialDays}-Day Free Trial
                                        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </Link>
                                <Link
                                    href="/login"
                                    className="group inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-300 shadow-xl border-2 border-gray-200 dark:border-gray-700 text-lg transform hover:scale-105"
                                >
                                    View Demo
                                    <svg className="w-5 h-5 ml-2 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </Link>
                            </div>

                            {/* 3D Pet Cards Animation */}
                            <div className="relative h-64 mb-12">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div
                                        className="absolute w-48 h-64 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-500 animate-float-card"
                                        style={{
                                            transform: `perspective(1000px) rotateY(${parallaxX * 0.5}deg) rotateX(${-parallaxY * 0.5}deg) translateX(-120px) translateZ(50px)`,
                                            animationDelay: '0s',
                                        }}
                                    >
                                        <div className="p-6 text-white">
                                            <div className="text-5xl mb-4">🐕</div>
                                            <h3 className="font-bold text-xl">Dogs</h3>
                                            <p className="text-sm opacity-90">Full Care</p>
                                        </div>
                                    </div>

                                    <div
                                        className="absolute w-48 h-64 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-500 animate-float-card z-10"
                                        style={{
                                            transform: `perspective(1000px) rotateY(${parallaxX * 0.3}deg) rotateX(${-parallaxY * 0.3}deg) translateZ(100px)`,
                                            animationDelay: '1s',
                                        }}
                                    >
                                        <div className="p-6 text-white">
                                            <div className="text-5xl mb-4">🐱</div>
                                            <h3 className="font-bold text-xl">Cats</h3>
                                            <p className="text-sm opacity-90">Premium Service</p>
                                        </div>
                                    </div>

                                    <div
                                        className="absolute w-48 h-64 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-500 animate-float-card"
                                        style={{
                                            transform: `perspective(1000px) rotateY(${parallaxX * 0.5}deg) rotateX(${-parallaxY * 0.5}deg) translateX(120px) translateZ(50px)`,
                                            animationDelay: '2s',
                                        }}
                                    >
                                        <div className="p-6 text-white">
                                            <div className="text-5xl mb-4">🐦</div>
                                            <h3 className="font-bold text-xl">Birds</h3>
                                            <p className="text-sm opacity-90">Expert Care</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats with Animation */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
                                {[
                                    { value: '1000+', label: 'Active Businesses', color: 'blue', delay: '0ms' },
                                    { value: '50K+', label: 'Pets Managed', color: 'purple', delay: '100ms' },
                                    { value: '99.9%', label: 'Uptime', color: 'green', delay: '200ms' },
                                    { value: '24/7', label: 'Support', color: 'pink', delay: '300ms' },
                                ].map((stat, index) => (
                                    <div
                                        key={index}
                                        className="group p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                                        style={{ animationDelay: stat.delay }}
                                    >
                                        <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-${stat.color}-600 to-${stat.color}-400 bg-clip-text text-transparent mb-2`}>
                                            {stat.value}
                                        </div>
                                        <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                     style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                                Everything You Need
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-400">
                                Powerful features to grow your pet care business
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { icon: '👥', title: 'Client Management', desc: 'Track all client information, preferences, and history in one place', color: 'blue' },
                                { icon: '🐾', title: 'Pet Records', desc: 'Comprehensive pet profiles with medical history and vaccinations', color: 'purple' },
                                { icon: '📅', title: 'Appointment Scheduling', desc: 'Easy booking system with calendar management and reminders', color: 'green' },
                                { icon: '⚕️', title: 'Medical Records', desc: 'Store diagnoses, treatments, and medical documents securely', color: 'orange' },
                                { icon: '💳', title: 'Invoicing & Billing', desc: 'Automated invoice generation with payment tracking', color: 'yellow' },
                                { icon: '📊', title: 'Analytics & Reports', desc: 'Detailed insights into your business performance', color: 'indigo' },
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                    }}
                                >
                                    <div className={`w-16 h-16 bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 rounded-xl flex items-center justify-center text-4xl mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
                    <div className="relative max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Transform Your Business?
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            Join thousands of pet care professionals already using PetCare Pro
                        </p>
                        <Link
                            href="/register"
                            className="inline-flex items-center px-10 py-5 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition duration-300 shadow-2xl text-lg transform hover:scale-110"
                        >
                            Start Your {trialDays}-Day Free Trial
                            <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4">PetCare Pro</h3>
                                <p className="text-gray-400">
                                    Professional pet care management for modern businesses.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">Product</h4>
                                <div className="space-y-2">
                                    <Link href={route('features')} className="block text-gray-400 hover:text-white transition">Features</Link>
                                    <Link href={route('pricing')} className="block text-gray-400 hover:text-white transition">Pricing</Link>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">Company</h4>
                                <div className="space-y-2">
                                    <Link href={route('about')} className="block text-gray-400 hover:text-white transition">About</Link>
                                    <Link href={route('contact')} className="block text-gray-400 hover:text-white transition">Contact</Link>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">Legal</h4>
                                <div className="space-y-2">
                                    <a href="#" className="block text-gray-400 hover:text-white transition">Privacy</a>
                                    <a href="#" className="block text-gray-400 hover:text-white transition">Terms</a>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
                            <p>&copy; 2026 PetCare Pro. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>

            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
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

                @keyframes float-card {
                    0%, 100% {
                        transform: translateY(0px) translateZ(0px);
                    }
                    50% {
                        transform: translateY(-30px) translateZ(20px);
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

                @keyframes gradient {
                    0%, 100% {
                        background-size: 200% 200%;
                        background-position: left center;
                    }
                    50% {
                        background-size: 200% 200%;
                        background-position: right center;
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                    opacity: 0;
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .animate-float-card {
                    animation: float-card 4s ease-in-out infinite;
                }

                .animate-bounce-slow {
                    animation: bounce-slow 2s ease-in-out infinite;
                }

                .animate-gradient {
                    animation: gradient 3s ease infinite;
                }
            `}</style>
        </>
    );
}
