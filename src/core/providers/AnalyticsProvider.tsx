"use client";

import React, { useEffect, useState } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ThumbsUp } from 'lucide-react';

// Initialize PostHog (Client-side only)
if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc_TEST_KEY_FALLBACK', {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
        loaded: (ph) => {
            if (process.env.NODE_ENV === 'development') ph.opt_out_capturing();
        },
        capture_pageview: false, // Manual capture if needed, or true for auto
        property_blacklist: ['$ip'], // Anonymize IP address
        persistence: 'localStorage+cookie'
    });
}

function NPSFeedbackToast({ onClose }: { onClose: () => void }) {
    const handleVote = (score: number) => {
        posthog.capture('nps_score', { score });
        onClose();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-slate-900/90 backdrop-blur-md text-white px-6 py-4 rounded-full border border-white/10 shadow-2xl"
        >
            <div className="flex items-center gap-2 text-sm font-medium">
                <ThumbsUp className="w-4 h-4 text-emerald-400" />
                <span>Enjoying Ageinfo?</span>
            </div>
            <div className="flex gap-2">
                <button onClick={() => handleVote(1)} className="hover:text-amber-400 transition-colors">🙁</button>
                <button onClick={() => handleVote(3)} className="hover:text-amber-400 transition-colors">😐</button>
                <button onClick={() => handleVote(5)} className="hover:text-emerald-400 transition-colors">🤩</button>
            </div>
            <button onClick={onClose} className="ml-2 text-slate-500 hover:text-white">
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
    const [showNPS, setShowNPS] = useState(false);

    // 1. Scroll Depth Tracking
    useEffect(() => {
        const handleScroll = () => {
            const scrollPercent = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
            if (scrollPercent > 0.8) {
                posthog.capture('scroll_depth_80');
                // Remove listener once triggered to avoid spam, or debounce
                window.removeEventListener('scroll', handleScroll);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 2. Retention Trigger (3 minutes)
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNPS(true);
        }, 180000); // 3 minutes
        return () => clearTimeout(timer);
    }, []);

    return (
        <PostHogProvider client={posthog}>
            {children}
            <AnimatePresence>
                {showNPS && <NPSFeedbackToast onClose={() => setShowNPS(false)} />}
            </AnimatePresence>
        </PostHogProvider>
    );
}
