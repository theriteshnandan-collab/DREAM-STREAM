"use client";

import { Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("App Error:", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="z-10 text-center space-y-6">
                <Moon className="w-16 h-16 mx-auto text-red-400 opacity-50" />
                <h1 className="text-4xl font-bold">Something went wrong</h1>
                <p className="text-muted-foreground max-w-md">
                    A nightmare occurred while processing your request.
                    Don&apos;t worry, your dreams are safe.
                </p>
                <Button
                    onClick={reset}
                    variant="outline"
                    className="mt-4"
                >
                    Try Again
                </Button>
            </div>
        </div>
    );
}
