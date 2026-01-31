import { getWeton } from "@/core/logic/weton";

export interface CulturalProfile {
    hijri: {
        date: string;
        day: string;
        month: string;
        year: string;
    };
    weton: {
        full: string; // e.g. "Jumat Kliwon"
        pasaran: string; // e.g. "Kliwon"
        dina: string; // e.g. "Jumat"
    };
}

/**
 * Returns the Hijri date components.
 */
function getHijriDate(date: Date): { date: string, day: string, month: string, year: string } {
    const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    // Format output e.g., "Rajab 14, 1420 AH"
    // Since widely supported browsers output varied strings, we'll extract simply.
    // However, reliable parsing depends on browser implementation.
    // For visual display, we just return the formatted string.

    const parts = formatter.formatToParts(date);
    const day = parts.find(p => p.type === 'day')?.value || '';
    const month = parts.find(p => p.type === 'month')?.value || '';
    const year = parts.find(p => p.type === 'year')?.value || '';

    return {
        date: `${day} ${month} ${year}`,
        day,
        month,
        year
    };
}

/**
 * Aggregates cultural profile data.
 */
export function getCulturalProfile(date: Date): CulturalProfile {
    const wetonString = getWeton(date, 'id'); // Force ID locale for authentic Weton
    const [dina, pasaran] = wetonString.split(' ');

    return {
        hijri: getHijriDate(date),
        weton: {
            full: wetonString,
            pasaran: pasaran || '',
            dina: dina || ''
        }
    };
}
