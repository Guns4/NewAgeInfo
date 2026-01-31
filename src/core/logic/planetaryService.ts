import { differenceInDays, addDays } from "date-fns";

export interface PlanetaryData {
    name: string;
    orbitalPeriod: number; // in Earth days (NASA Data)
    age: number; // in planetary years
    nextBirthday: Date;
    color: string; // Gradient class
    description: string;
}

const ORBITAL_PERIODS = {
    Mercury: 87.97,
    Venus: 224.7,
    Earth: 365.26,
    Mars: 687,
    Jupiter: 4332.59,
    Saturn: 10759,
    Uranus: 30685,
    Neptune: 60190,
};

const PLANET_STYLES = {
    Mercury: {
        color: "bg-gradient-to-br from-slate-300 to-stone-500",
        description: "The Swift Planet"
    },
    Venus: {
        color: "bg-gradient-to-br from-yellow-400 to-orange-500",
        description: "The Morning Star"
    },
    Earth: {
        color: "bg-gradient-to-br from-emerald-400 to-blue-600",
        description: "Our Home"
    },
    Mars: {
        color: "bg-gradient-to-br from-red-500 to-orange-700",
        description: "The Red Planet"
    },
    Jupiter: {
        color: "bg-gradient-to-br from-orange-300 to-amber-700",
        description: "The Gas Giant"
    },
    Saturn: {
        color: "bg-gradient-to-br from-yellow-200 to-amber-500",
        description: "The Ringed Jewel"
    },
    Uranus: {
        color: "bg-gradient-to-br from-cyan-300 to-blue-400",
        description: "The Ice Giant"
    },
    Neptune: {
        color: "bg-gradient-to-br from-blue-500 to-indigo-700",
        description: "The Windy Planet"
    },
};

export class PlanetaryService {
    /**
     * Calculates planetary age details based on precise NASA orbital data.
     */
    static calculateAges(birthDate: Date): PlanetaryData[] {
        const now = new Date();
        const earthDaysAndFraction = (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24);

        return Object.entries(ORBITAL_PERIODS).map(([name, period]) => {
            const age = earthDaysAndFraction / period;

            // Next Birthday Calc
            const nextAge = Math.floor(age) + 1;
            const daysToBirthday = (nextAge * period) - earthDaysAndFraction;
            const nextBirthday = addDays(now, Math.ceil(daysToBirthday));

            // Type assertion for style lookup safety
            const style = PLANET_STYLES[name as keyof typeof PLANET_STYLES];

            return {
                name,
                orbitalPeriod: period,
                age,
                nextBirthday,
                color: style.color,
                description: style.description
            };
        });
    }
}
