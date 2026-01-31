import { forwardRef } from 'react';

interface ShareCardProps {
    ageYears: number;
    secondsLived: number;
    distanceTraveled: number;
    zodiacSign?: string;
}

// 1200x630 (Facebook/Twitter OG Standard) or 1080x1080 (Instagram)
// We'll design for a versatile 1080x1350 (IG Portrait) or adaptable ratio
export const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(({ ageYears, secondsLived, distanceTraveled, zodiacSign }, ref) => {
    return (
        <div ref={ref} className="w-[1080px] h-[1080px] bg-slate-950 p-12 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950" />
            <div className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px]" />

            <div className="relative z-10 w-full h-full border border-white/10 rounded-[60px] bg-white/5 backdrop-blur-3xl flex flex-col items-center justify-between p-16 shadow-2xl">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-bold text-indigo-400 tracking-widest uppercase">My Cosmic Journey</h2>
                    <h1 className="text-9xl font-black text-white">{ageYears} <span className="text-6xl text-slate-400 font-bold">years</span></h1>
                </div>

                {/* Core Stats */}
                <div className="w-full space-y-12">
                    <div className="bg-slate-900/50 p-10 rounded-3xl border border-white/5">
                        <p className="text-3xl text-slate-400 font-medium mb-2 uppercase tracking-wider">Seconds Alive</p>
                        <p className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300">{secondsLived.toLocaleString()}</p>
                    </div>

                    <div className="bg-slate-900/50 p-10 rounded-3xl border border-white/5">
                        <p className="text-3xl text-slate-400 font-medium mb-2 uppercase tracking-wider">Distance Traveled</p>
                        <p className="text-7xl font-bold text-amber-300">{distanceTraveled.toLocaleString()} <span className="text-4xl text-amber-500/80">km</span></p>
                    </div>
                </div>

                {/* Footer */}
                <div className="w-full flex items-center justify-between mt-8 border-t border-white/10 pt-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">AI</div>
                        <div>
                            <p className="text-3xl font-bold text-white">Ageinfo</p>
                            <p className="text-xl text-slate-400">ageinfo.online</p>
                        </div>
                    </div>
                    {zodiacSign && (
                        <div className="px-8 py-3 bg-white/10 rounded-full border border-white/10 text-2xl text-white font-medium">
                            {zodiacSign}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

ShareCard.displayName = "ShareCard";
