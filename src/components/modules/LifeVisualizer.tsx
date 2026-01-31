"use client";

import React, { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Activity, Moon, Coffee, Briefcase, Smile } from 'lucide-react';

interface LifeVisualizerProps {
    age: number; // Age in years
}

interface LifeData {
    name: string;
    value: number; // Years
    percentage: number;
    color: string;
    icon: any;
    message: string;
}

export function LifeVisualizer({ age }: LifeVisualizerProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const data: LifeData[] = useMemo(() => {
        // Stats: Sleep 33%, Work/Study 25%, Free 37%, Eat 5%
        const sleep = age * 0.33;
        const work = age * 0.25;
        const free = age * 0.37;
        const eat = age * 0.05;

        return [
            {
                name: 'Sleep & Dreams',
                value: sleep,
                percentage: 33,
                color: '#818cf8', // Indigo 400
                icon: Moon,
                message: `You have spent ~${sleep.toFixed(1)} years replenishing your mind in the dream world.`
            },
            {
                name: 'Work & Growth',
                value: work,
                percentage: 25,
                color: '#2dd4bf', // Teal 400
                icon: Briefcase,
                message: `Approximately ${work.toFixed(1)} years allocated to learning, building, and working.`
            },
            {
                name: 'Free Will',
                value: free,
                percentage: 37,
                color: '#f472b6', // Pink 400
                icon: Smile,
                message: `A massive ${free.toFixed(1)} years of freedom. How have you used this precious time?`
            },
            {
                name: 'Sustenance',
                value: eat,
                percentage: 5,
                color: '#fbbf24', // Amber 400
                icon: Coffee,
                message: `About ${eat.toFixed(1)} years spent eating and drinking.`
            },
        ];
    }, [age]);

    const activeItem = activeIndex !== null ? data[activeIndex] : null;

    return (
        <section className="w-full py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-900/50 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">

                {/* Left: Chart */}
                <div className="h-[300px] w-full relative group">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={110}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                                onMouseEnter={(_, index) => setActiveIndex(index)}
                                onMouseLeave={() => setActiveIndex(null)}
                                animationDuration={1500}
                                animationBegin={0}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                        className="transition-all duration-300 outline-none hover:opacity-80"
                                        style={{
                                            filter: activeIndex === index ? `drop-shadow(0 0 10px ${entry.color})` : 'none',
                                            transform: activeIndex === index ? 'scale(1.1)' : 'scale(1)',
                                            transformOrigin: 'center center'
                                        }}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return null; // Using custom legend instead
                                    }
                                    return null;
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-4xl font-bold text-white transition-all duration-300">
                            {activeItem ? `${activeItem.value.toFixed(1)}` : age.toFixed(1)}
                        </span>
                        <span className="text-xs text-slate-400 uppercase tracking-widest mt-1">
                            {activeItem ? "Years" : "Total Years"}
                        </span>
                    </div>
                </div>

                {/* Right: Interactive Legend / Details */}
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Activity className="w-5 h-5 text-indigo-400" />
                            <h2 className="text-sm font-medium text-slate-400 uppercase tracking-widest">
                                Life Pulse
                            </h2>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                            Where has the time gone?
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed min-h-[48px]">
                            {activeItem
                                ? activeItem.message
                                : "Hover over the chart segments to break down your existence."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {data.map((item, index) => {
                            const Icon = item.icon;
                            const isActive = activeIndex === index;
                            return (
                                <motion.div
                                    key={item.name}
                                    className={cn(
                                        "flex items-center justify-between p-3 rounded-xl border transition-all duration-300 cursor-default",
                                        isActive
                                            ? "bg-white/10 border-white/20 scale-[1.02]"
                                            : "bg-white/5 border-white/5 hover:bg-white/10"
                                    )}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onMouseLeave={() => setActiveIndex(null)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="p-2 rounded-lg"
                                            style={{ backgroundColor: `${item.color}20` }}
                                        >
                                            <Icon className="w-4 h-4" style={{ color: item.color }} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-slate-200">{item.name}</div>
                                            <div className="text-xs text-slate-500">{item.percentage}% of specific time</div>
                                        </div>
                                    </div>
                                    <div className="text-sm font-mono text-slate-300">
                                        {item.value.toFixed(1)}y
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
