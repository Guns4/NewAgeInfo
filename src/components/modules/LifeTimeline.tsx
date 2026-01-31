"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { TIMELINE_EVENTS } from "@/core/constants/timeline-events";
import { cn } from "@/lib/utils";
import { Cpu, Globe, BookOpen } from "lucide-react";

interface LifeTimelineProps {
    birthYear: number;
}

export function LifeTimeline({ birthYear }: LifeTimelineProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Filter events from birth year onwards
    const events = TIMELINE_EVENTS.filter(e => e.year >= birthYear).sort((a, b) => a.year - b.year);

    if (events.length === 0) return null;

    return (
        <section ref={containerRef} className="relative w-full py-20 overflow-hidden">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-500">
                Your Era in History
            </h2>

            {/* Vertical Line Container */}
            <div className="absolute left-8 md:left-1/2 top-32 bottom-0 w-0.5 bg-slate-800 transform md:-translate-x-1/2">
                <motion.div
                    className="absolute top-0 left-0 right-0 origin-top bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"
                    style={{ scaleY, height: "100%" }}
                />
            </div>

            <div className="relative container mx-auto px-4 max-w-5xl">
                {events.map((event, index) => (
                    <TimelineNode
                        key={event.year}
                        event={event}
                        index={index}
                        isLast={index === events.length - 1}
                    />
                ))}
            </div>
        </section>
    );
}

const TimelineNode = ({ event, index, isLast }: { event: any, index: number, isLast: boolean }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isEven = index % 2 === 0;

    const Icon = {
        'Tech': Cpu,
        'History': Globe,
        'Culture': BookOpen
    }[event.category as string] || Globe;

    return (
        <div className={cn(
            "relative flex items-center mb-12 md:mb-24 last:mb-0",
            isEven ? "md:justify-end" : "md:justify-start"
        )}>
            {/* Timeline Dot (Mobile: Left, Desktop: Center) */}
            <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-slate-950 border-2 border-slate-700 transform -translate-x-1/2 z-10 md:group-hover:scale-150 transition-transform">
                <div className="absolute inset-0 bg-white rounded-full opacity-0 hover:opacity-100 transition-opacity animate-ping" />
            </div>

            {/* Content Card */}
            <motion.div
                initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={cn(
                    "relative ml-16 md:ml-0 md:w-[45%] p-6 rounded-2xl border border-white/5 bg-slate-900/40 hover:bg-slate-800/40 backdrop-blur-sm transition-all cursor-pointer group hover:border-white/20 hover:shadow-2xl hover:shadow-indigo-500/10",
                    isEven ? "md:text-right md:mr-12" : "md:text-left md:ml-12"
                )}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {/* Connector Line (Desktop Only logic usually, but simplified here) */}

                <div className={cn(
                    "flex items-center gap-3 mb-2",
                    isEven ? "md:flex-row-reverse" : "md:flex-row"
                )}>
                    <span className="text-sm font-mono text-indigo-400 font-bold tracking-wider">
                        {event.year}
                    </span>
                    <Icon className="w-4 h-4 text-slate-500 group-hover:text-indigo-300 transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-slate-100 mb-1 group-hover:text-white transition-colors">
                    {event.title}
                </h3>

                <motion.div
                    animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0.6 }}
                    className="overflow-hidden text-slate-400 text-sm leading-relaxed"
                >
                    <p className={cn("pt-2", !isExpanded && "line-clamp-2 md:line-clamp-none")}>
                        {event.description}
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}

