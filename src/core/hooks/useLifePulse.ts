import { useEffect, useState } from 'react';
import { usePulse } from "@/core/providers/PulseProvider";
import { differenceInMilliseconds } from 'date-fns';

export interface PulseStats {
    secondsLived: number;
    distanceTraveled: number;
    heartbeats: number;
    breaths: number;
    milliseconds: string;
}

// Rates
const HEART_RATE_AVG = 80 / 60; // beats per second
const BREATH_RATE_AVG = 16 / 60; // breaths per second
const EARTH_SPEED_KM_S = 29.78; // Earth orbital speed

export function useLifePulse(birthDate?: Date, isPageVisible: boolean = true) {
    // We can use the global pulse, but for specific calculations on this page, 
    // strictly pausing math when hidden optimizes CPU.
    // However, if usePulse (Provider) is driving the ticks, we might just rely on that.
    // But the prompt asked to pause "the interval".
    // Since usePulse is global, let's just return cached stats if hidden.

    const { currentTime } = usePulse();
    const [cachedStats, setCachedStats] = useState<PulseStats>({
        secondsLived: 0,
        distanceTraveled: 0,
        heartbeats: 0,
        breaths: 0,
        milliseconds: "000"
    });

    // Only update stats when visible
    useEffect(() => {
        if (!isPageVisible || !birthDate) return;

        const now = new Date(currentTime);
        const diffMs = differenceInMilliseconds(now, birthDate);

        if (diffMs < 0) return;

        const diffSecs = diffMs / 1000;
        const ms = (diffMs % 1000).toString().padStart(3, '0');

        setCachedStats({
            secondsLived: Math.floor(diffSecs),
            milliseconds: ms,
            distanceTraveled: diffSecs * EARTH_SPEED_KM_S,
            heartbeats: Math.floor(diffSecs * HEART_RATE_AVG),
            breaths: Math.floor(diffSecs * BREATH_RATE_AVG)
        });
    }, [currentTime, birthDate, isPageVisible]);

    return cachedStats;
}
