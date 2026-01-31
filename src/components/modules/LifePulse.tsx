import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useLifePulse } from "@/core/hooks/useLifePulse";
import { usePageVisibility } from "@/core/hooks/usePageVisibility";
import { motion } from "framer-motion";
import { Activity, Wind } from "lucide-react";
import { cn } from "@/lib/utils";
import { DynamicNumber } from "@/components/ui/DynamicNumber";

interface LifePulseProps {
    birthDate: Date;
}

export function LifePulse({ birthDate }: LifePulseProps) {
    const isPageVisible = usePageVisibility();
    const stats = useLifePulse(birthDate, isPageVisible);

    const PulseItem = ({ label, value, icon: Icon, color }: any) => (
        <div className="flex items-center space-x-3">
            <div className={cn("p-2 rounded-full bg-slate-800/50", color)}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{label}</p>
                <div className="text-lg font-bold text-white tabular-nums">
                    <DynamicNumber value={Number(value.replace(/,/g, ''))} />
                </div>
            </div>
        </div>
    );

    return (
        <GlassCard className="p-6 md:p-8" hoverEffect={false}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Main Seconds Display */}
                <div className="text-center md:text-left flex-1">
                    <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-2">
                        You have been alive for
                    </h3>
                    <div
                        className="relative inline-flex items-baseline justify-center md:justify-start flex-wrap gap-1 md:gap-2"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        <motion.span
                            className="text-4xl sm:text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 tabular-nums tracking-tighter"
                            animate={{ opacity: [1, 0.9, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            aria-label={`${stats.secondsLived} seconds`}
                        >
                            {stats.secondsLived}
                        </motion.span>
                        <span className="text-xl sm:text-2xl md:text-4xl font-bold text-slate-600" aria-hidden="true">.{stats.milliseconds}</span>
                        <span className="text-base sm:text-lg md:text-2xl font-bold text-slate-500 ml-1 md:ml-2">seconds</span>
                    </div>
                </div>

                {/* Metrics Grid - Hidden on mobile, visible on lg screens as a summary */}
                <div className="hidden lg:grid grid-cols-2 gap-x-8 gap-y-4 w-auto bg-white/5 p-6 rounded-2xl border border-white/5">
                    <PulseItem
                        label="Heartbeats"
                        value={stats.heartbeats}
                        icon={Activity}
                        color="text-rose-400"
                    />
                    <PulseItem
                        label="Breaths"
                        value={stats.breaths}
                        icon={Wind}
                        color="text-cyan-400"
                    />
                    {/* Space removed to keep it cleaner, already in sidebar */}
                </div>
            </div>
        </GlassCard>
    );
}
