import type { Metadata } from 'next';

const DOMAIN = 'https://ageinfo.online';
const TWITTER_HANDLE = '@ageinfo';

interface MetadataProps {
    title?: string;
    description?: string;
    path: string;
    image?: string;
}

export function generateMetadata({
    title = 'Ageinfo - Premium Age Intelligence',
    description = 'Discover meticulous details about your age, next birthday countdowns, and life progress with Ageinfo.',
    path,
    image = '/og-image.jpg'
}: MetadataProps): Metadata {
    const url = `${DOMAIN}${path}`;

    return {
        metadataBase: new URL(DOMAIN),
        title: {
            default: title,
            template: '%s | Ageinfo',
        },
        description,
        keywords: [
            'age calculator',
            'birthday countdown',
            'life progress',
            'chronological age',
            'precise age tool',
            'premium age stats',
            'zodiac calculator'
        ],
        authors: [{ name: 'Ageinfo Team' }],
        creator: 'Ageinfo',
        publisher: 'Ageinfo',
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        icons: {
            icon: '/logo-full.png',
            shortcut: '/logo-full.png',
            apple: '/logo-full.png',
        },
        openGraph: {
            type: 'website',
            locale: 'en_US',
            url,
            title,
            description,
            siteName: 'Ageinfo',
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
            creator: TWITTER_HANDLE,
        },
        applicationName: 'Ageinfo',
        appleWebApp: {
            capable: true,
            title: 'Ageinfo',
            statusBarStyle: 'black-translucent',
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

export const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Ageinfo",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "description": "Premium age intelligence tool for precise chronological tracking and life progress visualization.",
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "1205"
    }
};
