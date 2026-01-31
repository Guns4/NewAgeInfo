"use client";

import { useCallback, useState, useRef } from 'react';
import { toPng } from 'html-to-image';

/**
 * PHASE 66: Poster Engine Stress Test & Optimization
 * Features:
 * - Sequential execution lock (防止并发渲染)
 * - Memory cleanup (Blob URL revocation)
 * - Thread yielding (setTimeout 0)
 */
export function usePosterGenerator() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const isLocked = useRef(false);

    const generate = useCallback(async (elementId: string, fileName: string = 'ageinfo-poster') => {
        if (isLocked.current) {
            console.warn('Poster generation is already in progress...');
            return;
        }

        const element = document.getElementById(elementId);
        if (!element) {
            setError('Target element not found');
            return;
        }

        isLocked.current = true;
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
                    visibility: 'visible',
                    display: 'flex',
                    position: 'static',
                    transform: 'none'
                }
            };

            // Yield main thread to allow UI to update (spinner etc)
            await new Promise(resolve => setTimeout(resolve, 0));
            // Additional wait for fonts/images
            await new Promise(resolve => setTimeout(resolve, 500));

            // Generate high-res image
            const dataUrl = await toPng(element, options);

            // Memory Cleanup Optimization: Use Blob instead of massive base64 string
            const response = await fetch(dataUrl);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            // Trigger Download
            const link = document.createElement('a');
            link.download = `${fileName}-${Date.now()}.png`;
            link.href = blobUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Cleanup
            setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
            
            setIsGenerating(false);
        } catch (err) {
            console.error('Poster Generation Failed:', err);
            setError('Failed to generate high-res image');
            setIsGenerating(false);
        } finally {
            isLocked.current = false;
        }
    }, []);

    return { generate, isGenerating, error };
}
