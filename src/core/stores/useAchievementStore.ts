import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AchievementState {
    unlockedMilestones: string[]; // List of Milestone IDs
    lastCelebratedId: string | null;
    unlockMilestone: (id: string) => boolean; // Returns true if newly unlocked
    markCelebrated: (id: string) => void;
}

export const useAchievementStore = create<AchievementState>()(
    persist(
        (set, get) => ({
            unlockedMilestones: [],
            lastCelebratedId: null,

            unlockMilestone: (id: string) => {
                const { unlockedMilestones } = get();
                if (unlockedMilestones.includes(id)) {
                    return false; // Already unlocked
                }

                set({ unlockedMilestones: [...unlockedMilestones, id] });
                return true; // Newly unlocked!
            },

            markCelebrated: (id: string) => {
                set({ lastCelebratedId: id });
            },
        }),
        {
            name: 'ageinfo-achievements', // key in local storage
        }
    )
);
