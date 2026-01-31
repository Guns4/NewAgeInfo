"use client";

import { useAudio } from "@/core/providers/AudioProvider";
import { Haptics } from "@/core/utils/haptics";
import { useCallback } from "react";

export type HapticType = "light" | "medium" | "heavy" | "success" | "warning";

export function useSensoryFeedback() {
    const { playClick, playSuccess, isMuted } = useAudio();

    const triggerHaptic = useCallback((type: HapticType = "light") => {
        if (Haptics[type]) {
            Haptics[type]();
        }
    }, []);

    const playClickEffect = useCallback(() => {
        if (!isMuted) playClick();
        triggerHaptic("medium");
    }, [playClick, triggerHaptic, isMuted]);

    const playSuccessEffect = useCallback(() => {
        if (!isMuted) playSuccess();
        triggerHaptic("success");
    }, [playSuccess, triggerHaptic, isMuted]);

    return {
        playClick: playClickEffect,
        playSuccess: playSuccessEffect,
        triggerHaptic,
        isMuted
    };
}
