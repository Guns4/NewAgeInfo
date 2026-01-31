import { describe, it, expect } from 'vitest';
import { calculatePlanetaryAge } from '../core/logic/planetaryClock';

describe('Deep Age Engine (Planetary Logic Check)', () => {

    // 1. Planetary Precision Check (NASA Constants)
    it('should calculate Mercury age correctly (approx 4.15 per Earth year)', () => {
        const birthDate = new Date();
        birthDate.setFullYear(birthDate.getFullYear() - 1); // 1 year ago

        const ages = calculatePlanetaryAge(birthDate);
        const mercury = ages.find(p => p.name === 'Mercury');

        // 1 Earth Year (365 days / 87.97 days) ~= 4.15
        expect(mercury).toBeDefined();
        expect(mercury?.age).toBeGreaterThan(4.1);
        expect(mercury?.age).toBeLessThan(4.2);
    });

    it('should calculate Saturn age correctly (approx 0.034 per Earth year)', () => {
        const birthDate = new Date();
        birthDate.setFullYear(birthDate.getFullYear() - 1); // 1 year ago

        const ages = calculatePlanetaryAge(birthDate);
        const saturn = ages.find(p => p.name === 'Saturn');

        // 1 Earth Year (365 / 10759) ~= 0.0339
        expect(saturn).toBeDefined();
        expect(saturn?.age).toBeCloseTo(0.0339, 3);
    });

    // 2. Edge Case: Leap Year Handling
    it('should handle leap year birth dates consistently', () => {
        // Born Feb 29, 2020
        const birthDate = new Date(2020, 1, 29);
        const ages = calculatePlanetaryAge(birthDate);

        // Just verify it doesn't crash and returns valid numbers
        expect(ages).toHaveLength(8);
        expect(ages[2].name).toBe('Earth'); // Earth should be there
        expect(ages[2].age).toBeGreaterThan(0);
    });

    // 3. Edge Case: Born Today (Exact Moment)
    it('should handle being born exactly today (0 age)', () => {
        const now = new Date();
        const ages = calculatePlanetaryAge(now);

        // Age should be effectively 0 (or close to floating point 0 if ms diff)
        ages.forEach(p => {
            expect(p.age).toBeCloseTo(0, 5);
        });
    });

    // 4. Edge Case: Future Date (Time Traveler)
    it('should handle future dates gracefully (negative age)', () => {
        const future = new Date();
        future.setFullYear(future.getFullYear() + 1);

        const ages = calculatePlanetaryAge(future);

        ages.forEach(p => {
            expect(p.age).toBeLessThan(0);
        });
    });
});
