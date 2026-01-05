import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // For demo purposes, just show success message
        // In production, this would send to a contact form handler
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setData({ name: '', email: '', subject: '', message: '' });
        }, 5000);
    };

    const contactMethods = [
        {
            icon: '📧',
            title: 'Email Us',
            description: 'support@petcarepro.com',
            action: 'mailto:support@petcarepro.com',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: '📞',
            title: 'Call Us',
            description: '1-800-PET-CARE',
            action: 'tel:1-800-738-2273',
            color: 'from-green-500 to-emerald-500',
        },
        {
            icon: '💬',
            title: 'Live Chat',
            description: 'Available 24/7',
            action: '#',
            color: 'from-purple-500 to-pink-500',
        },
        {
            icon: '📍',
            title: 'Visit Us',
            description: '123 Pet Street, CA 94102',
            action: '#',
            color: 'from-orange-500 to-red-500',
        },
    ];

    const faqs = [
        {
            question: 'What are your support hours?',
            answer: 'We offer 24/7 email and chat support. Phone support is available Monday-Friday, 9am-6pm PST.',
        },
        {
            question: 'Do you offer training or onboarding?',
            answer: 'Yes! We provide free onboarding sessions for all new customers, including video tutorials and live training.',
        },
        {
            question: 'Can I migrate my existing data?',
            answer: 'Absolutely. Our team will help you import data from spreadsheets or other systems at no extra cost.',
        },
    ];

    return (
        <>
            <Head title="Contact Us" />

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
                            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors font-medium">
                                About
                            </Link>
                            <Link href="/contact" className="text-blue-600 dark:text-blue-400 font-semibold">
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
                            Get in <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Touch</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>
                </section>

                {/* Contact Methods */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                            {contactMethods.map((method, index) => (
                                <a
                                    key={method.title}
                                    href={method.action}
                                    className="group p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-transparent hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${method.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                                        {method.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {method.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {method.description}
                                    </p>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Form */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Form */}
                            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                    Send us a Message
                                </h2>

                                {submitted && (
                                    <div className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 animate-fade-in">
                                        <div className="flex items-center">
                                            <svg className="w-6 h-6 text-green-600 dark:text-green-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-green-800 dark:text-green-200 font-medium">
                                                Thank you! We'll get back to you soon.
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            rows="6"
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing || submitted}
                                        className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? 'Sending...' : submitted ? 'Sent!' : 'Send Message'}
                                    </button>
                                </form>
                            </div>

                            {/* FAQs */}
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                    Quick Answers
                                </h2>
                                <div className="space-y-6">
                                    {faqs.map((faq, index) => (
                                        <div
                                            key={faq.question}
                                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg animate-fade-in-up"
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                        >
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                                                <span className="text-blue-600 mr-2">Q:</span>
                                                {faq.question}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 ml-6">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                                    <h3 className="text-2xl font-bold mb-4">
                                        Prefer to talk?
                                    </h3>
                                    <p className="text-blue-100 mb-6">
                                        Schedule a demo call with our team to see PetCare Pro in action.
                                    </p>
                                    <a
                                        href="#"
                                        className="inline-block px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg"
                                    >
                                        Schedule a Demo
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Map Section (Placeholder) */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-900 rounded-3xl h-96 flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-6xl mb-4">🗺️</div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    Our Office
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    123 Pet Street, San Francisco, CA 94102
                                </p>
                            </div>
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

                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                    opacity: 0;
                }

                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
            `}</style>
        </>
    );
}
