"use client";

import { useSpring, useMotionValue, useInView } from "framer-motion";
import { useEffect, useRef, memo } from "react";
import { cn } from "@/lib/utils";

interface DynamicNumberProps {
    value: number;
    className?: string;
    precision?: number;
}

function DynamicNumberComponent({ value, className, precision = 0 }: DynamicNumberProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        stiffness: 100,
        damping: 30,
    });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = latest.toLocaleString(undefined, {
                    minimumFractionDigits: precision,
                    maximumFractionDigits: precision,
                });
            }
        });
        return () => unsubscribe();
    }, [springValue, precision]);

    return (
        <span
            ref={ref}
            className={cn("tabular-nums inline-block font-bold tracking-tight", className)}
        >
            0
        </span>
    );
}

export const DynamicNumber = memo(DynamicNumberComponent);
