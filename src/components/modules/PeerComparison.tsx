"use client";

import { motion } from "framer-motion";
import { PeerEngine } from "@/core/engines/peer-engine";
import { Achievement } from "@/core/constants/achievements";
import { Sparkles, Globe2, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface PeerComparisonProps {
    age: number;
}

const AchievementCard = ({ data, type }: { data: Achievement, type: 'Global' | 'Lokal' }) => {
    return (
        <div className="relative group overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)] hover:border-white/20">
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />

            <div className="flex flex-col h-full justify-between space-y-4">
                <div className="flex items-start justify-between">
                    <div className="p-2 rounded-lg bg-white/5 text-slate-300">
                        {type === 'Global' ? <Globe2 className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                    </div>
                    <span className="text-4xl font-bold text-white/10 group-hover:text-white/20 transition-colors">
                        {data.age}
                    </span>
                </div>

                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white leading-tight font-serif tracking-wide">
                        {data.name}
                    </h3>
                    <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">
                        {data.achievement}
                    </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-slate-500 uppercase tracking-widest font-medium">
                    <div className="w-2 h-2 rounded-full bg-indigo-500/50" />
                    {type} LEGEND
                </div>
            </div>
        </div>
    );
}

export function PeerComparison({ age }: PeerComparisonProps) {
    // Determine whole number age for comparison (floor)
    const currentAge = Math.floor(age);
    const comparison = PeerEngine.getRelevantAchievement(currentAge);

    if (!comparison.global && !comparison.local) return null;

    return (
        <section className="w-full py-8 space-y-6">
            <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-medium text-slate-200">
                    Meanwhile, in History...
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {comparison.global && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                    >
                        <AchievementCard data={comparison.global} type="Global" />
                    </motion.div>
                )}

                {comparison.local && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.4 }}
                    >
                        <AchievementCard data={comparison.local} type="Lokal" />
                    </motion.div>
                )}
            </div>
        </section>
    );
}
