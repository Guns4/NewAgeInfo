"use client";

import React from "react";
import { PosterData } from "@/core/types/poster";
import { History, Calendar, Bookmark } from "lucide-react";

/**
 * Template C: ChroniclePoster (Warm Journal)
 * Cream paper texture, classic typography, vertical timeline.
 */
export function ChroniclePoster({ data }: { data: PosterData }) {
    return (
        <div
            id="poster-chronicle"
            className="w-[1080px] h-[1920px] bg-[#fdfaf5] text-[#423d33] flex flex-col p-32 font-serif relative overflow-hidden"
            style={{ minWidth: '1080px', minHeight: '1920px' }}
        >
            {/* Paper Texture Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/pinstriped-suit.png")' }}
            />

            <div className="z-10 flex-1 flex flex-col border border-[#423d33]/10 p-16">
                {/* Journal Header */}
                <div className="flex justify-between items-start border-b border-[#423d33]/20 pb-12 mb-20">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-[#b58e58]">
                            <History className="w-6 h-6" />
                            <span className="text-sm font-sans font-bold uppercase tracking-[0.3em]">Personal Archive</span>
                        </div>
                        <h1 className="text-8xl font-black italic tracking-tight">
                            {data.name}
                        </h1>
                    </div>
                    <div className="text-right font-sans">
                        <p className="text-xs font-black uppercase tracking-widest text-slate-400">Entry No.</p>
                        <p className="text-4xl font-light">#{data.totalDays}</p>
                    </div>
                </div>

                {/* Main Content: The Timeline */}
                <div className="flex-1 flex gap-24 py-12">
                    {/* Visual Timeline Bar */}
                    <div className="w-1 bg-[#423d33]/5 relative flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-[#b58e58] absolute top-0" />
                        <div className="w-4 h-4 rounded-full bg-[#b58e58] absolute bottom-0" />
                        <div className="w-4 h-4 rounded-full bg-[#423d33]/20 absolute top-1/2" />
                    </div>

                    {/* Timeline Content */}
                    <div className="flex-1 flex flex-col justify-around">
                        {data.milestones.map((milestone, idx) => (
                            <div key={idx} className="space-y-4">
                                <div className="flex items-center gap-4 text-[#b58e58]">
                                    <Calendar className="w-5 h-5" />
                                    <span className="text-lg font-sans font-bold tracking-widest uppercase">{milestone.date}</span>
                                </div>
                                <h3 className="text-5xl font-black leading-tight border-l-8 border-[#b58e58]/10 pl-8">
                                    {milestone.label}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Insight */}
                <div className="mt-20 pt-12 border-t border-[#423d33]/10 flex justify-between items-end">
                    <div className="space-y-4 max-w-sm">
                        <Bookmark className="w-8 h-8 text-[#b58e58]/50" />
                        <p className="text-xl font-medium italic opacity-80 leading-relaxed">
                            "Birth marks the beginning of a story that unfolds across {data.totalDays} chapters of existence."
                        </p>
                    </div>

                    <div className="text-right space-y-2">
                        <p className="font-sans text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Document Authenticated</p>
                        <div className="flex items-baseline justify-end gap-2">
                            <span className="font-sans text-sm font-bold">Weton:</span>
                            <span className="text-3xl font-black italic">{data.weton.combined}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Print Marks */}
            <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[#423d33]/10" />
            <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-[#423d33]/10" />
            <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-[#423d33]/10" />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[#423d33]/10" />
        </div>
    );
}
