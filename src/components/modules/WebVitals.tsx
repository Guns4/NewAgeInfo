"use client";

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
    useReportWebVitals((metric) => {
        // In a real production app, we would send this to Google Analytics or Vercel Analytics
        // For now, we log to console in development or meaningful environments to verify it works.
        if (process.env.NODE_ENV === 'development') {
            console.log('[Web Vitals]', metric);
        }

        // Example of sending to an analytics endpoint
        // const body = JSON.stringify(metric);
        // const url = 'https://example.com/analytics';
        // if (navigator.sendBeacon) {
        //   navigator.sendBeacon(url, body);
        // } else {
        //   fetch(url, { body, method: 'POST', keepalive: true });
        // }
    });

    return null;
}
