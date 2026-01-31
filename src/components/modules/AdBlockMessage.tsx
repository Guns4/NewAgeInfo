"use client";

import React, { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { HeartHandshake } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AdBlockMessage() {
    const [isBlocked, setIsBlocked] = useState(false);

    useEffect(() => {
        // Simple check: try to fetch a known ad script or check if window.adsbygoogle is blocked
        // A more robust way is checking the height of an ad container.
        // For this demo, we can simulate or check a dummy ad request.

        const checkAdBlock = async () => {
            try {
                // Try to fetch a generic ad script URL that blockers usually kill
                await fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', {
                    method: 'HEAD',
                    mode: 'no-cors'
                });
                // If successful (or opaque response), likely not blocked network-wise.
                // But element hiding is harder to detect without a real ad slot.
                // We'll skip complex detection for now and assume false unless verified.
            } catch (error) {
                // Network error likely means blocked
                setIsBlocked(true);
            }
        };

        checkAdBlock();
    }, []);

    // Manual override for demo purposes: 
    // If you want to force test this, set setIsBlocked(true)

    if (!isBlocked) return null;

    return (
        <div className="w-full my-6">
            <GlassCard className="p-4 bg-indigo-900/20 border-indigo-500/30 flex items-center gap-4">
                <div className="p-3 bg-indigo-500/20 rounded-full shrink-0">
                    <HeartHandshake className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                    <h4 className="font-bold text-indigo-200">Support Free Magic</h4>
                    <p className="text-sm text-slate-400">
                        We noticed you're using an AdBlocker. Ageinfo is free because of our sponsors.
                        Please consider whitelisting us to keep the stars aligned! ✨
                    </p>
                </div>
            </GlassCard>
        </div>
    );
}
