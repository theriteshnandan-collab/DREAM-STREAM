"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface DreamImageProps {
    src: string;
    alt: string;
    className?: string;
}

export default function DreamImage({ src, alt, className }: DreamImageProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    // If it's a base64 data URL, we can't use next/image optimization easily
    const isBase64 = src.startsWith('data:');
    const fallbackSrc = "https://placehold.co/800x600/1a1a2e/666?text=Dream";

    return (
        <div className={cn("relative overflow-hidden bg-white/5", className)}>
            {/* Loading skeleton */}
            {isLoading && !hasError && (
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-white/5 via-white/10 to-white/5 z-10" />
            )}

            {/* Use standard img for base64 or fallback to avoid config issues */}
            {isBase64 || hasError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={hasError ? fallbackSrc : src}
                    alt={alt}
                    className={cn(
                        "w-full h-full object-cover transition-opacity duration-500",
                        isLoading ? "opacity-0" : "opacity-100"
                    )}
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                        setHasError(true);
                        setIsLoading(false);
                    }}
                />
            ) : (
                <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={cn(
                        "object-cover transition-opacity duration-500",
                        isLoading ? "opacity-0" : "opacity-100"
                    )}
                    onLoadingComplete={() => setIsLoading(false)}
                    onError={() => {
                        setHasError(true);
                        setIsLoading(false);
                    }}
                />
            )}
        </div>
    );
}
