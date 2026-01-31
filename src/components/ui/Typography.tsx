import React from "react";

export function Typography() {
    return (
        <div className="container mx-auto p-8 space-y-12">
            <div className="space-y-4">
                <h1 className="text-fluid-h1 font-bold tracking-tight-headings">
                    Fluid H1: The Quick Brown Fox
                </h1>
                <p className="text-sm text-slate-400">Desktop: 64px | Mobile: 36px</p>
            </div>

            <div className="space-y-4">
                <h2 className="text-fluid-h2 font-bold tracking-tight-headings">
                    Fluid H2: Jumps Over The Lazy Dog
                </h2>
                <p className="text-sm text-slate-400">Desktop: 48px | Mobile: 30px</p>
            </div>

            <div className="space-y-4">
                <h3 className="text-fluid-h3 font-semibold tracking-tight-headings">
                    Fluid H3: Design Systems Are Beautiful
                </h3>
                <p className="text-sm text-slate-400">Desktop: 36px | Mobile: 24px</p>
            </div>

            <div className="space-y-4 max-w-prose">
                <p className="text-fluid-base leading-relaxed text-slate-300">
                    Fluid Base: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
                <p className="text-sm text-slate-400">Desktop: 18px | Mobile: 16px</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-surface-1 p-8 rounded-xl-plus border border-slate-800">
                    <p className="text-white">Surface 1 (Base)</p>
                </div>
                <div className="bg-surface-2 p-8 rounded-xl-plus border border-slate-700/50">
                    <p className="text-white">Surface 2 (Card)</p>
                </div>
                <div className="bg-surface-3 p-8 rounded-xl-plus border border-slate-600/50">
                    <p className="text-white">Surface 3 (Hover/Elevated)</p>
                </div>
            </div>
        </div>
    );
}
