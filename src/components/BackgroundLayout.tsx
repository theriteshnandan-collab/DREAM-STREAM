"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function BackgroundLayout({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="relative min-h-screen overflow-x-hidden selection:bg-primary/30">
            {/* Fixed Background Layer */}
            <div className="fixed inset-0 z-[-1] bg-[#050510]">
                {/* Aurora Blobs */}
                <div className={cn(
                    "absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px] transition-opacity duration-1000",
                    mounted ? "opacity-100 animate-pulse-slow" : "opacity-0"
                )} />
                <div className={cn(
                    "absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px] transition-opacity duration-1000",
                    mounted ? "opacity-100 animate-pulse-slower" : "opacity-0"
                )} />
                <div className={cn(
                    "absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-indigo-900/10 blur-[100px] transition-opacity duration-1000",
                    mounted ? "opacity-100 animate-blob" : "opacity-0"
                )} />

                {/* Noise overlay for texture */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                />
            </div>

            {/* Content Layer */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
