import {
    differenceInYears,
    differenceInMonths,
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInSeconds,
    addYears,
    addMonths,
    addDays,
    addHours,
    addMinutes,
    isValid,
    isAfter,
    isBefore,
    setYear,
    startOfDay
} from 'date-fns';

export interface AgeMetrics {
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export interface CountdownMetrics {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
    nextBirthday: Date;
}

/**
 * Calculates detailed age metrics from a birth date/time.
 * 
 * Logic follows the standard "reduce" pattern:
 * 1. Calculate full years.
 * 2. Calculate full months remaining after years.
 * 3. Calculate full days remaining after months.
 * ...and so on.
 * 
 * @param birthDate The person's date (and time) of birth
 * @returns AgeMetrics object
 */
export function calculateDetailedAge(birthDate: Date): AgeMetrics {
    const now = new Date();

    if (!isValid(birthDate)) {
        throw new Error("Invalid birth date provided");
    }

    if (isAfter(birthDate, now)) {
        return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    // 1. Years
    const years = differenceInYears(now, birthDate);
    let pivot = addYears(birthDate, years);

    // 2. Months
    const months = differenceInMonths(now, pivot);
    pivot = addMonths(pivot, months);

    // 3. Days
    const days = differenceInDays(now, pivot);
    pivot = addDays(pivot, days);

    // 4. Hours
    const hours = differenceInHours(now, pivot);
    pivot = addHours(pivot, hours);

    // 5. Minutes
    const minutes = differenceInMinutes(now, pivot);
    pivot = addMinutes(pivot, minutes);

    // 6. Seconds
    const seconds = differenceInSeconds(now, pivot);

    return {
        years,
        months,
        days,
        hours,
        minutes,
        seconds
    };
}

/**
 * Calculates the countdown to the next birthday.
 * Includes millisecond precision.
 * 
 * @param birthDate The person's date of birth
 * @returns CountdownMetrics object
 */
export function nextBirthdayCountdown(birthDate: Date): CountdownMetrics {
    const now = new Date();

    if (!isValid(birthDate)) {
        throw new Error("Invalid birth date provided");
    }

    const currentYear = now.getFullYear();

    // Try to set birthday to this year
    let nextBirthday = setYear(birthDate, currentYear);

    // If birthday already passed this year (or is today), next one is next year
    // Note: We use isBefore to strictly check. If it's *exactly* same time, logic implies 0 countdown.
    if (isBefore(nextBirthday, now)) {
        nextBirthday = setYear(birthDate, currentYear + 1);
    }

    // Check logic for today being birthday? 
    // If now is 10:00 and birthday was 09:00, nextBirthday is next year. Correct.
    // If now is 09:00 and birthday is 10:00, nextBirthday is today (this year). Correct.

    // Difference in milliseconds
    const diffMs = nextBirthday.getTime() - now.getTime();

    // Breakdown
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
    const milliseconds = diffMs % 1000;

    return {
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
        nextBirthday
    };
}

/**
 * Calculates life progress based on an assumed life expectancy.
 * 
 * @param birthDate The person's date of birth
 * @param lifeExpectancyYears Default is 80 years
 * @returns number Percentage (0-100, can be >100)
 */
export function calculateLifeProgress(birthDate: Date, lifeExpectancyYears: number = 80): number {
    const now = new Date();

    if (!isValid(birthDate)) {
        throw new Error("Invalid birth date provided");
    }

    const totalLifeMs = lifeExpectancyYears * 365.25 * 24 * 60 * 60 * 1000; // Approx logic including leap years
    const livedMs = now.getTime() - birthDate.getTime();

    let progress = (livedMs / totalLifeMs) * 100;

    // Clamp to 2 decimal places for neatness, but keep as number
    return Math.round(progress * 10000) / 10000;
}
