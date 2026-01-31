"use client";

import React, { useEffect, useState } from "react";
import { useAchievementStore } from "@/core/stores/useAchievementStore";
import { MILESTONES } from "@/core/logic/milestoneTracker";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientHeading } from "@/components/ui/GradientHeading";
import { Lock, CheckCircle, Award } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { CertificateGenerator } from "./CertificateGenerator";
import { cn } from "@/core/utils";

export function LifeLedger() {
    // Handling hydration mismatch for persisted store
    const [mounted, setMounted] = useState(false);
    const { unlockedMilestones } = useAchievementStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <GradientHeading as="h2" className="text-2xl md:text-3xl">
                        Life Ledger
                    </GradientHeading>
                    <p className="text-slate-400 mt-2 text-sm max-w-lg">
                        Your permanent record of existence. Unlock achievements by living.
                    </p>
                </div>

                <GlassCard className="px-4 py-2 bg-amber-950/30 border-amber-500/20">
                    <div className="flex items-center space-x-2">
                        <Award className="w-5 h-5 text-amber-500" />
                        <span className="text-slate-200 font-bold">
                            {unlockedMilestones.length} / {MILESTONES.length} Unlocked
                        </span>
                    </div>
                </GlassCard>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MILESTONES.map((milestone) => {
                    const isUnlocked = unlockedMilestones.includes(milestone.id);

                    return (
                        <motion.div
                            key={milestone.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <GlassCard
                                className={cn(
                                    "p-6 h-full border transition-all duration-300 relative overflow-hidden group",
                                    isUnlocked
                                        ? "bg-slate-900/60 border-amber-500/30 shadow-[0_0_20px_-10px_rgba(245,158,11,0.2)]"
                                        : "bg-slate-950/40 border-slate-800/50 grayscale opacity-80"
                                )}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-4">
                                        <div className={cn(
                                            "w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg",
                                            isUnlocked ? "bg-gradient-to-br from-amber-400 to-amber-600 text-white" : "bg-slate-800 text-slate-600"
                                        )}>
                                            {isUnlocked ? milestone.icon : <Lock className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <h3 className={cn("font-bold text-lg", isUnlocked ? "text-white" : "text-slate-500")}>
                                                {milestone.title}
                                            </h3>
                                            <p className="text-sm text-slate-400 mt-1">{milestone.description}</p>
                                            {isUnlocked && (
                                                <div className="mt-3">
                                                    <CertificateGenerator
                                                        milestone={milestone}
                                                        dateUnlocked={format(new Date(), "MMM d, yyyy")} // Ideally store Date in Zustand too, simplify for now
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {isUnlocked && (
                                        <div className="absolute top-4 right-4 text-amber-500 opacity-20 group-hover:opacity-100 transition-opacity">
                                            <CheckCircle className="w-6 h-6" />
                                        </div>
                                    )}
                                </div>

                                {!isUnlocked && (
                                    <div className="mt-4 pt-4 border-t border-slate-800">
                                        <p className="text-xs text-slate-600 font-mono uppercase tracking-widest">
                                            LOCKED • REQUIREMENT: {milestone.threshold.toLocaleString()} {milestone.unit}
                                        </p>
                                    </div>
                                )}
                            </GlassCard>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
