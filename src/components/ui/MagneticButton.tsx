"use client";

import React, { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { useSensory, useHaptic } from "@/core/providers/SensoryProvider";
import { cn } from "@/lib/utils";


interface MagneticButtonProps extends HTMLMotionProps<"button"> {
    children: React.ReactNode;
}

export function MagneticButton({ children, className, onClick, ...props }: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const { playHover } = useSensory();
    const { pulse } = useHaptic();

    const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;

        const { height, width, left, top } = rect;
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX, y: middleY });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        pulse();
        playHover(); // Use tick sound for click too
        onClick?.(e);
    };

    const { x, y } = position;

    return (
        <motion.button
            ref={ref}
            className={cn("relative focus-ring active:scale-95 transition-transform duration-100 ease-out", className)}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            onMouseEnter={() => {
                pulse();
                playHover();
            }}
            onClick={handleClick}
            {...props}
        >
            {children}
            {/* Spotlight Effect */}
            <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/0 via-white/10 to-indigo-500/0 opacity-0 hover:opacity-100 pointer-events-none transition-opacity duration-300"
                animate={{ x: -x, y: -y }}
            />
        </motion.button>
    );
}
