import { describe, it, expect } from 'vitest';
import { DemographicsEngine } from './demographics-engine';

describe('DemographicsEngine', () => {
    describe('getWorldPopulation', () => {
        it('should return known bencharks correctly', () => {
            expect(DemographicsEngine.getWorldPopulation(1950)).toBe(2500000000);
            expect(DemographicsEngine.getWorldPopulation(2024)).toBe(8100000000);
        });

        it('should interpolate between years correctly', () => {
            // 1955 is halfway between 1950 (2.5B) and 1960 (3.0B) -> 2.75B
            expect(DemographicsEngine.getWorldPopulation(1955)).toBe(2750000000);
        });
    });

    describe('getSurvivalRate', () => {
        it('should be 100% for negative age (unborn)', () => {
            expect(DemographicsEngine.getSurvivalRate(-1)).toBe(100);
        });

        it('should decrease as age increases', () => {
            const rateAt20 = DemographicsEngine.getSurvivalRate(20);
            const rateAt80 = DemographicsEngine.getSurvivalRate(80);
            expect(rateAt20).toBeGreaterThan(rateAt80);
        });

        it('should be 0% for unrealistic age', () => {
            expect(DemographicsEngine.getSurvivalRate(120)).toBe(0);
        });
    });
});
