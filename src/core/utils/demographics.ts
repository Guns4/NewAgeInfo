/**
 * UN World Population Prospects Data Utility
 * Provides birth estimates and survival rates for precise demographic calculations.
 */

interface YearData {
    births: number; // in millions
}

// Data approximation based on UN World Population Prospects
const UN_BIRTH_DATA: Record<number, number> = {
    // 1950-1960: ~92-100m (Interpolated)
    1950: 92, 1951: 93, 1952: 94, 1953: 95, 1954: 96, 1955: 97, 1956: 98, 1957: 99, 1958: 100, 1959: 101,
    // 1960-1970: ~100-120m
    1960: 102, 1961: 104, 1962: 107, 1963: 110, 1964: 112, 1965: 114, 1966: 115, 1967: 116, 1968: 118, 1969: 119,
    // 1970-1980: ~120-125m
    1970: 120, 1971: 121, 1972: 121, 1973: 122, 1974: 122, 1975: 122, 1976: 123, 1977: 123, 1978: 124, 1979: 125,
    // 1980-1990: ~130-138m
    1980: 128, 1981: 130, 1982: 132, 1983: 133, 1984: 134, 1985: 135, 1986: 136, 1987: 137, 1988: 137, 1989: 138,
    // 1990-2000: ~135-140m
    1990: 139, 1991: 138, 1992: 137, 1993: 136, 1994: 135, 1995: 135, 1996: 135, 1997: 136, 1998: 136, 1999: 137,
    // 2000-2015: ~140-145m
    2000: 138, 2001: 139, 2002: 139, 2003: 140, 2004: 141, 2005: 141, 2006: 142, 2007: 143, 2008: 144, 2009: 144, 2010: 145, 2011: 145, 2012: 145, 2013: 144, 2014: 144,
    // 2015-2025: ~134-140m
    2015: 143, 2016: 142, 2017: 141, 2018: 140, 2019: 139, 2020: 138, 2021: 137, 2022: 136, 2023: 135, 2024: 134, 2025: 134
};

export const UN_Demographics = {
    /**
     * Get annual births in millions for a given year.
     * Fallback to closest known data for out-of-range years.
     */
    getAnnualBirths: (year: number): number => {
        if (UN_BIRTH_DATA[year]) return UN_BIRTH_DATA[year];
        if (year < 1950) return 90;
        if (year > 2025) return 134;
        return 135; // Safe average fallback
    },

    /**
     * Calculate births on a specific day (Annual / 365.25)
     * Returns absolute number (not millions)
     */
    getDailyBirths: (year: number): number => {
        const annualMillions = UN_Demographics.getAnnualBirths(year);
        const annualAbsolute = annualMillions * 1_000_000;
        return Math.floor(annualAbsolute / 365.25);
    },

    /**
     * Calculate survival probability factor based on age.
     * Age < 40: 92%
     * Age 40-60: 85%
     * Age 60-80: 70%
     * Age > 80: 40%
     */
    getSurvivalFactor: (age: number): number => {
        if (age < 40) return 0.92;
        if (age >= 40 && age < 60) return 0.85;
        if (age >= 60 && age < 80) return 0.70;
        return 0.40;
    },

    /**
     * Estimate current survivors from the birth day cohort.
     */
    getDailyCohortSurvivors: (birthYear: number, age: number): number => {
        const birthsOnDay = UN_Demographics.getDailyBirths(birthYear);
        const factor = UN_Demographics.getSurvivalFactor(age);
        return Math.floor(birthsOnDay * factor);
    }
};
