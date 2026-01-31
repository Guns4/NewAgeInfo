"use client";

import { useLifePulse } from "@/core/hooks/useLifePulse";
import { Heart, Wind } from "lucide-react";

export function HealthMetricsCard({ birthDate }: { birthDate: Date }) {
    const { heartbeats, breaths } = useLifePulse(birthDate);

    return (
        <div className="flex flex-col h-full bg-slate-900/50 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Heart className="w-32 h-32" />
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-8 relative z-10">
                {/* Heartbeats */}
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500">
                        <Heart className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-300 uppercase tracking-wider">Total Heartbeats</p>
                        <p className="text-2xl font-bold text-white tabular-nums font-mono">
                            {heartbeats.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Breaths */}
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-500">
                        <Wind className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-300 uppercase tracking-wider">Total Breaths</p>
                        <p className="text-2xl font-bold text-white tabular-nums font-mono">
                            {breaths.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
