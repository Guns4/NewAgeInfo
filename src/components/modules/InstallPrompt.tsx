"use client";

import React, { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleResultReady = () => {
            // Only show if we have a deferred prompt and it's not already visible
            if (deferredPrompt) {
                setIsVisible(true);
            }
        };

        const handlePrompt = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener("beforeinstallprompt", handlePrompt);
        window.addEventListener("ageinfo-result-ready", handleResultReady);

        return () => {
            window.removeEventListener("beforeinstallprompt", handlePrompt);
            window.removeEventListener("ageinfo-result-ready", handleResultReady);
        };
    }, [deferredPrompt]);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === "accepted") {
            setDeferredPrompt(null);
        }

        setIsVisible(false);
    };

    const handleDismiss = () => {
        setIsVisible(false);
    };

    // Don't show if already in standalone mode (already installed)
    useEffect(() => {
        if (typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches) {
            setIsVisible(false);
        }
    }, []);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                className="fixed bottom-6 left-6 right-6 z-50 md:left-auto md:right-8 md:w-96"
            >
                <div className="relative group p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_auto] animate-gradient-x shadow-2xl">
                    <GlassCard className="p-5 flex items-center justify-between bg-slate-950/90 backdrop-blur-2xl rounded-[15px] border-none">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-40 animate-pulse" />
                                <div className="relative w-12 h-12 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-xl flex items-center justify-center shadow-lg">
                                    <Download className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-white tracking-tight">Ageinfo App</h3>
                                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Premium Experience</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <button
                                onClick={handleInstallClick}
                                className="px-5 py-2.5 bg-white text-slate-950 text-xs font-black rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl"
                            >
                                INSTALL
                            </button>
                            <button
                                onClick={handleDismiss}
                                className="p-2 text-slate-500 hover:text-white transition-colors"
                                aria-label="Dismiss"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </GlassCard>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
