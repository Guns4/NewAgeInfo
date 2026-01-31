"use client";

import { useCallback, useState } from 'react';
import { toPng } from 'html-to-image';

/**
 * PHASE 65: Poster Generation Logic
 * Features Scale 3 (3x resolution) for high-end printing & retina screens.
 */
export function usePosterGenerator() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generate = useCallback(async (elementId: string, fileName: string = 'ageinfo-poster') => {
        const element = document.getElementById(elementId);
        if (!element) {
            setError('Target element not found');
            return;
        }

        setIsGenerating(true);
        setError(null);

        try {
            // Options for High-Res Output
            const options = {
                pixelRatio: 3, // 3x Scaling for crisp typography
                skipFonts: false,
                cacheBust: true,
                canvasWidth: 1080, // Enforce Story Width
                canvasHeight: 1920, // Enforce Story Height
                style: {
                    // Ensure the element is rendered in a clean state
                    visibility: 'visible',
                    display: 'flex',
                    position: 'static',
                    transform: 'none'
                }
            };

            // Wait a bit for fonts/images to be fully ready
            await new Promise(resolve => setTimeout(resolve, 500));

            const dataUrl = await toPng(element, options);

            // Trigger Download
            const link = document.createElement('a');
            link.download = `${fileName}-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();

            setIsGenerating(false);
        } catch (err) {
            console.error('Poster Generation Failed:', err);
            setError('Failed to generate high-res image');
            setIsGenerating(false);
        }
    }, []);

    return { generate, isGenerating, error };
}
