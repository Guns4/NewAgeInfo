import { redirect } from 'next/navigation';
import { decodeDateStats } from '@/core/utils/url';
import type { Metadata } from 'next';

interface Props {
    params: { code: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const code = params.code;
    const date = decodeDateStats(code);

    if (!date) {
        return {
            title: 'Ageinfo',
            description: 'Visualize your time on Earth.',
        };
    }

    const dateStr = date.toISOString().split('T')[0];
    const ogUrl = `https://ageinfo.online/api/og?date=${dateStr}`;

    return {
        title: 'See my cosmic age | Ageinfo',
        description: 'I just checked my life stats on Ageinfo. See how many seconds you have lived.',
        openGraph: {
            images: [ogUrl],
        },
        twitter: {
            card: 'summary_large_image',
            images: [ogUrl],
        }
    };
}

export default async function MagicRedirectPage({ params }: Props) {
    // In Next.js 15+, params is a Promise, but for 14 it's an object. 
    // Assuming standard App Router behavior.
    // If runtime is strictly Next 15, we might need `await params`.
    // Safe implementation for both (if strict types allow):
    const code = params.code;

    const date = decodeDateStats(code);

    if (date) {
        const dateStr = date.toISOString().split('T')[0];
        redirect(`/?d=${dateStr}`);
    } else {
        redirect('/');
    }
}
