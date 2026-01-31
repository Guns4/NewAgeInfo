"use client";

import { motion } from "framer-motion";
import { cn } from "@/core/utils";
import React, { memo, useRef, useState } from "react";
import { CalendarDays } from "lucide-react";

interface InputBirthdateProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    onChange: (date: Date | null) => void;
    label?: string;
    error?: string;
}

const InputBirthdateComponent = ({
    onChange,
    label = "Date of Birth",
    error,
    className,
    ...props
}: InputBirthdateProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!value) {
            onChange(null);
            return;
        }
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
            onChange(date);
        }
    };

    return (
        <div className={cn("space-y-2 w-full", className)}>
            {label && (
                <label className="text-sm font-medium text-slate-400 ml-1">
                    {label}
                </label>
            )}

            <motion.div
                className={cn(
                    "relative group rounded-2xl overflow-hidden transition-all duration-300",
                    "border border-white/10 bg-white/5 backdrop-blur-md",
                    isFocused ? "border-indigo-500/50 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/50" : "hover:border-white/20",
                    error && "border-rose-500/50 ring-rose-500/20"
                )}
                animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
            >
                {/* Icon */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-indigo-400 transition-colors pointer-events-none z-10">
                    <CalendarDays className="w-5 h-5" />
                </div>

                <input
                    ref={inputRef}
                    type="date"
                    className={cn(
                        "w-full bg-transparent text-white placeholder-slate-500",
                        "pl-12 pr-4 py-4 text-lg font-medium outline-none",
                        "calendar-picker-indicator-white", // Custom class needed in global css for webkit styling
                    )}
                    style={{
                        colorScheme: "dark" // Ensures native picker is dark mode
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={handleChange}
                    {...props}
                />

                {/* Active Indicator */}
                <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-indigo-500"
                    initial={{ width: "0%" }}
                    animate={{ width: isFocused ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                />
            </motion.div>

            {error && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-rose-400 ml-1"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
};

export const InputBirthdate = memo(InputBirthdateComponent);
