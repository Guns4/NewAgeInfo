"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ChevronLeft, ChevronRight, Wand2 } from "lucide-react";
import { ArchitectPoster } from "../poster-templates/ArchitectPoster";
import { StardustPoster } from "../poster-templates/StardustPoster";
import { ChroniclePoster } from "../poster-templates/ChroniclePoster";
import { PosterData, getWeton, getBirthstone } from "@/core/types/poster";
import { usePosterGenerator } from "@/core/hooks/usePosterGenerator";
import { cn } from "@/core/utils";

interface PosterGenerationModalProps {
    isOpen: boolean;
    onClose: () => void;
    userData: {
        name: string;
        birthDate: Date;
        totalDays: number;
        years: number;
    };
}

const THEMES = [
    { id: "architect", label: "Architect (Minimalist)", component: ArchitectPoster },
    { id: "stardust", label: "Stardust (Cosmic)", component: StardustPoster },
    { id: "chronicle", label: "Chronicle (Journal)", component: ChroniclePoster },
];

export function PosterGenerationModal({ isOpen, onClose, userData }: PosterGenerationModalProps) {
    const [currentThemeIdx, setCurrentThemeIdx] = useState(0);
    const { generate, isGenerating } = usePosterGenerator();

    // Prepare Poster Data
    const posterData: PosterData = {
        ...userData,
        weton: getWeton(userData.birthDate),
        birthstone: getBirthstone(userData.birthDate.getMonth()),
        planetaryAge: { planet: "Mars", age: userData.years / 1.88 }, // Example metric
        milestones: [
            { label: "Genesis: The Journey Begins", date: "Year Zero" },
            { label: "Decade of Discovery", date: "Year 10" },
            { label: "Present Alignment", date: `Year ${userData.years}` },
        ]
    };

    const CurrentTemplate = THEMES[currentThemeIdx].component;
    const currentId = `poster-${THEMES[currentThemeIdx].id}`;

    const handleDownload = async () => {
        await generate(currentId, `ageinfo-${THEMES[currentThemeIdx].id}`);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-4 md:p-8"
            >
                {/* Close Button UI */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-highest"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="w-full max-w-6xl flex flex-col md:flex-row gap-12 items-center">

                    {/* Left: Preview Area (Scaled down) */}
                    <div className="flex-1 relative flex flex-col items-center justify-center h-[500px] md:h-[700px] w-full">
                        <div className="absolute inset-0 flex items-center justify-center">
                            {/* The actual full-size template rendered but scaled for view */}
                            <div
                                className="origin-center shadow-2xl rounded-lg overflow-hidden border border-white/10"
                                style={{ transform: 'scale(0.25)', minWidth: '1080px', minHeight: '1920px' }}
                            >
                                <CurrentTemplate data={posterData} />
                            </div>
                        </div>

                        {/* Theme Navigation */}
                        <div className="absolute inset-x-0 bottom-[-60px] flex items-center justify-center gap-6">
                            <button
                                onClick={() => setCurrentThemeIdx((prev) => (prev === 0 ? THEMES.length - 1 : prev - 1))}
                                className="p-3 rounded-full bg-slate-900 border border-white/10 hover:border-indigo-500 transition-all"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <span className="text-sm font-bold uppercase tracking-widest text-slate-400 min-w-[150px] text-center">
                                {THEMES[currentThemeIdx].label}
                            </span>
                            <button
                                onClick={() => setCurrentThemeIdx((prev) => (prev === THEMES.length - 1 ? 0 : prev + 1))}
                                className="p-3 rounded-full bg-slate-900 border border-white/10 hover:border-indigo-500 transition-all"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Right: Controls Area */}
                    <div className="w-full md:w-80 space-y-8">
                        <div className="space-y-2">
                            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                                Legacy Poster
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Transform your earth journey into a high-resolution work of art. Optimized for status updates and personal framing.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                                    <Wand2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-200">Scale 3 Precision</p>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">300 DPI High-Res PNG</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleDownload}
                            disabled={isGenerating}
                            className={cn(
                                "w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-bold text-lg transition-all",
                                isGenerating
                                    ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-500/20"
                            )}
                        >
                            {isGenerating ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    >
                                        <Wand2 className="w-6 h-6" />
                                    </motion.div>
                                    <span>Sedang Menenun Waktu...</span>
                                </>
                            ) : (
                                <>
                                    <Download className="w-6 h-6" />
                                    <span>Download HQ Poster</span>
                                </>
                            )}
                        </button>

                        <p className="text-[10px] text-center text-slate-600 uppercase tracking-[0.2em]">
                            Free high-resolution generation
                        </p>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
