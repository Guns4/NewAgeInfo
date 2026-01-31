"use client";

import React, { useRef, useState } from "react";
import { Share2, Link2, Twitter, Facebook } from "lucide-react";
import { toBlob } from "html-to-image";
import { ShareCard } from "@/components/modules/ShareCard";
import { cn } from "@/core/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";

interface ShareButtonProps {
    birthDate: Date;
    stats: {
        secondsLived: number;
        distanceTraveled: number;
    };
    className?: string;
}

export function ShareButton({ birthDate, stats, className }: ShareButtonProps) {
    const templateRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    // Helpers to calculate rough years for display
    const ageYears = new Date().getFullYear() - birthDate.getFullYear();

    const generateImage = async () => {
        if (!templateRef.current) return null;
        return await toBlob(templateRef.current, {
            cacheBust: true,
            pixelRatio: 1, // 1:1 for the 1080px template
            backgroundColor: "#020617",
        });
    };

    const handleCopyLink = () => {
        const dateStr = birthDate.toISOString().split('T')[0];
        const url = `${window.location.origin}/?d=${dateStr}`;
        navigator.clipboard.writeText(url);
        // Toast would go here
        alert("Link copied to clipboard! Share it with friends.");
    };

    const handleNativeShare = async () => {
        setIsGenerating(true);
        try {
            const blob = await generateImage();
            if (!blob) throw new Error("Image generation failed");

            const file = new File([blob], "ageinfo-stats.png", { type: "image/png" });
            const dateStr = birthDate.toISOString().split('T')[0];
            const url = `${window.location.origin}/?d=${dateStr}`;

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: "My Ageinfo Cosmic Stats",
                    text: `I have lived for ${stats.secondsLived.toLocaleString()} seconds! Check your stats here:`,
                    url: url,
                });
            } else {
                // Fallback to download
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "ageinfo-stats.png";
                link.click();
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsGenerating(false);
        }
    };

    // Social Links
    const shareText = `I have lived for ${stats.secondsLived.toLocaleString()} seconds. Discover your cosmic timeline!`;
    const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/?d=${birthDate.toISOString().split('T')[0]}` : "https://ageinfo.online";

    return (
        <div className={cn("flex flex-col gap-4", className)}>
            {/* Hidden Template */}
            <div className="fixed left-[9999px] top-0 pointer-events-none">
                <ShareCard ref={templateRef} ageYears={ageYears} secondsLived={stats.secondsLived} distanceTraveled={stats.distanceTraveled} />
            </div>

            <div className="flex items-center gap-2">
                <MagneticButton onClick={handleNativeShare} className="flex-1">
                    <div className={cn("flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-indigo-500/25", isGenerating && "opacity-80 cursor-wait")}>
                        {isGenerating ? <Share2 className="w-5 h-5 animate-spin" /> : <Share2 className="w-5 h-5" />}
                        <span>{isGenerating ? "Capturing..." : "Share Snapshot"}</span>
                    </div>
                </MagneticButton>

                <MagneticButton onClick={handleCopyLink} className="w-12">
                    <div className="w-12 h-12 bg-slate-800 hover:bg-slate-700 rounded-xl flex items-center justify-center text-white border border-white/10">
                        <Link2 className="w-5 h-5" />
                    </div>
                </MagneticButton>
            </div>

            {/* Micro Social Links */}
            <div className="flex gap-2 justify-center">
                <a
                    href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-400 hover:text-green-400 transition-colors"
                    aria-label="Share on WhatsApp"
                >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                </a>
                <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-400 hover:text-sky-400 transition-colors"
                    aria-label="Share on X"
                >
                    <Twitter className="w-5 h-5" />
                </a>
                <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-400 hover:text-blue-500 transition-colors"
                    aria-label="Share on Facebook"
                >
                    <Facebook className="w-5 h-5" />
                </a>
            </div>
        </div>
    );
}
