"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { useLocale } from "next-intl";

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const locale = useLocale();

    useEffect(() => {
        // Simulate checking for existing consent
        const hasConsented = localStorage.getItem("ageinfo_consent");
        // Simulate Geo-targeting (randomly specific for demo, or always show initially)
        if (!hasConsented) {
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("ageinfo_consent", "true");
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("ageinfo_consent", "false");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 z-50 md:max-w-md w-full"
                >
                    <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl relative overflow-hidden">
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                                    <Cookie className="w-6 h-6" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <h3 className="font-semibold text-white">Privacy Choice</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        We use cookies to analyze traffic and enhance your cosmic journey.
                                        We respect your data privacy under GDPR/CCPA standards.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="text-slate-500 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="mt-6 flex gap-3">
                                <button
                                    onClick={handleAccept}
                                    className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium py-2.5 rounded-lg transition-all shadow-lg hover:shadow-indigo-500/25"
                                >
                                    Accept All
                                </button>
                                <button
                                    onClick={handleDecline}
                                    className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-sm font-medium py-2.5 rounded-lg transition-all border border-white/5"
                                >
                                    Necessary Only
                                </button>
                            </div>

                            <div className="mt-4 text-center">
                                <a href={`/${locale}/legal/privacy`} className="text-xs text-slate-500 hover:text-indigo-400 underline decoration-slate-700 underline-offset-4 transition-colors">
                                    Read Privacy Policy
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
