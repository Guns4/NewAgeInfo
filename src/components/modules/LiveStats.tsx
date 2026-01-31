import React, { useEffect, useState } from "react";
import { useLifePulse } from "@/core/hooks/useLifePulse";
import { DynamicNumber } from "@/components/ui/DynamicNumber";
import { GlassCard } from "@/components/ui/GlassCard";
import { Heart, Wind, Rocket } from "lucide-react";
import { motion } from "framer-motion";

interface LiveStatsProps {
    birthDate: Date;
}

export function LiveStats({ birthDate }: LiveStatsProps) {
    const stats = useLifePulse(birthDate);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // Return null on server-side to prevent hydration mismatch
    }

    const statItems = [
        {
            label: "Heartbeats",
            value: stats.heartbeats,
            icon: Heart,
            color: "text-rose-500",
            delay: 0.1,
        },
        {
            label: "Breaths Taken",
            value: stats.breaths,
            icon: Wind,
            color: "text-cyan-500",
            delay: 0.2,
        },
        {
            label: "Space Traveled (km)",
            value: stats.distanceTraveled,
            icon: Rocket,
            color: "text-amber-500",
            delay: 0.3,
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-6">
            {statItems.map((item, index) => (
                <GlassCard
                    key={item.label}
                    className="flex flex-col items-center justify-center p-6 text-center"
                    hoverEffect={true}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: item.delay, duration: 0.5 }}
                        className="mb-3 p-3 rounded-full bg-white/5"
                    >
                        <item.icon className={`w-6 h-6 ${item.color}`} />
                    </motion.div>

                    <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">
                        {item.label}
                    </h3>

                    <div className="text-2xl font-bold text-white tabular-nums">
                        <DynamicNumber value={item.value} />
                    </div>
                </GlassCard>
            ))}
        </div>
    );
}
