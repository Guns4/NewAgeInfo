"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { UN_Demographics } from "@/core/utils/demographics";
import { Users, Activity, Globe, Wifi } from "lucide-react";
import { useLocale } from "next-intl";

interface GlobalCohortProps {
    birthDate: Date;
    age: number;
}

export function GlobalCohort({ birthDate, age }: GlobalCohortProps) {
    const locale = useLocale();
    const birthYear = birthDate.getFullYear();

    const stats = useMemo(() => {
        const dailyBirths = UN_Demographics.getDailyBirths(birthYear);
        const survivors = UN_Demographics.getDailyCohortSurvivors(birthYear, age);
        const survivalRate = Math.round((survivors / dailyBirths) * 100);

        return { dailyBirths, survivors, survivalRate };
    }, [birthYear, age]);

    // Simple number formatter
    const formatNumber = (num: number) => new Intl.NumberFormat(locale).format(num);

    return (
        <section className="w-full py-8 relative">
            {/* Command Center Card */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl">

                {/* Background: World Map SVG (Abstract) */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1000 500"
                        className="w-full h-full text-slate-600 fill-current"
                        preserveAspectRatio="xMidYMid slice"
                    >
                        {/* Simple abstract world map paths */}
                        <path d="M150,150 Q180,100 220,130 T300,160 T350,220 T250,280 T150,250 Z" /> {/* Americasish */}
                        <path d="M450,100 Q500,80 550,120 T600,200 T550,280 T450,250 Z" /> {/* Eurafrish */}
                        <path d="M700,150 Q750,130 800,160 T850,220 T750,250 Z" /> {/* Asiaish */}
                        {/* Grid Lines */}
                        <line x1="0" y1="100" x2="1000" y2="100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5,5" />
                        <line x1="0" y1="200" x2="1000" y2="200" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5,5" />
                        <line x1="0" y1="300" x2="1000" y2="300" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5,5" />
                        <line x1="0" y1="400" x2="1000" y2="400" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5,5" />
                    </svg>

                    {/* Radar Sweep Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent w-[20%] animate-radar-sweep h-full skew-x-12 blur-md" />
                </div>

                {/* Content Grid */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">

                    {/* Left: Live Counter & Main Stat */}
                    <div className="space-y-8 flex flex-col justify-center">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                </span>
                                <h2 className="text-xs font-mono text-emerald-500 uppercase tracking-[0.2em]">
                                    Global Sync Active
                                </h2>
                            </div>

                            <div>
                                <h3 className="text-5xl md:text-6xl font-bold text-white font-mono tracking-tighter tabular-nums">
                                    <Counter value={stats.survivors} />
                                </h3>
                                <p className="text-slate-400 mt-2 text-sm md:text-base font-light">
                                    Brothers & Sisters of Time
                                </p>
                            </div>
                        </div>

                        <div className="p-4 bg-emerald-950/20 border border-emerald-900/30 rounded-xl">
                            <p className="text-emerald-400 text-sm md:text-base leading-relaxed">
                                <Wifi className="w-4 h-4 inline-block mr-2 text-emerald-500/80" />
                                {locale.startsWith('id')
                                    ? `Anda sedang bernapas bersama kurang lebih ${formatNumber(stats.survivors)} orang yang lahir di hari yang sama.`
                                    : `You are breathing in sync with approximately ${formatNumber(stats.survivors)} people born on the very same day.`
                                }
                            </p>
                        </div>
                    </div>

                    {/* Right: Detailed Data Blocks */}
                    <div className="grid grid-cols-1 gap-4 self-center">
                        {/* Stat Block 1: Original Cohort */}
                        <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-xl group hover:border-emerald-500/30 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-slate-800 rounded-lg text-slate-400 group-hover:text-emerald-400 transition-colors">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Original Cohort</div>
                                    <div className="text-slate-300 text-sm">Born on {birthDate.toLocaleDateString()}</div>
                                </div>
                            </div>
                            <div className="text-xl font-mono text-white tabular-nums">
                                {formatNumber(stats.dailyBirths)}
                            </div>
                        </div>

                        {/* Stat Block 2: Survival Rate */}
                        <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-xl group hover:border-emerald-500/30 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-slate-800 rounded-lg text-slate-400 group-hover:text-emerald-400 transition-colors">
                                    <Activity className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Cohort Retention</div>
                                    <div className="text-slate-300 text-sm">Estimated Survival</div>
                                </div>
                            </div>
                            <div className="text-xl font-mono text-emerald-400 tabular-nums">
                                {stats.survivalRate}%
                            </div>
                        </div>

                        {/* Stat Block 3: Rank (Legacy Metric kept for fun) */}
                        <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-xl group hover:border-emerald-500/30 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-slate-800 rounded-lg text-slate-400 group-hover:text-emerald-400 transition-colors">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Generation</div>
                                    <div className="text-slate-300 text-sm">Global Context</div>
                                </div>
                            </div>
                            <div className="text-xs font-mono text-slate-400 tabular-nums text-right max-w-[120px]">
                                {birthYear} Era
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Simple counter animation component
function Counter({ value }: { value: number }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            {new Intl.NumberFormat('en-US').format(value)}
        </motion.span>
    );
}
