
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { GradientHeading } from "@/components/ui/GradientHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlobalCohort } from "@/components/modules/GlobalCohort";
import { TimeCapsule } from "@/components/modules/TimeCapsule";
import { Users, History } from "lucide-react";
import React from 'react';

interface PageProps {
    params: Promise<{
        slug: string;
        locale: string;
    }>;
}

export const runtime = 'edge';

// Add generateStaticParams for top 50 years to speed up build
export async function generateStaticParams() {
    const currentYear = new Date().getFullYear();
    const years = [];
    // Pre-build 1970-2010 (Peak demographic)
    for (let y = 1970; y <= 2010; y++) {
        years.push({ slug: y.toString() });
    }
    // Just return for one locale to save build time, standard strategy
    return years;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug, locale } = await params;
    const yearInt = parseInt(slug);

    if (isNaN(yearInt) || yearInt < 1900 || yearInt > new Date().getFullYear()) {
        return {};
    }

    return {
        title: `Born in ${slug}? See Your Generation's Profile | Ageinfo`,
        description: `Explore the global cohort of people born in ${slug}. See population stats, historical milestones, and the defining traits of your generation using Ageinfo's time capsule.`,
        alternates: {
            canonical: `https://ageinfo.online/${locale}/wrapped/${slug}`,
        }
    };
}

export default async function WrappedYearPage({ params }: PageProps) {
    const { slug, locale } = await params;
    const yearInt = parseInt(slug);

    if (isNaN(yearInt) || yearInt < 1900 || yearInt > new Date().getFullYear()) {
        notFound();
    }

    // Proxy a full date (Jan 1st) for components that need a Date object
    const proxyDate = new Date(yearInt, 0, 1);
    const age = new Date().getFullYear() - yearInt;

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl space-y-16">
            {/* Hero Header */}
            <section className="text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-500 text-sm font-bold uppercase tracking-widest border border-amber-500/20">
                    <History className="w-4 h-4" />
                    <span>Generation Archive</span>
                </div>
                <GradientHeading as="h1" className="text-5xl md:text-7xl">
                    Class of {slug}
                </GradientHeading>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    A deep dive into the ${age}-year-old cohort walking the Earth today.
                    Discover the shared history and future of the {slug} generation.
                </p>
            </section>

            {/* Global Cohort Analysis */}
            <div className="space-y-8">
                <div className="flex items-center gap-4 mb-4 px-4">
                    <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Population Pulse</h2>
                        <p className="text-sm text-slate-500">Who shares this timeline with you?</p>
                    </div>
                </div>
                {/* GlobalCohort usually takes birthDate and Age. We provide the proxy. */}
                <GlobalCohort birthDate={proxyDate} age={age} />
            </div>

            {/* Time Capsule / Historical Context */}
            <div className="space-y-8">
                <div className="flex items-center gap-4 mb-4 px-4">
                    <div className="p-3 bg-rose-500/10 rounded-2xl text-rose-400">
                        <History className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Time Capsule {slug}</h2>
                        <p className="text-sm text-slate-500">Defining moments from your origin year.</p>
                    </div>
                </div>
                <TimeCapsule birthDate={proxyDate} />
            </div>

            {/* CTA */}
            <GlassCard className="text-center p-12 bg-gradient-to-b from-slate-900/50 to-indigo-950/30 border-indigo-500/20">
                <h3 className="text-3xl font-bold text-white mb-6">Are you one of the {slug} originals?</h3>
                <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                    Get your precise age down to the second, see your planetary age, and generate a custom poster.
                </p>
                <a
                    href={`/${locale}?year=${slug}`}
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95"
                >
                    Calculate My Exact Age
                </a>
            </GlassCard>
        </div>
    );
}
