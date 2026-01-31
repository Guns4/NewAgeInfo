"use client";

import React, { useMemo } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, ReferenceLine, CartesianGrid } from "recharts";
import { calculateBiorhythm, getBiorhythmCycles } from "@/core/logic/biorhythm";
import { Activity, Brain, Heart, Info, Sparkles } from "lucide-react";
import { addDays, format } from "date-fns";
import { cn } from "@/core/utils";
import { motion } from "framer-motion";

interface BiorhythmChartProps {
    birthDate: Date;
    className?: string;
}

export function BiorhythmChart({ birthDate, className }: BiorhythmChartProps) {
    const today = new Date();

    // Generate data for the last 15 and next 15 days
    const chartData = useMemo(() => {
        const data = [];
        for (let i = -15; i <= 15; i++) {
            const date = addDays(today, i);
            const bio = calculateBiorhythm(birthDate, date);
            data.push({
                offset: i,
                displayDate: format(date, "MMM dd"),
                ...bio
            });
        }
        return data;
    }, [birthDate]);

    const cycles = getBiorhythmCycles(birthDate, today);
    // Find the cycle with the absolute highest peak for the daily highlight
    const topCycle = [...cycles].sort((a, b) => Math.abs(b.value) - Math.abs(a.value))[0];

    return (
        <div className={cn("flex flex-col h-full space-y-6 pt-2", className)}>
            {/* 1. Neon Sine Wave Visualization */}
            <div className="h-56 w-full group relative">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="glowPhy" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#84cc16" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#84cc16" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="glowEmo" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#d946ef" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#d946ef" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="glowInt" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                        <XAxis dataKey="displayDate" hide />
                        <YAxis hide domain={[-110, 110]} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '16px',
                                backdropFilter: 'blur(12px)',
                                fontSize: '10px'
                            }}
                        />
                        <ReferenceLine x={15} stroke="#fff" strokeOpacity={0.2} strokeDasharray="5 5" />
                        <Area
                            type="monotone"
                            dataKey="physical"
                            stroke="#84cc16"
                            fillOpacity={1}
                            fill="url(#glowPhy)"
                            strokeWidth={3}
                            isAnimationActive={false}
                        />
                        <Area
                            type="monotone"
                            dataKey="emotional"
                            stroke="#d946ef"
                            fillOpacity={1}
                            fill="url(#glowEmo)"
                            strokeWidth={3}
                            isAnimationActive={false}
                        />
                        <Area
                            type="monotone"
                            dataKey="intellectual"
                            stroke="#06b6d4"
                            fillOpacity={1}
                            fill="url(#glowInt)"
                            strokeWidth={3}
                            isAnimationActive={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* 2. Daily Advice Grid (Indonesian Highlight) */}
            <div className="relative overflow-hidden rounded-2xl bg-slate-900/50 border border-white/10 p-4 group/advice">
                {/* Subtle Background Glow */}
                <div
                    className="absolute -top-12 -right-12 w-24 h-24 blur-[40px] opacity-20 pointer-events-none"
                    style={{ backgroundColor: topCycle.color }}
                />

                <div className="relative z-10 flex gap-4 items-start">
                    <div
                        className="p-3 rounded-xl bg-slate-800 shadow-inner"
                        style={{ color: topCycle.color }}
                    >
                        {topCycle.id === "physical" && <Activity className="w-6 h-6" />}
                        {topCycle.id === "emotional" && <Heart className="w-6 h-6" />}
                        {topCycle.id === "intellectual" && <Brain className="w-6 h-6" />}
                    </div>
                    <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Wawasan Harian</span>
                            <Sparkles className="w-3 h-3 text-amber-400 opacity-50" />
                        </div>
                        <p className="text-sm font-semibold text-slate-200 leading-tight">
                            "{topCycle.advice}"
                        </p>
                    </div>
                </div>
            </div>

            {/* 3. Real-time Metrics */}
            <div className="grid grid-cols-3 gap-3">
                {cycles.map(cycle => (
                    <div key={cycle.id} className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                        <div className="flex items-center gap-1.5 overflow-hidden">
                            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: cycle.color }} />
                            <span className="text-[9px] text-slate-400 font-black uppercase truncate tracking-wider">{cycle.name}</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg font-mono font-bold" style={{ color: cycle.color }}>
                                {cycle.value > 0 ? "+" : ""}{cycle.value}
                            </span>
                            <span className="text-[9px] font-bold text-slate-600">%</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.abs(cycle.value)}%` }}
                                className="h-full rounded-full"
                                style={{ backgroundColor: cycle.color }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-1.5 px-1 text-[10px] text-slate-600 italic">
                <Info className="w-3 h-3" />
                <span>Berdasarkan siklus osilasi sirkadian 23, 28, dan 33 hari.</span>
            </div>
        </div>
    );
}
