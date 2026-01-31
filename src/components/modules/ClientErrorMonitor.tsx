"use client";

import { useEffect } from 'react';

/**
 * Placeholder for Sentry/LogRocket/PostHog error monitoring.
 * In production, you would replace the console.error with:
 * Sentry.captureException(event.error);
 */
export function ClientErrorMonitor() {
    useEffect(() => {
        const handleError = (event: ErrorEvent) => {
            // Filter out common noise
            if (event.message?.includes('ResizeObserver')) return;

            console.group('🚨 Client Error Caught');
            console.error(event.error);
            console.error('Message:', event.message);
            console.error('Filename:', event.filename);
            console.groupEnd();

            // Setup Real Monitoring Here:
            // if (window.LogRocket) window.LogRocket.captureException(event.error);
        };

        const handleRejection = (event: PromiseRejectionEvent) => {
            console.group('🚨 Unhandled Promise Rejection');
            console.error(event.reason);
            console.groupEnd();
        };

        window.addEventListener('error', handleError);
        window.addEventListener('unhandledrejection', handleRejection);

        return () => {
            window.removeEventListener('error', handleError);
            window.removeEventListener('unhandledrejection', handleRejection);
        };
    }, []);

    return null;
}
