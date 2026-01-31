"use client";

import React from "react";
import { PosterData } from "@/core/types/poster";
import { Sparkles, Star } from "lucide-react";

/**
 * Template B: StardustPoster (Cosmic Luxury)
 * Dark celestial theme, Birthstone glow, Constellations.
 */
export function StardustPoster({ data }: { data: PosterData }) {
    return (
        <div
            id="poster-stardust"
            className="w-[1080px] h-[1920px] bg-slate-950 text-white flex flex-col items-center justify-between p-24 font-sans relative overflow-hidden"
            style={{
                minWidth: '1080px',
                minHeight: '1920px',
                backgroundImage: `radial-gradient(circle at 50% 30%, ${data.birthstone.color}33 0%, transparent 70%)`
            }}
        >
            {/* Constellation Lines (Subtle SVG Overlay) */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1080 1920">
                <path d="M100,200 L300,450 L600,300 L800,600 M200,800 L400,1000 L700,900 M500,1200 L800,1400 L400,1600" stroke="white" strokeWidth="0.5" fill="none" />
                {[...Array(20)].map((_, i) => (
                    <circle key={i} cx={Math.random() * 1080} cy={Math.random() * 1920} r={Math.random() * 2} fill="white" />
                ))}
            </svg>

            <div className="z-10 text-center space-y-8 mt-20">
                <div className="flex items-center justify-center gap-4 text-indigo-400">
                    <div className="h-px w-24 bg-indigo-500/50" />
                    <Sparkles className="w-8 h-8" />
                    <div className="h-px w-24 bg-indigo-500/50" />
                </div>
                <h1 className="text-8xl font-light tracking-[0.2em] uppercase">
                    {data.name}
                </h1>
                <p className="text-xl tracking-[0.5em] text-indigo-300 font-medium uppercase opacity-70">
                    Universal Life Sequence
                </p>
            </div>

            <div className="z-10 w-full grid grid-cols-1 gap-12 text-center">
                <div className="space-y-4">
                    <Star className="w-6 h-6 mx-auto mb-2 text-indigo-400 opacity-50" />
                    <p className="text-sm uppercase tracking-[0.8em] text-slate-500">Celestial Origin</p>
                    <p className="text-4xl font-light tracking-widest">{data.weton.combined}</p>
                </div>

                <div className="py-12 border-y border-white/5 bg-white/5 backdrop-blur-sm px-12 rounded-3xl">
                    <p className="text-sm uppercase tracking-[0.8em] text-slate-500 mb-6 font-bold">Planetary Milestone</p>
                    <div className="flex flex-col gap-2">
                        <span className="text-7xl font-bold tracking-tighter" style={{ color: data.birthstone.color }}>
                            {data.planetaryAge.age.toFixed(1)}
                        </span>
                        <span className="text-2xl uppercase tracking-[0.4em] font-light">Years on {data.planetaryAge.planet}</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-sm uppercase tracking-[0.8em] text-slate-500">Birthstone Resonance</p>
                    <p className="text-3xl font-medium tracking-widest uppercase italic" style={{ color: data.birthstone.color }}>
                        {data.birthstone.name}
                    </p>
                </div>
            </div>

            <div className="z-10 flex flex-col items-center gap-6 mb-12">
                <div className="w-px h-32 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
                <p className="text-[12px] font-bold uppercase tracking-[1em] text-slate-400">
                    Calculated In Cosmic Time / 2026
                </p>
            </div>

            {/* Aesthetic Glow Orb */}
            <div
                className="absolute bottom-[-300px] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] blur-[120px] opacity-20 pointer-events-none rounded-full"
                style={{ backgroundColor: data.birthstone.color }}
            />
        </div>
    );
}
