import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Inter, Noto_Kufi_Arabic } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layouts/Navbar'
import { Footer } from '@/components/layouts/Footer'
import { InstallPrompt } from '@/components/modules/InstallPrompt'
import { jsonLdSchema } from '@/core/seo/metadata';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { PulseProvider } from "@/core/providers/PulseProvider";
import { AudioProvider } from "@/core/providers/AudioProvider";
import { AtmosphereProvider } from "@/core/providers/AtmosphereProvider";
import { AnalyticsProvider } from "@/core/providers/AnalyticsProvider";
import { CookieConsent } from "@/components/modules/TrustCenter/CookieConsent";
import { ClientErrorMonitor } from "@/components/modules/ClientErrorMonitor";
import { LiquidCursor } from "@/components/ui/LiquidCursor";
import { AudioToggle } from "@/components/ui/AudioToggle";
import AdUnit from "@/components/shared/AdUnit";
import dynamic from 'next/dynamic';

// Zero CLS Optimization: Preload fonts with swap display strategy
const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
    preload: true
})
const notoKufiArabic = Noto_Kufi_Arabic({
    subsets: ['arabic'],
    variable: '--font-noto-kufi',
    weight: ['400', '700'],
    display: 'swap',
    preload: true
})

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: '#020617',
}
// Metadata
export const metadata: Metadata = {
    metadataBase: new URL('https://ageinfo.online'),
    title: {
        default: 'Ageinfo - Cosmic Age Intelligence',
        template: '%s | Ageinfo'
    },
    description: 'Explore your exact age in cosmic units, planetary time, and life milestones.',
};

// Lazy load the heavy 3D background
const CelestialBackground = dynamic(() => import('@/components/shared/CelestialBackground').then(mod => mod.CelestialBackground), {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-slate-950 -z-10" />
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`flex flex-col min-h-screen ${inter.variable} ${notoKufiArabic.variable} antialiased bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200`}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(jsonLdSchema)
                    }}
                />
                <Script
                    id="google-adsense"
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5099892029462046"
                    crossOrigin="anonymous"
                    strategy="afterInteractive"
                />
                <AudioProvider>
                    <PulseProvider>
                        <CustomCursor />
                        <AtmosphereProvider />
                        <CelestialBackground />

                        <div className="relative z-10 flex flex-col flex-grow min-h-screen">
                            <Navbar />

                            {/* Header AdSlot */}
                            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                                <AdUnit
                                    slot="8469799065"
                                    format="auto"
                                    responsive="true"
                                    className="min-h-[100px] sm:min-h-[280px]"
                                    label="SPONSORED"
                                />
                            </div>

                            <AnalyticsProvider>
                                {children}
                            </AnalyticsProvider>

                            {/* Footer Multiplex AdSlot */}
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

                            <AudioToggle />
                            <CookieConsent />
                            <ClientErrorMonitor />
                            <InstallPrompt />
                            <LiquidCursor />
                        </div>
                    </PulseProvider>
                </AudioProvider>
            </body>
        </html>
    )
}
