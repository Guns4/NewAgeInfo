import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://ageinfo.online'

    // 1. Static Routes (Core + Legal)
    const routes = [
        '',
        '/about',
        '/privacy',
        '/terms',
        '/cookies',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // 2. Weton Cycles (35 Combinations)
    // Combinations of 5 Pasaran x 7 Hari
    const pasaran = ["legi", "pahing", "pon", "wage", "kliwon"];
    const hari = ["minggu", "senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];

    const wetonRoutes: MetadataRoute.Sitemap = [];

    hari.forEach(h => {
        pasaran.forEach(p => {
            // Structure: /weton/senin-kliwon
            ['en', 'id'].forEach(locale => {
                wetonRoutes.push({
                    url: `${baseUrl}/${locale}/weton/${h}-${p}`,
                    lastModified: new Date(),
                    changeFrequency: 'weekly' as const,
                    priority: 0.9
                });
            });
        });
    });

    // 3. "Wrapped" Pages (Year Cohorts) - Replaced /born/ with /wrapped/
    // Generating 1950-2025 covers the majority of active internet users.
    const cohortRoutes: MetadataRoute.Sitemap = [];
    const currentYear = new Date().getFullYear();

    for (let y = 1950; y <= currentYear; y++) {
        ['en', 'id'].forEach(locale => {
            cohortRoutes.push({
                url: `${baseUrl}/${locale}/wrapped/${y}`, // UNIFIED: /wrapped/[slug]
                lastModified: new Date(),
                changeFrequency: 'yearly' as const,
                priority: 0.8
            });
        });
    }

    // 4. "History" Pages (Date Specific) - Replaced /birthdate/ with /history/
    // Helps target "Born on January 1st" searches
    const dateRoutes: MetadataRoute.Sitemap = [];
    const dateYear = 2024; // Leap year reference
    const startDate = new Date(dateYear, 0, 1);
    const endDate = new Date(dateYear, 11, 31);

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');
        const slug = `${month}-${day}`;

        ['en', 'id'].forEach(locale => {
            dateRoutes.push({
                url: `${baseUrl}/${locale}/history/${slug}`, // UNIFIED: /history/[slug]
                lastModified: new Date(),
                changeFrequency: 'yearly' as const,
                priority: 0.7
            });
        });
    }

    return [...routes, ...wetonRoutes, ...cohortRoutes, ...dateRoutes]
}
