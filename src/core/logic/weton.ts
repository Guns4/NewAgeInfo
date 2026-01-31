export interface Weton {
    pasaran: string;
    dina: string; // Hari
    neptu: number; // Sum of values (optional advanced feature)
}

// Reference date: 1 Jan 1900 was Monday Pahing
// But using a simpler algorithm based on known epoch.
// Epoch: Thursday Wage, 1 Jan 1970
// Actually, let's use a known anchor.
// 28 Feb 2024 is Wednesday (Rabu) Kliwon.

const PASARAN = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];
const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const HARI_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function getWeton(date: Date, locale: string = 'id'): string {
    // 1. Calculate Pasaran
    // Pasaran cycles every 5 days.
    // We need a reference date.
    // Jan 1, 2000 was Saturday Pahing.
    const refDate = new Date(2000, 0, 1); // Jan 1 2000
    const diffTime = date.getTime() - refDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Modulo 5 handling negative values correctly
    let pasaranIndex = (1 + diffDays) % 5; // 1 is Pahing index in ["Legi", "Pahing", "Pon", "Wage", "Kliwon"]
    if (pasaranIndex < 0) pasaranIndex += 5;

    const pasaran = PASARAN[pasaranIndex];

    // 2. Dina (Hari)
    const dayIndex = date.getDay(); // 0 = Sunday
    const hari = HARI[dayIndex];
    const dayName = locale === 'id' ? hari : HARI_EN[dayIndex];

    // If locale is ID, return strictly "Senin Pahing"
    // If locale is EN, maybe just "Monday (Pahing)" or still "Senin Pahing" as it's a cultural term?
    // Request asks for "Weton (Javanese calendar) calculation logic".
    // Usually Weton is kept in Indonesian/Javanese terms.

    return `${hari} ${pasaran}`;
}
