import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '4rem',
                xl: '5rem',
                '2xl': '6rem',
            },
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                arabic: ["var(--font-noto-kufi)", "sans-serif"],
            },
            fontSize: {
                // Golden Ratio Scale (Base 16px, Ratio 1.618)
                // Using Clamp for Fluidity between Mobile (320px) and Desktop (1440px)
                // Updated for Phase 56: Safer lower bounds for 320px devices

                // Body
                'fluid-sm': "clamp(0.8125rem, 0.75rem + 0.25vw, 1rem)", // 13px -> 16px
                'fluid-base': "clamp(1rem, 0.9rem + 0.25vw, 1.125rem)", // 16px -> 18px
                'fluid-lg': "clamp(1.125rem, 1rem + 0.5vw, 1.25rem)", // 18px -> 20px

                // Headings (Golden Ratio Steps)
                // Level 1 (~16 * 1.618 = 26)
                'fluid-h5': "clamp(1.125rem, 1.05rem + 0.5vw, 1.618rem)", // Reduced min for mobile
                // Level 2 (~26 * 1.618 = 42)
                'fluid-h4': "clamp(1.5rem, 1.3rem + 1vw, 2.618rem)",
                // Level 3 (~42 * 1.618 = 68)
                'fluid-h3': "clamp(1.75rem, 1.5rem + 1.5vw, 3rem)",
                // Level 4 (~68 * 1.618 = 110)
                'fluid-h2': "clamp(2.25rem, 1.8rem + 2vw, 4.236rem)",
                // Level 5 (Hero)
                'fluid-h1': "clamp(2.5rem, 2.1rem + 3.5vw, 6.854rem)", // Safer min 2.5rem (40px) vs 3rem
            },
            letterSpacing: {
                'tight-headings': '-0.025em',
            },
            colors: {
                brand: {
                    dark: "#020617", // Surface Level 1 (Deep Space)
                    primary: "#6366f1", // Indigo-500
                    secondary: "#8b5cf6", // Violet-500
                    accent: "#f59e0b", // Amber-500
                },
                surface: {
                    1: "#020617", // Background
                    2: "rgba(15, 23, 42, 0.5)", // Slate-900/50 (Card Base)
                    3: "rgba(30, 41, 59, 0.8)", // Slate-800/80 (Hover)
                }
            },
            spacing: {
                // Golden Ratio Spacing Scale
                'golden-1': '0.618rem', // ~10px
                'golden-2': '1rem',      // 16px
                'golden-3': '1.618rem',  // ~26px
                'golden-4': '2.618rem',  // ~42px
                'golden-5': '4.236rem',  // ~68px
                'golden-6': '6.854rem',  // ~110px
                'golden-7': '11.08rem',  // ~177px
            },
            borderRadius: {
                'xl-plus': '24px',
                '2xl-plus': '32px',
                '3xl-plus': '48px',
            },
            backgroundImage: {
                "primary-gradient": "linear-gradient(to right, #6366f1, #8b5cf6)",
                "glass-gradient": "linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
            },
            transitionTimingFunction: {
                'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            },
            animation: {
                "gradient-x": "gradient-x 15s ease infinite",
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "float": "float 3s ease-in-out infinite",
                "shimmer": "shimmer 2s linear infinite",
            },
            keyframes: {
                "gradient-x": {
                    "0%, 100%": {
                        "background-size": "200% 200%",
                        "background-position": "left center",
                    },
                    "50%": {
                        "background-size": "200% 200%",
                        "background-position": "right center",
                    },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                shimmer: {
                    "100%": { transform: "translateX(100%)" },
                }
            },
        },
    },
    plugins: [],
};
export default config;
