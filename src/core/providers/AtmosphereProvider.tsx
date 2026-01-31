"use client";

import React from "react";
import { useTimeTheme, TimePhase } from "@/core/hooks/useTimeTheme";

// Gradient Maps
const GRADIENTS: Record<TimePhase, string> = {
    dawn: "radial-gradient(circle at 50% 0%, #db2777 0%, #0f172a 60%, #020617 100%)", // Pink-ish top
    day: "radial-gradient(circle at 50% 0%, #3b82f6 0%, #0f172a 60%, #020617 100%)",  // Blue-ish top
    dusk: "radial-gradient(circle at 50% 0%, #f97316 0%, #4c1d95 60%, #020617 100%)",  // Orange/Purple top
    night: "radial-gradient(circle at 50% 0%, #312e81 0%, #020617 60%, #020617 100%)"  // Indigo top
};

export function AtmosphereProvider({ children }: { children: React.ReactNode }) {
    const phase = useTimeTheme();
    const gradient = GRADIENTS[phase];

    return (
        <>
            <div
                className="fixed inset-0 z-0 pointer-events-none transition-all duration-[2000ms] ease-in-out"
                style={{
                    background: gradient
                }}
            >
                {/* Noise Overlay matching layout */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>

                {/* Extra ambient orbs based on phase could go here */}
            </div>
            {children}
        </>
    );
}
