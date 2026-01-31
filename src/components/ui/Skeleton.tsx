"use client";

import React from "react";
import { motion } from "framer-motion";
import { shimmer } from "./Motion";
import { cn } from "@/lib/utils"; // Assuming cn utility exists, otherwise I'll use standard class concatenation

interface SkeletonProps {
    className?: string;
    width?: string | number;
    height?: string | number;
    shape?: "rectangle" | "circle";
}

export function Skeleton({ className, width, height, shape = "rectangle" }: SkeletonProps) {
    return (
        <div
            className={cn(
                "relative overflow-hidden bg-slate-800/50",
                shape === "circle" ? "rounded-full" : "rounded-md",
                className
            )}
            style={{ width, height }}
        >
            <motion.div
                variants={shimmer}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                style={{ translateX: "-100%" }} // Handled by variants, but added for safety
            />
        </div>
    );
}

// Pre-defined Skeletons for common UI patterns
export function CardSkeleton() {
    return (
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
            <div className="flex items-center gap-4">
                <Skeleton width={48} height={48} shape="circle" />
                <div className="space-y-2">
                    <Skeleton width={120} height={16} />
                    <Skeleton width={80} height={12} />
                </div>
            </div>
            <Skeleton width="100%" height={24} />
            <Skeleton width="80%" height={24} />
        </div>
    )
}
