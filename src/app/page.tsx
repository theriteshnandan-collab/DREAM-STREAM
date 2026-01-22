"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/GlassCard";
import { supabase } from "@/lib/supabase";
import { UserButton, SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import DreamLoader from "@/components/DreamLoader";
import DreamImage from "@/components/DreamImage";
import confetti from "canvas-confetti";

export default function Home() {
  const [dream, setDream] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!dream.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dream }),
      });
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setResult({ ...data, content: dream });
    } catch (error: any) {
      console.error("Failed to analyze", error);
      toast.error(error.message || "Failed to analyze dream");
    } finally {
      setIsLoading(false);
    }
  };

  const { user } = useUser();

  const handleSave = async () => {
    if (!result) return;

    // GUEST MODE SAVE
    if (!user) {
      setIsSaving(true);
      try {
        const guestDream = {
          id: crypto.randomUUID(),
          content: result.content,
          theme: result.theme,
          mood: result.mood,
          image_url: result.imageUrl,
          created_at: new Date().toISOString(),
          is_guest: true, // Flag to identify guest dreams
        };

        // Get existing dreams
        const existing = JSON.parse(localStorage.getItem('guest_dreams') || '[]');
        const updated = [guestDream, ...existing];
        localStorage.setItem('guest_dreams', JSON.stringify(updated));

        // Confetti for guests too!
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        toast.success("Saved to Temporary Journal! 📝", {
          description: "Sign in to save your dreams permanently.",
          duration: 5000,
        });

        setResult(null);
        setDream("");
      } catch (error) {
        console.error("Guest save failed:", error);
        toast.error("Failed to save to temporary journal");
      } finally {
        setIsSaving(false);
      }
      return;
    }

    // AUTH MODE SAVE (SUPABASE)
    if (!supabase) {
      toast.error("Database connection missing");
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase.from('dreams').insert({
        content: result.content,
        theme: result.theme,
        mood: result.mood,
        image_url: result.imageUrl,
        user_id: user.id,
      });

      if (error) throw error;

      // Success confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      toast.success("Dream saved to your journal! 🌙");
      setResult(null);
      setDream("");
    } catch (error: any) {
      console.error("Error saving dream:", error);
      toast.error("Failed to save dream: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  // REVELATION VIEW
  if (result) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="z-10 w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center"
        >
          {/* Image Side */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
            <div className="relative rounded-xl shadow-2xl w-full aspect-square overflow-hidden">
              <DreamImage
                src={result.imageUrl}
                alt="Dream visualization"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Analysis Side */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold font-serif tracking-tight">{result.theme}</h2>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {result.mood}
              </div>
            </div>

            <div className="space-y-4">
              {result.interpretation?.map((item: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
                >
                  <p className="text-muted-foreground leading-relaxed font-serif text-lg">{item}</p>
                </motion.div>
              ))}
            </div>



            {/* Guest Warning */}
            {!user && (
              <GlassCard className="p-4 mb-6 border-amber-500/30 bg-amber-500/5">
                <div className="flex flex-col gap-3 text-center">
                  <div className="flex items-center justify-center gap-2 text-amber-200/90 font-medium">
                    <Sparkles className="w-4 h-4" />
                    <span>Sign in to save this dream</span>
                  </div>
                  <p className="text-xs text-amber-200/60">
                    Create a free account to keep a permanent journal of your dreams.
                  </p>
                  <SignInButton mode="modal">
                    <Button variant="secondary" className="w-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-100 border border-amber-500/20">
                      Sign In Now
                    </Button>
                  </SignInButton>
                </div>
              </GlassCard>
            )}

            <div className="flex gap-4 mt-8">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
              >
                {isSaving ? (
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-2" />
                )}
                {isSaving ? "Saving..." : "Save to Journal"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setResult(null)}
                className="flex-1 hover:bg-white/5"
              >
                Discard
              </Button>
            </div>
          </div>
        </motion.div >
      </div >
    );
  }

  // INPUT VIEW
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {isLoading && <DreamLoader />}

      {/* Ambient Glow */}
      {/* Ambient Glow handled by BackgroundLayout */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-2xl text-center space-y-8"
      >
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 mb-6 relative">

            {/* Header / Auth handled by FloatingNav */}

            <Moon className="w-8 h-8 text-primary animate-pulse" />
            <span className="text-xl font-medium tracking-widest uppercase opacity-70">
              DreamStream
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold font-serif tracking-tight bg-gradient-to-br from-white via-white to-white/50 bg-clip-text text-transparent pb-2">
            Decode Your <br /> Subconscious
          </h1>

          <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Record your dreams. Unlock their meaning. <br />
            Visualize the impossible.
          </p>
        </div>

        {/* Input Card */}
        <GlassCard gradient className="p-1 rounded-2xl max-w-2xl w-full mx-auto">
          <div className="p-6 rounded-xl space-y-4">
            <Textarea
              placeholder="Describe your dream here..."
              className="resize-none h-40 bg-transparent border-none text-xl font-serif text-foreground placeholder:text-muted-foreground/30 focus-visible:ring-0 p-0 leading-relaxed transition-opacity"
              value={dream}
              onChange={(e) => setDream(e.target.value)}
            />

            <div className="flex justify-between items-center pt-4 border-t border-white/5">
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
                {dream.length} chars
              </span>

              <Button
                onClick={handleAnalyze}
                disabled={!dream.trim()}
                className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 px-8"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Interpret Dream
              </Button>
            </div>
          </div>
        </GlassCard>


      </motion.div>
    </div>
  );
}
