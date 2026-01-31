import { describe, test, expect } from 'vitest';
import { AgeService } from '../ageEngine';
import { calculateBiorhythm } from '../biorhythm';
import { getWeton } from '../weton';

describe('Edge Case Audit', () => {
    describe('AgeService Extreme Dates', () => {
        test('Birth date in 1800 (Ancient Date)', () => {
            const dob = new Date(1800, 0, 1);
            const now = new Date(2024, 0, 1);
            const age = AgeService.calculateDetailedAge(dob, now);
            expect(age.years).toBe(224);
            expect(age.lifePercentage).toBeGreaterThan(100);
        });

        test('Future birth date (Time Traveler)', () => {
            const now = new Date();
            const dob = new Date(now.getFullYear() + 10, 0, 1);
            const age = AgeService.calculateDetailedAge(dob, now);
            expect(age.years).toBe(0);
            expect(age.totalDays).toBe(0);
        });

        test('Leap Baby Next Birthday (Non-Leap Year)', () => {
            const dob = new Date(2000, 1, 29); // Leap day
            const now = new Date(2001, 2, 1);
            const age = AgeService.calculateDetailedAge(dob, now);
            // In 2002 (non-leap), birthday should be Feb 28
            expect(age.nextBirthday.getMonth()).toBe(1);
            expect(age.nextBirthday.getDate()).toBe(28);
        });
    });

    describe('Biorhythm & Weton Leap Year Accuracy', () => {
        test('Biorhythm cycle consistency across leap year', () => {
            const dob = new Date(1996, 1, 28);
            const beforeLeap = calculateBiorhythm(dob, new Date(1996, 1, 28));
            const afterLeap = calculateBiorhythm(dob, new Date(1996, 1, 29));
            // Should be exactly 1 day difference in cycles
            expect(afterLeap.date.getTime() - beforeLeap.date.getTime()).toBe(24 * 60 * 60 * 1000);
        });

        test('Weton accuracy for historical leap year', () => {
            // 29 Feb 2000 was Tuesday (Selasa) Pon
            const weton = getWeton(new Date(2000, 1, 29));
            expect(weton).toBe('Selasa Pon');
        });

        test('Weton accuracy for future leap year', () => {
            // 29 Feb 2024 was Wednesday (Rabu) Kliwon
            const weton = getWeton(new Date(2024, 1, 29));
            expect(weton).toBe('Rabu Kliwon');
        });
    });
});
