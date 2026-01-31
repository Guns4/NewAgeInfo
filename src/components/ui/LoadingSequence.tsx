"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const MESSAGES = [
    "Aligning cosmic orbits...",
    "Calculating time dilation...",
    "Syncing with universal clock...",
    "Analyzing life path...",
];

export function LoadingSequence() {
    const [msgIndex, setMsgIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            layoutId="calculate-button"
            className="w-full max-w-sm mx-auto bg-slate-900 border border-indigo-500/30 rounded-2xl p-8 flex flex-col items-center justify-center gap-6 shadow-2xl relative overflow-hidden"
            initial={{ borderRadius: "12px" }}
            animate={{ borderRadius: "24px", height: "auto" }}
        >
            {/* Dynamic Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent animate-pulse" />

            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="relative z-10 p-4 bg-indigo-500/10 rounded-full"
            >
                <Sparkles className="w-8 h-8 text-indigo-400" />
            </motion.div>

            <div className="relative z-10 h-8 flex items-center justify-center overflow-hidden w-full">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={msgIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-slate-300 font-medium text-center text-lg whitespace-nowrap"
                    >
                        {MESSAGES[msgIndex]}
                    </motion.p>
                </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden relative z-10">
                <motion.div
                    className="h-full bg-indigo-500 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                />
            </div>
        </motion.div>
    );
}
