export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-gradient rounded-full blur-3xl opacity-20"></div>
            </div>

            <div className="z-10 text-center space-y-8">
                <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400">
                    Ageinfo
                </h1>

                <div className="glass-card p-8 rounded-2xl max-w-md mx-auto text-slate-200">
                    <p className="text-lg">Premium Age Intelligence Platform</p>
                    <p className="text-sm mt-4 text-slate-400">Initialize implementation...</p>
                </div>

                <button className="glass-button px-6 py-3 rounded-full text-white font-medium">
                    Get Started
                </button>
            </div>
        </main>
    )
}
