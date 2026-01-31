import React from 'react';

export const metadata = {
    title: 'Terms of Service',
    description: 'Terms of Service for Ageinfo',
};

export default function TermsOfService() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 max-w-3xl mx-auto font-sans text-slate-300">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 font-serif">Terms of Service</h1>
            <p className="text-sm text-slate-500 mb-12 uppercase tracking-widest">Last Updated: January 31, 2026</p>

            <div className="space-y-8 leading-relaxed">
                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
                    <p>
                        By accessing or using Ageinfo, you agree to be bound by these Terms of Service. If you disagree with any part of the terms,
                        then you may not access the Service.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">2. Intellectual Property</h2>
                    <p>
                        The Service and its original content, features, and functionality are and will remain the exclusive property of Ageinfo and its licensors.
                        The visualization algorithms, "Digital Oracle" insights, and design systems are protected by copyright and other intellectual property laws.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">3. Disclaimer</h2>
                    <p className="mb-4">
                        Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis.
                    </p>
                    <p>
                        While we strive for high precision in our calculations (e.g., Planetary Ages, Survival Rates), the data presented is for informational
                        and entertainment purposes only. Ageinfo makes no warranties regarding the accuracy or completeness of the materials.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-white mb-4">4. Limitation of Liability</h2>
                    <p>
                        In no event shall Ageinfo be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation,
                        loss of profits, data, use, goodwill, or other intangible losses.
                    </p>
                </section>
            </div>
        </div>
    );
}
