
import { notFound } from "next/navigation";
import { IdentitySection } from "@/components/modules/IdentitySection";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientHeading } from "@/components/ui/GradientHeading";
import { Metadata } from "next";
import { getZodiacSign, getBirthstone, getIdentityTraits } from "@/core/logic/identityMapper";

export const runtime = 'edge';

interface PageProps {
    params: Promise<{
        slug: string; // Unified slug (MM-DD)
        locale: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug, locale } = await params;
    // Format date string to readable
    const dateObj = parseDateSlug(slug);
    if (!dateObj) return {};

    const month = dateObj.toLocaleString(locale === 'id' ? 'id-ID' : 'en-US', { month: 'long' });
    const day = dateObj.getDate();

    return {
        title: `Born on ${month} ${day}? Your Cosmic Profile & Life Report | Ageinfo`,
        description: `Discover the hidden meaning of being born on ${month} ${day}. detailed zodiac analysis, birthstone secrets, and numerology for your birthday.`,
        alternates: {
            canonical: `https://ageinfo.online/${locale}/history/${slug}`,
        }
    };
}

// Helper to parse "MM-DD"
function parseDateSlug(slug: string): Date | null {
    const parts = slug.split('-');
    if (parts.length !== 2) return null;
    const month = parseInt(parts[0]) - 1; // 0-indexed
    const day = parseInt(parts[1]);

    // Use leap year 2024 to allow Feb 29
    const date = new Date(2024, month, day);

    // Validate
    if (date.getMonth() !== month || date.getDate() !== day) return null;

    return date;
}

export default async function HistoryPage({ params }: PageProps) {
    const { slug, locale } = await params;
    const dateObj = parseDateSlug(slug);

    if (!dateObj) {
        notFound();
    }

    const readableDate = dateObj.toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', { month: 'long', day: 'numeric' });

    const zodiac = getZodiacSign(dateObj); 
    const birthstone = getBirthstone(dateObj.getMonth()); 

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl space-y-12">
            {/* Hero Section */}
            <section className="text-center space-y-6">
                <div className="inline-block px-4 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-bold uppercase tracking-wider">
                    Deep Life Report
                </div>
                <GradientHeading as="h1" className="text-4xl md:text-6xl">
                    Born on {readableDate}?
                </GradientHeading>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    People born on this day possess a unique cosmic footprint. Here is your comprehensive profile.
                </p>
            </section>

            {/* Zodiac Card */}
            <GlassCard className="p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="text-center md:text-left flex-1">
                        <h2 className="text-3xl font-bold text-white mb-2">The {zodiac.sign} Personality</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            As a {zodiac.sign}, you are defined by {zodiac.element}.
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {zodiac.traits && zodiac.traits.map((trait: string) => (
                                <span key={trait} className="px-3 py-1 bg-white/5 rounded-lg text-sm text-indigo-300 border border-indigo-500/30">
                                    {trait}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="text-9xl opacity-80 animate-pulse-slow">
                        {zodiac.symbol}
                    </div>
                </div>
            </GlassCard>

            {/* Birthstone & Numerology Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassCard className="p-6">
                    <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
                        💎 Birthstone
                    </h3>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-3xl shadow-inner">
                            ✨
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">{birthstone.name}</p>
                            <p className="text-sm text-slate-400">{birthstone.meaning}</p>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-6">
                    <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
                        🔢 Numerology
                    </h3>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-3xl font-mono text-amber-500 shadow-inner">
                            {dateObj.getDate() % 9 || 9}
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white">Life Path Potential</p>
                            <p className="text-sm text-slate-400">
                                Based on the vibrational energy of the day {dateObj.getDate()}.
                            </p>
                        </div>
                    </div>
                </GlassCard>
            </div>

            {/* CTA */}
            <div className="text-center py-12">
                <h3 className="text-2xl text-white font-bold mb-6">Want to know your exact age in seconds?</h3>
                <GlassCard className="p-8 inline-block bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-indigo-500/50">
                    <p className="text-slate-300 mb-6">
                        Enter your full birth year to unlock your complete Age Analytics, Chinese Zodiac, and Life Milestones.
                    </p>
                    <a
                        href="/"
                        className="px-8 py-4 bg-white text-indigo-950 font-bold rounded-full hover:bg-indigo-50 transition-colors shadow-lg shadow-indigo-500/20"
                    >
                        Calculate My Full Report
                    </a>
                </GlassCard>
            </div>
        </div>
    );
}
