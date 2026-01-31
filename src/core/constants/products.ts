export type Pasaran = 'Pon' | 'Wage' | 'Kliwon' | 'Legi' | 'Pahing';

export interface ProductRecommendation {
    id: string;
    name: string;
    description: {
        en: string;
        id: string;
    };
    category: string;
    affiliateLink: string; // Placeholder for now
    image?: string; // Placeholder or use keyword for image generation
    priceRange?: string;
    elementColor: string; // Tailwind color class or hex
}

type AgeTier = 'youth' | 'career' | 'legacy'; // <22, 22-45, >45

const products: Record<Pasaran, Record<AgeTier, ProductRecommendation[]>> = {
    Pon: { // Karakter: Kepemimpinan & Pikiran (White/Silver)
        youth: [
            {
                id: 'pon-youth-1',
                name: 'Strategic Chess Set',
                description: {
                    en: 'Sharpen your natural leadership mind with this classic strategy game.',
                    id: 'Asah jiwa kepemimpinan alami Anda dengan permainan strategi klasik ini.'
                },
                category: 'Education',
                affiliateLink: 'https://example.com/chess',
                elementColor: 'shadow-slate-200'
            },
            {
                id: 'pon-youth-2',
                name: 'Biographies of Great Leaders',
                description: {
                    en: 'Learn from the masters who came before you.',
                    id: 'Belajar dari para pemimpin besar yang telah mendahului Anda.'
                },
                category: 'Books',
                affiliateLink: 'https://example.com/biographies',
                elementColor: 'shadow-slate-200'
            }
        ],
        career: [
            {
                id: 'pon-career-1',
                name: 'Premium Fountain Pen',
                description: {
                    en: 'Your signature deserves an instrument as commanding as your presence.',
                    id: 'Tanda tangan Anda layak mendapatkan instrumen sekuat kehadiran Anda.'
                },
                category: 'Professional',
                affiliateLink: 'https://example.com/pen',
                elementColor: 'shadow-slate-200'
            },
            {
                id: 'pon-career-2',
                name: 'Executive Leadership Course',
                description: {
                    en: 'Take your innate authority to the next boardroom level.',
                    id: 'Bawa otoritas alami Anda ke level eksekutif yang lebih tinggi.'
                },
                category: 'Courses',
                affiliateLink: 'https://example.com/course',
                elementColor: 'shadow-slate-200'
            }
        ],
        legacy: [
            {
                id: 'pon-legacy-1',
                name: 'Classic Timepiece',
                description: {
                    en: 'A timeless symbol of the wisdom you have accumulated.',
                    id: 'Simbol abadi dari kebijaksanaan yang telah Anda kumpulkan.'
                },
                category: 'Luxury',
                affiliateLink: 'https://example.com/watch',
                elementColor: 'shadow-slate-200'
            }
        ]
    },
    Wage: { // Karakter: Ketekunan & Tindakan (Black/Slate)
        youth: [
            {
                id: 'wage-youth-1',
                name: 'Ergonomic Backpack',
                description: {
                    en: 'Built for the relentless journey of your ambition.',
                    id: 'Dibuat untuk perjalanan ambisi Anda yang tak kenal lelah.'
                },
                category: 'Productivity',
                affiliateLink: 'https://example.com/backpack',
                elementColor: 'shadow-slate-800'
            }
        ],
        career: [
            {
                id: 'wage-career-1',
                name: 'High-Performance Planner',
                description: {
                    en: 'Structure your unstoppable drive into actionable success.',
                    id: 'Strukturkan dorongan tak terbendung Anda menjadi kesuksesan nyata.'
                },
                category: 'Productivity',
                affiliateLink: 'https://example.com/planner',
                elementColor: 'shadow-slate-800'
            },
            {
                id: 'wage-career-2',
                name: 'Smart Home Hub',
                description: {
                    en: 'Optimize your environment for maximum efficiency.',
                    id: 'Optimalkan lingkungan Anda untuk efisiensi maksimal.'
                },
                category: 'Tech',
                affiliateLink: 'https://example.com/smarthome',
                elementColor: 'shadow-slate-800'
            }
        ],
        legacy: [
            {
                id: 'wage-legacy-1',
                name: 'Premium Tool Set',
                description: {
                    en: 'For the master craftsman who builds a lasting legacy.',
                    id: 'Untuk pengrajin ahli yang membangun warisan abadi.'
                },
                category: 'Tools',
                affiliateLink: 'https://example.com/tools',
                elementColor: 'shadow-slate-800'
            }
        ]
    },
    Kliwon: { // Karakter: Keseimbangan & Perasaan (Gray/Transparent)
        youth: [
            {
                id: 'kliwon-youth-1',
                name: 'Mindfulness Journal',
                description: {
                    en: 'Capture your thoughts and find your center.',
                    id: 'Tangkap pikiran Anda dan temukan pusat ketenangan Anda.'
                },
                category: 'Wellness',
                affiliateLink: 'https://example.com/journal',
                elementColor: 'shadow-indigo-500' // Using indigo for spiritual balance
            }
        ],
        career: [
            {
                id: 'kliwon-career-1',
                name: 'Aromatherapy Diffuser',
                description: {
                    en: 'Create a sanctuary of balance in your busy life.',
                    id: 'Ciptakan tempat perlindungan yang seimbang dalam kesibukan Anda.'
                },
                category: 'Wellness',
                affiliateLink: 'https://example.com/diffuser',
                elementColor: 'shadow-indigo-500'
            },
            {
                id: 'kliwon-career-2',
                name: 'Artisan Coffee Set',
                description: {
                    en: 'Rituals tailored for the connoisseur of life\'s nuances.',
                    id: 'Ritual yang disesuaikan untuk penikmat nuansa kehidupan.'
                },
                category: 'Lifestyle',
                affiliateLink: 'https://example.com/coffee',
                elementColor: 'shadow-indigo-500'
            }
        ],
        legacy: [
            {
                id: 'kliwon-legacy-1',
                name: 'Yoga & Meditation Kit',
                description: {
                    en: 'Maintain harmony of body and spirit.',
                    id: 'Jaga keharmonisan tubuh dan jiwa.'
                },
                category: 'Wellness',
                affiliateLink: 'https://example.com/yoga',
                elementColor: 'shadow-indigo-500'
            }
        ]
    },
    Legi: { // Karakter: Visi & Optimisme (Yellow/Gold)
        youth: [
            {
                id: 'legi-youth-1',
                name: 'Instant Camera',
                description: {
                    en: 'Capture the beauty you see in every moment.',
                    id: 'Abadikan keindahan yang Anda lihat di setiap momen.'
                },
                category: 'Creative',
                affiliateLink: 'https://example.com/camera',
                elementColor: 'shadow-amber-500'
            }
        ],
        career: [
            {
                id: 'legi-career-1',
                name: 'Designer Accessories',
                description: {
                    en: 'Express your radiant optimism through your style.',
                    id: 'Ekspresikan optimisme bersinar Anda melalui gaya Anda.'
                },
                category: 'Fashion',
                affiliateLink: 'https://example.com/fashion',
                elementColor: 'shadow-amber-500'
            },
            {
                id: 'legi-career-2',
                name: 'Fine Art Supplies',
                description: {
                    en: 'Bring your colorful visions to life.',
                    id: 'Hidupkan visi penuh warna Anda.'
                },
                category: 'Creative',
                affiliateLink: 'https://example.com/art',
                elementColor: 'shadow-amber-500'
            }
        ],
        legacy: [
            {
                id: 'legi-legacy-1',
                name: 'Signature Perfume',
                description: {
                    en: 'A scent as memorable and sweet as your legacy.',
                    id: 'Aroma yang tak terlupakan dan semanis warisan Anda.'
                },
                category: 'Luxury',
                affiliateLink: 'https://example.com/perfume',
                elementColor: 'shadow-amber-500'
            }
        ]
    },
    Pahing: { // Karakter: Semangat & Kreativitas (Red/Orange)
        youth: [
            {
                id: 'pahing-youth-1',
                name: 'Latest Gadget Tech',
                description: {
                    en: 'Fuel your fiery curiosity with cutting-edge tech.',
                    id: 'Bakar rasa ingin tahu Anda dengan teknologi terkini.'
                },
                category: 'Tech',
                affiliateLink: 'https://example.com/tech',
                elementColor: 'shadow-red-500'
            }
        ],
        career: [
            {
                id: 'pahing-career-1',
                name: 'DIY Maker Kit',
                description: {
                    en: 'Your creative energy needs a powerful outlet.',
                    id: 'Energi kreatif Anda membutuhkan saluran yang kuat.'
                },
                category: 'Passion',
                affiliateLink: 'https://example.com/diy',
                elementColor: 'shadow-red-500'
            },
            {
                id: 'pahing-career-2',
                name: 'Outdoor Adventure Gear',
                description: {
                    en: 'Conquer new horizons with your boundless spirit.',
                    id: 'Taklukkan cakrawala baru dengan semangat tanpa batas Anda.'
                },
                category: 'Adventure',
                affiliateLink: 'https://example.com/outdoor',
                elementColor: 'shadow-red-500'
            }
        ],
        legacy: [
            {
                id: 'pahing-legacy-1',
                name: 'High-Fidelity Speaker',
                description: {
                    en: 'Fill your space with the passion of sound.',
                    id: 'Penuhi ruangan Anda dengan gairah suara.'
                },
                category: 'Lifestyle',
                affiliateLink: 'https://example.com/speaker',
                elementColor: 'shadow-red-500'
            }
        ]
    }
};

export function getRecommendedProduct(pasaran: string, age: number): ProductRecommendation | null {
    // Normalize Pasaran input to match keys
    const validPasaran = Object.keys(products).find(p => p.toLowerCase() === pasaran.toLowerCase()) as Pasaran | undefined;

    if (!validPasaran) return null;

    let tier: AgeTier = 'career'; // Default
    if (age < 22) tier = 'youth';
    else if (age > 45) tier = 'legacy';

    const options = products[validPasaran][tier];

    // Return a random option from the curated list for variety
    return options[Math.floor(Math.random() * options.length)];
}
