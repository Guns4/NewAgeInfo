"use client";

import { useState, useEffect } from "react";
import { differenceInMilliseconds } from "date-fns";

export interface LifeStats {
    heartbeats: number;
    breaths: number;
    distanceTraveled: number; // in kilometers
}

// Average rates
const HEART_RATE_PER_MS = 80 / 60000; // 80 bpm
const BREATH_RATE_PER_MS = 16 / 60000; // 16 bpm
const EARTH_SPEED_KM_PER_MS = 107200 / 3600000; // ~107,200 km/h (Orbital speed)

export function useLiveAge(birthDate: Date | null) {
    const [stats, setStats] = useState<LifeStats>({
        heartbeats: 0,
        breaths: 0,
        distanceTraveled: 0,
    });

    useEffect(() => {
        if (!birthDate) return;

        const calculateStats = () => {
            const now = new Date();
            const diffMs = differenceInMilliseconds(now, birthDate);

            // Prevent negative values if birthdate is future
            if (diffMs < 0) {
                setStats({ heartbeats: 0, breaths: 0, distanceTraveled: 0 });
                return;
            }

            setStats({
                heartbeats: Math.floor(diffMs * HEART_RATE_PER_MS),
                breaths: Math.floor(diffMs * BREATH_RATE_PER_MS),
                distanceTraveled: Math.floor(diffMs * EARTH_SPEED_KM_PER_MS),
            });
        };

        // Initial calculation
        calculateStats();

        // Update every second
        const intervalId = setInterval(calculateStats, 1000);

        return () => clearInterval(intervalId);
    }, [birthDate]);

    return stats;
}
