import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Pricing({ trialDays = 14, monthlyPrice = 29.99 }) {
    const features = [
        'Unlimited clients & pets',
        'Smart appointment scheduling',
        'Automated reminders (SMS & Email)',
        'Medical records management',
        'Vaccination tracking',
        'Invoicing & payments',
        'Revenue analytics',
        'Staff management',
        'Multi-location support',
        'Mobile responsive',
        'Cloud backup',
        '24/7 customer support',
        'Google Calendar sync',
        'Custom branding',
        'API access',
        'Priority feature requests',
    ];

    const faqs = [
        {
            question: 'What happens after the trial ends?',
            answer: `After your ${trialDays}-day trial, you'll be prompted to add payment information to continue using PetCare Pro. Your data is always safe and accessible.`,
        },
        {
            question: 'Can I cancel anytime?',
            answer: 'Yes! You can cancel your subscription at any time. There are no long-term contracts or cancellation fees.',
        },
        {
            question: 'Is there a setup fee?',
            answer: 'No setup fees, no hidden charges. Just a simple monthly subscription with all features included.',
        },
        {
            question: 'Do you offer discounts for annual billing?',
            answer: 'Yes! Pay annually and save 20%. Contact our sales team for custom pricing for multiple locations.',
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards (Visa, Mastercard, American Express) via Stripe, as well as PayPal.',
        },
        {
            question: 'Is my data secure?',
            answer: 'Absolutely. We use bank-level encryption, daily backups, and are HIPAA compliant. Your data is safe with us.',
        },
    ];

    return (
        <>
            <Head title="Pricing" />

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
                            <Link href="/pricing" className="text-blue-600 dark:text-blue-400 font-semibold">
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
                            Simple, Transparent <br />
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Pricing</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            One plan, all features. Start with a {trialDays}-day free trial.
                        </p>
                    </div>
                </section>

                {/* Pricing Card */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            {/* Trial Badge */}
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full px-6 py-2 shadow-lg animate-bounce-slow">
                                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                    <span className="text-sm font-bold text-white">
                                        🎉 {trialDays}-Day Free Trial
                                    </span>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden mt-4">
                                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-12 text-center">
                                    <h2 className="text-3xl font-bold text-white mb-4">
                                        Professional Plan
                                    </h2>
                                    <div className="flex items-center justify-center space-x-2 mb-2">
                                        <span className="text-6xl font-bold text-white">
                                            ${Number(monthlyPrice).toFixed(2)}
                                        </span>
                                        <span className="text-2xl text-blue-100">/month</span>
                                    </div>
                                    <p className="text-blue-100">
                                        Billed monthly. Cancel anytime.
                                    </p>
                                    <div className="mt-8">
                                        <Link
                                            href="/register"
                                            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                                        >
                                            Start Free Trial
                                        </Link>
                                    </div>
                                    <p className="text-sm text-blue-100 mt-4">
                                        No credit card required
                                    </p>
                                </div>

                                <div className="p-12">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                                        Everything Included
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {features.map((feature) => (
                                            <div key={feature} className="flex items-center space-x-3">
                                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Money-Back Guarantee */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 border-2 border-green-200 dark:border-green-800 rounded-3xl p-12 text-center">
                            <div className="text-6xl mb-4">💯</div>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                30-Day Money-Back Guarantee
                            </h3>
                            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                Not satisfied? Get a full refund within 30 days of your first payment. No questions asked.
                            </p>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-6">
                            {faqs.map((faq, index) => (
                                <div
                                    key={faq.question}
                                    className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 animate-fade-in-up"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                                        <span className="text-blue-600 mr-3">Q:</span>
                                        {faq.question}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 ml-8">
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Annual Savings */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
                            <div className="text-5xl mb-4">💰</div>
                            <h3 className="text-3xl font-bold mb-4">
                                Save 20% with Annual Billing
                            </h3>
                            <p className="text-xl text-blue-100 mb-6">
                                Pay ${(Number(monthlyPrice) * 12 * 0.8).toFixed(2)} per year instead of ${(Number(monthlyPrice) * 12).toFixed(2)}
                            </p>
                            <Link
                                href="/contact"
                                className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                Contact Sales
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Trust Indicators */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                            <div className="p-6">
                                <div className="text-5xl mb-3">🔒</div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Secure Payments</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">256-bit SSL encryption</p>
                            </div>
                            <div className="p-6">
                                <div className="text-5xl mb-3">☁️</div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Daily Backups</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Your data is always safe</p>
                            </div>
                            <div className="p-6">
                                <div className="text-5xl mb-3">🏥</div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">HIPAA Compliant</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Healthcare-grade security</p>
                            </div>
                            <div className="p-6">
                                <div className="text-5xl mb-3">📞</div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">24/7 Support</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">We're here to help</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                            Join thousands of pet care professionals using PetCare Pro
                        </p>
                        <Link
                            href="/register"
                            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            Start Your {trialDays}-Day Free Trial
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                            No credit card required • Cancel anytime • 30-day money-back guarantee
                        </p>
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

                @keyframes bounce-slow {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                    opacity: 0;
                }

                .animate-bounce-slow {
                    animation: bounce-slow 3s ease-in-out infinite;
                }
            `}</style>
        </>
    );
}
