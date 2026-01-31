"use client";

import { useEffect, useState } from "react";

export type TimePhase = "dawn" | "day" | "dusk" | "night";

export function useTimeTheme() {
    const [phase, setPhase] = useState<TimePhase>("night");

    useEffect(() => {
        const updatePhase = () => {
            const hour = new Date().getHours();

            if (hour >= 5 && hour < 8) {
                setPhase("dawn");
            } else if (hour >= 8 && hour < 17) {
                setPhase("day");
            } else if (hour >= 17 && hour < 19) {
                setPhase("dusk");
            } else {
                setPhase("night");
            }
        };

        updatePhase();
        const interval = setInterval(updatePhase, 60000); // Check every minute

        return () => clearInterval(interval);
    }, []);

    return phase;
}
