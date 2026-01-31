"use client";

import React, { useMemo } from "react";
import { getIdentityTraits, IdentityTraits } from "@/core/logic/identityMapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientHeading } from "@/components/ui/GradientHeading";
import { Sparkles, Star, Gem, CalendarClock } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/core/utils";

interface IdentitySectionProps {
    birthDate: Date;
}

export function IdentitySection({ birthDate }: IdentitySectionProps) {
    const data = useMemo(() => getIdentityTraits(birthDate), [birthDate]);

    // Card Container Animation
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="space-y-6">
            <GradientHeading as="h2" className="text-2xl md:text-3xl">
                Identity & Heritage
            </GradientHeading>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {/* Western Zodiac */}
                <motion.div variants={item} className="h-full">
                    <GlassCard className="h-full p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Star className="w-24 h-24 text-white" />
                        </div>

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="p-2 bg-indigo-500/20 rounded-full">
                                    <Sparkles className="w-5 h-5 text-indigo-400" />
                                </div>
                                <h3 className="text-sm uppercase tracking-wider text-slate-400 font-semibold">Western Zodiac</h3>
                            </div>

                            <div className="mt-auto">
                                <div className="text-5xl mb-2">{data.zodiac.symbol}</div>
                                <h4 className="text-2xl font-bold text-white mb-1">{data.zodiac.sign}</h4>
                                <div className="inline-block px-2 py-1 bg-white/10 rounded-md text-xs font-medium text-slate-300 mb-4">
                                    {data.zodiac.element}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {data.zodiac.traits.map(trait => (
                                        <span key={trait} className="text-xs text-indigo-300 bg-indigo-500/10 px-2 py-1 rounded">
                                            {trait}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Chinese Zodiac */}
                <motion.div variants={item} className="h-full">
                    <GlassCard className="h-full p-6 relative overflow-hidden group">
                        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <span className="text-9xl font-serif">龍</span> {/* Decorative character */}
                        </div>

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="p-2 bg-rose-500/20 rounded-full">
                                    <Star className="w-5 h-5 text-rose-400" />
                                </div>
                                <h3 className="text-sm uppercase tracking-wider text-slate-400 font-semibold">Chinese Shio</h3>
                            </div>

                            <div className="mt-auto">
                                <h4 className="text-2xl font-bold text-white mb-1">
                                    {data.chineseZodiac.element} {data.chineseZodiac.animal}
                                </h4>
                                <p className="text-sm text-slate-400 mb-4">The {data.chineseZodiac.animal} represents spirit and wit.</p>
                                <div className="flex flex-wrap gap-2">
                                    {data.chineseZodiac.traits.map(trait => (
                                        <span key={trait} className="text-xs text-rose-300 bg-rose-500/10 px-2 py-1 rounded">
                                            {trait}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Birthstone */}
                <motion.div variants={item} className="h-full">
                    <GlassCard className="h-full p-6 relative overflow-hidden group">
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="p-2 bg-emerald-500/20 rounded-full">
                                    <Gem className="w-5 h-5 text-emerald-400" />
                                </div>
                                <h3 className="text-sm uppercase tracking-wider text-slate-400 font-semibold">Birthstone</h3>
                            </div>

                            <div className="mt-auto text-center py-4">
                                <div className={cn("text-4xl font-bold mb-2", data.birthstone.color)}>
                                    {data.birthstone.name}
                                </div>
                                <p className="text-slate-300 italic font-serif text-lg">"{data.birthstone.meaning}"</p>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* History Card */}
                <motion.div variants={item} className="h-full">
                    <GlassCard className="h-full p-6 relative overflow-hidden group">
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="p-2 bg-amber-500/20 rounded-full">
                                    <CalendarClock className="w-5 h-5 text-amber-400" />
                                </div>
                                <h3 className="text-sm uppercase tracking-wider text-slate-400 font-semibold">Time Capsule</h3>
                            </div>

                            <div className="mt-auto space-y-4">
                                <ul className="space-y-3">
                                    {data.history.map((h, i) => (
                                        <li key={i} className="text-sm text-slate-400 border-l-2 border-slate-700 pl-3">
                                            <span className="text-amber-500 font-bold mr-2">{h.year}</span>
                                            {h.event}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>
            </motion.div>
        </div>
    );
}
