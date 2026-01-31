/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['images.unsplash.com'], // Allow Unsplash for demo images
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
    compress: true, // Enable Brotli compression (default, but explicit)
    async headers() {
        // Content Security Policy
        // Note: For dynamic nonces in Next.js 14+ (App Router), it is recommended to 
        // implement CSP in middleware.ts. This static config provides the production-grade base.
        const cspHeader = `
            default-src 'self';
            script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://va.vercel-scripts.com https://us.i.posthog.com https://assets.us.i.posthog.com https://fundingchoicesmessages.google.com https://tpc.googlesyndication.com;
            style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fundingchoicesmessages.google.com;
            img-src 'self' data: blob: https://pagead2.googlesyndication.com https://images.unsplash.com https://us.i.posthog.com https://fundingchoicesmessages.google.com https://googleads.g.doubleclick.net https://www.google-analytics.com;
            font-src 'self' https://fonts.gstatic.com data:;
            connect-src 'self' https://pagead2.googlesyndication.com https://us.i.posthog.com https://app.posthog.com https://fundingchoicesmessages.google.com https://vitals.vercel-analytics.com https://*.sentry.io;
            frame-src 'self' https://googleads.g.doubleclick.net https://fundingchoicesmessages.google.com https://pagead2.googlesyndication.com;
            object-src 'none';
            base-uri 'self';
            form-action 'self';
            frame-ancestors 'none';
            block-all-mixed-content;
            upgrade-insecure-requests;
        `.replace(/\s{2,}/g, ' ').trim();

        return [
            {
                source: '/:all*(svg|jpg|png|webp|avif|mp4|webm|woff2)',
                locale: false,
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    }
                ],
            },
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin'
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: cspHeader
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block'
                    },
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    }
                ]
            }
        ];
    }
};

const withNextIntl = require('next-intl/plugin')();
const { withSentryConfig } = require('@sentry/nextjs');

const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
});

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

// Helper to chain plugins
const finalConfig = withBundleAnalyzer(withPWA(withNextIntl(nextConfig)));

module.exports = withSentryConfig(
    finalConfig,
    {
        // For all available options, see:
        // https://github.com/getsentry/sentry-webpack-plugin#options

        // Suppresses source map uploading logs during build
        silent: true,
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
    },
    {
        // For all available options, see:
        // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

        // Upload a larger set of source maps for prettier stack traces (increases build time)
        widenClientFileUpload: true,

        // Transpiles SDK to be compatible with IE11 (increases bundle size)
        transpileClientSDK: true,

        // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers
        tunnelRoute: "/monitoring",

        // Hides source maps from generated client bundles
        hideSourceMaps: true,

        // Automatically tree-shake Sentry stuff from the bundle - the following options are fully optional
        disableLogger: true,
    }
);
