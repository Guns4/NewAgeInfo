"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Plus, X, ArrowRight, Calendar, Droplets, Link2, Timer } from "lucide-react";
import { compareAges, ComparisonResult } from "@/core/logic/timeBridge";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { NeoInput } from "@/components/ui/NeoInput";
import { format } from "date-fns";
import { cn } from "@/core/utils";

interface TimeBridgeProps {
    primaryBirthDate: Date;
    className?: string;
}

export function TimeBridge({ primaryBirthDate, className }: TimeBridgeProps) {
    const [secondaryDate, setSecondaryDate] = useState<Date | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [isComparing, setIsComparing] = useState(false);

    const comparison = useMemo(() => {
        if (!secondaryDate) return null;
        return compareAges(primaryBirthDate, secondaryDate);
    }, [primaryBirthDate, secondaryDate]);

    const handleAdd = () => {
        const date = new Date(inputValue);
        if (!isNaN(date.getTime())) {
            setSecondaryDate(date);
            setIsComparing(true);
        }
    };

    const reset = () => {
        setSecondaryDate(null);
        setInputValue("");
        setIsComparing(false);
    };

    return (
        <div className={cn("relative min-h-[400px] w-full", className)}>
            <AnimatePresence mode="wait">
                {!isComparing ? (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="flex flex-col items-center justify-center h-full space-y-6 text-center py-12"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />
                            <div className="relative w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center border border-white/10 shadow-2xl">
                                <Users className="w-8 h-8 text-indigo-400" />
                            </div>
                        </div>
                        <div className="space-y-2 max-w-sm">
                            <h3 className="text-xl font-bold text-white">Compare Life Paths</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Build a bridge between two souls. See your shared milestones and age gaps in high resolution.
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 w-full max-w-xs">
                            <NeoInput
                                label="Traveler's Birthdate"
                                type="date"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <MagneticButton onClick={handleAdd} className="w-full">
                                Build Time Bridge
                            </MagneticButton>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="comparison"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-4"
                    >
                        {/* Bridge Visual (Vertical Timeline) */}
                        <div className="lg:col-span-4 flex justify-center py-8 relative">
                            <div className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500/0 via-indigo-500/50 to-indigo-500/0 rounded-full" />

                            <div className="relative h-[300px] w-48">
                                {/* User 1 Avatar */}
                                <motion.div
                                    initial={{ y: 200 }}
                                    animate={{ y: 50 }}
                                    className="absolute left-0"
                                >
                                    <Avatar label="You" color="indigo" />
                                </motion.div>

                                {/* User 2 Avatar */}
                                <motion.div
                                    initial={{ y: 300 }}
                                    animate={{ y: 150 }}
                                    className="absolute right-0"
                                >
                                    <Avatar label="Friend" color="purple" />
                                </motion.div>

                                {/* Connecting Bridge */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                                    <motion.path
                                        d="M 40 75 L 150 175"
                                        stroke="url(#bridgeGradient)"
                                        strokeWidth="2"
                                        strokeDasharray="4 4"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                    />
                                    <defs>
                                        <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#6366f1" />
                                            <stop offset="100%" stopColor="#a855f7" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>

                        {/* Stats Dashboard */}
                        <div className="lg:col-span-8 space-y-4">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                                    <Link2 className="w-5 h-5 text-indigo-400" />
                                    Bridge Analysis
                                </h4>
                                <button onClick={reset} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-500 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InsightCard
                                    icon={<Timer className="text-indigo-400" />}
                                    label="Age Separation"
                                    value={comparison?.ageGapHours.toLocaleString() ?? "0"}
                                    unit="Hours"
                                />
                                <InsightCard
                                    icon={<Droplets className="text-blue-400" />}
                                    label="Shared Timeline"
                                    value={comparison?.daysTogether.toLocaleString() ?? "0"}
                                    unit="Days"
                                />
                            </div>

                            <div className="space-y-3 mt-6">
                                <h5 className="text-xs font-black text-slate-500 uppercase tracking-widest">Upcoming Sync Milestones</h5>
                                {comparison?.syncDates.map((milestone, idx) => (
                                    <motion.div
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        key={milestone.label}
                                        className="p-4 rounded-xl bg-slate-900/50 border border-white/5 flex items-center gap-4 hover:border-indigo-500/30 transition-all group"
                                    >
                                        <div className="p-3 bg-slate-800 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
                                            <Calendar className="w-5 h-5 text-slate-400 group-hover:text-indigo-400" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-bold text-slate-200">{milestone.label}</span>
                                                <span className="text-xs font-mono text-indigo-400">{format(milestone.date, "MMM yyyy")}</span>
                                            </div>
                                            <p className="text-xs text-slate-500">{milestone.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function Avatar({ label, color }: { label: string, color: 'indigo' | 'purple' }) {
    const colors = {
        indigo: 'from-indigo-500 to-indigo-700',
        purple: 'from-purple-500 to-purple-700'
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <div className={cn(
                "w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-xl border border-white/10",
                colors[color]
            )}>
                <Users className="w-6 h-6 text-white" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">{label}</span>
        </div>
    );
}

function InsightCard({ icon, label, value, unit }: { icon: React.ReactNode, label: string, value: string, unit: string }) {
    return (
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-2 mb-2">
                {icon}
                <span className="text-xs text-slate-400 font-medium">{label}</span>
            </div>
            <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white font-mono">{value}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">{unit}</span>
            </div>
        </div>
    );
}
