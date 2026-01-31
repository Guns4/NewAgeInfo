import React, { useState } from "react";
import { Copy, Share2, Printer, Loader2, Check } from "lucide-react";
import { encodeDateStats } from '@/core/utils/url';
import { useAnalytics } from "@/core/hooks/useAnalytics";
import { MagneticButton } from "@/components/ui/MagneticButton";

interface ShareModuleProps {
    birthDate: Date;
    stats: {
        secondsLived: number;
        distanceTraveled: number;
    };
}

export function ShareModule({ birthDate, stats }: ShareModuleProps) {
    const [copied, setCopied] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const { trackShare } = useAnalytics();

    const magicCode = encodeDateStats(birthDate);
    const shareUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/r/${magicCode}`
        : `https://ageinfo.online/r/${magicCode}`;

    const handleCopy = () => {
        trackShare('clipboard');
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handlePrint = () => {
        setIsGenerating(true);
        setTimeout(() => {
            window.print();
            setIsGenerating(false);
        }, 800);
    };

    return (
        <div className="flex items-center gap-2">
            <MagneticButton
                onClick={handleCopy}
                aria-label="Copy shareable link"
                className="bg-slate-800/50 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-full text-sm backdrop-blur-md border border-white/10 flex items-center gap-2"
            >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy Link"}
            </MagneticButton>

            <MagneticButton
                onClick={handlePrint}
                disabled={isGenerating}
                aria-label="Print life manifesto"
                className="bg-slate-800/50 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-full text-sm backdrop-blur-md border border-white/10 flex items-center gap-2"
            >
                {isGenerating ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating...
                    </>
                ) : (
                    <>
                        <Printer className="w-4 h-4" />
                        Print Manifesto
                    </>
                )}
            </MagneticButton>

            <MagneticButton
                onClick={() => {
                    if (navigator.share) {
                        navigator.share({
                            title: 'Ageinfo',
                            text: `I have lived for ${stats.secondsLived.toLocaleString()} seconds! Check your cosmic age here:`,
                            url: shareUrl
                        });
                    } else {
                        handleCopy();
                    }
                }}
                aria-label="Share life progress"
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-full text-sm shadow-lg shadow-indigo-500/20 flex items-center gap-2"
            >
                <Share2 className="w-4 h-4" />
                Share
            </MagneticButton>
        </div>
    );
}
