"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveDown } from "lucide-react";

interface BottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

export function BottomSheet({ isOpen, onClose, children, title }: BottomSheetProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 lg:hidden"
                    />

                    {/* Sheet */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 bg-surface-2 border-t border-white/10 rounded-t-2xl-plus z-50 lg:hidden max-h-[85vh] overflow-y-auto"
                        drag="y"
                        dragConstraints={{ top: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(_, info) => {
                            if (info.offset.y > 100) onClose();
                        }}
                    >
                        <div className="sticky top-0 left-0 right-0 bg-surface-2/80 backdrop-blur-md pt-3 pb-4 px-6 border-b border-white/5 z-10 flex flex-col items-center">
                            {/* Drag Handle */}
                            <div className="w-12 h-1.5 bg-slate-700/50 rounded-full mb-4" />

                            {title && (
                                <div className="w-full flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-white">{title}</h3>
                                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-white">
                                        <MoveDown size={20} />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="p-6 pb-12 safe-area-bottom">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
