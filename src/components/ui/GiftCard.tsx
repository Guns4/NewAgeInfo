"use client";

import React from "react";
import { GlassCard } from "./GlassCard";
import { ProductRecommendation } from "@/core/constants/products";
import { ExternalLink, ShoppingBag } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { GradientHeading } from "./GradientHeading";

interface GiftCardProps {
    product: ProductRecommendation;
    pasaranName: string;
    locale: 'en' | 'id';
}

export function GiftCard({ product, pasaranName, locale }: GiftCardProps) {
    const { name, description, category, affiliateLink, elementColor } = product;

    return (
        <GlassCard
            className={`p-8 border-t border-white/20 relative group overflow-visible ${elementColor.replace('shadow-', 'shadow-2xl shadow-')}`}
            hoverEffect={true}
        >
            {/* Soft Glow Animation based on Element Color */}
            <div className={`absolute -inset-4 opacity-20 blur-3xl rounded-full animate-pulse-slow pointer-events-none transition-colors duration-500 ${elementColor.replace('shadow-', 'bg-')}`} />

            <div className="relative z-10 flex flex-col items-center text-center space-y-6">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                    <span className="text-xs font-bold tracking-wider uppercase text-slate-300">
                        {locale === 'id' ? `Dikurasi untuk Jiwa ${pasaranName}` : `Curated for ${pasaranName} Soul`}
                    </span>
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                    <div className="text-sm font-medium text-brand-primary uppercase tracking-widest">{category}</div>
                    <GradientHeading as="h3" className="text-2xl md:text-3xl">
                        {name}
                    </GradientHeading>
                    <p className="text-slate-400 italic max-w-md mx-auto leading-relaxed">
                        "{description[locale]}"
                    </p>
                </div>

                {/* CTA */}
                <MagneticButton>
                    <a
                        href={affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-950 font-bold rounded-full shadow-lg hover:bg-slate-100 transition-colors"
                    >
                        <ShoppingBag size={18} />
                        <span>{locale === 'id' ? 'Cek Ketersediaan' : 'Check Availability'}</span>
                        <ExternalLink size={14} className="opacity-50" />
                    </a>
                </MagneticButton>
            </div>
        </GlassCard>
    );
}
