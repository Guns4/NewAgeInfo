"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface PulseContextType {
    currentTime: number; // Unix timestamp in milliseconds
}

const PulseContext = createContext<PulseContextType>({ currentTime: Date.now() });

export const usePulse = () => useContext(PulseContext);

export function PulseProvider({ children }: { children: ReactNode }) {
    const [currentTime, setCurrentTime] = useState(Date.now());

    useEffect(() => {
        let frameId: number;
        let lastUpdate = 0;
        const FPS_LIMIT = 100; // Update 10 times per second is enough for smooth enough numbers without frying CPU

        const animate = (time: number) => {
            if (time - lastUpdate > FPS_LIMIT) {
                setCurrentTime(Date.now());
                lastUpdate = time;
            }
            frameId = requestAnimationFrame(animate);
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                cancelAnimationFrame(frameId);
            } else {
                frameId = requestAnimationFrame(animate);
                // Immediate update on return
                setCurrentTime(Date.now());
            }
        };

        // Start Loop
        frameId = requestAnimationFrame(animate);

        // Battery Saver: Stop on blur
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            cancelAnimationFrame(frameId);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    return (
        <PulseContext.Provider value={{ currentTime }}>
            {children}
        </PulseContext.Provider>
    );
}
