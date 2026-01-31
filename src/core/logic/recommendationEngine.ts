import { Pasaran, ProductRecommendation, products } from "@/core/constants/products";

export interface UserProfile {
    age: number;
    pasaran: string; // "Pon", "Wage", etc.
}

export function getCuratedProducts(profile: UserProfile): {
    primary: ProductRecommendation;
    alternatives: ProductRecommendation[];
    psychologyCopy: {
        headline: string;
        why: string;
    };
} | null {
    const { age, pasaran } = profile;

    // Normalize Pasaran
    const validPasaran = Object.keys(products).find(
        (p) => p.toLowerCase() === pasaran.toLowerCase()
    ) as Pasaran | undefined;

    if (!validPasaran) return null;

    // Determine Age Tier
    let tier: 'youth' | 'career' | 'legacy';
    if (age < 20) tier = 'youth';
    else if (age > 35) tier = 'legacy';
    else tier = 'career';

    // Fetch Products
    const availableProducts = products[validPasaran][tier];
    if (!availableProducts || availableProducts.length === 0) return null;

    // Select Primary (Random for variety, or seeded logic could be added)
    const primary = availableProducts[Math.floor(Math.random() * availableProducts.length)];

    // Select Alternatives (excluding primary)
    const alternatives = availableProducts.filter(p => p.id !== primary.id);

    // Generate Dynamic Psychology Copy
    const copy = generatePsychologyCopy(validPasaran, age, primary.category);

    return {
        primary,
        alternatives,
        psychologyCopy: copy
    };
}

function generatePsychologyCopy(pasaran: Pasaran, age: number, category: string) {
    // Dynamic Headlines
    const headlines = {
        youth: "Start Your Journey Right",
        career: "Level Up Your Ambition",
        legacy: "Honor Your Achievements"
    };

    let selectedHeadline = "Curated For You";
    if (age < 20) selectedHeadline = headlines.youth;
    else if (age > 35) selectedHeadline = headlines.legacy;
    else selectedHeadline = headlines.career;

    // "Why This?" Reasoning
    const reasons: Record<Pasaran, string> = {
        Pon: `Your leadership nature (Pon) requires tools that project authority and clarity. This ${category} item aligns with your command over your destiny.`,
        Wage: `Known for your persistence (Wage), you value durability and function. This ${category} selection is built to keep up with your unyielding pace.`,
        Kliwon: `Your reflective soul (Kliwon) seeks balance. This ${category} choice offers the harmony between form and function you intuitively crave.`,
        Legi: `Optimism defines you (Legi). This ${category} piece reflects your bright outlook and desire for aesthetic beauty in everyday life.`,
        Pahing: `Your fiery creative spirit (Pahing) needs expression. This ${category} item is not just a tool, but fuel for your passionate endeavors.`
    };

    return {
        headline: selectedHeadline,
        why: reasons[pasaran]
    };
}
