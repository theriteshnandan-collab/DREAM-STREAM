import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
    gradient?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
    ({ className, gradient = false, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "relative overflow-hidden rounded-xl border border-white/5 bg-black/20 backdrop-blur-xl transition-all duration-300",
                    "hover:bg-white/10 hover:border-white/10 hover:shadow-2xl hover:shadow-primary/5",
                    "group",
                    className
                )}
                {...props}
            >
                {/* Noise Texture */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-0"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                />

                {/* Optional Gradient Border Glow */}
                {gradient && (
                    <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-primary/50 to-purple-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />
                )}

                {/* Content */}
                <div className="relative z-10 h-full">
                    {children}
                </div>
            </div>
        );
    }
);
GlassCard.displayName = "GlassCard";

export { GlassCard };
