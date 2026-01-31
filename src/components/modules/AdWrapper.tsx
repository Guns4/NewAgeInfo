"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/core/utils";

interface AdWrapperProps {
    slotId: string;
    format?: "auto" | "fluid" | "rectangle";
    className?: string;
    style?: React.CSSProperties;
}

export function AdWrapper({ slotId, format = "auto", className, style }: AdWrapperProps) {
    const adRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" } // Load 200px before viewport
        );

        if (adRef.current) {
            observer.observe(adRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isVisible) {
            try {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                setIsFilled(true);
            } catch (err) {
                console.error("AdSense error:", err);
            }
        }
    }, [isVisible]);

    return (
        <div
            ref={adRef}
            className={cn("w-full flex justify-center items-center overflow-hidden min-h-[100px] bg-slate-900/20 rounded-lg", className)}
            style={style}
        >
            {isVisible ? (
                <ins
                    className="adsbygoogle"
                    style={{ display: "block", width: "100%" }}
                    data-ad-client="ca-pub-5099892029462046"
                    data-ad-slot={slotId}
                    data-ad-format={format}
                    data-full-width-responsive="true"
                />
            ) : (
                <div className="text-slate-700 text-xs py-4">Advertisement</div>
            )}
        </div>
    );
}
