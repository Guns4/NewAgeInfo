"use client";

import { motion, useSpring, useTransform, useMotionValue, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/core/utils";

interface AnimatedNumberProps {
    value: number;
    className?: string;
    fractionDigits?: number;
}

export function AnimatedNumber({ value, className, fractionDigits = 0 }: AnimatedNumberProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 100,
    });
    const isInView = useInView(ref, { once: true, margin: "-10px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = latest.toFixed(fractionDigits);
            }
        });
        return () => unsubscribe();
    }, [springValue, fractionDigits]);

    return <span ref={ref} className={cn("tabular-nums", className)} />;
}
