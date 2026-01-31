"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { differenceInWeeks, addWeeks, format } from "date-fns";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientHeading } from "@/components/ui/GradientHeading";

interface LifeGridProps {
    birthDate: Date;
    lifeExpectancyYears?: number;
}

interface HoverData {
    x: number;
    y: number;
    weekIndex: number;
    dateRange: string;
}

export function LifeGrid({ birthDate, lifeExpectancyYears = 80 }: LifeGridProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoverData, setHoverData] = useState<HoverData | null>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Constants
    const GAP = 3;
    const DOT_SIZE = 6;
    const COLS_DESKTOP = 52; // 1 year per row
    const COLS_MOBILE = 26; // 6 months per row

    // Derived Data
    const { totalWeeks, weeksLived, currentWeekIndex } = useMemo(() => {
        if (!birthDate) return { totalWeeks: 0, weeksLived: 0, currentWeekIndex: -1 };

        const now = new Date();
        const lived = differenceInWeeks(now, birthDate);
        const total = Math.floor(lifeExpectancyYears * 52.1775);

        return {
            totalWeeks: total,
            weeksLived: lived,
            currentWeekIndex: lived,
        };
    }, [birthDate, lifeExpectancyYears]);

    // Handle Resize
    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight // Will be dynamic based on rows
                });
            }
        };

        window.addEventListener('resize', updateSize);
        updateSize();

        return () => window.removeEventListener('resize', updateSize);
    }, []);

    // Canvas Drawing
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || totalWeeks === 0 || dimensions.width === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Determine Columns based on width
        const isMobile = dimensions.width < 768;
        const cols = isMobile ? COLS_MOBILE : COLS_DESKTOP;

        // Calculate Grid
        // Ensure dot size fits or adjust gap? 
        // Strategy: Fixed Dot Size, dynamic container height.
        // Actually, let's fit width exactly.
        const totalGapWidth = (cols - 1) * GAP;
        const availableWidth = dimensions.width - totalGapWidth;
        const calculatedDotSize = Math.floor(availableWidth / cols);
        const finalDotSize = Math.max(2, calculatedDotSize); // clamp min size

        const rows = Math.ceil(totalWeeks / cols);
        const height = (rows * finalDotSize) + ((rows - 1) * GAP);

        // Resize Canvas for Retina
        const dpr = window.devicePixelRatio || 1;
        canvas.width = dimensions.width * dpr;
        canvas.height = height * dpr;
        canvas.style.height = `${height}px`;

        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, dimensions.width, height);

        // Drawing Loop
        // Passed Color: Indigo-500 (#6366f1)
        // Future Color: Slate-800 (#1e293b)

        for (let i = 0; i < totalWeeks; i++) {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const x = col * (finalDotSize + GAP);
            const y = row * (finalDotSize + GAP);

            if (i < weeksLived) {
                ctx.fillStyle = "#6366f1"; // Passed
                ctx.fillRect(x, y, finalDotSize, finalDotSize);
            } else if (i === currentWeekIndex) {
                // Skip current week on canvas, we render it with DOM for pulse
            } else {
                ctx.fillStyle = "#1e293b"; // Future (Slate-800)
                // ctx.strokeStyle = "#334155"; // Border only for future?
                // ctx.strokeRect(x, y, finalDotSize, finalDotSize);
                // Fill looks cleaner at small scales
                ctx.fillRect(x, y, finalDotSize, finalDotSize);
            }
        }
    }, [dimensions.width, totalWeeks, weeksLived, currentWeekIndex]);

    // Coordinates for Pulse Overlay
    const pulseStyle = useMemo(() => {
        if (dimensions.width === 0) return { display: 'none' };

        const isMobile = dimensions.width < 768;
        const cols = isMobile ? COLS_MOBILE : COLS_DESKTOP;
        const totalGapWidth = (cols - 1) * GAP;
        const availableWidth = dimensions.width - totalGapWidth;
        const finalDotSize = Math.max(2, Math.floor(availableWidth / cols));

        const col = currentWeekIndex % cols;
        const row = Math.floor(currentWeekIndex / cols);
        const x = col * (finalDotSize + GAP);
        const y = row * (finalDotSize + GAP);

        return {
            left: `${x}px`,
            top: `${y}px`,
            width: `${finalDotSize}px`,
            height: `${finalDotSize}px`
        };
    }, [dimensions.width, currentWeekIndex]);

    // Interaction Handler
    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        const isMobile = dimensions.width < 768;
        const cols = isMobile ? COLS_MOBILE : COLS_DESKTOP;
        const totalGapWidth = (cols - 1) * GAP;
        const availableWidth = dimensions.width - totalGapWidth;
        const finalDotSize = Math.max(2, Math.floor(availableWidth / cols));
        const cellSize = finalDotSize + GAP;

        const col = Math.floor(offsetX / cellSize);
        const row = Math.floor(offsetY / cellSize);

        // Boundary Check
        if (col >= cols) return;

        const index = (row * cols) + col;

        if (index >= 0 && index < totalWeeks) {
            const startDate = addWeeks(birthDate, index);
            const endDate = addWeeks(startDate, 1);
            const dateStr = `${format(startDate, "MMM d")} - ${format(endDate, "MMM d, 'yy")}`;

            setHoverData({
                x: e.clientX,
                y: e.clientY, // Tooltip follows mouse
                weekIndex: index,
                dateRange: dateStr
            });
        } else {
            setHoverData(null);
        }
    };

    const percentage = ((weeksLived / totalWeeks) * 100).toFixed(1);

    if (!birthDate) return null;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <GradientHeading as="h2" className="text-2xl md:text-3xl">
                        Your Life in Weeks
                    </GradientHeading>
                    <p className="text-slate-400 mt-2 text-sm max-w-lg">
                        Each dot is a week.
                        <span className="text-indigo-400 font-bold mx-1">{totalWeeks.toLocaleString()}</span> weeks in an 80-year life.
                    </p>
                </div>

                <GlassCard className="px-4 py-2 border-slate-800/50 bg-slate-900/50">
                    <div className="text-right">
                        <span className="text-xl font-bold text-white">{weeksLived.toLocaleString()}</span>
                        <span className="text-slate-500 text-sm mx-1">lived</span>
                        <div className="text-xs text-indigo-400 font-medium mt-1">
                            {percentage}% completed
                        </div>
                    </div>
                </GlassCard>
            </div>

            <GlassCard className="p-4 md:p-6 relative">
                <div ref={containerRef} className="w-full relative min-h-[500px]">
                    <canvas
                        ref={canvasRef}
                        className="block w-full cursor-crosshair"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => setHoverData(null)}
                    />

                    {/* Hybrid Pulse Overlay */}
                    <div
                        className="absolute bg-white rounded-[1px] shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] animate-pulse-slow z-10 pointer-events-none"
                        style={pulseStyle}
                    />

                    {/* Custom Tooltip Overlay */}
                    {hoverData && (
                        <div
                            className="fixed z-50 pointer-events-none px-3 py-2 bg-slate-900/90 backdrop-blur-md border border-slate-700/50 rounded-lg shadow-xl text-xs text-white transform -translate-x-1/2 -translate-y-full mt-[-10px]"
                            style={{
                                left: hoverData.x,
                                top: hoverData.y
                            }}
                        >
                            <p className="font-bold text-indigo-300">Week {hoverData.weekIndex + 1}</p>
                            <p className="text-slate-400">{hoverData.dateRange}</p>
                        </div>
                    )}
                </div>
            </GlassCard>
        </div>
    );
}
