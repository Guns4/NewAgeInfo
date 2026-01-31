export const Accessibility = {
    /**
     * Common ARIA labels for standard actions
     */
    labels: {
        close: "Close dialog",
        menu: "Open menu",
        search: "Search content",
        play: "Play audio",
        pause: "Pause audio",
        recalculate: "Recalculate your age",
        share: "Share your results",
        lock: "Lock time capsule",
        unlock: "Unlock time capsule",
        history: "View history",
    },

    /**
     * Generates a readable label for dates
     */
    readableDate: (date: Date): string => {
        return new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    },

    /**
     * Helpers for live regions
     */
    live: {
        polite: "polite" as const,
        assertive: "assertive" as const,
        off: "off" as const,
    },

    /**
     * Keyboard event helpers
     */
    keys: {
        isEnter: (e: React.KeyboardEvent) => e.key === 'Enter',
        isSpace: (e: React.KeyboardEvent) => e.key === ' ',
        isEscape: (e: React.KeyboardEvent) => e.key === 'Escape',
    }
};
