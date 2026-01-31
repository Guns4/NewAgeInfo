import { Inter, Noto_Kufi_Arabic } from 'next/font/google';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { cn } from "@/lib/utils";
import { Navbar } from '@/components/layouts/Navbar';
import { Footer } from '@/components/layouts/Footer';
import { InstallPrompt } from '@/components/modules/InstallPrompt';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { PulseProvider } from "@/core/providers/PulseProvider";
import { SensoryProvider } from "@/core/providers/SensoryProvider";
import { AtmosphereProvider } from "@/core/providers/AtmosphereProvider";
import { AnalyticsProvider } from "@/core/providers/AnalyticsProvider";
import { CookieConsent } from "@/components/modules/TrustCenter/CookieConsent";
import { ClientErrorMonitor } from "@/components/modules/ClientErrorMonitor";
import { LiquidCursor } from "@/components/ui/LiquidCursor";
import AdUnit from "@/components/shared/AdUnit";
import { locales } from '@/navigation'; // Ensure this matches your navigation config
import '../../globals.css'; // Path adjustment for moving up one level? No, it's src/app/globals.css so ../globals.css

// Fonts
const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
    preload: true
});

const notoKufiArabic = Noto_Kufi_Arabic({
    subsets: ['arabic'],
    variable: '--font-noto-kufi',
    weight: ['400', '700'],
    display: 'swap',
    preload: true
});

// Lazy Components
const CelestialBackground = dynamic(() => import('@/components/shared/CelestialBackground').then(mod => mod.CelestialBackground), {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-slate-950 -z-10" />
});

const AudioToggle = dynamic(() => import('@/components/ui/AudioToggle').then(mod => mod.AudioToggle), {
    ssr: false,
});

// Params Handling
type Props = {
    children: React.ReactNode;
    params: { locale: string };
};

// Metadata Generation
export async function generateMetadata({ params: { locale } }: Omit<Props, 'children'>) {
    const t = await getTranslations({ locale, namespace: 'Metadata' });
    const domain = 'https://ageinfo.online';

    return {
        metadataBase: new URL(domain),
        title: {
            default: t('title', { default: 'Ageinfo - Cosmic Age Intelligence' }),
            template: `%s | ${t('siteName', { default: 'Ageinfo' })}`
        },
        description: t('description', { default: 'Explore your exact age in cosmic units, planetary time, and life milestones.' }),
        keywords: t('keywords', { default: 'age calculator, life statistics, zodiac, chronological age' }),
        applicationName: 'Ageinfo',
        authors: [{ name: 'Ageinfo Team' }],
        creator: 'Ageinfo',
        publisher: 'Ageinfo',
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        alternates: {
            canonical: domain,
            languages: {
                'en': `${domain}/en`,
                'id': `${domain}/id`,
            },
        },
        icons: {
            icon: '/favicon.ico',
            shortcut: '/favicon.ico',
            apple: '/apple-TOUCH-icon.png', // Corrected casing for standard
            other: {
                rel: 'apple-touch-icon-precomposed',
                url: '/apple-touch-icon-precomposed.png',
            },
        },
        manifest: '/manifest.json',
        openGraph: {
            type: 'website',
            locale: locale,
            url: domain,
            siteName: t('siteName', { default: 'Ageinfo' }),
            title: t('ogTitle', { default: 'Ageinfo - Cosmic Age Intelligence' }),
            description: t('ogDescription', { default: 'Precise age tracking in cosmic units.' }),
            images: [
                {
                    url: '/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'Ageinfo Dashboard',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: t('twitterTitle', { default: 'Ageinfo' }),
            description: t('twitterDescription', { default: 'Discover your cosmic age.' }),
            images: ['/og-image.jpg'],
            creator: '@ageinfo', // Update if real handle exists
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
        // Verification for search consoles
        verification: {
            google: 'f08c47fec0942fa0', // Assuming from previous ads.txt context or placeholder
        },
    };
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: '#020617',
};

// Localized Layout
export default async function LocalizedLayout({
    children,
    params: { locale }
}: Props) {
    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(locale as any)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    // Provide all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    // Directions for Arabic/Hebrew (if supported)
    const dir = ['ar', 'he'].includes(locale) ? 'rtl' : 'ltr';

    return (
        <html lang={locale} dir={dir} className="scroll-smooth" suppressHydrationWarning>
            <body className={cn(
                "flex flex-col min-h-screen antialiased bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200",
                inter.variable,
                notoKufiArabic.variable
            )}>
                <Script
                    id="google-adsense"
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5099892029462046"
                    crossOrigin="anonymous"
                    strategy="afterInteractive"
                />

                <NextIntlClientProvider messages={messages}>
                    <SensoryProvider>
                        <PulseProvider>
                            <CustomCursor />
                            {/* Atmosphere & Background */}
                            <AtmosphereProvider>
                                <CelestialBackground />
                                <div className="relative z-10 flex flex-col min-h-screen">
                                    <Navbar />

                                    {/* Header Ad - Standardized */}
                                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                                        <AdUnit
                                            slot="8469799065"
                                            format="auto"
                                            responsive="true"
                                            className="min-h-[100px] sm:min-h-[280px]"
                                            label="SPONSORED"
                                        />
                                    </div>

                                    {/* Main Content */}
                                    <AnalyticsProvider>
                                        <main className="flex-grow">
                                            {children}
                                        </main>
                                    </AnalyticsProvider>

                                    {/* Footer Ad - Standardized */}
                                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                                        <AdUnit
                                            slot="8438009474"
                                            format="autorelaxed"
                                            responsive="true"
                                            className="min-h-[280px]"
                                            label="RECOMMENDED"
                                        />
                                    </div>

                                    <Footer />

                                    {/* Floaters */}
                                    <AudioToggle />
                                    <CookieConsent />
                                    <ClientErrorMonitor />
                                </div>
                            </AtmosphereProvider>

                            <InstallPrompt />
                            <LiquidCursor />
                        </PulseProvider>
                    </SensoryProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
