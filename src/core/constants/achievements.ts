/**
 * Peer Achievements Database
 * Curated list of Global and Indonesian figures with significant achievements at specific ages.
 */

export interface Achievement {
    id: string;
    age: number;
    name: string;
    achievement: string;
    category: 'Global' | 'Lokal';
    imagePlaceholder: string; // URL or Initials for now
}

export const PEER_ACHIEVEMENTS: Achievement[] = [
    // --- 0-10 Years ---
    { id: 'g-mozart', age: 5, name: 'Wolfgang Amadeus Mozart', achievement: 'Composed his first music', category: 'Global', imagePlaceholder: 'WM' },
    { id: 'l-kartini-young', age: 12, name: 'R.A. Kartini', achievement: 'Started her seclusion (pingitan) but continued learning via letters', category: 'Lokal', imagePlaceholder: 'RAK' },

    // --- 10-20 Years ---
    { id: 'g-malala', age: 17, name: 'Malala Yousafzai', achievement: 'Won the Nobel Peace Prize', category: 'Global', imagePlaceholder: 'MY' },
    { id: 'l-soedirman', age: 29, name: 'Jenderal Soedirman', achievement: 'Became the first commander-in-chief of the Indonesian Armed Forces', category: 'Lokal', imagePlaceholder: 'JS' },
    { id: 'g-zuckerberg', age: 19, name: 'Mark Zuckerberg', achievement: 'Launched "Thefacebook" from his dorm', category: 'Global', imagePlaceholder: 'MZ' },
    { id: 'l-chairul', age: 20, name: 'Chairul Tanjung', achievement: 'Started a business selling books and t-shirts to pay tuition', category: 'Lokal', imagePlaceholder: 'CT' },

    // --- 20-30 Years ---
    { id: 'g-jobs', age: 21, name: 'Steve Jobs', achievement: 'Co-founded Apple in a garage', category: 'Global', imagePlaceholder: 'SJ' },
    { id: 'g-einstein', age: 26, name: 'Albert Einstein', achievement: 'Published the theory of special relativity', category: 'Global', imagePlaceholder: 'AE' },
    { id: 'l-habibie', age: 28, name: 'B.J. Habibie', achievement: 'Became VP at Messerschmitt-Bölkow-Blohm', category: 'Lokal', imagePlaceholder: 'BJH' },
    { id: 'l-nadiem', age: 26, name: 'Nadiem Makarim', achievement: 'Founded Gojek', category: 'Lokal', imagePlaceholder: 'NM' },

    // --- 30-40 Years ---
    { id: 'g-rowling', age: 32, name: 'J.K. Rowling', achievement: 'Published Harry Potter and the Philosopher\'s Stone', category: 'Global', imagePlaceholder: 'JKR' },
    { id: 'g-elon', age: 31, name: 'Elon Musk', achievement: 'Founded SpaceX', category: 'Global', imagePlaceholder: 'EM' },
    { id: 'l-jokowi', age: 44, name: 'Joko Widodo', achievement: 'Became Mayor of Surakarta', category: 'Lokal', imagePlaceholder: 'JkW' }, // Slightly older but iconic
    { id: 'l-susi', age: 33, name: 'Susi Pudjiastuti', achievement: 'Established PT ASI Pudjiastuti Marine Product', category: 'Lokal', imagePlaceholder: 'SP' },

    // --- 40-50 Years ---
    { id: 'g-ford', age: 40, name: 'Henry Ford', achievement: 'Founded the Ford Motor Company', category: 'Global', imagePlaceholder: 'HF' },
    { id: 'g-oprah', age: 48, name: 'Oprah Winfrey', achievement: 'Became the first black female billionaire', category: 'Global', imagePlaceholder: 'OW' },
    { id: 'l-megawati', age: 46, name: 'Megawati Soekarnoputri', achievement: 'elected chairwoman of PDI', category: 'Lokal', imagePlaceholder: 'MS' },

    // --- 50-60 Years ---
    { id: 'g-kroc', age: 52, name: 'Ray Kroc', achievement: 'Joined McDonald\'s and began its expansion', category: 'Global', imagePlaceholder: 'RK' },
    { id: 'g-darwin', age: 50, name: 'Charles Darwin', achievement: 'Published "On the Origin of Species"', category: 'Global', imagePlaceholder: 'CD' },
    { id: 'l-gusdur', age: 59, name: 'Abdurrahman Wahid', achievement: 'Became the 4th President of Indonesia', category: 'Lokal', imagePlaceholder: 'GW' },

    // --- 60+ Years ---
    { id: 'g-sanders', age: 62, name: 'Harland Sanders', achievement: 'Franchised Kentucky Fried Chicken', category: 'Global', imagePlaceholder: 'HS' },
    { id: 'g-mandela', age: 75, name: 'Nelson Mandela', achievement: 'Became President of South Africa', category: 'Global', imagePlaceholder: 'NM' },
    { id: 'l-maarif', age: 63, name: 'Buya Syafii Maarif', achievement: 'Became Chairman of Muhammadiyah', category: 'Lokal', imagePlaceholder: 'BSM' },
];
