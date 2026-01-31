"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AdUnitProps {
    slot: string;
    format?: "auto" | "fluid" | "rectangle" | "autorelaxed";
    layout?: string;
    responsive?: string;
    className?: string;
    style?: React.CSSProperties;
    minHeight?: string;
    label?: string;
}

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

export default function AdUnit({
    slot,
    format = "auto",
    layout,
    responsive = "true",
    className = "",
    style = { display: "block" },
    minHeight = "280px", // Default height untuk mencegah layout shift
    label = "Advertisement",
}: AdUnitProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        try {
            if (typeof window !== "undefined") {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                setIsLoaded(true);
            }
        } catch (err) {
            console.error("AdSense Error:", err);
            setHasError(true);
        }
    }, []);

    if (hasError) return null; // Sembunyikan jika adblocker aktif/error berat

    return (
        <div className={`relative w-full mx-auto my-6 overflow-hidden ${className}`}>
            {/* Label Iklan Halus (Standard Professional) */}
            <div className="flex justify-center mb-2">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
                    {label}
                </span>
            </div>

            <div
                className="relative z-10 transition-opacity duration-1000"
                style={{ minHeight, ...style }}
            >
                {/* Skeleton Loader - Muncul sebelum iklan terisi */}
                <AnimatePresence>
                    {!isLoaded && (
                        <motion.div
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl"
                        >
                            <div className="relative w-full h-full p-6 overflow-hidden rounded-2xl">
                                {/* Animasi Shimmer */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />

                                <div className="space-y-4">
                                    <div className="h-4 w-1/4 bg-white/10 rounded-full" />
                                    <div className="h-24 w-full bg-white/5 rounded-xl" />
                                    <div className="h-4 w-3/4 bg-white/10 rounded-full" />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Core Google AdSense Tag */}
                <ins
                    className="adsbygoogle"
                    style={style}
                    data-ad-client="ca-pub-5099892029462046"
                    data-ad-slot={slot}
                    data-ad-format={format}
                    data-ad-layout={layout}
                    data-full-width-responsive={responsive}
                />
            </div>
        </div>
    );
}
