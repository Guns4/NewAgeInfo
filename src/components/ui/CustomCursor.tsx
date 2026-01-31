"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
    const springX = useSpring(mouseX, smoothOptions);
    const springY = useSpring(mouseY, smoothOptions);

    useEffect(() => {
        // Only run on desktop/non-touch to avoid ghost cursor on mobile
        const isTouch = 'ontouchstart' in window;
        if (isTouch) return;

        setIsVisible(true);

        const manageMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - 16); // Center the 32px cursor
            mouseY.set(e.clientY - 16);
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        window.addEventListener("mousemove", manageMouseMove);

        // Add event listeners to interactive elements
        const interactiveElements = document.querySelectorAll("a, button, input, [role='button']");
        interactiveElements.forEach(el => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        // Cleanup function to remove listeners
        return () => {
            window.removeEventListener("mousemove", manageMouseMove);
            interactiveElements.forEach(el => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, [mouseX, mouseY]);

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference"
            style={{
                x: springX,
                y: springY,
                backgroundColor: "white"
            }}
            animate={{
                scale: isHovering ? 2.5 : 1,
                opacity: isHovering ? 0.8 : 0.5
            }}
            transition={{ duration: 0.2 }}
        />
    );
}
