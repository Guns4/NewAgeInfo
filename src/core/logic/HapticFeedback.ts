/**
 * Haptic Feedback Engine
 * Provides tactile feedback for user interactions using the Navigator Vibration API.
 * Gracefully degrades on devices that do not support it.
 */

export const HapticEngine = {
    // Light tick (e.g., hover, toggle)
    tick: () => {
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(10);
        }
    },

    // Standard click
    click: () => {
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(20);
        }
    },

    // Success pulse
    success: () => {
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate([30, 50, 30]);
        }
    },

    // Heavy thud (e.g., error)
    error: () => {
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate([50, 100, 50]);
        }
    }
};
