"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SmartDateInput } from '@/components/ui/SmartDateInput';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { calculateAgeGap, AgeGap } from '@/core/engines/compare-engine';
import { ArrowRight, Trophy, Users } from 'lucide-react';

export function CompareMode() {
    const [dateA, setDateA] = useState<Date | null>(null);
    const [dateB, setDateB] = useState<Date | null>(null);
    const [result, setResult] = useState<AgeGap | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);

    const handleCompare = () => {
        if (!dateA || !dateB) return;
        setIsCalculating(true);

        // Simulate "Battle" processing
        setTimeout(() => {
            const gap = calculateAgeGap(dateA, dateB);
            setResult(gap);
            setIsCalculating(false);
        }, 1500);
    };

    const reset = () => {
        setResult(null);
        setDateA(null);
        setDateB(null);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
            <AnimatePresence mode="wait">
                {!result ? (
                    <motion.div
                        key="input-stage"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-12"
                    >
                        <div className="text-center space-y-4">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/10 text-indigo-400 mb-4 border border-indigo-500/20">
                                <Users className="w-8 h-8" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold font-serif text-white">Social Battle</h1>
                            <p className="text-slate-400 text-lg">Compare your timeline with a friend or partner.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-center relative">
                            {/* Player A */}
                            <div className="space-y-6 p-8 rounded-3xl bg-slate-900/50 border border-white/5 backdrop-blur-sm">
                                <h3 className="text-xl font-semibold text-indigo-300">Player 1 (You)</h3>
                                <SmartDateInput onDateChange={setDateA} />
                            </div>

                            {/* VS Badge */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-slate-950 border-4 border-slate-900 shadow-xl font-black text-white italic text-xl">
                                VS
                            </div>

                            {/* Player B */}
                            <div className="space-y-6 p-8 rounded-3xl bg-slate-900/50 border border-white/5 backdrop-blur-sm">
                                <h3 className="text-xl font-semibold text-rose-300">Player 2 (Them)</h3>
                                <SmartDateInput onDateChange={setDateB} />
                            </div>
                        </div>

                        <div className="flex justify-center pt-8">
                            <MagneticButton
                                onClick={handleCompare}
                                disabled={!dateA || !dateB || isCalculating}
                                className="bg-white text-slate-950 px-12 py-4 rounded-full text-lg font-bold hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isCalculating ? "Calculating..." : "Start Battle"}
                            </MagneticButton>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="result-stage"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-12"
                    >
                        {/* Winner/Older Highlight */}
                        <div className="text-center space-y-6">
                            <div className="inline-block px-4 py-1.5 rounded-full bg-slate-800/50 border border-white/10 text-sm text-slate-400 mb-4">
                                The results are in
                            </div>
                            <h2 className="text-4xl md:text-6xl font-bold text-white font-serif">
                                {result.gapDescription}
                            </h2>
                            <div className="text-7xl font-mono font-bold text-indigo-400 opacity-80">
                                {result.days.toLocaleString()} <span className="text-2xl text-slate-500">days gap</span>
                            </div>
                        </div>

                        {/* Progress Bar Visualization */}
                        <div className="relative pt-12 pb-24 px-4">
                            <div className="h-4 bg-slate-800 rounded-full w-full overflow-hidden relative">
                                <div className="absolute left-0 top-0 bottom-0 bg-indigo-500 w-1/2 z-10" />
                                <div className="absolute right-0 top-0 bottom-0 bg-rose-500 w-1/2 z-0" />

                                {/* Marker for Older Person extra time */}
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className={`absolute top-0 bottom-0 ${result.olderPerson === 'A' ? 'bg-indigo-400 right-1/2 origin-right' : 'bg-rose-400 left-1/2 origin-left'}`}
                                    style={{ width: `${result.percentageDifference / 2}%` }} // Simplified visual logic
                                />
                            </div>

                            {/* Annotations */}
                            <div className="flex justify-between mt-4 text-sm font-medium">
                                <span className="text-indigo-400">Player 1</span>
                                <span className="text-rose-400">Player 2</span>
                            </div>
                        </div>

                        <div className="flex justify-center gap-4">
                            <MagneticButton onClick={reset} className="bg-slate-800 text-white px-8 py-3 rounded-full hover:bg-slate-700">
                                Rematch
                            </MagneticButton>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
