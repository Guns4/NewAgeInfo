import {
    differenceInYears,
    differenceInMonths,
    differenceInWeeks,
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInSeconds,
    addYears,
    addMonths,
    addWeeks,
    isValid,
    startOfDay,
    isLeapYear,
    getDaysInYear
} from "date-fns";

export interface DetailedAge {
    years: number;
    months: number;
    weeks: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    totalDays: number;
    totalWeeks: number;
    nextBirthday: Date;
    daysUntilBirthday: number;
    lifePercentage: number; // Based on expected age
}

export class AgeService {
    /**
     * Calculates detailed age metrics with high precision.
     * Pure function: depends only on inputs.
     * @param dob Date of birth
     * @param now Current date (defaults to new Date())
     * @param expectedAge Life expectancy in years (defaults to 80)
     */
    static calculateDetailedAge(dob: Date | string, now: Date = new Date(), expectedAge: number = 80): DetailedAge {
        const birthDate = typeof dob === 'string' ? new Date(dob) : dob;

        if (!isValid(birthDate)) {
            throw new Error("Invalid birth date provided");
        }

        // Edge Case: Future Date
        if (birthDate > now) {
            // Return a "Zero" age or handle as time traveler in UI
            return {
                years: 0,
                months: 0,
                weeks: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                totalDays: 0,
                totalWeeks: 0,
                nextBirthday: birthDate,
                daysUntilBirthday: 0,
                lifePercentage: 0,
            };
        }

        // 1. Time Calculation
        const years = differenceInYears(now, birthDate);

        const lastBirthday = addYears(birthDate, years);
        const months = differenceInMonths(now, lastBirthday);

        const lastMonth = addMonths(lastBirthday, months);
        const weeks = differenceInWeeks(now, lastMonth);

        const lastWeek = addWeeks(lastMonth, weeks);
        const days = differenceInDays(now, lastWeek);

        const lastDay = new Date(lastWeek);
        lastDay.setDate(lastDay.getDate() + days);

        const hours = differenceInHours(now, lastDay) % 24;
        const minutes = differenceInMinutes(now, lastDay) % 60;
        const seconds = differenceInSeconds(now, lastDay) % 60;

        // 2. Birthday Logic (Handling Leap Years & Extreme Dates)
        let nextBirthday = addYears(birthDate, years + 1);

        // Handle Leap Baby edge case for next birthday
        if (isLeapYear(birthDate) && birthDate.getMonth() === 1 && birthDate.getDate() === 29) {
            if (!isLeapYear(nextBirthday)) {
                // If next anniversary isn't a leap year, birthday is Feb 28
                nextBirthday = new Date(nextBirthday.getFullYear(), 1, 28, birthDate.getHours(), birthDate.getMinutes());
            }
        }

        // Improve precision for days until birthday
        const startOfNow = startOfDay(now);
        const startOfNextBirthday = startOfDay(nextBirthday);

        let daysUntil = differenceInDays(startOfNextBirthday, startOfNow);
        if (daysUntil < 0) {
            // Already had birthday this year or timezone shift
            const nextYearBirthday = addYears(nextBirthday, 1);
            daysUntil = differenceInDays(startOfNextBirthday, startOfNow);
            // Re-check for leap year if it's negative
            if (daysUntil < 0) daysUntil = 365 + (isLeapYear(now) ? 1 : 0);
        }

        // 3. Life Percentage
        // For ancient dates (1800s), lifePercentage might exceed 100%
        const totalLifeDays = expectedAge * 365.25;
        const totalDaysLived = differenceInDays(now, birthDate);
        const lifePercentage = Math.min(1000, Math.max(0, (totalDaysLived / totalLifeDays) * 100));

        return {
            years,
            months,
            weeks,
            days,
            hours,
            minutes,
            seconds,
            totalDays: totalDaysLived,
            totalWeeks: differenceInWeeks(now, birthDate),
            nextBirthday,
            daysUntilBirthday: daysUntil,
            lifePercentage: Number(lifePercentage.toFixed(4)), // 4 decimal precision
        };
    }

    /**
     * Calculates the exact number of seconds a person has lived.
     */
    static getTotalSecondsLived(dob: Date, now: Date = new Date()): number {
        return differenceInSeconds(now, dob);
    }

    /**
     * Determines if the user was born in a leap year.
     */
    static isLeapBaby(dob: Date): boolean {
        return isLeapYear(dob);
    }
}
