/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        // Data Intake
        const name = searchParams.get('name') || 'Traveler';
        const ageYear = searchParams.get('ageYear') || '0';
        const ageDays = searchParams.get('ageDays') || '0 Days';
        const weton = searchParams.get('weton') || '';

        // Font Loading
        const interBold = await fetch(
            new URL('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff')
        ).then((res) => res.arrayBuffer());

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        backgroundColor: '#020617', // fallback
                        backgroundImage: 'linear-gradient(to bottom right, #020617, #1e1b4b)',
                        padding: '60px',
                        fontFamily: 'Inter',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {/* Background Noise Texture (Simulated with radial gradients as noise images can be tricky in OG) */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '-50%',
                            right: '-50%',
                            width: '100%',
                            height: '100%',
                            backgroundImage: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
                            transform: 'scale(1.5)',
                        }}
                    />

                    {/* Branding */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        {/* Logo Icon Placeholder */}
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                                borderRadius: '10px',
                            }}
                        />
                        <div style={{ fontSize: 24, fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>Ageinfo</div>
                    </div>

                    {/* Main Content */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 10 }}>
                        <div
                            style={{
                                fontSize: 96,
                                fontWeight: 900,
                                color: 'white',
                                lineHeight: 0.9,
                                letterSpacing: '-0.05em',
                                textShadow: '0 0 40px rgba(99, 102, 241, 0.4)',
                            }}
                        >
                            {ageDays}
                        </div>
                        <div style={{ fontSize: 32, fontWeight: 500, color: '#94a3b8' }}>
                            {name} is {ageYear} Years Old.
                        </div>
                    </div>

                    {/* Cultural Accent Badge */}
                    {weton && (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '16px 32px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '50px',
                                gap: '12px',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            <div style={{ fontSize: 24 }}>⭐</div>
                            <div
                                style={{
                                    fontSize: 24,
                                    fontWeight: 600,
                                    color: '#fbbf24', // Amber-400
                                    letterSpacing: '0.02em',
                                }}
                            >
                                {weton}
                            </div>
                        </div>
                    )}
                </div>
            ),
            {
                width: 1200,
                height: 630,
                fonts: [
                    {
                        name: 'Inter',
                        data: interBold,
                        style: 'normal',
                        weight: 700,
                    },
                ],
            },
        );
    } catch (e: any) {
        console.error(e.message);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
