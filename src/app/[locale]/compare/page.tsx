import { CompareMode } from '@/components/modules/CompareMode';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Social Battle - Compare Your Age',
    description: 'Compare your exact age with a friend or partner to see the precise time gap.',
};

export default function ComparePage() {
    return (
        <main className="min-h-screen pt-32 pb-20 flex items-center justify-center">
            <CompareMode />
        </main>
    );
}
