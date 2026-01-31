"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { CalendarIcon, Clock, Info, LucideIcon } from "lucide-react";
import { isFuture, differenceInYears } from "date-fns";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface NeoInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: LucideIcon;
}

export function NeoInput({ label, className, onChange, icon: Icon, ...props }: NeoInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [validationMsg, setValidationMsg] = useState<string | null>(null);

    // Determine icon
    const DisplayIcon = Icon || (props.type === "time" ? Clock : CalendarIcon);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateStr = e.target.value;
        const date = new Date(dateStr);

        if (dateStr) {
            if (isFuture(date)) {
                setValidationMsg("Are you a time traveler from the future? 🚀");
            } else if (differenceInYears(new Date(), date) > 120) {
                setValidationMsg("That's quite a legacy! More than 120 years? 📜");
            } else {
                setValidationMsg(null);
            }
        } else {
            setValidationMsg(null);
        }

        if (onChange) onChange(e);
    };

    return (
        <TooltipProvider>
            <Tooltip open={!!validationMsg}>
                <TooltipTrigger asChild>
                    <div className={cn("relative group", className)}>
                        <div
                            className={cn(
                                "absolute -inset-0.5 bg-primary-gradient rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500",
                                isFocused ? "opacity-75" : ""
                            )}
                        />
                        <div className={cn(
                            "relative flex items-center bg-slate-950 rounded-xl p-4 glass border transition-colors duration-300",
                            validationMsg ? "border-yellow-500/50" : "border-slate-800/50"
                        )}>
                            <DisplayIcon className={cn("w-5 h-5 mr-3 transition-colors", validationMsg ? "text-yellow-500" : "text-indigo-400")} />

                            <div className="flex-1 flex flex-col justify-center">
                                <label
                                    htmlFor={props.id || label}
                                    className="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider"
                                >
                                    {label}
                                </label>
                                <input
                                    id={props.id || label}
                                    type="date"
                                    inputMode="numeric"
                                    pattern="\d{4}-\d{2}-\d{2}"
                                    className="bg-transparent text-slate-200 placeholder-slate-600 w-full font-mono text-lg p-0 [color-scheme:dark] touch-target focus-ring rounded-sm"
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    onChange={handleDateChange}
                                    aria-invalid={!!validationMsg}
                                    {...props}
                                />
                            </div>
                            {validationMsg && <Info className="w-4 h-4 text-yellow-500 animate-pulse ml-2" />}
                        </div>
                    </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-yellow-500/10 border-yellow-500/20 text-yellow-200">
                    <p>{validationMsg}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
