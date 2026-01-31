"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw } from "lucide-react";
import { PHILOSOPHER_INSIGHTS } from "@/core/constants/insights";
import { useLocale } from "next-intl";
import AdUnit from "@/components/shared/AdUnit";

interface LifeInsightsProps {
    age: number;
}

export function LifeInsights({ age }: LifeInsightsProps) {
    const locale = useLocale();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isShuffling, setIsShuffling] = useState(false);

    // Filter language simply by checking if the locale string contains 'id' or defaults to 'en'
    const lang = locale.startsWith('id') ? 'id' : 'en';

    const currentInsight = useMemo(() => {
        return PHILOSOPHER_INSIGHTS[currentIndex];
    }, [currentIndex]);

    const handleShuffle = () => {
        setIsShuffling(true);
        // Animate shuffle briefly (optional logic here, for now just switch)
        setTimeout(() => {
            const nextIndex = (currentIndex + 1) % PHILOSOPHER_INSIGHTS.length;
            setCurrentIndex(nextIndex);
            setIsShuffling(false);
        }, 500);
    };

    // Auto-shuffle on mount to random
    useEffect(() => {
        setCurrentIndex(Math.floor(Math.random() * PHILOSOPHER_INSIGHTS.length));
    }, []);

    return (
        <section className="w-full py-12 relative overflow-hidden">
            {/* Glow Backdrop */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse-slow" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-8 opacity-70">
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span className="text-sm font-medium tracking-[0.2em] text-amber-200/80 uppercase">
                        The Philosopher
                    </span>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                </div>

                <div className="min-h-[200px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {!isShuffling && (
                            <motion.div
                                key={currentInsight.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="space-y-6"
                            >
                                <blockquote className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-slate-100 font-serif opacity-90">
                                    <span className="text-indigo-400 opacity-50 text-6xl align-top mr-2 font-sans">"</span>
                                    {currentInsight.text[lang]}
                                    <span className="text-indigo-400 opacity-50 text-6xl align-bottom ml-2 font-sans">"</span>
                                </blockquote>

                                <div className="text-sm text-slate-500 uppercase tracking-widest mt-8">
                                    — Digital Oracle, {currentInsight.category}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-12 flex justify-center">
                    <button
                        onClick={handleShuffle}
                        disabled={isShuffling}
                        className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-95"
                    >
                        <RefreshCw className={`w-4 h-4 text-indigo-300 transition-transform duration-500 ${isShuffling ? "animate-spin" : "group-hover:rotate-180"}`} />
                        <span className="text-sm text-indigo-200">Reflect Again</span>
                    </button>
                </div>

                {/* Content Ad (Replaces Blog Ad 1) */}
                <div className="mt-16 border-t border-white/5 pt-8">
                    <AdUnit
                        slot="5949387054"
                        format="fluid"
                        layout="in-article"
                        responsive="true"
                        className="min-h-[250px]"
                        label="SPONSORED INSIGHT"
                    />
                </div>
            </div>
        </section>
    );
}
