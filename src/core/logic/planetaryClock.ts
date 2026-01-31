import { differenceInDays, addDays } from "date-fns";

export interface PlanetaryAge {
    name: string;
    orbitalPeriod: number; // in Earth days
    age: number; // in planetary years
    nextBirthday: Date;
}

const PLANETS = [
    { name: "Mercury", orbitalPeriod: 87.97 },
    { name: "Venus", orbitalPeriod: 224.7 },
    { name: "Earth", orbitalPeriod: 365.256 },
    { name: "Mars", orbitalPeriod: 687 },
    { name: "Jupiter", orbitalPeriod: 4332.59 },
    { name: "Saturn", orbitalPeriod: 10759 },
    { name: "Uranus", orbitalPeriod: 30685 },
    { name: "Neptune", orbitalPeriod: 60190 },
];

/**
 * Calculates the user's age on different planets.
 * 
 * @param birthDate User's birth date
 * @returns Array of planetary age data
 */
export function calculatePlanetaryAge(birthDate: Date): PlanetaryAge[] {
    const now = new Date();
    const earthDaysAlive = differenceInDays(now, birthDate);

    return PLANETS.map((planet) => {
        // Calculate exact planetary age
        const planetaryAge = earthDaysAlive / planet.orbitalPeriod;

        // Calculate next birthday
        // The next integer age
        const nextAge = Math.floor(planetaryAge) + 1;

        // Total Earth days needed to reach that next age
        const daysForNextBirthday = nextAge * planet.orbitalPeriod;

        // Remaining days from now
        const daysRemaining = daysForNextBirthday - earthDaysAlive;

        // Date of next birthday
        const nextBirthdayDate = addDays(now, Math.ceil(daysRemaining));

        return {
            name: planet.name,
            orbitalPeriod: planet.orbitalPeriod,
            age: planetaryAge,
            nextBirthday: nextBirthdayDate,
        };
    });
}
