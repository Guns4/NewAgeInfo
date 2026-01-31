"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Hourglass, Send, Archive } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { encryptMessage, decryptMessage } from '@/core/utils/crypto';
import { formatDistanceToNow } from 'date-fns';

interface TimeCapsuleProps {
    birthDate: Date;
}

interface CapsuleData {
    message: string;
    unlockDate: string; // ISO string
    createdAt: string;
}

export function TimeCapsule({ birthDate }: TimeCapsuleProps) {
    const [capsule, setCapsule] = useState<CapsuleData | null>(null);
    const [message, setMessage] = useState("");
    const [selectedMilestone, setSelectedMilestone] = useState("next_birthday");
    const [isClient, setIsClient] = useState(false);

    // Persistence Key
    const STORAGE_KEY = `ageinfo_capsule_${birthDate.toISOString().split('T')[0]}`;

    useEffect(() => {
        setIsClient(true);
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setCapsule(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load capsule", e);
            }
        }
    }, [STORAGE_KEY]);

    // Calculate Milestone Dates
    const now = new Date();
    const currentYear = now.getFullYear();

    // 1. Next Birthday
    const nextBirthday = new Date(birthDate);
    nextBirthday.setFullYear(currentYear);
    if (nextBirthday < now) nextBirthday.setFullYear(currentYear + 1);

    // 2. 1 Year from now (Generic milestone)
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(currentYear + 1);

    // 3. Next big round age (e.g. 30, 40) - simplified logic for demo
    // Or maybe just a fixed date for simplicity in UI selector

    const handleLock = () => {
        if (!message.trim()) return;

        const targetDate = selectedMilestone === 'next_birthday' ? nextBirthday : oneYearFromNow;

        // Encrypt
        const encrypted = encryptMessage(message, birthDate.toISOString());

        const newCapsule: CapsuleData = {
            message: encrypted,
            unlockDate: targetDate.toISOString(),
            createdAt: now.toISOString()
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(newCapsule));
        setCapsule(newCapsule);
        setMessage("");
    };

    const handleReset = () => {
        if (confirm("Are you sure you want to destroy this capsule?")) {
            localStorage.removeItem(STORAGE_KEY);
            setCapsule(null);
        }
    };

    if (!isClient) return null;

    const isLocked = capsule ? new Date(capsule.unlockDate) > now : false;

    return (
        <section className="py-12 px-4 md:px-0">
            <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-8 relative overflow-hidden backdrop-blur-sm">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 p-32 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">

                    {/* Left: Info */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                            <Archive className="w-4 h-4" />
                            Time Capsule
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white font-serif leading-tight">
                            Send a message to your <span className="text-indigo-400">future self</span>.
                        </h3>
                        <p className="text-slate-400 leading-relaxed">
                            Write a note, a prediction, or a hope. Lock it away until your next big milestone.
                            We'll keep it safe (and encrypted) on this device.
                        </p>
                    </div>

                    {/* Right: Interactive Area */}
                    <div className="bg-black/20 rounded-2xl p-6 border border-white/5 shadow-inner">
                        <AnimatePresence mode="wait">
                            {!capsule ? (
                                <motion.div
                                    key="create"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Dear future me..."
                                        className="w-full h-32 bg-transparent text-white placeholder:text-slate-600 resize-none border-none focus:ring-0 text-lg leading-relaxed p-0"
                                    />

                                    <div className="h-px w-full bg-white/10" />

                                    <div className="flex items-center justify-between pt-2">
                                        <select
                                            value={selectedMilestone}
                                            onChange={(e) => setSelectedMilestone(e.target.value)}
                                            className="bg-slate-800 text-slate-300 text-sm rounded-lg border-none focus:ring-1 focus:ring-indigo-500 py-2 pl-3 pr-8"
                                        >
                                            <option value="next_birthday">Opens: Current/Next Birthday</option>
                                            <option value="one_year">Opens: In 1 Year</option>
                                        </select>

                                        <MagneticButton
                                            onClick={handleLock}
                                            disabled={!message.trim()}
                                            className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            <Lock className="w-4 h-4" />
                                            Lock Capsule
                                        </MagneticButton>
                                    </div>
                                </motion.div>
                            ) : isLocked ? (
                                <motion.div
                                    key="locked"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-8 space-y-6"
                                >
                                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800 text-indigo-500 shadow-xl border border-white/5 relative">
                                        <div className="absolute inset-0 border border-indigo-500/30 rounded-full animate-ping opacity-20" />
                                        <Hourglass className="w-10 h-10 animate-pulse" />
                                    </div>

                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-2">Capsule Sealed</h4>
                                        <p className="text-slate-400 text-sm">
                                            Opens {formatDistanceToNow(new Date(capsule.unlockDate), { addSuffix: true })}.
                                        </p>
                                    </div>

                                    <button
                                        onClick={handleReset}
                                        className="text-xs text-rose-400 hover:text-rose-300 transition-colors underline decoration-rose-400/30 underline-offset-4"
                                    >
                                        Destroy Capsule
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="unlocked"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center gap-3 text-emerald-400 mb-4">
                                        <Unlock className="w-5 h-5" />
                                        <span className="font-bold text-sm tracking-widest uppercase">Capsule Unlocked</span>
                                    </div>

                                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                                        <p className="text-emerald-50 italic text-lg leading-relaxed">
                                            "{decryptMessage(capsule.message, birthDate.toISOString())}"
                                        </p>
                                        <div className="mt-4 text-xs text-emerald-400/60 font-mono">
                                            Written on {new Date(capsule.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>

                                    <MagneticButton
                                        onClick={handleReset}
                                        className="w-full bg-slate-800 text-white py-3 rounded-xl font-medium hover:bg-slate-700"
                                    >
                                        Write New Message
                                    </MagneticButton>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}
