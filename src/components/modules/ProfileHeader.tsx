"use client";

import React, { useMemo } from "react";
import { getIdentityTraits } from "@/core/logic/identityMapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { Sparkles, Star, Gem } from "lucide-react";
import { motion } from "framer-motion";

interface ProfileHeaderProps {
    birthDate: Date;
}

export function ProfileHeader({ birthDate }: ProfileHeaderProps) {
    const traits = useMemo(() => getIdentityTraits(birthDate), [birthDate]);

    if (!birthDate) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Western Zodiac */}
            <GlassCard className="p-4 flex items-center space-x-4">
                <div className="p-3 rounded-full bg-indigo-500/10">
                    <Star className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                    <h3 className="text-white font-bold">{traits.zodiac.sign} {traits.zodiac.symbol}</h3>
                    <p className="text-xs text-slate-400">{traits.zodiac.traits.join(" • ")}</p>
                </div>
            </GlassCard>

            {/* Chinese Zodiac */}
            <GlassCard className="p-4 flex items-center space-x-4">
                <div className="p-3 rounded-full bg-violet-500/10">
                    <Sparkles className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                    <h3 className="text-white font-bold">Year of the {traits.chineseZodiac.animal}</h3>
                    <p className="text-xs text-slate-400">{traits.chineseZodiac.traits.join(" • ")}</p>
                </div>
            </GlassCard>

            {/* Birthstone */}
            <GlassCard className="p-4 flex items-center space-x-4">
                <div className="p-3 rounded-full bg-slate-800/50">
                    <Gem className={`w-6 h-6 ${traits.birthstone.color}`} />
                </div>
                <div>
                    <h3 className="text-white font-bold">{traits.birthstone.name}</h3>
                    <p className="text-xs text-slate-400">{traits.birthstone.meaning}</p>
                </div>
            </GlassCard>
        </div>
    );
}
