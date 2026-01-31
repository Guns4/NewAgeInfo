"use client";

import React, { useEffect, useState } from "react";
import { getCuratedProducts, UserProfile } from "@/core/logic/recommendationEngine";
import { GiftCard } from "./GiftCard";
import { GlassContainer } from "./GlassContainer";
import { motion } from "framer-motion";
import { Skeleton } from "./Skeleton";
import { Sparkles } from "lucide-react";

interface GiftCuratorProps {
    userProfile: UserProfile; // Age & Pasaran
}

export function GiftCurator({ userProfile }: GiftCuratorProps) {
    const [recommendation, setRecommendation] = useState<ReturnType<typeof getCuratedProducts>>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate "Thinking" AI delay for effect
        const timer = setTimeout(() => {
            const result = getCuratedProducts(userProfile);
            setRecommendation(result);
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [userProfile]);

    if (loading) {
        return (
            <div className="space-y-4 max-w-2xl mx-auto mt-12 p-4">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="animate-pulse text-indigo-400" />
                    <Skeleton width={200} height={24} />
                </div>
                <Skeleton width="100%" height={400} className="rounded-3xl" />
            </div>
        );
    }

    if (!recommendation) return null;

    const { primary, psychologyCopy } = recommendation;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-16 max-w-3xl mx-auto px-6 relative"
        >
            {/* Boutique Header */}
            <div className="text-center mb-10 space-y-3">
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-white to-purple-200 font-serif">
                    {psychologyCopy.headline}
                </h2>
                <p className="text-slate-400 max-w-lg mx-auto leading-relaxed">
                    {psychologyCopy.why}
                </p>
            </div>

            {/* The Product Showcase */}
            <div className="relative group perspective-1000">
                {/* Background glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition duration-700" />

                <GiftCard
                    product={primary}
                    pasaranName={userProfile.pasaran}
                    locale="en" // Could be dynamic
                />
            </div>

            {/* Affiliate Disclosure (Subtle) */}
            <p className="text-xs text-center text-slate-600 mt-8">
                Curated independently. We may earn a commission if you choose to acquire these items.
            </p>

        </motion.section>
    );
}
