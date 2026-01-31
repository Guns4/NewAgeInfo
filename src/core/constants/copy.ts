export const NARRATIVE_COPY = {
    id: {
        labels: {
            inputPlaceholder: "Titik Awal Perjalanan Anda",
            calculateButton: "Ungkap Jejak Waktu Saya",
            recalculateButton: "Mulai Perjalanan Baru",
            shareButton: "Bagikan Kisah Ini",
            lockCapsule: "Kunci Kapsul Waktu",
            unlockCapsule: "Buka Pesan Masa Lalu",
        },
        headings: {
            heroTitle: "Berapa Banyak Waktu Yang Telah Anda Lewati?",
            heroSubtitle: "Lebih dari sekadar angka. Ini adalah kisah detak jantung, napas, dan revolusi planet Anda.",
            historyWitness: "Saksi Sejarah Dunia",
            heartRhythm: "Ritme Jantung Anda",
            cosmicPosition: "Posisi Anda di Alam Semesta",
            lifeGrid: "Peta Kehidupan (Memento Mori)",
            culturalProfile: "Identitas Budaya & Weton",
            peerComparison: "Perspektif Generasi",
            giftFinder: "Kurasi Untuk Anda",
            timeCapsule: "Pesan Untuk Diri Sendiri",
        },
        tooltips: {
            weton: "Weton bukan sekadar tradisi, tapi cermin karakter leluhur dan harmoni alam.",
            breaths: "Rata-rata manusia bernapas 22.000 kali sehari. Setiap napas adalah anugerah.",
            heartbeats: "Jantung Anda adalah mesin terhebat, bekerja tanpa henti sejak sebelum Anda lahir.",
            moonAge: "Bulan telah mengelilingi Bumi ribuan kali sejak tangisan pertama Anda.",
            lifeWeeks: "Setiap kotak adalah satu minggu. Lihatlah betapa berharganya kotak yang tersisa.",
            goldenRatio: "Desain ini mengikuti rasio emas, proporsi yang ditemukan dalam keindahan alam semesta.",
        },
        emptyStates: {
            loading: "Sedang menyusuri lorong waktu...",
            noData: "Belum ada jejak yang ditemukan. Mulailah dengan memasukkan tanggal lahir Anda.",
            error: "Waktu sejenak terhenti. Silakan coba lagi.",
            lockedCapsule: "Sabar. Pesan ini sedang tidur hingga waktunya tiba.",
        }
    },
    en: {
        labels: {
            inputPlaceholder: "Your Journey's Origin Point",
            calculateButton: "Reveal My Time Trace",
            recalculateButton: "Start New Journey",
            shareButton: "Share This Story",
            lockCapsule: "Lock Time Capsule",
            unlockCapsule: "Open Message from the Past",
        },
        headings: {
            heroTitle: "How Much Time Have You Really Lived?",
            heroSubtitle: "More than just numbers. This is the story of your heartbeats, breaths, and planetary revolutions.",
            historyWitness: "Witness to World History",
            heartRhythm: "Your Heart's Rhythm",
            cosmicPosition: "Your Position in the Universe",
            lifeGrid: "Life Map (Memento Mori)",
            culturalProfile: "Cultural Identity & Weton",
            peerComparison: "Generational Perspective",
            giftFinder: "Curated For You",
            timeCapsule: "Message to Self",
        },
        tooltips: {
            weton: "Weton is more than tradition; it's a mirror of ancestral character and natural harmony.",
            breaths: "The average human breathes 22,000 times a day. Every breath is a gift.",
            heartbeats: "Your heart is the ultimate engine, working tirelessly since before you were born.",
            moonAge: "The Moon has orbited the Earth thousands of times since your first cry.",
            lifeWeeks: "Each square is one week. See how precious the remaining squares are.",
            goldenRatio: "This design follows the golden ratio, a proportion found in the beauty of the universe.",
        },
        emptyStates: {
            loading: "Traversing the corridors of time...",
            noData: "No traces found yet. Start by entering your birth date.",
            error: "Time has stopped momentarily. Please try again.",
            lockedCapsule: "Patience. This message is sleeping until the time is right.",
        }
    }
} as const;

export type NarrativeKey = keyof typeof NARRATIVE_COPY.en;
