"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link } from "@/navigation"; // Use localized link
import { GlassCard } from "@/components/ui/GlassCard"; // Ensure this path is correct
// If GlassCard export is different, I might need to adjust. 
// I'll assume standard export based on task.md audit.

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900 text-white">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
            </div>

            <div className="relative z-10 p-4 max-w-md w-full text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <GlassCard className="p-12 border-indigo-500/30">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                            className="text-8xl mb-6 inline-block"
                        >
                            ⏳
                        </motion.div>

                        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 mb-2">
                            404
                        </h1>
                        <h2 className="text-2xl font-bold text-white mb-4">Lost in Time</h2>

                        <p className="text-slate-300 mb-8 leading-relaxed">
                            It seems this moment has slipped through the cracks of existence.
                            Let's bring you back to the present.
                        </p>

                        <Link
                            href="/"
                            className="inline-flex items-center justify-center px-8 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-indigo-50 transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
                        >
                            Return to Now
                        </Link>
                    </GlassCard>
                </motion.div>
            </div>
        </div>
    );
}
