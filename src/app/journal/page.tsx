"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Moon, Sparkles, Trash2, Loader2 } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DreamDetailModal from "@/components/DreamDetailModal";
import DreamImage from "@/components/DreamImage";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface Dream {
    id: string;
    content: string;
    theme: string;
    mood: string;
    image_url: string;
    created_at: string;
}

export default function JournalPage() {
    const { user, isLoaded } = useUser();
    const [dreams, setDreams] = useState<Dream[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [selectedDream, setSelectedDream] = useState<Dream | null>(null);

    // Fetch dreams on mount
    useEffect(() => {
        if (isLoaded && user && supabase) {
            fetchDreams();
        } else if (isLoaded && !user) {
            // Redirect handled by middleware, but just in case
            window.location.href = "/";
        }
    }, [isLoaded, user]);

    const fetchDreams = async () => {
        if (!supabase || !user) return;

        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('dreams')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setDreams(data || []);
        } catch (error) {
            console.error("Error fetching dreams:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (dreamId: string) => {
        if (!confirm("Are you sure you want to delete this dream?")) return;

        setDeletingId(dreamId);
        try {
            const response = await fetch(`/api/dreams/${dreamId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete");
            }

            // Optimistic update - remove from local state
            setDreams(prev => prev.filter(d => d.id !== dreamId));
            toast.success("Dream deleted");
        } catch (error) {
            console.error("Delete failed:", error);
            toast.error("Failed to delete dream. Please try again.");
        } finally {
            setDeletingId(null);
        }
    };

    // Show loading state
    if (!isLoaded || isLoading) {
        return (
            <div className="min-h-screen bg-background text-foreground p-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center mb-12">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/10 rounded-full animate-pulse" />
                        <div className="flex items-center gap-2">
                            <Moon className="w-6 h-6 text-primary animate-pulse" />
                            <h1 className="text-2xl font-bold tracking-tight">Dream Journal</h1>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto text-center mb-8">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                    <p className="text-muted-foreground mt-4">Loading your dreams...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            {/* Header */}
            <div className="max-w-7xl mx-auto flex justify-between items-center mb-12">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <Moon className="w-6 h-6 text-primary" />
                        <h1 className="text-2xl font-bold tracking-tight">Dream Journal</h1>
                    </div>
                </div>
                <UserButton afterSignOutUrl="/" />
            </div>

            {/* Stats Bar */}
            <div className="max-w-7xl mx-auto mb-8">
                <p className="text-sm text-muted-foreground">
                    {dreams.length} {dreams.length === 1 ? 'dream' : 'dreams'} recorded
                </p>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Add New Dream Card - Always First */}
                <Link href="/">
                    <Card className="bg-white/5 border-white/10 border-dashed hover:border-primary/50 hover:bg-white/10 transition-all cursor-pointer group h-full min-h-[280px] flex flex-col items-center justify-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Sparkles className="w-8 h-8 text-primary" />
                        </div>
                        <div className="text-center">
                            <p className="font-medium text-lg">New Dream</p>
                            <p className="text-sm text-muted-foreground">Record a new dream</p>
                        </div>
                    </Card>
                </Link>

                {/* Dream Cards */}
                {dreams.length > 0 ? (
                    dreams.map((dream) => (
                        <Card
                            key={dream.id}
                            className="bg-white/5 border-white/10 overflow-hidden hover:border-primary/50 transition-colors group relative cursor-pointer"
                            onClick={() => setSelectedDream(dream)}
                        >
                            {/* Delete Button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-red-500/80"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(dream.id);
                                }}
                                disabled={deletingId === dream.id}
                            >
                                {deletingId === dream.id ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Trash2 className="w-4 h-4" />
                                )}
                            </Button>

                            <div className="aspect-video relative overflow-hidden">
                                <DreamImage
                                    src={dream.image_url}
                                    alt={dream.theme}
                                    className="w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                                    <p className="text-white font-medium truncate">{dream.theme}</p>
                                </div>
                            </div>
                            <div className="p-4 space-y-2">
                                <div className="flex justify-between items-center text-xs text-muted-foreground">
                                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full">{dream.mood}</span>
                                    <span>{formatDistanceToNow(new Date(dream.created_at), { addSuffix: true })}</span>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                                    {dream.content}
                                </p>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full md:col-span-1 lg:col-span-2 text-center py-20 text-muted-foreground">
                        <p className="text-xl">Your dream journal awaits...</p>
                        <p className="text-sm mt-2">Start by recording your first dream!</p>
                    </div>
                )}
            </div>

            {/* Dream Detail Modal */}
            {selectedDream && (
                <DreamDetailModal
                    dream={selectedDream}
                    onClose={() => setSelectedDream(null)}
                />
            )}
        </div>
    );
}
