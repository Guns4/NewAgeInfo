import React from 'react';

export const metadata = {
    title: 'Privacy Policy',
    description: 'Privacy Policy for Ageinfo',
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 max-w-3xl mx-auto font-sans text-slate-300">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 font-serif">Privacy Policy</h1>
            <p className="text-sm text-slate-500 mb-12 uppercase tracking-widest">Last Updated: January 31, 2026</p>

            <div className="space-y-8 leading-relaxed">
                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
                    <p>
                        Welcome to Ageinfo ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy.
                        This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website ageinfo.online.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
                    <p className="mb-4">
                        We collect information that you voluntarily provide to us when you use our calculators or specific features.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 marker:text-indigo-500">
                        <li><strong>Input Data:</strong> Birth dates and times provided for calculation purposes. This data is processed locally in your browser and is not stored on our servers unless explicitly stated otherwise.</li>
                        <li><strong>Usage Data:</strong> We may collect anonymous usage statistics (such as page views, interaction depth) to improve user experience using privacy-friendly analytics tools.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
                    <p>
                        We use the information we collect to:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 marker:text-indigo-500 mt-2">
                        <li>Provide and maintain the Service.</li>
                        <li>Calculate demographic and planetary statistics.</li>
                        <li>Monitor the usage of our Service to detect technical issues.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">4. Cookies and Tracking</h2>
                    <p>
                        We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.
                        You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">5. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at legal@ageinfo.online.
                    </p>
                </section>
            </div>
        </div>
    );
}
