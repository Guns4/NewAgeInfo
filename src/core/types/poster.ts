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

import { differenceInCalendarDays } from "date-fns";

/**
 * Javanese Weton Logic (Phase 66: High Precision)
 * Pancawara: Legi, Pahing, Pon, Wage, Kliwon
 * Saptawara: Minggu, Senin, Selasa, Rabu, Kamis, Jumat, Sabtu
 */
export function getWeton(date: Date) {
    const saptawara = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const pancawara = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];

    // Reference date: 1 Jan 2000 was Saturday Pahing.
    const refDate = new Date(2000, 0, 1);
    const diffDays = differenceInCalendarDays(date, refDate);

    const sIdx = date.getDay(); // 0 is Sunday

    // Offset for Pahing (index 1) at Jan 1 2000
    let pIdx = (1 + diffDays) % 5;
    if (pIdx < 0) pIdx += 5;

    return {
        day: saptawara[sIdx],
        marketDay: pancawara[pIdx],
        combined: `${saptawara[sIdx]} ${pancawara[pIdx]}`
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
