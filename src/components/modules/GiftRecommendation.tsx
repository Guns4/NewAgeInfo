"use client";

import React from 'react';
import Image from 'next/image';
import { getRecommendations } from '@/core/engines/recommendationEngine';
import { motion } from 'framer-motion';
import { ExternalLink, ShoppingBag, Sparkles } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';

interface GiftRecommendationProps {
    age: number;
    birthDate: Date;
}

export function GiftRecommendation({ age, birthDate }: GiftRecommendationProps) {
    const products = getRecommendations(age, birthDate);

    return (
        <section className="py-12 relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8 px-4 md:px-0">
                <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                    <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        Curated For You
                        <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                    </h3>
                    <p className="text-sm text-slate-400">Items that resonate with your cosmic timeline.</p>
                </div>
            </div>

            {/* Product Grid - Mobile Scroll / Desktop Grid */}
            <div className="flex overflow-x-auto pb-8 -mx-4 px-4 snap-x gap-6 md:grid md:grid-cols-3 md:overflow-visible md:px-0 scrollbar-hide">
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="min-w-[280px] md:w-full snap-center bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all group flex flex-col"
                    >
                        {/* Image Container with Rational Badge */}
                        <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                            <Image
                                src={product.imageUrl}
                                alt={product.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, 33vw"
                                loading="lazy"
                            />
                            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-xs font-medium text-white px-3 py-1 rounded-full border border-white/10">
                                {product.reason}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-grow">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs uppercase tracking-wider text-indigo-400 font-semibold">{product.category}</span>
                                <span className="text-sm font-bold text-white">{product.price}</span>
                            </div>
                            <h4 className="text-lg font-semibold text-white mb-2 leading-tight group-hover:text-indigo-300 transition-colors">
                                {product.title}
                            </h4>
                            <p className="text-sm text-slate-400 mb-6 line-clamp-2 leading-relaxed flex-grow">
                                {product.description}
                            </p>

                            <MagneticButton className="w-full bg-white text-slate-950 font-bold py-3 rounded-xl hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 text-sm">
                                <span>View Product</span>
                                <ExternalLink className="w-4 h-4" />
                            </MagneticButton>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
