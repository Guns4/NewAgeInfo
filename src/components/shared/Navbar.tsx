"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { ShareModule } from "@/components/modules/ShareModule";
import { AudioToggle } from "@/components/ui/AudioToggle";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 inset-x-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800"
                    : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-primary-gradient">
                            Ageinfo
                        </span>
                    </Link>

                    {/* Desktop Looking Glass / Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                            Home
                        </Link>
                        <Link href="/about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                            About
                        </Link>
                        <Link href="/features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                            Features
                        </Link>
                        <div className="flex items-center gap-4 border-l border-white/10 pl-6">
                            <AudioToggle />
                            <Link
                                href="/id"
                                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                            >
                                ID
                            </Link>
                            <button className="text-sm font-medium text-white px-4 py-2 rounded-full glass-button">
                                Get Started
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-slate-300 hover:text-white"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden glass border-b border-slate-800">
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        <Link href="/" className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-md">
                            Home
                        </Link>
                        <Link href="/about" className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-md">
                            About
                        </Link>
                        <Link href="/features" className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-md">
                            Features
                        </Link>
                        <div className="pt-4 flex items-center justify-between px-3">
                            <span className="text-slate-400 text-sm">Sound</span>
                            <AudioToggle />
                        </div>
                        <div className="pt-4">
                            <button className="w-full text-center font-medium text-white px-4 py-3 rounded-xl glass-button">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
