"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import useSound from "use-sound";

/**
 * PHASE 63: Sensory Feedback Architecture
 * 
 * Performance: Audio files are expected to be ultra-compressed (.mp3 < 20kb)
 * in the /public/audio directory.
 */

const SUCCESS_SFX = "/audio/success.mp3";
const HOVER_SFX = "/audio/hover.mp3";
const TRANSITION_SFX = "/audio/transition.mp3";

type SensoryContextType = {
    isMuted: boolean;
    toggleMute: () => void;
    playSuccess: () => void;
    playHover: () => void;
    playTransition: () => void;
    triggerHaptic: (pattern?: number | number[]) => void;
};

const SensoryContext = createContext<SensoryContextType | null>(null);

export const useSensory = () => {
    const context = useContext(SensoryContext);
    if (!context) {
        // Fallback for components used outside the provider (unlikely but safe)
        return {
            isMuted: true,
            toggleMute: () => { },
            playSuccess: () => { },
            playHover: () => { },
            playTransition: () => { },
            triggerHaptic: () => { }
        };
    }
    return context;
};

/**
 * useHaptic Hook (Phase 63 Requirement)
 * Provides simple logic for mobile vibration pulses.
 */
export function useHaptic() {
    const { triggerHaptic } = useSensory();

    return useMemo(() => ({
        pulse: () => triggerHaptic(10), // Short pulse for clicks
        milestone: () => triggerHaptic([30, 50, 30]), // Double pulse for success
        custom: (pattern: number | number[]) => triggerHaptic(pattern)
    }), [triggerHaptic]);
}

export function SensoryProvider({ children }: { children: React.ReactNode }) {
    // Muted by default as per Creative Developer requirements
    const [isMuted, setIsMuted] = useState(true);

    const [playSuccessRaw] = useSound(SUCCESS_SFX, { volume: 0.5 });
    const [playHoverRaw] = useSound(HOVER_SFX, { volume: 0.2 });
    const [playTransitionRaw] = useSound(TRANSITION_SFX, { volume: 0.4 });

    const toggleMute = useCallback(() => {
        setIsMuted(prev => !prev);
    }, []);

    const triggerHaptic = useCallback((pattern: number | number[] = 10) => {
        if (isMuted || typeof window === "undefined" || !("vibrate" in navigator)) {
            return;
        }

        try {
            navigator.vibrate(pattern);
        } catch (e) {
            // Silently fail if blocked by site settings
        }
    }, [isMuted]);

    const playSuccess = useCallback(() => {
        if (!isMuted) {
            playSuccessRaw();
            triggerHaptic([30, 50, 30]); // Sync with haptic double pulse
        }
    }, [isMuted, playSuccessRaw, triggerHaptic]);

    const playHover = useCallback(() => {
        if (!isMuted) {
            playHoverRaw();
            triggerHaptic(5); // Tactile "tick"
        }
    }, [isMuted, playHoverRaw, triggerHaptic]);

    const playTransition = useCallback(() => {
        if (!isMuted) {
            playTransitionRaw();
        }
    }, [isMuted, playTransitionRaw]);

    return (
        <SensoryContext.Provider value={{
            isMuted,
            toggleMute,
            playSuccess,
            playHover,
            playTransition,
            triggerHaptic
        }}>
            {children}
        </SensoryContext.Provider>
    );
}
