"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";

export function EmptyState() {
    return (
        <GlassCard className="max-w-md mx-auto p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative w-48 h-48 mb-8"
            >
                {/* Abstract Clock / Planet Animation */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-500/30"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 rounded-full border-2 border-dotted border-purple-500/30"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl">⏳</span>
                </div>
            </motion.div>

            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-200 mb-2">
                Awaiting Your Moment
            </h3>
            <p className="text-slate-400">
                Enter your birth date above to unlock your cosmic profile and life statistics.
            </p>
        </GlassCard>
    );
}
