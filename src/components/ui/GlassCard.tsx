"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/core/utils";
import React, { memo } from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

const GlassCardComponent = ({
    children,
    className,
    hoverEffect = true,
    ...props
}: GlassCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={hoverEffect ? {
                y: -5,
                boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.5)"
            } : undefined}
            className={cn(
                "relative overflow-hidden rounded-2xl-plus",
                "bg-slate-900/40 backdrop-blur-xl",
                "border border-white/10",
                "shadow-2xl shadow-indigo-500/10", // Colored shadow
                className
            )}
            {...props}
        >
            {/* Noise Texture */}
            <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

export const GlassCard = memo(GlassCardComponent);
