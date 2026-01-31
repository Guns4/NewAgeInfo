"use client";

import React from 'react';
import { getCulturalProfile } from '@/core/engines/cultural-engine';
import { Moon, Calendar } from 'lucide-react';

interface CulturalProfileCardProps {
    birthDate: Date;
}

export function CulturalProfileCard({ birthDate }: CulturalProfileCardProps) {
    const profile = getCulturalProfile(birthDate);

    return (
        <div className="h-full flex flex-col justify-between p-2">

            {/* Hijri Section */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-2">
                <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                    <Moon className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-1">Islamic (Hijri)</h4>
                    <p className="text-white font-medium text-lg leading-tight">
                        {profile.hijri.month} {profile.hijri.day}, {profile.hijri.year} AH
                    </p>
                </div>
            </div>

            {/* Weton Section */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400">
                    <Calendar className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-1">Javanese Weton</h4>
                    <p className="text-white font-medium text-lg leading-tight">
                        {profile.weton.full}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                        Pasaran: <span className="text-amber-200">{profile.weton.pasaran}</span>
                    </p>
                </div>
            </div>

            <div className="mt-4 text-[10px] text-slate-500 text-center uppercase tracking-widest opacity-60">
                Cultural Heritage
            </div>
        </div>
    );
}
