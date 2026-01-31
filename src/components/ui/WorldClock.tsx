"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function WorldClock() {
    const [population, setPopulation] = useState(8100000000);

    useEffect(() => {
        // Approximate growth rate ~2.5 people per second
        const interval = setInterval(() => {
            setPopulation(prev => prev + Math.floor(Math.random() * 3));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute top-20 left-0 right-0 flex justify-center opacity-20 pointer-events-none select-none overflow-hidden">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="text-[10rem] font-bold text-slate-800 whitespace-nowrap blur-sm"
            >
                {population.toLocaleString()}
            </motion.div>
        </div>
    );
}
