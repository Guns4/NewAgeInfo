"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StickyActionProps {
    isVisible: boolean;
    onClick: () => void;
    label: string;
    icon?: React.ReactNode;
}

export function StickyAction({ isVisible, onClick, label, icon }: StickyActionProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="fixed bottom-6 left-4 right-4 z-40 lg:hidden"
                >
                    <button
                        onClick={onClick}
                        className="w-full bg-brand-primary text-white font-bold py-4 rounded-xl-plus shadow-xl shadow-brand-primary/25 flex items-center justify-center gap-2 touch-target active:scale-95 transition-transform"
                    >
                        {icon}
                        {label}
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
