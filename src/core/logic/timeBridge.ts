/**
 * Time Bridge Comparison Logic (Phase 62)
 */

import { differenceInDays, differenceInHours, addDays, isAfter } from "date-fns";

export interface ComparisonResult {
    ageGapHours: number;
    daysTogether: number; // Potential shared days if they met at birth of the younger one
    syncDates: SyncDate[];
}

export interface SyncDate {
    label: string;
    date: Date;
    description: string;
}

export function compareAges(dob1: Date, dob2: Date): ComparisonResult {
    const older = isAfter(dob1, dob2) ? dob2 : dob1;
    const younger = isAfter(dob1, dob2) ? dob1 : dob2;
    const now = new Date();

    const ageGapHours = Math.abs(differenceInHours(dob1, dob2));

    // Days together (from birth of younger until now)
    const daysTogether = Math.max(0, differenceInDays(now, younger));

    const syncDates: SyncDate[] = [];

    // Milestone 1: Combined age of 50,000 days
    const combinedDaysAtBirthOfYounger = differenceInDays(younger, older);
    // age1 + age2 = (days since younger + combinedDaysAtBirthOfYounger) + (days since younger)
    // Target = 2 * daysSinceYounger + gap
    // daysSinceYounger = (Target - gap) / 2

    const targets = [10000, 25000, 50000];
    targets.forEach(target => {
        const daysToTarget = (target - combinedDaysAtBirthOfYounger) / 2;
        const targetDate = addDays(younger, daysToTarget);
        if (isAfter(targetDate, now)) {
            syncDates.push({
                label: `Combined ${target.toLocaleString()} Days`,
                date: targetDate,
                description: "The moment your total life experience reaches a massive milestone."
            });
        }
    });

    // Milestone 2: Golden Ratio Sync
    // When younger age / older age = 0.618? 
    // Usually "Sync" refers to when ages have a nice ratio or person B reaches age of person A.

    // When younger reaches older's current age
    const currentOlderAgeDays = differenceInDays(now, older);
    const dateYoungerMatchesOlderNow = addDays(younger, currentOlderAgeDays);
    if (isAfter(dateYoungerMatchesOlderNow, now)) {
        syncDates.push({
            label: "Wisdom Sync",
            date: dateYoungerMatchesOlderNow,
            description: "When the younger traveler reaches the exact age the older one is today."
        });
    }

    return {
        ageGapHours,
        daysTogether,
        syncDates: syncDates.sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 3)
    };
}
