"use client";

import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Dialog, DialogContent } from "@/components/ui/dialog"; // Assuming standard UI, or custom overlay
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Download, Share2, X } from "lucide-react";
import { Milestone } from "@/core/logic/milestoneTracker";
import { toBlob } from "html-to-image";

interface CelebrationOverlayProps {
    milestone: Milestone | null;
    onClose: () => void;
}

export function CelebrationOverlay({ milestone, onClose }: CelebrationOverlayProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (milestone) {
            setIsVisible(true);
            triggerConfetti();
        } else {
            setIsVisible(false);
        }
    }, [milestone]);

    const triggerConfetti = () => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    if (!milestone) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="w-full max-w-md relative"
                    >
                        <GlassCard className="p-8 text-center border-amber-500/50 shadow-[0_0_50px_-12px_rgba(245,158,11,0.5)]">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-slate-400 hover:text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl text-5xl">
                                {milestone.icon}
                            </div>

                            <motion.h2
                                className="text-3xl font-bold text-white mb-2"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                Milestone Unlocked!
                            </motion.h2>

                            <h3 className="text-xl text-amber-300 font-semibold mb-4">{milestone.title}</h3>
                            <p className="text-slate-300 mb-8">{milestone.description}</p>

                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={onClose} // For now just close, certificate generator can be separate step or integrated
                                    className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-xl transition-colors shadow-lg shadow-amber-500/20"
                                >
                                    Awesome!
                                </button>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
