"use client";

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { format, addDays, subDays } from 'date-fns';

export function PopularDates() {
    const locale = useLocale();
    const today = new Date();

    // Generate links for Yesterday, Today, Tomorrow
    const dates = [
        { label: "Yesterday", date: subDays(today, 1) },
        { label: "Today", date: today },
        { label: "Tomorrow", date: addDays(today, 1) },
    ];

    return (
        <div className="py-8 border-t border-white/5 mt-12">
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">
                {locale === 'id' ? 'Populer Hari Ini' : 'Popular Today'}
            </h4>
            <div className="flex flex-wrap gap-4">
                {dates.map((item, i) => {
                    const dateSlug = format(item.date, "MM-dd"); // 12-31 format
                    const dateDisplay = format(item.date, "MMMM do"); // December 31st

                    return (
                        <Link
                            key={i}
                            href={`/${locale}/history/${dateSlug}`}
                            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-500/10 px-3 py-1.5 rounded-md border border-indigo-500/20"
                        >
                            Born on {dateDisplay}?
                        </Link>
                    );
                })}
                <Link
                    href={`/${locale}/history/01-01`}
                    className="text-sm text-slate-500 hover:text-slate-300 transition-colors px-3 py-1.5"
                >
                    January 1st
                </Link>
                {/* Can add more static popular dates here */}
            </div>
        </div>
    );
}
