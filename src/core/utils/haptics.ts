"use client";

/**
 * HapticFeedback Utility
 * Provides a safe wrapper around the Navigator Vibration API.
 * Fails silently on unsupported devices.
 */
export const Haptics = {
    // Light impact (e.g., hover, focus)
    light: () => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(10);
        }
    },

    // Medium impact (e.g., click, toggle)
    medium: () => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(20);
        }
    },

    // Heavy impact (e.g., error, confirm)
    heavy: () => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(40);
        }
    },

    // Success pattern (two quick pulses)
    success: () => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate([30, 50, 30]);
        }
    },

    // Warning pattern (rapid vibration)
    warning: () => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate([10, 30, 10, 30]);
        }
    }
};
