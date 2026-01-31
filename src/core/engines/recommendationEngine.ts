import { getBirthstone } from "@/core/logic/identityMapper";

export interface Product {
    id: string;
    title: string;
    description: string;
    price: string;
    imageUrl: string;
    affiliateUrl: string;
    category: 'Book' | 'Jewelry' | 'Gadget' | 'Lifestyle';
    reason: string;
}

export function getRecommendations(age: number, birthDate: Date): Product[] {
    const products: Product[] = [];
    const birthstone = getBirthstone(birthDate.getMonth());

    // 1. Birthstone Jewelry (Personalized)
    products.push({
        id: `gem-${birthstone.name}`,
        title: `Authentic ${birthstone.name} Necklace`,
        description: `Channel the energy of your birthstone, ${birthstone.name}. Known for ${birthstone.meaning}.`,
        price: "$45 - $120",
        imageUrl: `https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600`, // Placeholder
        affiliateUrl: "#", // Replace with actual
        category: "Jewelry",
        reason: `Because your birthstone is ${birthstone.name}`
    });

    // 2. Age Based Recommendations
    if (age < 20) {
        products.push({
            id: 'youth-tech',
            title: "Noise Cancelling Headphones",
            description: "Focus on your studies or escape into music with premium sound.",
            price: "$199",
            imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600",
            affiliateUrl: "#",
            category: "Gadget",
            reason: "Popular among your age group"
        });
    } else if (age >= 20 && age < 30) {
        products.push({
            id: 'saturn-return-book',
            title: "Designing Your Life",
            description: "A guide to building a well-lived, joyful life during your defining decade.",
            price: "$18.00",
            imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
            affiliateUrl: "#",
            category: "Book",
            reason: "Essential for your 20s"
        });
    } else if (age >= 30 && age < 40) {
        products.push({
            id: 'productivity-tool',
            title: "Remarkable 2 Tablet",
            description: "Replace your notebooks and printed documents with the only tablet that feels like paper.",
            price: "$299",
            imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600",
            affiliateUrl: "#",
            category: "Gadget",
            reason: "Optimize your peak career years"
        });
    } else if (age >= 40 && age < 60) {
        products.push({
            id: 'wellness-retreat',
            title: "Mindfulness Journal",
            description: "Reconnect with yourself and document your journey of wisdom.",
            price: "$25.00",
            imageUrl: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=600",
            affiliateUrl: "#",
            category: "Lifestyle",
            reason: "Focus on wellness and reflection"
        });
    } else {
        products.push({
            id: 'legacy-book',
            title: "Story of My Life",
            description: "A beautiful keepsake journal to record your life story for future generations.",
            price: "$35.00",
            imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600",
            affiliateUrl: "#",
            category: "Book",
            reason: "Preserve your legacy"
        });
    }

    // 3. Universal "Cosmic" Gift
    products.push({
        id: 'star-map',
        title: "Custom Star Map",
        description: `The exact alignment of the stars on ${birthDate.toLocaleDateString()}.`,
        price: "$60.00",
        imageUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=600",
        affiliateUrl: "#",
        category: "Lifestyle",
        reason: "A snapshot of the universe when you arrived"
    });

    return products;
}
