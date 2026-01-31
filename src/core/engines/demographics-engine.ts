/**
 * Demographics Engine
 * Estimates global population stats based on birth date.
 * Uses simplified demographic models for "Rank" and "Survival".
 */

export const DemographicsEngine = {
    /**
     * Estimates World Population at a specific date.
     * Based on historical data points and interpolation.
     */
    getWorldPopulation: (year: number): number => {
        // Approximate data points (Year, Population in Billions)
        const benchmarks = [
            { y: 1950, p: 2.5 },
            { y: 1960, p: 3.0 },
            { y: 1970, p: 3.7 },
            { y: 1980, p: 4.4 },
            { y: 1990, p: 5.3 },
            { y: 2000, p: 6.1 },
            { y: 2010, p: 6.9 },
            { y: 2020, p: 7.8 },
            { y: 2024, p: 8.1 }
        ];

        // Find range
        let lower = benchmarks[0];
        let upper = benchmarks[benchmarks.length - 1];

        for (let i = 0; i < benchmarks.length - 1; i++) {
            if (year >= benchmarks[i].y && year <= benchmarks[i + 1].y) {
                lower = benchmarks[i];
                upper = benchmarks[i + 1];
                break;
            }
        }

        // Linear interpolation for simplicity (though population is exponential, this is close enough for rank)
        const ratio = (year - lower.y) / (upper.y - lower.y);
        const population = lower.p + (upper.p - lower.p) * ratio;

        return Math.floor(population * 1_000_000_000);
    },

    /**
     * Estimates "Global Age Rank"
     * A hypothetical number representing "You were the Nth human alive".
     * This is a fun, non-scientific metric for engagement.
     */
    getGlobalRank: (date: Date): string => {
        const year = date.getFullYear();
        const populationAtBirth = DemographicsEngine.getWorldPopulation(year);

        // Add random variance based on day of year to make it feel specific
        const dayOfYear = Math.floor((date.getTime() - new Date(year, 0, 0).getTime()) / 1000 / 60 / 60 / 24);
        const dailyBirths = 385000; // Approx daily births average

        const rank = populationAtBirth + (dayOfYear * dailyBirths) + Math.floor(Math.random() * 10000); // Add jitter
        return rank.toLocaleString();
    },

    /**
     * Estimates percentage of cohort still alive.
     * Very rough approximation using Gompertz-Makeham law concepts.
     */
    getSurvivalRate: (age: number): number => {
        // Simplified survival curve
        // 100% at 0, slowly dropping, accelerating after 60
        if (age < 0) return 100;
        if (age > 110) return 0;

        // Sigmoidal-ish decay
        // y = 100 / (1 + (x/80)^4) ? No, simpler:
        // Let's use piece-wise linear roughly based on UN life tables for global average

        let surv = 100;
        if (age < 5) surv = 95; // Child mortality legacy
        else if (age < 40) surv = 95 - ((age - 5) * 0.1); // ~91% at 40
        else if (age < 60) surv = 91 - ((age - 40) * 0.5); // ~81% at 60
        else if (age < 80) surv = 81 - ((age - 60) * 2.5); // ~31% at 80
        else surv = 31 - ((age - 80) * 3); // Rapid drop

        return Math.max(0, Math.min(100, Number(surv.toFixed(1))));
    }
};
