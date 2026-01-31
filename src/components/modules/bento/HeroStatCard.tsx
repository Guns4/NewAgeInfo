"use client";

import { useLifePulse } from "@/core/hooks/useLifePulse";
import { cn } from "@/core/utils";
import { Clock } from "lucide-react";

interface HeroStatCardProps {
    className?: string;
}

export function HeroStatCard({ className, birthDate }: HeroStatCardProps & { birthDate: Date }) {
    const { secondsLived } = useLifePulse(birthDate);

    return (
        <div className={cn("relative h-full w-full flex flex-col items-center justify-center bg-slate-900/50 p-8", className)}>
            <div className="absolute top-4 left-4 flex items-center gap-2 text-indigo-400">
                <Clock className="w-5 h-5 animate-pulse" />
                <span className="text-sm font-medium tracking-wider uppercase">Time on Earth</span>
            </div>

            <div className="text-center z-10 space-y-4">
                <div className="text-6xl md:text-8xl font-black tracking-tighter text-white tabular-nums" style={{ fontFamily: 'monospace' }}>
                    {secondsLived}
                </div>
                <div className="text-xl text-slate-300 font-light">
                    Seconds of Existence
                </div>
            </div>

            {/* Background Beat Effect */}
            <div className="absolute inset-0 bg-indigo-500/5 animate-pulse rounded-3xl" style={{ animationDuration: '3s' }} />
        </div>
    );
}
