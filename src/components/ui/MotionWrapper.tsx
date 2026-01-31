"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer } from "./Motion";

interface MotionWrapperProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export function MotionWrapper({ children, className, delay = 0 }: MotionWrapperProps) {
    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className={className}
            custom={delay}
        >
            <AnimatePresence mode="wait">
                {children}
            </AnimatePresence>
        </motion.div>
    );
}

export function MotionItem({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={className}
            layout // Enable layout transitions
        >
            {children}
        </motion.div>
    )
}
