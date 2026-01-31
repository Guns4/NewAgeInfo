"use client";

import React from "react";
import { PosterData } from "@/core/types/poster";
import { cn } from "@/core/utils";

/**
 * Template A: ArchitectPoster (Swiss Minimalist)
 * Monochrome, massive Serif, strict grid.
 */
export function ArchitectPoster({ data }: { data: PosterData }) {
    return (
        <div
            id="poster-architect"
            className="w-[1080px] h-[1920px] bg-white text-slate-950 flex flex-col p-24 font-sans relative overflow-hidden"
            style={{ minWidth: '1080px', minHeight: '1920px' }}
        >
            {/* Top Border Indicator */}
            <div className="w-full h-1 bg-slate-950 mb-12" />

            <div className="flex-1 flex flex-col justify-between">
                {/* Header Section */}
                <div className="space-y-4">
                    <p className="text-xl font-black uppercase tracking-[0.4em] text-slate-400">
                        Chronological Blueprint
                    </p>
                    <h1 className="text-6xl font-bold tracking-tighter">
                        {data.name}
                    </h1>
                </div>

                {/* Main Counter - The Core Feature */}
                <div className="relative">
                    <div className="flex flex-col">
                        <span className="text-sm font-bold uppercase tracking-[0.5em] text-slate-500 mb-8">
                            Total Earth Days
                        </span>
                        <h2 className="text-[280px] leading-[0.8] font-serif font-black tracking-tight -ml-4">
                            {data.totalDays.toLocaleString()}
                        </h2>
                    </div>
                </div>

                {/* Grid Details */}
                <div className="grid grid-cols-2 gap-24 border-t border-slate-100 pt-24">
                    <div className="space-y-8">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Structure</p>
                            <p className="text-2xl font-medium">{data.years || 0} Years Completed</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Ancestral alignment</p>
                            <p className="text-2xl font-medium">{data.weton.combined}</p>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Origin Date</p>
                            <p className="text-2xl font-medium">{data.birthDate.toLocaleDateString('en-GB')}</p>
                        </div>
                        <div className="pt-8">
                            <div className="w-12 h-1 bg-slate-950" />
                            <p className="text-[10px] uppercase font-black tracking-[0.3em] mt-4">
                                Generated via Ageinfo / Edition 2026
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Side Branding */}
            <div className="absolute right-12 top-1/2 -rotate-90 origin-right text-[10px] font-black uppercase tracking-[1em] text-slate-300">
                Legacy Poster Series / Architect Vol. 01
            </div>
        </div>
    );
}
