"use client";

import { X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import DreamImage from "@/components/DreamImage";

interface Dream {
    id: string;
    content: string;
    theme: string;
    mood: string;
    image_url: string;
    created_at: string;
    interpretation?: string[];
}

interface DreamDetailModalProps {
    dream: Dream | null;
    onClose: () => void;
}

export default function DreamDetailModal({ dream, onClose }: DreamDetailModalProps) {
    if (!dream) return null;

    // Parse interpretation if it's stored as JSON string
    let insights: string[] = [];
    if (dream.interpretation) {
        try {
            insights = Array.isArray(dream.interpretation)
                ? dream.interpretation
                : JSON.parse(dream.interpretation as any);
        } catch {
            insights = [];
        }
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Card className="bg-background border-white/10 overflow-hidden">
                        {/* Close Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-white/20"
                            onClick={onClose}
                        >
                            <X className="w-5 h-5" />
                        </Button>

                        <div className="grid md:grid-cols-2 gap-0">
                            {/* Image Side */}
                            <div className="relative aspect-square md:aspect-auto">
                                <DreamImage
                                    src={dream.image_url}
                                    alt={dream.theme}
                                    className="w-full h-full"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r" />
                            </div>

                            {/* Content Side */}
                            <div className="p-6 space-y-6">
                                {/* Header */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                                            {dream.mood}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {new Date(dream.created_at).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl font-bold font-serif">{dream.theme}</h2>
                                </div>

                                {/* Dream Content */}
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Your Dream</h3>
                                    <p className="text-foreground leading-relaxed font-serif text-lg">{dream.content}</p>
                                </div>

                                {/* Insights */}
                                {insights.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground mb-3">Interpretation</h3>
                                        <div className="space-y-3">
                                            {insights.map((insight, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-white/5 rounded-lg p-3 text-sm leading-relaxed font-serif text-base"
                                                >
                                                    {insight}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
