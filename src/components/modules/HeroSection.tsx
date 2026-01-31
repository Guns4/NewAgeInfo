"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NeoInput } from "@/components/ui/NeoInput";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowRight, Sparkles, Lock } from "lucide-react";
import { useRouter } from "@/navigation";
import { SmartDateInput } from "@/components/ui/SmartDateInput";
import { useSensory, useHaptic } from "@/core/providers/SensoryProvider";

interface HeroSectionProps {
    onSubmit?: (birthDate: Date) => void;
}

export function HeroSection({ onSubmit }: HeroSectionProps) {
    const router = useRouter(); // Keep for legacy routing if no onSubmit provided
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [showTime, setShowTime] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);

    const { playSuccess, playHover } = useSensory();
    const { pulse } = useHaptic();

    const handleCalculate = () => {
        if (!date) return;

        setIsCalculating(true);
        playHover(); // "Ticking" sound
        pulse(); // 10ms pulse

        const d = new Date(`${date}T${time || "00:00"}`);

        if (onSubmit) {
            // New Single Page Flow
            setTimeout(() => {
                playSuccess();
                onSubmit(d);
                setIsCalculating(false); // Reset state in case they come back
            }, 800);
        } else {
            // Legacy Routing Flow
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const routeDate = `${month}-${day}`;

            setTimeout(() => {
                playSuccess();
                router.push(`/history/${routeDate}?year=${d.getFullYear()}${time ? `&time=${time}` : ''}`);
            }, 800);
        }
    };

    return (
        <div className="relative z-10 w-full max-w-xl mx-auto text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-8"
            >
                <div className="space-y-2">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-100 tracking-tight">
                        When did your story <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">begin?</span>
                    </h2>
                    <p className="text-slate-300 text-lg">
                        Discover the cosmic alignment of your existence.
                    </p>
                </div>

                <div className="bg-slate-950/50 backdrop-blur-xl border border-white/5 p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
                    {/* Glow effect */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-700 blur-2xl pointer-events-none" />

                    <div className="space-y-6 relative z-10">
                        {/* Smart Segmented Input */}
                        <SmartDateInput
                            value={date}
                            onChange={(val) => setDate(val)}
                        />

                        {/* Privacy Micro-copy */}
                        <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500/80 bg-slate-900/50 py-1.5 px-3 rounded-full border border-white/5 w-fit mx-auto">
                            <Lock className="w-3 h-3" />
                            <span>Privacy Guaranteed: Data processed locally on your device.</span>
                        </div>

                        <div className="flex items-center justify-end">
                            <button
                                onClick={() => setShowTime(!showTime)}
                                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 font-medium"
                            >
                                {showTime ? "Remove Time" : "+ Add Time of Birth"}
                            </button>
                        </div>

                        <AnimatePresence>
                            {showTime && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <NeoInput
                                        label="Time (Optional)"
                                        type="time"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        className="text-left"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="pt-2">
                            <MagneticButton
                                onClick={handleCalculate}
                                className="w-full"
                                disabled={!date || isCalculating}
                                aria-label="Calculate lifecycle intelligence"
                            >
                                <div className={`
                                    relative w-full h-16 rounded-xl flex items-center justify-center gap-2 font-bold text-lg tracking-wide
                                    ${!date ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5' : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-500/20 border border-indigo-400/20'}
                                    transition-all duration-300 group-hover:scale-[1.02]
                                `}>
                                    {isCalculating ? (
                                        <Sparkles className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            Calculate My Life <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </div>
                            </MagneticButton>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
