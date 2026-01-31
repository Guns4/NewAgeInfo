export interface Milestone {
    id: string;
    title: string;
    description: string;
    threshold: number;
    unit: 'days' | 'seconds' | 'hours';
    icon: string;
    isRare?: boolean;
}

export const MILESTONES: Milestone[] = [
    // Days Milestones
    { id: 'days-1k', title: '1,000 Days', description: 'The Toddler Triumph', threshold: 1000, unit: 'days', icon: '👶' },
    { id: 'days-5k', title: '5,000 Days', description: 'Teenage Dream', threshold: 5000, unit: 'days', icon: '🎒' },
    { id: 'days-10k', title: '10,000 Days', description: 'The Quarter-Life Victory', threshold: 10000, unit: 'days', icon: '🎓', isRare: true },
    { id: 'days-15k', title: '15,000 Days', description: 'The Wisdom Walker', threshold: 15000, unit: 'days', icon: '⛰️' },
    { id: 'days-20k', title: '20,000 Days', description: 'The Golden Era', threshold: 20000, unit: 'days', icon: '🏅', isRare: true },
    { id: 'days-25k', title: '25,000 Days', description: 'The Platinum Sage', threshold: 25000, unit: 'days', icon: '👑' },

    // Hours Milestones
    { id: 'hours-100k', title: '100,000 Hours', description: 'Experienced Livers Club', threshold: 100000, unit: 'hours', icon: '⌚' },
    { id: 'hours-250k', title: '250,000 Hours', description: 'Master of Time', threshold: 250000, unit: 'hours', icon: '⏳' },
    { id: 'hours-500k', title: '500,000 Hours', description: 'Half a Million Stories', threshold: 500000, unit: 'hours', icon: '📚', isRare: true },

    // Seconds Milestones
    { id: 'sec-100m', title: '100 Million Seconds', description: 'Just Warming Up', threshold: 100000000, unit: 'seconds', icon: '⚡' },
    { id: 'sec-1b', title: '1 Billion Seconds', description: 'The Gigasecond Champion', threshold: 1000000000, unit: 'seconds', icon: '🌌', isRare: true },
];

export function checkMilestones(ageData: { days: number; hours: number; seconds: number }) {
    return MILESTONES.filter(milestone => {
        let currentVal = 0;
        if (milestone.unit === 'days') currentVal = ageData.days;
        if (milestone.unit === 'hours') currentVal = ageData.hours;
        if (milestone.unit === 'seconds') currentVal = ageData.seconds;

        // Unlock if current value is greater/equal to threshold
        return currentVal >= milestone.threshold;
    });
}

// Logic to find the *most recent* significant milestone (e.g. passed within last 30 days) could go here
// For now, we return all unlocked.
