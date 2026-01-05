import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Features() {
    const mainFeatures = [
        {
            title: 'Client & Pet Management',
            description: 'Complete profiles with medical history, preferences, and automated record keeping',
            icon: '👥',
            color: 'from-blue-500 to-cyan-500',
            features: [
                'Unlimited client profiles',
                'Detailed pet health records',
                'Vaccination tracking',
                'Medical history timeline',
                'Photo uploads',
                'Custom notes & tags',
            ],
        },
        {
            title: 'Smart Scheduling',
            description: 'Intelligent appointment booking with automated reminders and calendar sync',
            icon: '📅',
            color: 'from-purple-500 to-pink-500',
            features: [
                'Drag-and-drop calendar',
                'SMS & email reminders',
                'Recurring appointments',
                'Staff assignment',
                'Availability management',
                'Google Calendar sync',
            ],
        },
        {
            title: 'Service Management',
            description: 'Define services, pricing, and packages with flexible configuration',
            icon: '✂️',
            color: 'from-green-500 to-emerald-500',
            features: [
                'Custom service catalog',
                'Dynamic pricing',
                'Service packages',
                'Duration estimates',
                'Staff specializations',
                'Seasonal promotions',
            ],
        },
        {
            title: 'Invoicing & Payments',
            description: 'Professional invoicing with integrated payment processing',
            icon: '💰',
            color: 'from-orange-500 to-red-500',
            features: [
                'Automated invoicing',
                'Stripe integration',
                'Payment tracking',
                'Refund management',
                'Receipt generation',
                'Tax calculations',
            ],
        },
        {
            title: 'Analytics & Reports',
            description: 'Comprehensive business insights with beautiful visualizations',
            icon: '📊',
            color: 'from-indigo-500 to-purple-500',
            features: [
                'Revenue analytics',
                'Client retention metrics',
                'Service performance',
                'Staff productivity',
                'Custom date ranges',
                'Exportable reports',
            ],
        },
        {
            title: 'Staff Management',
            description: 'Organize your team with role-based access and permissions',
            icon: '👔',
            color: 'from-pink-500 to-rose-500',
            features: [
                'Role-based access',
                'Staff scheduling',
                'Performance tracking',
                'Commission management',
                'Time tracking',
                'Team collaboration',
            ],
        },
    ];

    const additionalFeatures = [
        { icon: '🔒', title: 'Secure & Compliant', description: 'HIPAA-compliant data encryption' },
        { icon: '📱', title: 'Mobile Responsive', description: 'Works on any device, anywhere' },
        { icon: '☁️', title: 'Cloud-Based', description: 'Access from anywhere, automatic backups' },
        { icon: '🔔', title: 'Smart Notifications', description: 'Real-time alerts for important events' },
        { icon: '🌐', title: 'Multi-Location', description: 'Manage multiple locations from one account' },
        { icon: '🎨', title: 'Customizable', description: 'Tailor the system to your workflow' },
    ];

    return (
        <>
            <Head title="Features" />

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
                            <Link href="/features" className="text-blue-600 dark:text-blue-400 font-semibold">
                                Features
                            </Link>
                            <Link href="/pricing" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors font-medium">
                                Pricing
                            </Link>
                            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors font-medium">
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
                            Everything You Need to Run Your <br />
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Pet Care Business</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            Powerful features designed specifically for groomers, veterinarians, pet sitters, and pet care professionals.
                        </p>
                    </div>
                </section>

                {/* Main Features */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {mainFeatures.map((feature, index) => (
                                <div
                                    key={feature.title}
                                    className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="flex items-start space-x-4 mb-6">
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl flex-shrink-0`}>
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                                {feature.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                    <ul className="grid grid-cols-2 gap-3">
                                        {feature.features.map((item) => (
                                            <li key={item} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                                                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-sm">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Additional Features */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
                            And Much More
                        </h2>
                        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                            Additional features that make PetCare Pro the complete solution for your business
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {additionalFeatures.map((feature, index) => (
                                <div
                                    key={feature.title}
                                    className="group p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-transparent hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
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

                {/* Integration Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 shadow-2xl">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                <div className="text-white">
                                    <h2 className="text-4xl font-bold mb-6">
                                        Seamless Integrations
                                    </h2>
                                    <p className="text-xl text-blue-100 mb-8">
                                        Connect with your favorite tools and services for a unified workflow
                                    </p>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-lg">Google Calendar & Outlook sync</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-lg">Stripe & PayPal payments</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-lg">SMS & Email notifications</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-lg">QuickBooks accounting</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {['Stripe', 'Google', 'PayPal', 'QuickBooks'].map((brand) => (
                                        <div key={brand} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 flex items-center justify-center hover:bg-white/20 transition-colors">
                                            <span className="text-2xl font-bold text-white">{brand}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Ready to Experience All These Features?
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                            Start your free trial today. No credit card required.
                        </p>
                        <Link
                            href="/register"
                            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            Start Free Trial
                        </Link>
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
