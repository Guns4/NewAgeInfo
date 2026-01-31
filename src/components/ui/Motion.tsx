import { Variants } from "framer-motion";

// Micro-Interaction Variants for Buttons and Cards
export const microRebound: Variants = {
    initial: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.2, ease: "easeOut" } },
    tap: { scale: 0.95, transition: { duration: 0.1, ease: "easeIn" } }
};

export const slideUpFade: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

// Reusable Class Constants for Transitions
export const TRANSITION_DEFAULTS = "transition-all duration-300 ease-out";
export const HOVER_ELEVATE = "hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/20";

export const springScale: Variants = {
    initial: { scale: 1 },
    hover: {
        scale: 1.05,
        transition: { type: "spring", stiffness: 300, damping: 20 }
    }
};

export const shimmer: Variants = {
    initial: { backgroundPosition: "-200%" },
    animate: {
        backgroundPosition: "200%",
        transition: {
            repeat: Infinity,
            duration: 2,
            ease: "linear"
        }
    }
};
