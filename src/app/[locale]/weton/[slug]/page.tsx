import { notFound } from "next/navigation";
import { Metadata } from "next";
import { GradientHeading } from "@/components/ui/GradientHeading";
import { ArchitectPoster } from "@/components/poster-templates/ArchitectPoster";
import { GlassCard } from "@/components/ui/GlassCard";
import { getWeton } from "@/core/types/poster";
import { Calendar, Download } from "lucide-react";
import React from 'react';

interface PageProps {
    params: {
        slug: string; // "senin-pon", "jumat-kliwon"
        locale: string;
    };
}

export const runtime = 'edge';

const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const PASARAN = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];

// Pre-build all 35 Weton combinations
export async function generateStaticParams() {
    const combinations = [];
    for (const h of HARI) {
        for (const p of PASARAN) {
            combinations.push({ slug: `${h.toLowerCase()}-${p.toLowerCase()}` });
        }
    }
    return combinations;
}

function parseWetonSlug(slug: string) {
    const parts = slug.split('-');
    if (parts.length !== 2) return null;

    // Capitalize for display
    const hari = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    const pasaran = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);

    if (!HARI.includes(hari) || !PASARAN.includes(pasaran)) return null;

    return { hari, pasaran, combined: `${hari} ${pasaran}` };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug, locale } = params;
    const weton = parseWetonSlug(slug);

    if (!weton) return {};

    const title = locale === 'id'
        ? `Arti Weton ${weton.combined}: Watak, Rezeki & Jodoh | Ageinfo`
        : `Meaning of Weton ${weton.combined}: Personality & Fortune | Ageinfo`;

    const desc = locale === 'id'
        ? `Lahir pada ${weton.combined}? Temukan rahasia watak, prediksi rezeki, dan kecocokan jodoh berdasarkan Primbon Jawa kuno di Ageinfo.`
        : `Born on ${weton.combined}? Discover the secrets of your character, fortune predictions, and compatibility based on ancient Javanese Primbon.`;

    return {
        title,
        description: desc,
        alternates: {
            canonical: `https://ageinfo.online/${locale}/weton/${slug}`,
        }
    };
}

export default function WetonPage({ params }: PageProps) {
    const { slug, locale } = params;
    const weton = parseWetonSlug(slug);

    if (!weton) {
        notFound();
    }

    // Mock Poster Data for visualization
    const mockPosterData = {
        name: "You",
        birthDate: new Date(), // Just for display
        totalDays: 8888,
        years: 24,
        weton: {
            day: weton.hari,
            marketDay: weton.pasaran,
            combined: weton.combined
        },
        birthstone: { name: "Mystic", color: "#6366f1" },
        planetaryAge: { planet: "Java", age: 1 },
        milestones: []
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl space-y-16">
            <section className="text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-bold uppercase tracking-widest border border-emerald-500/20">
                    <Calendar className="w-4 h-4" />
                    <span>Javanese Primbon Archive</span>
                </div>
                <GradientHeading as="h1" className="text-5xl md:text-7xl">
                    {weton.combined}
                </GradientHeading>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    {locale === 'id'
                        ? "Sebuah penanda waktu yang sakral. Orang yang lahir dengan weton ini memiliki karakteristik unik dalam tatanan kosmos Jawa."
                        : "A sacred marker of time. Those born under this weton possess unique characteristics within the Javanese cosmos."}
                </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left: Explanation */}
                <div className="space-y-8">
                    <GlassCard className="p-8 space-y-4">
                        <h3 className="text-2xl font-bold text-white">
                            {locale === 'id' ? "Karakteristik Utama" : "Core Characteristics"}
                        </h3>
                        <p className="text-slate-300 leading-relaxed">
                            {locale === 'id'
                                ? `Weton ${weton.combined} dikenal memiliki neptu yang khas. Gabungan energi hari ${weton.hari} dan pasaran ${weton.pasaran} menciptakan pola nasib yang unik.`
                                : `${weton.combined} is known for its distinct 'neptu' value. The combined energy of ${weton.hari} and ${weton.pasaran} creates a unique destiny pattern.`}
                        </p>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                            <p className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">Did You Know?</p>
                            <p className="text-xs text-slate-400">
                                In Javanese culture, your Weton is considered more spiritually significant than your Gregorian birth date.
                            </p>
                        </div>
                    </GlassCard>

                    <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/20 text-center">
                        <h4 className="text-lg font-bold text-white mb-2">
                            {locale === 'id' ? "Cek Kecocokan Anda" : "Check Your Compatibility"}
                        </h4>
                        <p className="text-sm text-slate-400 mb-6">
                            {locale === 'id' ? "Gunakan kalkulator kami untuk melihat detail lengkap." : "Use our calculator to see full details."}
                        </p>
                        <a
                            href="/"
                            className="inline-block px-6 py-3 bg-white text-indigo-950 font-bold rounded-xl hover:scale-105 transition-transform"
                        >
                            Start Calculation
                        </a>
                    </div>
                </div>

                {/* Right: Visual Poster Preview */}
                <div className="relative flex justify-center">
                    <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />
                    <div className="relative transform scale-50 origin-top md:scale-75 md:origin-center border-4 border-slate-900 rounded-lg shadow-2xl">
                        {/* Visual Hook: Use Architect Poster to show off the Weton data */}
                        <ArchitectPoster data={mockPosterData} />
                    </div>
                </div>
            </div>
        </div>
    );
}
