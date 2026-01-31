/**
 * HistoryService
 * Resilient data fetching for historical events.
 * Falls back to static data if API fails.
 */

// Fallback Data Store
const FALLBACK_HISTORY = [
    { year: 1969, event: "Humans landed on the Moon." },
    { year: 1989, event: "The Berlin Wall fell." },
    { year: 1991, event: "The World Wide Web was introduced to the public." },
    { year: 2007, event: "The first iPhone was released." },
    { year: 1945, event: "The United Nations was established." }
];

interface HistoricalEvent {
    year: number;
    text: string;
}

export const HistoryService = {
    /**
     * Fetches events for a specific month/day (e.g., on your birthday).
     * @param month 1-12
     * @param day 1-31
     */
    getEventsOnDate: async (month: number, day: number): Promise<HistoricalEvent[]> => {
        console.log(`Fetching history for ${month}/${day}...`);

        try {
            // Attempt to fetch from external API (e.g., Wikipedia or similar free API)
            // Using a timeout promise to enforce failover if it takes too long
            const fetchWithTimeout = (url: string, ms: number) => {
                return Promise.race([
                    fetch(url),
                    new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms))
                ]);
            };

            // Placeholder for real API URL
            // const response = await fetchWithTimeout(`https://history.muffinlabs.com/date/${month}/${day}`, 3000) as Response;

            // Simulating API failure/absence for this demo to prove fallback works
            throw new Error("External History API not connected yet");

            /*
            if (!response.ok) throw new Error("API Error");
            const data = await response.json();
            return data.data.Events.map((e: any) => ({ year: e.year, text: e.text }));
            */

        } catch (error) {
            console.warn("History API failed, switching to Internal Fallback Data.", error);

            // Return Resilience Data
            // In a real app, we might filter this static list to match something relevant or random
            return FALLBACK_HISTORY.map(h => ({
                year: h.year,
                text: h.event
            }));
        }
    }
};
