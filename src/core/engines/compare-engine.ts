import { differenceInDays, differenceInYears, differenceInMonths } from "date-fns";

export interface AgeGap {
    days: number;
    years: number;
    months: number;
    olderPerson: 'A' | 'B' | 'Equal';
    gapDescription: string;
    percentageDifference: number; // For progress bar (0-100 relative to older person)
}

/**
 * Calculates the gap between two birthdates.
 */
export function calculateAgeGap(dateA: Date, dateB: Date): AgeGap {
    const timeA = dateA.getTime();
    const timeB = dateB.getTime();

    let olderPerson: 'A' | 'B' | 'Equal' = 'Equal';
    if (timeA < timeB) olderPerson = 'A'; // Born earlier = Older
    if (timeB < timeA) olderPerson = 'B';

    const absDiffDays = Math.abs(differenceInDays(dateA, dateB));
    const absDiffYears = Math.abs(differenceInYears(dateA, dateB));
    const absDiffMonths = Math.abs(differenceInMonths(dateA, dateB));

    // Calculate percentage for progress bar
    // Base is the age of the older person in ms
    const ageA_ms = Date.now() - timeA;
    const ageB_ms = Date.now() - timeB;
    const maxAge = Math.max(ageA_ms, ageB_ms);
    const minAge = Math.min(ageA_ms, ageB_ms);

    // Safety check for 0
    const percentageDifference = maxAge === 0 ? 0 : ((maxAge - minAge) / maxAge) * 100;

    let gapDescription = "";
    if (olderPerson === 'Equal') {
        gapDescription = "You are exactly the same age!";
    } else {
        const who = olderPerson === 'A' ? "You are" : "They are";
        if (absDiffYears > 0) {
            gapDescription = `${who} older by ${absDiffYears} years and ${absDiffMonths % 12} months.`;
        } else {
            gapDescription = `${who} older by ${absDiffDays} days.`;
        }
    }

    return {
        days: absDiffDays,
        years: absDiffYears,
        months: absDiffMonths,
        olderPerson,
        gapDescription,
        percentageDifference
    };
}
