import { PEER_ACHIEVEMENTS, Achievement } from "@/core/constants/achievements";

export interface ComparisonResult {
    global: Achievement | null;
    local: Achievement | null;
}

export const PeerEngine = {
    /**
     * Finds achievements relevant to the user's age.
     * Looks for exact match, then +/- 1 year.
     */
    getRelevantAchievement: (age: number): ComparisonResult => {
        // Helper to find best match in a category
        const findMatch = (category: 'Global' | 'Lokal'): Achievement | null => {
            const categoryData = PEER_ACHIEVEMENTS.filter(a => a.category === category);

            // 1. Exact Match
            const exact = categoryData.find(a => a.age === age);
            if (exact) return exact;

            // 2. Plus 1 Year
            const plusOne = categoryData.find(a => a.age === age + 1);
            if (plusOne) return plusOne;

            // 3. Minus 1 Year
            const minusOne = categoryData.find(a => a.age === age - 1);
            if (minusOne) return minusOne;

            // 4. Fallback: Closest within reasonable range (e.g. 5 years) just to show something?
            // For now, let's just find the closest one overall if nothing within +/- 1
            /* 
            return categoryData.reduce((prev, curr) => {
                return (Math.abs(curr.age - age) < Math.abs(prev.age - age) ? curr : prev);
            });
            */
            // Ideally we return null if too far, but let's be generous for the UI 
            // and return the closest absolute match if nothing strict exists.

            if (categoryData.length === 0) return null;

            return categoryData.reduce((prev, curr) => {
                return (Math.abs(curr.age - age) < Math.abs(prev.age - age) ? curr : prev);
            });
        };

        return {
            global: findMatch('Global'),
            local: findMatch('Lokal')
        };
    }
};
