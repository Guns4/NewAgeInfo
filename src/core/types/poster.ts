/**
 * PHASE 65: Legacy Poster Engine Types
 */

export interface PosterData {
    name: string;
    birthDate: Date;
    totalDays: number;
    years: number;
    weton: {
        day: string; // e.g., Senin
        marketDay: string; // e.g., Pon
        combined: string; // e.g., Senin Pon
    };
    birthstone: {
        name: string;
        color: string;
    };
    planetaryAge: {
        planet: string;
        age: number;
    };
    milestones: {
        label: string;
        date: string;
    }[];
}

/**
 * Javanese Weton Logic (Simplified for UI)
 * Pancawara: Legi, Pahing, Pon, Wage, Kliwon
 * Saptawara: Minggu, Senin, Selasa, Rabu, Kamis, Jumat, Sabtu
 */
export function getWeton(date: Date) {
    const saptawara = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const pancawara = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];

    // Reference date for weton calculation (e.g., Friday, 1 Jan 1900 was Juma'at Wage)
    // 1 Jan 1900 is safe ground for these offsets.
    const refDate = new Date(1900, 0, 1);
    const diffDays = Math.floor((date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));

    const sIdx = date.getDay(); // 0 is Sunday
    // Offset for 1 Jan 1900 (Monday Wage? Actually let's just use day index for Saptawara)
    const pIdx = (diffDays + 3) % 5; // 3 is offset adjustment for 1900-01-01 being Wage

    return {
        day: saptawara[sIdx],
        marketDay: pancawara[pIdx < 0 ? pIdx + 5 : pIdx],
        combined: `${saptawara[sIdx]} ${pancawara[pIdx < 0 ? pIdx + 5 : pIdx]}`
    };
}

export function getBirthstone(month: number) {
    const stones = [
        { name: "Garnet", color: "#991b1b" }, // Jan
        { name: "Amethyst", color: "#6b21a8" }, // Feb
        { name: "Aquamarine", color: "#0891b2" }, // Mar
        { name: "Diamond", color: "#f8fafc" }, // Apr
        { name: "Emerald", color: "#065f46" }, // May
        { name: "Pearl", color: "#fef3c7" }, // Jun
        { name: "Ruby", color: "#be123c" }, // Jul
        { name: "Peridot", color: "#65a30d" }, // Aug
        { name: "Sapphire", color: "#1e40af" }, // Sep
        { name: "Opal", color: "#fdf4ff" }, // Oct
        { name: "Topaz", color: "#b45309" }, // Nov
        { name: "Turquoise", color: "#0d9488" } // Dec
    ];
    return stones[month];
}
