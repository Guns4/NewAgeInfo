export function getZodiacSign(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1; // 1-12

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { sign: "Aries", symbol: "♈", element: "Fire", traits: ["Bold", "Energetic"] };
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { sign: "Taurus", symbol: "♉", element: "Earth", traits: ["Reliable", "Patient"] };
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { sign: "Gemini", symbol: "♊", element: "Air", traits: ["Curious", "Adaptable"] };
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { sign: "Cancer", symbol: "♋", element: "Water", traits: ["Intuitive", "Caring"] };
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { sign: "Leo", symbol: "♌", element: "Fire", traits: ["Charismatic", "Confident"] };
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { sign: "Virgo", symbol: "♍", element: "Earth", traits: ["Analytical", "Practical"] };
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { sign: "Libra", symbol: "♎", element: "Air", traits: ["Diplomatic", "Fair"] };
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { sign: "Scorpio", symbol: "♏", element: "Water", traits: ["Passionate", "Resourceful"] };
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { sign: "Sagittarius", symbol: "♐", element: "Fire", traits: ["Optimistic", "Adventurous"] };
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { sign: "Capricorn", symbol: "♑", element: "Earth", traits: ["Disciplined", "Ambitious"] };
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { sign: "Aquarius", symbol: "♒", element: "Air", traits: ["Innovative", "Independent"] };
    return { sign: "Pisces", symbol: "♓", element: "Water", traits: ["Artistic", "Empathetic"] };
}

export function getBirthstone(monthIndex: number) {
    const stones = [
        { name: "Garnet", color: "text-red-500", meaning: "Protection & Strength" }, // Jan
        { name: "Amethyst", color: "text-purple-500", meaning: "Wisdom & Calm" }, // Feb
        { name: "Aquamarine", color: "text-blue-300", meaning: "Serenity & Courage" }, // Mar
        { name: "Diamond", color: "text-slate-200", meaning: "Eternal Law & Strength" }, // Apr
        { name: "Emerald", color: "text-emerald-500", meaning: "Rebirth & Love" }, // May
        { name: "Pearl", color: "text-slate-100", meaning: "Purity & Wisdom" }, // Jun
        { name: "Ruby", color: "text-red-600", meaning: "Passion & Energy" }, // Jul
        { name: "Peridot", color: "text-lime-400", meaning: "Strength & Balance" }, // Aug
        { name: "Sapphire", color: "text-blue-600", meaning: "Wisdom & Royalty" }, // Sep
        { name: "Opal", color: "text-pink-300", meaning: "Creativity & Hope" }, // Oct
        { name: "Topaz", color: "text-amber-400", meaning: "Love & Affection" }, // Nov
        { name: "Turquoise", color: "text-teal-400", meaning: "Friendship & Luck" }  // Dec
    ];
    return stones[monthIndex] || stones[0];
}

export interface IdentityTraits {
    zodiac: {
        sign: string;
        symbol: string;
        element: string;
        traits: string[];
    };
    chineseZodiac: {
        animal: string;
        element: string; // To be precise, element changes every 2 years, but animal circles every 12.
        traits: string[];
    };
    birthstone: {
        name: string;
        color: string;
        meaning: string;
    };
    history: {
        year: number;
        event: string;
    }[];
}

// --- Western Zodiac ---
const WESTERN_ZODIACS = [
    { sign: "Capricorn", symbol: "♑", startMd: "01-01", endMd: "01-19", element: "Earth", traits: ["Disciplined", "Strategic", "Patient"] },
    { sign: "Aquarius", symbol: "♒", startMd: "01-20", endMd: "02-18", element: "Air", traits: ["Innovative", "Independent", "Humanitarian"] },
    { sign: "Pisces", symbol: "♓", startMd: "02-19", endMd: "03-20", element: "Water", traits: ["Intuitive", "Artistic", "Empathetic"] },
    { sign: "Aries", symbol: "♈", startMd: "03-21", endMd: "04-19", element: "Fire", traits: ["Courageous", "Determined", "Confident"] },
    { sign: "Taurus", symbol: "♉", startMd: "04-20", endMd: "05-20", element: "Earth", traits: ["Reliable", "Patient", "Devoted"] },
    { sign: "Gemini", symbol: "♊", startMd: "05-21", endMd: "06-20", element: "Air", traits: ["Adaptable", "Curious", "Affectionate"] },
    { sign: "Cancer", symbol: "♋", startMd: "06-21", endMd: "07-22", element: "Water", traits: ["Loyal", "Sympathetic", "Tenacious"] },
    { sign: "Leo", symbol: "♌", startMd: "07-23", endMd: "08-22", element: "Fire", traits: ["Creative", "Passionate", "Generous"] },
    { sign: "Virgo", symbol: "♍", startMd: "08-23", endMd: "09-22", element: "Earth", traits: ["Analytical", "Kind", "Hardworking"] },
    { sign: "Libra", symbol: "♎", startMd: "09-23", endMd: "10-22", element: "Air", traits: ["Diplomatic", "Fair", "Social"] },
    { sign: "Scorpio", symbol: "♏", startMd: "10-23", endMd: "11-21", element: "Water", traits: ["Passion", "Stubborn", "Resourceful"] },
    { sign: "Sagittarius", symbol: "♐", startMd: "11-22", endMd: "12-21", element: "Fire", traits: ["Generous", "Idealistic", "Humorous"] },
    { sign: "Capricorn", symbol: "♑", startMd: "12-22", endMd: "12-31", element: "Earth", traits: ["Disciplined", "Strategic", "Patient"] },
];

function getWesternZodiac(date: Date) {
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const md = `${m.toString().padStart(2, "0")}-${d.toString().padStart(2, "0")}`;

    // Simple range check
    const match = WESTERN_ZODIACS.find((z) => md >= z.startMd && md <= z.endMd);
    return match || WESTERN_ZODIACS[0]; // Fallback
}

// --- Chinese Zodiac (Shio) ---
// Simplified LNY Lookup for demonstration (1950-2030).
const LNY_DATES: Record<number, string> = {
    1950: "02-17", 1951: "02-06", 1952: "01-27", 1953: "02-14", 1954: "02-03", 1955: "01-24", 1956: "02-12", 1957: "01-31", 1958: "02-18", 1959: "02-08",
    1960: "01-28", 1961: "02-15", 1962: "02-05", 1963: "01-25", 1964: "02-13", 1965: "02-02", 1966: "01-21", 1967: "02-09", 1968: "01-30", 1969: "02-17",
    1970: "02-06", 1971: "01-27", 1972: "02-15", 1973: "02-03", 1974: "01-23", 1975: "02-11", 1976: "01-31", 1977: "02-18", 1978: "02-07", 1979: "01-28",
    1980: "02-16", 1981: "02-05", 1982: "01-25", 1983: "02-13", 1984: "02-02", 1985: "02-20", 1986: "02-09", 1987: "01-29", 1988: "02-17", 1989: "02-06",
    1990: "01-27", 1991: "02-15", 1992: "02-04", 1993: "01-23", 1994: "02-10", 1995: "01-31", 1996: "02-19", 1997: "02-07", 1998: "01-28", 1999: "02-16",
    2000: "02-05", 2001: "01-24", 2002: "02-12", 2003: "02-01", 2004: "01-22", 2005: "02-09", 2006: "01-29", 2007: "02-18", 2008: "02-07", 2009: "01-26",
    2010: "02-14", 2011: "02-03", 2012: "01-23", 2013: "02-10", 2014: "01-31", 2015: "02-19", 2016: "02-08", 2017: "01-28", 2018: "02-16", 2019: "02-05",
    2020: "01-25", 2021: "02-12", 2022: "02-01", 2023: "01-22", 2024: "02-10", 2025: "01-29", 2026: "02-17", 2027: "02-06", 2028: "01-26", 2029: "02-13",
    2030: "02-03"
};

const CHINESE_ZODIACS = [
    { animal: "Rat", traits: ["Quick-witted", "Resourceful", "Versatile", "Kind"] }, // 0 (1948, 1960...)
    { animal: "Ox", traits: ["Diligent", "Dependable", "Strong", "Determined"] },     // 1
    { animal: "Tiger", traits: ["Brave", "Confident", "Competitive"] },              // 2
    { animal: "Rabbit", traits: ["Quiet", "Elegant", "Kind", "Responsible"] },       // 3
    { animal: "Dragon", traits: ["Confident", "Intelligent", "Enthusiastic"] },      // 4
    { animal: "Snake", traits: ["Enigmatic", "Intelligent", "Wise"] },               // 5
    { animal: "Horse", traits: ["Animated", "Active", "Energetic"] },                // 6
    { animal: "Goat", traits: ["Calm", "Gentle", "Sympathetic"] },                   // 7
    { animal: "Monkey", traits: ["Sharp", "Smart", "Curiosity"] },                   // 8
    { animal: "Rooster", traits: ["Observant", "Hardworking", "Courageous"] },       // 9
    { animal: "Dog", traits: ["Lovely", "Honest", "Prudent"] },                      // 10
    { animal: "Pig", traits: ["Compassionate", "Generous", "Diligent"] },            // 11
];

function getChineseZodiac(date: Date) {
    const year = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const md = `${m.toString().padStart(2, "0")}-${d.toString().padStart(2, "0")}`;

    let zodiacYear = year;
    const lnyDate = LNY_DATES[year];

    // If date is before LNY, it counts as previous zodiac year
    if (lnyDate && md < lnyDate) {
        zodiacYear = year - 1;
    }

    // Animal Lookup
    const offset = (zodiacYear - 1900) % 12;
    const index = offset >= 0 ? offset : 12 + (offset % 12);

    // Element Lookup
    // Last digit 0,1=Metal, 2,3=Water, 4,5=Wood, 6,7=Fire, 8,9=Earth
    const lastDigit = zodiacYear % 10;
    let element = "Metal";
    if (lastDigit === 2 || lastDigit === 3) element = "Water";
    else if (lastDigit === 4 || lastDigit === 5) element = "Wood";
    else if (lastDigit === 6 || lastDigit === 7) element = "Fire";
    else if (lastDigit === 8 || lastDigit === 9) element = "Earth";

    return {
        ...CHINESE_ZODIACS[index],
        element,
    };
}

// --- Birthstones ---
const BIRTHSTONES = [
    { name: "Garnet", color: "text-red-700", meaning: "Protection" },       // Jan
    { name: "Amethyst", color: "text-purple-600", meaning: "Wisdom" },      // Feb
    { name: "Aquamarine", color: "text-cyan-400", meaning: "Serenity" },    // Mar
    { name: "Diamond", color: "text-slate-200", meaning: "Strength" },      // Apr
    { name: "Emerald", color: "text-emerald-500", meaning: "Hope" },        // May
    { name: "Pearl", color: "text-stone-200", meaning: "Purity" },          // Jun
    { name: "Ruby", color: "text-rose-600", meaning: "Vitality" },          // Jul
    { name: "Peridot", color: "text-lime-400", meaning: "Beauty" },         // Aug
    { name: "Sapphire", color: "text-blue-600", meaning: "Truth" },         // Sep
    { name: "Opal", color: "text-pink-300", meaning: "Healing" },           // Oct
    { name: "Topaz", color: "text-amber-500", meaning: "Joy" },             // Nov
    { name: "Turquoise", color: "text-teal-400", meaning: "Friendship" },   // Dec
];

function getBirthstone(date: Date) {
    return BIRTHSTONES[date.getMonth()];
}

// --- Historical Events (Sample Database) ---
const HISTORICAL_EVENTS: Record<string, { year: number; event: string }[]> = {
    // A simplified map of just a few key events for demo purposes.
    // In a real app, this would be a much larger JSON or API call.
    // We will dynamically return generic milestones if exact match fails for robustness.
    "generic": [
        { year: 1969, event: "Moon Landing" },
        { year: 1989, event: "Fall of Berlin Wall" },
        { year: 2000, event: "The New Millennium" },
    ]
};

function getHistoricalEvents(date: Date) {
    // For this demo, we'll return 3 significant events from the *birth year* or nearby.
    const year = date.getFullYear();

    // Dynamic generation for relevant context
    return [
        { year: year, event: `The world population was approx. ${(year < 2000 ? "4-6" : "6-8")} billion.` },
        { year: year, event: "A new generation began its journey." },
        { year: year, event: "The sun rose precisely 365 times this year." }, // Poetic fallback
    ];
}

// --- Main Export ---
export function getIdentityTraits(birthDate: Date): IdentityTraits {
    const zodiac = getWesternZodiac(birthDate);
    const chineseZodiac = getChineseZodiac(birthDate);
    const birthstone = getBirthstone(birthDate);
    const history = getHistoricalEvents(birthDate);

    return {
        zodiac,
        chineseZodiac,
        birthstone,
        history
    };
}
