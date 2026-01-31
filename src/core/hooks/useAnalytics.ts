"use client";

import { usePostHog } from 'posthog-js/react';

export const useAnalytics = () => {
    const posthog = usePostHog();

    const trackEvent = (eventName: string, properties?: Record<string, any>) => {
        if (posthog) {
            posthog.capture(eventName, properties);
        } else {
            // Fallback for dev/blocked envs
            console.log(`[Analytics] ${eventName}`, properties);
        }
    };

    return {
        trackCalculation: () => trackEvent('calculation_performed'),
        trackFeatureInteraction: (featureName: string) => trackEvent('feature_interaction', { feature: featureName }),
        trackShare: (platform: string) => trackEvent('share_action', { platform }),
        trackFeedback: (score: number) => trackEvent('nps_feedback', { score }),
    };
};
