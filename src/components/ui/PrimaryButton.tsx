"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/core/utils";
import React, { memo } from "react";
import { Loader2 } from "lucide-react";

interface PrimaryButtonProps extends HTMLMotionProps<"button"> {
    children: React.ReactNode;
    isLoading?: boolean;
    className?: string;
    variant?: "primary" | "secondary" | "outline";
}

const PrimaryButtonComponent = ({
    children,
    isLoading = false,
    className,
    variant = "primary",
    disabled,
    ...props
}: PrimaryButtonProps) => {

    const variants = {
        primary: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 border-transparent",
        secondary: "bg-slate-800 hover:bg-slate-700 text-white border-white/10",
        outline: "bg-transparent border-white/20 text-white hover:bg-white/5"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "relative overflow-hidden px-8 py-3 rounded-xl font-bold transition-all",
                "flex items-center justify-center space-x-2",
                "border",
                variants[variant],
                (disabled || isLoading) && "opacity-50 cursor-not-allowed",
                className
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {/* Shimmer Effect */}
            {!isLoading && !disabled && variant === 'primary' && (
                <motion.div
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    animate={{ translateX: ["100%"] }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        delay: 1, // Wait a bit between shimmers
                        ease: "easeInOut"
                    }}
                />
            )}

            {isLoading ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                </>
            ) : (
                <span className="relative z-10 flex items-center gap-2">
                    {children}
                </span>
            )}
        </motion.button>
    );
};

export const PrimaryButton = memo(PrimaryButtonComponent);
