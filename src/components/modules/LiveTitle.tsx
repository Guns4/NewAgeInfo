"use client";

import { useEffect } from "react";
import { intervalToDuration } from "date-fns";

interface LiveTitleProps {
    birthDate: Date;
}

export function LiveTitle({ birthDate }: LiveTitleProps) {
    useEffect(() => {
        const updateTitle = () => {
            const now = new Date();
            const duration = intervalToDuration({ start: birthDate, end: now });
            const { years = 0, months = 0, days = 0 } = duration;

            document.title = `${years}y ${months}m ${days}d | Ageinfo`;
        };

        // Initial update
        updateTitle();

        // Update every minute to keep title reasonably fresh without spamming
        const interval = setInterval(updateTitle, 60000);

        return () => clearInterval(interval);
    }, [birthDate]);

    return null; // Headless component
}
