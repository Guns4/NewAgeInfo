import { differenceInCalendarDays } from "date-fns";

export interface Weton {
    pasaran: string;
    dina: string; // Hari
    neptu: number; // Sum of values (optional advanced feature)
}

// Reference date: 1 Jan 2000 was Saturday Pahing.
const PASARAN = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];
const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export function getWeton(date: Date): string {
    // 1. Calculate Pasaran
    // Phase 66: Use differenceInCalendarDays to correctly handle leap years 
    // across long time spans (e.g. from 1800 to 2100).
    const refDate = new Date(2000, 0, 1); // Jan 1 2000 (Saturday Pahing)
    const diffDays = differenceInCalendarDays(date, refDate);

    // Modulo 5 handling negative values correctly
    let pasaranIndex = (1 + diffDays) % 5; // 1 is Pahing index
    if (pasaranIndex < 0) pasaranIndex += 5;

    const pasaran = PASARAN[pasaranIndex];

    // 2. Dina (Hari)
    const dayIndex = date.getDay(); // 0 = Sunday
    const hari = HARI[dayIndex];

    return `${hari} ${pasaran}`;
}
