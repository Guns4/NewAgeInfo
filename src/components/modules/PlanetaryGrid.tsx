"use client";

import React, { useMemo } from "react";
import { PlanetaryService } from "@/core/logic/planetaryService";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientHeading } from "@/components/ui/GradientHeading";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface PlanetaryGridProps {
    birthDate: Date;
}

export function PlanetaryGrid({ birthDate }: PlanetaryGridProps) {
    const planets = useMemo(() => PlanetaryService.calculateAges(birthDate), [birthDate]);

    // Prevent hydration mismatch
    if (!birthDate) return null;

    return (
        <div className="space-y-6">
            <GradientHeading as="h2" className="text-2xl md:text-3xl px-4 md:px-0">
                Cosmic Age
            </GradientHeading>

            {/* Container with horizontal scroll snap on mobile, grid on desktop */}
            <div className="
                flex overflow-x-auto pb-8 snap-x snap-mandatory gap-4 px-4 
                md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0 md:px-0
                scrollbar-hide
            ">
                {planets.map((planet, index) => (
                    <motion.div
                        key={planet.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="snap-center shrink-0 w-[min(85vw,350px)] md:w-auto"
                    >
                        <GlassCard className="h-full group overflow-hidden relative">
                            {/* Planet Visual Background (Abstract Gradient Sphere) */}
                            <div className={`absolute -right-12 -top-12 w-48 h-48 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 ${planet.color}`} />

                            <div className="p-6 relative z-10 flex flex-col h-full justify-between space-y-6">
                                {/* Header */}
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className={`w-12 h-12 rounded-full mb-3 shadow-lg ${planet.color} ring-4 ring-white/10`} />
                                        <h3 className="text-xl font-bold text-white">{planet.name}</h3>
                                        <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                                            {planet.description}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-slate-500 font-mono">ORBIT</div>
                                        <div className="text-sm text-slate-300 font-medium">
                                            {planet.orbitalPeriod}d
                                        </div>
                                    </div>
                                </div>

                                {/* Age Display */}
                                <div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-bold text-white tracking-tight">
                                            {planet.age.toFixed(2)}
                                        </span>
                                        <span className="text-sm text-slate-400 font-medium">years</span>
                                    </div>
                                </div>

                                {/* Footer (Next Birthday) */}
                                <div className="pt-4 border-t border-white/5">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500">Next Party</span>
                                        <span className="text-indigo-300 font-medium">
                                            {format(planet.nextBirthday, "MMM d, yyyy")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
