"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/core/utils";

interface SmartDateInputProps {
    value?: string; // YYYY-MM-DD format
    onChange: (date: string) => void;
    className?: string;
}

export function SmartDateInput({ value, onChange, className }: SmartDateInputProps) {
    // Split initial value if present
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const dayRef = useRef<HTMLInputElement>(null);
    const monthRef = useRef<HTMLInputElement>(null);
    const yearRef = useRef<HTMLInputElement>(null);

    // Sync external value
    useEffect(() => {
        if (value) {
            const [y, m, d] = value.split("-");
            if (y && m && d) {
                setYear(y);
                setMonth(m);
                setDay(d);
            }
        }
    }, [value]);

    const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, "");
        if (val.length > 2) val = val.slice(0, 2);

        setDay(val);

        if (val.length === 2 && monthRef.current) {
            monthRef.current.focus();
        }

        updateParent(val, month, year);
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, "");
        if (val.length > 2) val = val.slice(0, 2);

        setMonth(val);

        if (val.length === 2 && yearRef.current) {
            yearRef.current.focus();
        }

        updateParent(day, val, year);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, "");
        if (val.length > 4) val = val.slice(0, 4);

        setYear(val);
        updateParent(day, month, val);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: "day" | "month" | "year") => {
        if (e.key === "Backspace" && !e.currentTarget.value) {
            if (field === "month" && dayRef.current) dayRef.current.focus();
            if (field === "year" && monthRef.current) monthRef.current.focus();
        }
    };

    const updateParent = (d: string, m: string, y: string) => {
        if (d.length === 2 && m.length === 2 && y.length === 4) {
            onChange(`${y}-${m}-${d}`);
        } else {
            onChange(""); // Incomplete
        }
    };

    return (
        <div className={cn("flex flex-col gap-2", className)}>
            <label className="text-sm font-medium text-slate-400 uppercase tracking-wider ml-1">
                Date of Birth
            </label>
            <div className="flex gap-4">
                <div className="flex-1 relative group">
                    <input
                        ref={dayRef}
                        type="text"
                        inputMode="numeric"
                        placeholder="DD"
                        value={day}
                        onChange={handleDayChange}
                        onKeyDown={(e) => handleKeyDown(e, "day")}
                        className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-4 py-4 text-center text-2xl font-bold text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                    />
                    <span className="absolute -bottom-6 left-0 w-full text-center text-xs text-slate-500 font-medium opacity-0 group-focus-within:opacity-100 transition-opacity">Day</span>
                </div>

                <div className="flex-1 relative group">
                    <input
                        ref={monthRef}
                        type="text"
                        inputMode="numeric"
                        placeholder="MM"
                        value={month}
                        onChange={handleMonthChange}
                        onKeyDown={(e) => handleKeyDown(e, "month")}
                        className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-4 py-4 text-center text-2xl font-bold text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                    />
                    <span className="absolute -bottom-6 left-0 w-full text-center text-xs text-slate-500 font-medium opacity-0 group-focus-within:opacity-100 transition-opacity">Month</span>
                </div>

                <div className="flex-[1.5] relative group">
                    <input
                        ref={yearRef}
                        type="text"
                        inputMode="numeric"
                        placeholder="YYYY"
                        value={year}
                        onChange={handleYearChange}
                        onKeyDown={(e) => handleKeyDown(e, "year")}
                        className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-4 py-4 text-center text-2xl font-bold text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                    />
                    <span className="absolute -bottom-6 left-0 w-full text-center text-xs text-slate-500 font-medium opacity-0 group-focus-within:opacity-100 transition-opacity">Year</span>
                </div>
            </div>
        </div>
    );
}
