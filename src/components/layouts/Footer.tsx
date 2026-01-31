import Link from "next/link";
import { Heart } from "lucide-react";
import { useTranslations } from 'next-intl';
import { PopularDates } from '@/components/modules/seo/PopularDates';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-primary-gradient mb-4 block">
                            Ageinfo
                        </span>
                        <p className="text-slate-400 text-sm">
                            Discover the intricate details of your time on Earth with precision and style.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Product</h3>
                        <ul className="space-y-2">
                            <li><Link href="/features" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Features</Link></li>
                            <li><Link href="/pricing" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Pricing</Link></li>
                            <li><Link href="/api" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">API</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><Link href="/blog" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Blog</Link></li>
                            <li><Link href="/about" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><Link href="/privacy" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Terms of Service</Link></li>
                            <li><Link href="/sitemap.xml" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Sitemap</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="w-full">
                    <PopularDates />
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center bg-slate-950">
                    <p className="text-slate-500 text-sm mb-4 md:mb-0">
                        &copy; {currentYear} Ageinfo. All rights reserved.
                    </p>

                    <div className="flex items-center space-x-4">
                        {/* Language Switcher */}
                        <div className="flex items-center space-x-2 text-sm text-slate-400">
                            <Link href="/id" className="hover:text-white transition-colors aria-[current=page]:text-indigo-400">
                                ID
                            </Link>
                            <span className="text-slate-700">|</span>
                            <Link href="/en" className="hover:text-white transition-colors aria-[current=page]:text-indigo-400">
                                EN
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-center">
                {/* Legal Links */}
                <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-500 mb-6">
                    <a href="/legal/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
                    <a href="/legal/terms" className="hover:text-slate-300 transition-colors">Terms of Service</a>
                    <span className="text-slate-700">|</span>
                    <span>Calculations for informational purposes only.</span>
                </div>

                <p className="text-xs text-slate-600">
                    &copy; {new Date().getFullYear()} Ageinfo.
                </p>
            </div>
        </footer>
    );
}
