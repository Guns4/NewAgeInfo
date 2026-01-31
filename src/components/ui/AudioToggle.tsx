"use client";

import { useSensory } from "@/core/providers/SensoryProvider";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export function AudioToggle() {
    const { isMuted, toggleMute, triggerHaptic } = useSensory();

    const handleToggle = () => {
        toggleMute();
        // Light notification on change
        triggerHaptic(10);
    };

    return (
        <button
            onClick={handleToggle}
            className="p-2 rounded-full hover:bg-white/10 transition-colors relative"
            title={isMuted ? "Unmute" : "Mute"}
        >
            <motion.div
                initial={false}
                animate={{ scale: isMuted ? 0.9 : 1 }}
                whileTap={{ scale: 0.8 }}
            >
                {isMuted ? (
                    <VolumeX className="w-5 h-5 text-slate-400" />
                ) : (
                    <Volume2 className="w-5 h-5 text-indigo-400" />
                )}
            </motion.div>
        </button>
    );
}
