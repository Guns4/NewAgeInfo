"use client";

import React from "react";
import { motion } from "framer-motion";
import { Undo2 } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

interface RecalculateButtonProps {
    onReset: () => void;
}

export function RecalculateButton({ onReset }: RecalculateButtonProps) {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
        >
            <MagneticButton onClick={onReset} aria-label="Start new calculation">
                <div className="w-14 h-14 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-indigo-400 hover:text-white shadow-lg shadow-indigo-500/10 transition-colors">
                    <Undo2 className="w-6 h-6" />
                </div>
            </MagneticButton>
        </motion.div>
    );
}
