import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function About() {
    const features = [
        {
            title: 'Client Management',
            description: 'Efficiently manage all your pet owner information in one centralized location.',
            icon: '👥',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'Pet Records',
            description: 'Keep detailed health records, vaccination history, and notes for every pet.',
            icon: '🐾',
            color: 'from-purple-500 to-pink-500',
        },
        {
            title: 'Smart Scheduling',
            description: 'Automated appointment scheduling with reminders and calendar integration.',
            icon: '📅',
            color: 'from-green-500 to-emerald-500',
        },
        {
            title: 'Revenue Tracking',
            description: 'Monitor your business performance with detailed financial analytics.',
            icon: '📊',
            color: 'from-orange-500 to-red-500',
        },
    ];

    const team = [
        {
            name: 'Sarah Johnson',
            role: 'Founder & CEO',
            bio: '15+ years in veterinary practice management',
            avatar: '👩‍⚕️',
        },
        {
            name: 'Michael Chen',
            role: 'Head of Product',
            bio: 'Former grooming business owner turned software engineer',
            avatar: '👨‍💻',
        },
        {
            name: 'Emily Rodriguez',
            role: 'Customer Success',
            bio: 'Passionate about helping pet care businesses thrive',
            avatar: '👩‍💼',
        },
    ];

    return (
        <>
            <Head title="About Us" />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center space-x-3">
                            <ApplicationLogo className="h-10 w-auto" />
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                PetCare Pro
                            </span>
                        </Link>
                        <div className="hidden md:flex items-center space-x-8">
                            <Link href="/features" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors font-medium">
                                Features
                            </Link>
                            <Link href="/pricing" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors font-medium">
                                Pricing
                            </Link>
                            <Link href="/about" className="text-blue-600 dark:text-blue-400 font-semibold">
                                About
                            </Link>
                            <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors font-medium">
                                Contact
                            </Link>
                            <Link href="/login" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors font-medium">
                                Sign in
                            </Link>
                            <Link
                                href="/register"
                                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-16">
                {/* Hero Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in-up">
                            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">PetCare Pro</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            We're on a mission to empower pet care businesses with modern, intuitive software that simplifies operations and enhances customer experiences.
                        </p>
                    </div>
                </section>

                {/* Story Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="animate-fade-in-up">
                                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                    Our Story
                                </h2>
                                <div className="space-y-4 text-gray-600 dark:text-gray-400">
                                    <p>
                                        PetCare Pro was born from firsthand experience managing a busy veterinary practice. Our founder, Sarah Johnson, spent over a decade struggling with outdated software that made simple tasks unnecessarily complex.
                                    </p>
                                    <p>
                                        After countless hours lost to inefficient systems, Sarah decided to build the solution she wished existed. She assembled a team of veterinary professionals, groomers, and software engineers who shared her vision.
                                    </p>
                                    <p>
                                        Today, PetCare Pro serves thousands of pet care businesses across North America, helping them save time, reduce errors, and provide better care to the pets they serve.
                                    </p>
                                </div>
                            </div>
                            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-12 shadow-2xl">
                                    <div className="grid grid-cols-2 gap-6 text-white">
                                        <div className="text-center">
                                            <div className="text-5xl font-bold mb-2">250,000+</div>
                                            <div className="text-blue-100">Businesses Nationwide</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-5xl font-bold mb-2">5,000+</div>
                                            <div className="text-blue-100">Active Users</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-5xl font-bold mb-2">99.9%</div>
                                            <div className="text-blue-100">Uptime</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-5xl font-bold mb-2">24/7</div>
                                            <div className="text-blue-100">Support</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
                            What We Believe
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, index) => (
                                <div
                                    key={feature.title}
                                    className="group p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-transparent hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
                            Meet Our Team
                        </h2>
                        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                            A diverse group of pet lovers and tech enthusiasts dedicated to revolutionizing pet care management.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {team.map((member, index) => (
                                <div
                                    key={member.name}
                                    className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="text-center">
                                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-5xl mx-auto mb-4">
                                            {member.avatar}
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                            {member.name}
                                        </h3>
                                        <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">
                                            {member.role}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {member.bio}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 shadow-2xl">
                            <h2 className="text-4xl font-bold text-white mb-4">
                                Ready to Transform Your Business?
                            </h2>
                            <p className="text-xl text-blue-100 mb-8">
                                Join thousands of pet care professionals who trust PetCare Pro
                            </p>
                            <Link
                                href="/register"
                                className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                Start Your Free Trial
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 dark:bg-black text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        <p>&copy; 2026 PetCare Pro. All rights reserved.</p>
                        <div className="mt-4 space-x-6">
                            <Link href="/about" className="hover:text-white transition-colors">About</Link>
                            <Link href="/features" className="hover:text-white transition-colors">Features</Link>
                            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                        </div>
                    </div>
                </footer>
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

                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </>
    );
}
