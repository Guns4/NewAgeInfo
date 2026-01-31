export interface Insight {
    id: string;
    category: 'time' | 'growth' | 'presence' | 'cosmic' | 'legacy';
    text: {
        en: string;
        id: string;
    };
    author?: string; // Optional, defaults to "Digital Oracle"
}

export const PHILOSOPHER_INSIGHTS: Insight[] = [
    {
        id: 'memory_01',
        category: 'time',
        text: {
            id: "Anda bukan sekadar kumpulan angka, melainkan rangkaian memori yang disusun oleh waktu. Setiap detik adalah kanvas yang sedang Anda lukis.",
            en: "You are not merely a collection of numbers, but a sequence of memories woven by time. Every second is a canvas you are currently painting."
        }
    },
    {
        id: 'growth_01',
        category: 'growth',
        text: {
            id: "Dalam setiap tarikan napas, Anda melepaskan versi lama diri Anda untuk memberi ruang bagi siapa Anda hari ini. Evolusi adalah sunyi, namun pasti.",
            en: "With every breath, you shed an old version of yourself to make room for who you are today. Evolution is silent, yet inevitable."
        }
    },
    {
        id: 'presence_01',
        category: 'presence',
        text: {
            id: "Waktu tidak pernah habis; ia hanya terus mengalir. Jangan biarkan pengejaran akan masa depan membuat Anda lupa pada kehadiran yang utuh di saat ini.",
            en: "Time never runs out; it simply flows. Do not let the pursuit of the future blind you to the absolute presence of the now."
        }
    },
    {
        id: 'cosmic_01',
        category: 'cosmic',
        text: {
            id: "Sejak Anda lahir, bumi telah menempuh miliaran kilometer di ruang hampa. Anda adalah bukti hidup bahwa alam semesta sedang bergerak melalui Anda.",
            en: "Since your birth, the Earth has traveled billions of kilometers through the void. You are living proof that the universe is moving through you."
        }
    },
    {
        id: 'legacy_01',
        category: 'legacy',
        text: {
            id: "Setiap detik yang Anda lalui adalah benih bagi masa depan. Apa yang Anda bangun hari ini akan bergema di waktu yang belum terjamah.",
            en: "Every second you pass is a seed for the future. What you build today will echo into times yet untouched."
        }
    }
];
