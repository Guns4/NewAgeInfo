import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
    locales: ['en', 'id'],
    defaultLocale: 'en',
    localePrefix: 'always'
});

export default function middleware(request: NextRequest) {
    // 1. Generate Nonce for CSP
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

    // 2. Handle Localization
    const response = intlMiddleware(request);

    // 3. Apply Dynamic Nonce to CSP Header
    // This upgrades the static CSP from next.config.js to a strict nonce-based policy
    const cspHeader = response.headers.get('Content-Security-Policy');
    if (cspHeader) {
        const secureCsp = cspHeader
            .replace("'unsafe-inline'", `'nonce-${nonce}'`)
            .replace("script-src", `script-src 'nonce-${nonce}'`);
        response.headers.set('Content-Security-Policy', secureCsp);
    }

    // Set nonce in header for server components to read if needed
    response.headers.set('x-nonce', nonce);

    return response;
}

export const config = {
    // Match both i18n routes and general pages
    matcher: ['/', '/(id|en)/:path*', '/((?!api|_next/static|_next/image|favicon.ico).*)']
};

// Note: Real rate limiting should be done at the edge (Vercel KV/Upstash) or separate middleware
// This file primarily handles i18n routing in this setup.

/**
 * Note: Middleware in Next.js 14+ with next-intl handles localization.
 * Caching headers are often better served via next.config.js headers()
 * or on specific API routes. However, we can modify the response here if needed.
 * For now, we rely on Vercel's default Edge caching and next.config.js headers.
 * 
 * If we needed to enforce heavy caching on static assets served through here:
 * (But static assets usually bypass middleware due to matcher exclusion)
 */
