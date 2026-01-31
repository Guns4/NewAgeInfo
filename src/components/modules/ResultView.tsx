"use client";

import React, { useEffect } from "react";
import { ShareModule } from "@/components/modules/ShareModule";
import { RecalculateButton } from "@/components/ui/RecalculateButton";
import { useLifePulse } from "@/core/hooks/useLifePulse";
import { useEasterEggs } from "@/core/hooks/useEasterEggs";
import { BentoGrid, BentoCard } from "@/components/ui/BentoGrid";
import { GlassCard } from "@/components/ui/GlassCard";
import { Users } from "lucide-react";
import { HeroStatCard } from "@/components/modules/bento/HeroStatCard";
import { HealthMetricsCard } from "@/components/modules/bento/HealthMetricsCard";
import { LifeGrid } from "@/components/modules/LifeGrid";
import { PosterGenerationModal } from "@/components/modules/PosterGenerationModal";
import { AgeService } from "@/core/logic/ageEngine";
import { Wand2 } from "lucide-react";
// Lazy load heavy computational components for TBT optimization
import dynamic from "next/dynamic";

const PlanetaryGrid = dynamic(() => import("@/components/modules/PlanetaryGrid").then(mod => mod.PlanetaryGrid), {
    loading: () => <div className="h-full w-full bg-slate-900/50 animate-pulse rounded-xl" />,
    ssr: false
});

const LifeVisualizer = dynamic(() => import("@/components/modules/LifeVisualizer").then(mod => mod.LifeVisualizer), {
    ssr: false
});

const GlobalCohort = dynamic(() => import("@/components/modules/GlobalCohort").then(mod => mod.GlobalCohort), {
    ssr: false
});

const BiorhythmChart = dynamic(() => import("@/components/modules/bento/BiorhythmChart").then(mod => mod.BiorhythmChart), {
    loading: () => <div className="h-full w-full bg-slate-900/50 animate-pulse rounded-xl" />,
    ssr: false
});

const TimeBridge = dynamic(() => import("@/components/modules/TimeBridge").then(mod => mod.TimeBridge), {
    ssr: false
});

import { LiveTitle } from "@/components/modules/LiveTitle";
import { useSensory } from "@/core/providers/SensoryProvider";
import { PeerComparison } from "@/components/modules/PeerComparison";
import { LifeTimeline } from "@/components/modules/LifeTimeline";
import { LifeInsights } from "@/components/modules/LifeInsights";
import { CulturalProfileCard } from "@/components/modules/bento/CulturalProfileCard";
import { GiftRecommendation } from "@/components/modules/GiftRecommendation";
import { TimeCapsule } from "@/components/modules/TimeCapsule";
import AdUnit from "@/components/shared/AdUnit";
import { motion } from "framer-motion";

interface ResultViewProps {
    birthDate: Date;
    onReset: () => void;
}

export function ResultView({ birthDate, onReset }: ResultViewProps) {
    const [showPosterModal, setShowPosterModal] = React.useState(false);
    const { secondsLived, distanceTraveled } = useLifePulse(birthDate);
    // Detailed metrics for the poster
    const metrics = AgeService.calculateDetailedAge(birthDate);

    const { playSuccess } = useSensory();
    // Initialize Easter Eggs (Keyboard listeners, birthday check)
    useEasterEggs(birthDate);

    const birthYear = birthDate.getFullYear();

    // Calculate Age for Peer Comparison
    const now = new Date();
    const ageInMilliseconds = now.getTime() - birthDate.getTime();
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

    useEffect(() => {
        playSuccess();
    }, [playSuccess]);

    return (
        <div className="w-full max-w-7xl mx-auto space-y-8 animate-in fade-in duration-1000">
            <LiveTitle birthDate={birthDate} />
            {/* Header / Actions */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-4 md:px-0">
                <div className="flex items-center gap-4">
                    <RecalculateButton onReset={onReset} />

                    {/* Phase 65: Legacy Poster CTA */}
                    <button
                        onClick={() => setShowPosterModal(true)}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-indigo-500/10 border border-amber-500/20 hover:border-amber-500/40 text-amber-400 font-bold transition-all hover:scale-105 active:scale-95 group shadow-lg shadow-amber-500/5"
                    >
                        <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        <span className="text-sm">Design Legacy Poster</span>
                    </button>
                </div>

                <ShareModule
                    birthDate={birthDate}
                    stats={{ secondsLived, distanceTraveled }}
                />
            </div>

            {/* Bento Grid */}
            <div className="relative">
                {/* One-time Success Shimmer */}
                <motion.div
                    className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{ x: '200%', opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                />

                <BentoGrid>
                    {/* 1. Hero Stat (Span 4) */}
                    <BentoCard
                        className="md:col-span-4 md:row-span-1"
                        header={<HeroStatCard birthDate={birthDate} />}
                    />

                    {/* AdSlot: Result Ad (Placed right after main counter as requested) */}
                    <div className="md:col-span-4 rounded-3xl overflow-hidden glass-card border-white/5 p-1">
                        <AdUnit
                            slot="9527907472"
                            format="auto"
                            responsive="true"
                            className="my-0 min-h-[250px]"
                        />
                    </div>

                    {/* 2. Life Matrix (Span 2) */}
                    <BentoCard
                        className="md:col-span-2 md:row-span-2"
                        title="Your Life in Weeks"
                        description="Each square represents a week of your life. A memento mori."
                        header={<div className="h-full w-full p-4 overflow-hidden"><LifeGrid birthDate={birthDate} /></div>}
                    />

                    {/* 3. Planetary Insight (Span 2) */}
                    <BentoCard
                        className="md:col-span-2"
                        title="Cosmic Perspective"
                        description="Your age on other worlds."
                        header={<div className="h-full w-full p-4"><PlanetaryGrid birthDate={birthDate} /></div>}
                    />

                    {/* 4. Cultural Profile (Span 1) - NEW */}
                    <BentoCard
                        className="md:col-span-1"
                        title="Time & Culture"
                        description="Your birth in other calendars."
                        header={<CulturalProfileCard birthDate={birthDate} />}
                    />

                    {/* 5. Health Metrics (Span 1) */}
                    <BentoCard
                        className="md:col-span-1"
                        title="Biological Engine"
                        description="Estimated total breaths and heartbeats."
                        header={<HealthMetricsCard birthDate={birthDate} />}
                    />

                    {/* 6. Biorhythm Dashboard (Span 2) - NEW PHASE 61 */}
                    <BentoCard
                        className="md:col-span-2 md:row-span-2"
                        title="Biorhythm Intelligence"
                        description="Biological cycle tracking and energy forecasting."
                        header={<BiorhythmChart birthDate={birthDate} />}
                    />
                </BentoGrid>

                {/* Oracle Section */}
                <LifeInsights age={ageInYears} />

                {/* Global Cohort Section */}
                <GlobalCohort birthDate={birthDate} age={ageInYears} />

                {/* Life Pulse Charts */}
                <LifeVisualizer age={ageInYears} />

                <PeerComparison age={ageInYears} />
                <LifeTimeline birthYear={birthYear} />

                {/* Engagement: Time Capsule (Phase 45) */}
                <TimeCapsule birthDate={birthDate} />

                {/* Engagement: Time Bridge (Phase 62) */}
                <div className="mt-12 group">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
                            <Users className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-white tracking-tight">Time Bridge</h3>
                            <p className="text-sm text-slate-500">Cross-reference your life path with another traveler.</p>
                        </div>
                    </div>
                    <GlassCard className="p-8">
                        <TimeBridge primaryBirthDate={birthDate} />
                    </GlassCard>
                </div>

                {/* Smart Gift Recommendation (Revenue Booster) */}
                <GiftRecommendation age={ageInYears} birthDate={birthDate} />

                {/* AdSlot: Multiplex Related (Recommended for You) */}
                <div className="mt-12">
                    <h3 className="text-xl font-bold text-slate-300 mb-6 flex items-center gap-2">
                        <span className="w-1 h-6 bg-indigo-500 rounded-full" />
                        Recommended for You
                    </h3>
                    <AdUnit
                        slot="9980949644"
                        format="autorelaxed"
                        responsive="true"
                        className="min-h-[400px]"
                    />
                </div>
            </div>

            {/* Phase 65: Poster Generation Engine */}
            <PosterGenerationModal
                isOpen={showPosterModal}
                onClose={() => setShowPosterModal(false)}
                userData={{
                    name: "Traveler", // Fallback if no name input exists yet
                    birthDate: birthDate,
                    totalDays: metrics.totalDays,
                    years: metrics.years
                }}
            />
        </div>
    );
}
