"use client";

import { Moon } from "lucide-react";
import { Card } from "@/components/ui/card";

// Skeleton loading component for Journal page
export default function JournalLoading() {
    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            {/* Header Skeleton */}
            <div className="max-w-7xl mx-auto flex justify-between items-center mb-12">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-full animate-pulse" />
                    <div className="flex items-center gap-2">
                        <Moon className="w-6 h-6 text-primary animate-pulse" />
                        <h1 className="text-2xl font-bold tracking-tight">Dream Journal</h1>
                    </div>
                </div>
                <div className="w-8 h-8 bg-white/10 rounded-full animate-pulse" />
            </div>

            {/* Loading Message */}
            <div className="max-w-7xl mx-auto text-center mb-8">
                <p className="text-muted-foreground animate-pulse">Loading your dreams...</p>
            </div>

            {/* Grid Skeleton */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="bg-white/5 border-white/10 overflow-hidden">
                        {/* Image Skeleton */}
                        <div className="aspect-video bg-white/5 animate-pulse" />
                        {/* Content Skeleton */}
                        <div className="p-4 space-y-3">
                            <div className="flex justify-between items-center">
                                <div className="w-16 h-5 bg-white/10 rounded-full animate-pulse" />
                                <div className="w-20 h-4 bg-white/10 rounded animate-pulse" />
                            </div>
                            <div className="space-y-2">
                                <div className="w-full h-4 bg-white/10 rounded animate-pulse" />
                                <div className="w-3/4 h-4 bg-white/10 rounded animate-pulse" />
                                <div className="w-1/2 h-4 bg-white/10 rounded animate-pulse" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
