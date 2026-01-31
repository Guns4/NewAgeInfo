"use client";

import React, { forwardRef } from "react";
import { cn } from "@/core/utils";
import { QRCodeSVG } from "qrcode.react";

interface ShareTemplateProps {
    ageYears: number;
    nextBirthdayInDays: number;
    zodiacSign?: string;
}

export const ShareTemplate = forwardRef<HTMLDivElement, ShareTemplateProps>(
    ({ ageYears, nextBirthdayInDays, zodiacSign }, ref) => {
        return (
            <div
                ref={ref}
                className="w-[1080px] h-[1920px] bg-slate-950 flex flex-col items-center justify-between p-20 relative overflow-hidden"
                style={{ fontFamily: "'Inter', sans-serif" }} // Ensure font is consistent
            >
                {/* Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950" />
                <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-violet-900/40 via-transparent to-transparent" />

                {/* Header */}
                <div className="relative z-10 w-full text-center">
                    <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 mb-6">
                        Ageinfo
                    </h1>
                    <p className="text-4xl text-slate-400 tracking-widest uppercase">
                        My Time on Earth
                    </p>
                </div>

                {/* Main Stats */}
                <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full space-y-16">
                    <div className="text-center">
                        <span className="block text-9xl font-bold text-white mb-4 drop-shadow-2xl">
                            {ageYears}
                        </span>
                        <span className="text-5xl text-slate-400 font-medium">Years Old</span>
                    </div>

                    <div className="w-64 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    <div className="grid grid-cols-2 gap-20 w-full max-w-4xl">
                        <div className="text-center p-8 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm">
                            <span className="block text-7xl font-bold text-indigo-300 mb-2">
                                {nextBirthdayInDays}
                            </span>
                            <span className="text-3xl text-slate-400">Days to Birthday</span>
                        </div>

                        {zodiacSign && (
                            <div className="text-center p-8 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm">
                                <span className="block text-7xl font-bold text-violet-300 mb-2">
                                    {zodiacSign}
                                </span>
                                <span className="text-3xl text-slate-400">Zodiac Sign</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="relative z-10 text-center flex flex-col items-center">
                    <p className="text-3xl text-slate-500 mb-6">
                        Scan to discover yours
                    </p>

                    <div className="p-4 bg-white rounded-3xl shadow-2xl">
                        {/* @ts-ignore - qrcode.react types sometimes conflict in strict mode depending on version */}
                        <QRCodeSVG
                            value="https://ageinfo.online"
                            size={160}
                            level="H"
                            fgColor="#020617"
                            bgColor="#ffffff"
                        />
                    </div>
                </div>
            </div>
        );
    }
);

ShareTemplate.displayName = "ShareTemplate";
