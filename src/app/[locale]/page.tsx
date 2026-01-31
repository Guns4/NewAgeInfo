"use client"; // Needs to be client for state

import { HeroSection } from "@/components/modules/HeroSection";
import { WorldClock } from "@/components/ui/WorldClock";
import { LoadingSequence } from "@/components/ui/LoadingSequence";
import { ResultView } from "@/components/modules/ResultView";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSensory } from "@/core/providers/SensoryProvider";

type ViewState = "input" | "loading" | "result";

export default function Home() {
    const { playTransition, playSuccess } = useSensory();

    // State
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const [viewState, setViewState] = useState<ViewState>("input");

    // Persistence: Hydrate from SessionStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedDate = sessionStorage.getItem("ageinfo_birthdate");
            if (savedDate) {
                const date = new Date(savedDate);
                if (!isNaN(date.getTime())) {
                    setBirthDate(date);
                    // Optionally jump straight to result?
                    // Let's keep them at input but prefilled, OR if we want "never die" experience,
                    // we can check if they were viewing results.
                    // For now, just prefill state, they can click calculate easily.
                    // Actually, prompt says "data yang sudah diinput harus tetap ada".
                }
            }
        }
    }, []);

    // Persistence: Save to SessionStorage
    useEffect(() => {
        if (birthDate) {
            sessionStorage.setItem("ageinfo_birthdate", birthDate.toISOString());
        }
    }, [birthDate]);

    // Deep Link Logic
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const dateParam = params.get('d');
            if (dateParam) {
                const date = new Date(dateParam);
                if (!isNaN(date.getTime())) {
                    setBirthDate(date);
                    setViewState("result"); // Skip animation for direct links
                }
            }
        }
    }, []);

    const handleCalculate = (date: Date) => {
        setBirthDate(date);
        setViewState("loading");
        playTransition();

        // Simulate Calculation Time (UX)
        setTimeout(() => {
            playSuccess();
            setViewState("result");
            // Notify PWA Install Prompt
            window.dispatchEvent(new CustomEvent('ageinfo-result-ready'));

            // Update URL without reload
            const dateStr = date.toISOString().split('T')[0];
            window.history.pushState({}, '', `?d=${dateStr}`);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 1500); // 1.5s Loading sequence
    };

    const handleReset = () => {
        playTransition();
        setViewState("input");
        setBirthDate(null);
        window.history.pushState({}, '', window.location.pathname);
    };

    return (
        <main className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-x-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 pointer-events-none" />
            <WorldClock />

            {/* Content Container */}
            <div className="z-10 w-full px-4">
                <AnimatePresence mode="wait">
                    {viewState === "input" && (
                        <motion.div
                            key="hero"
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="mb-12 text-center space-y-4">
                                <h1 className="sr-only">Ageinfo - Cosmic Age Intelligence</h1>
                            </div>
                            <HeroSection onSubmit={handleCalculate} />
                            <div className="mt-16 text-center">
                                <p className="text-slate-500 text-sm">
                                    Trusted by 1M+ souls exploring their timeline.
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {viewState === "loading" && (
                        <motion.div
                            key="loading"
                            className="fixed inset-0 flex items-center justify-center z-50 bg-slate-950/80 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <LoadingSequence />
                        </motion.div>
                    )}

                    {viewState === "result" && birthDate && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full"
                        >
                            <ResultView birthDate={birthDate} onReset={handleReset} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    )
}
