"use client";

import React, { useRef, useState } from "react";
import { Milestone } from "@/core/logic/milestoneTracker";
import { GlassCard } from "@/components/ui/GlassCard";
import { Download, RefreshCw } from "lucide-react";
import { toBlob } from "html-to-image";
import { QRCodeSVG } from "qrcode.react";

interface CertificateGeneratorProps {
    milestone: Milestone;
    userName?: string; // Could come from auth or input, optional for now
    dateUnlocked: string;
}

export function CertificateGenerator({ milestone, userName = "Ageinfo Traveler", dateUnlocked }: CertificateGeneratorProps) {
    const certRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownload = async () => {
        if (!certRef.current) return;
        setIsGenerating(true);

        try {
            const blob = await toBlob(certRef.current, { cacheBust: true, pixelRatio: 2 });
            if (!blob) throw new Error("Failed to generate certificate");

            const link = document.createElement("a");
            link.download = `Certificate-${milestone.id}.png`;
            link.href = URL.createObjectURL(blob);
            link.click();
            link.remove();
        } catch (err) {
            console.error(err);
            alert("Failed to download certificate.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div>
            {/* The Certificate Logic (Hidden or Visible? Let's make it visible in a modal or preview is better, but hidden for download is cleaner) 
                Actually, let's keep it hidden for generating a high-res version, or show a preview. 
                For this "Elite" requirement, let's render a hidden reference for the high-quality export.
            */}
            <div className="fixed left-[9999px] top-0 pointer-events-none">
                <div
                    ref={certRef}
                    className="w-[1200px] h-[800px] bg-slate-900 relative p-12 text-center flex flex-col items-center justify-between border-[20px] border-double border-amber-500/50"
                    style={{ fontFamily: "'Cinzel', serif" }} // Ideally use a fancy font
                >
                    {/* Watermark / BG */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                        <span className="text-[40rem]">🏆</span>
                    </div>

                    {/* Header */}
                    <div className="space-y-4">
                        <h1 className="text-6xl text-amber-500 font-bold uppercase tracking-widest drop-shadow-md">Certificate of Achievement</h1>
                        <p className="text-2xl text-slate-400 uppercase tracking-[0.5em]">Ageinfo Life Mastery</p>
                    </div>

                    {/* Content */}
                    <div className="space-y-8 my-auto">
                        <p className="text-3xl text-slate-300">This is to certify that</p>
                        <h2 className="text-6xl text-white font-serif italic border-b-2 border-slate-700 pb-4 inline-block min-w-[600px]">{userName}</h2>
                        <p className="text-3xl text-slate-300">has officially unlocked the milestone</p>

                        <div className="py-6 px-12 bg-white/5 rounded-2xl border border-white/10 inline-block backdrop-blur-sm">
                            <span className="text-7xl mr-4">{milestone.icon}</span>
                            <span className="text-5xl font-bold text-amber-400">{milestone.title}</span>
                        </div>

                        <p className="text-2xl text-slate-400 italic">"{milestone.description}"</p>
                    </div>

                    {/* Footer */}
                    <div className="w-full flex justify-between items-end border-t border-slate-700 pt-8">
                        <div className="text-left">
                            <p className="text-slate-500 text-lg uppercase tracking-wider">Date Unlocked</p>
                            <p className="text-2xl text-slate-300">{dateUnlocked}</p>
                        </div>

                        <div className="flex flex-col items-center">
                            {/* @ts-ignore */}
                            <QRCodeSVG value={`https://ageinfo.online?milestone=${milestone.id}`} size={100} fgColor="#fbbf24" bgColor="transparent" />
                            <p className="text-slate-600 text-xs mt-2 uppercase tracking-widest">Verify Authenticity</p>
                        </div>

                        <div className="text-right">
                            <div className="h-16 w-48 mb-2 border-b border-slate-600"></div> {/* Signature Line */}
                            <p className="text-slate-500 text-lg uppercase tracking-wider">The Timekeeper</p>
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={handleDownload}
                disabled={isGenerating}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-500 rounded-lg text-sm font-medium transition-colors border border-amber-500/20"
            >
                {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                <span>Download Certificate</span>
            </button>
        </div>
    );
}
