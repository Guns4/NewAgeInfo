"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCcw, AlertTriangle } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex h-[80vh] w-full flex-col items-center justify-center space-y-8 text-center px-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative"
            >
                <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />
                <div className="relative bg-slate-900/50 backdrop-blur-xl border border-red-500/30 p-8 rounded-3xl shadow-2xl space-y-6 max-w-md mx-auto">
                    <div className="flex justify-center">
                        <div className="p-4 bg-red-500/10 rounded-full">
                            <AlertTriangle className="w-12 h-12 text-red-400" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold text-white leading-tight">
                            Time Has Stopped
                        </h2>
                        <p className="text-slate-400">
                            "Waktu sedang berhenti sejenak, kami akan segera memperbaikinya."
                        </p>
                        <p className="text-xs text-slate-600 font-mono pt-4">
                            Error Code: {error.digest || "UNKNOWN_ANOMALY"}
                        </p>
                    </div>

                    <div className="pt-4 flex justify-center">
                        <MagneticButton
                            onClick={reset}
                            className="bg-red-600 hover:bg-red-500 text-white font-semibold py-3 px-8 rounded-full flex items-center gap-2 transition-all shadow-lg shadow-red-900/20"
                        >
                            <RefreshCcw className="w-4 h-4" />
                            Restart Universe
                        </MagneticButton>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
