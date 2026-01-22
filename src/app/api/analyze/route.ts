import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";

export const dynamic = 'force-dynamic'; // Prevent Next.js caching

// Groq API Endpoint (OpenAI-compatible)
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function POST(req: Request) {
    try {
        const { dream } = await req.json();

        if (!dream) {
            return NextResponse.json(
                { error: "Dream content is required" },
                { status: 400 }
            );
        }

        // Rate Limiting
        const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
        const rateLimitResult = rateLimit(ip);

        if (!rateLimitResult.success) {
            return NextResponse.json(
                { error: "Too many dreams! Please wait a moment." },
                { status: 429 }
            );
        }

        // 1. GROQ/LLAMA ANALYSIS (10,000+ requests/day FREE!)
        const systemPrompt = `You are an expert Dream Psychologist (Jungian/Freudian). 
Analyze dreams and return ONLY valid JSON with this exact structure:
{
    "mood": "One or two words describing emotional tone",
    "theme": "A short, punchy title for the dream's meaning",
    "interpretation": [
        "Insight 1: Symbol meaning",
        "Insight 2: Subconscious warning or message",
        "Insight 3: Practical takeaway for waking life"
    ],
    "visualPrompt": "Descriptive artistic prompt for image generation. Focus on colors, lighting, key symbols. No word 'dream'."
}`;

        const userPrompt = `Analyze this dream: "${dream}"`;

        let analysis;
        try {
            const response = await fetch(GROQ_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: userPrompt }
                    ],
                    temperature: 0.7,
                    max_tokens: 500
                })
            });

            if (!response.ok) {
                throw new Error(`Groq API Error: ${response.status}`);
            }

            const data = await response.json();
            const rawText = data.choices[0]?.message?.content || "";
            // Clean up any markdown code blocks
            const cleanText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
            analysis = JSON.parse(cleanText);
        } catch (error: any) {
            console.error("Groq Error:", error);
            // Fallback if AI fails
            analysis = {
                mood: "Mysterious",
                theme: "Whispers of the Subconscious",
                interpretation: [
                    "The dream oracle is momentarily resting.",
                    "Your dream has still been visualized.",
                    "Try again in a moment for full analysis."
                ],
                visualPrompt: `${dream}, mystical, ethereal, dreamlike`
            };
        }

        // 2. IMAGE GENERATION (Pollinations AI with API Key)
        // Use the AI-generated visual prompt for beautiful dream art
        const visualPrompt = analysis.visualPrompt || `${dream}, mystical, ethereal, dreamlike`;
        // Clean the prompt (max 150 chars for better results)
        const cleanPrompt = visualPrompt.substring(0, 150).replace(/[^a-zA-Z0-9 ,]/g, "");

        // Fetch image server-side with API key authentication
        const encodedPrompt = encodeURIComponent(cleanPrompt);
        let imageUrl = "";

        try {
            // The gen.pollinations.ai endpoint requires a model parameter
            // Valid models: kontext, turbo, seedream, seedream-pro
            const imageResponse = await fetch(`https://gen.pollinations.ai/image/${encodedPrompt}?model=turbo`, {
                headers: {
                    "Authorization": `Bearer ${process.env.POLLINATIONS_API_KEY}`
                }
            });

            if (imageResponse.ok) {
                // Convert to base64 data URL
                const arrayBuffer = await imageResponse.arrayBuffer();
                const base64 = Buffer.from(arrayBuffer).toString('base64');
                const contentType = imageResponse.headers.get('content-type') || 'image/png';
                imageUrl = `data:${contentType};base64,${base64}`;
            } else {
                console.error(`Pollinations returned ${imageResponse.status}: ${imageResponse.statusText}`);
            }
        } catch (imgError) {
            console.error("Pollinations Image Error:", imgError);
        }

        // Fallback to placeholder if server-side fetch fails
        if (!imageUrl) {
            // Use a reliable placeholder instead of unauthenticated Pollinations URL
            imageUrl = `https://placehold.co/800x600/1a1a2e/eee?text=Dream+Visualization`;
        }

        return NextResponse.json({
            theme: analysis.theme,
            mood: analysis.mood,
            interpretation: analysis.interpretation,
            imageUrl
        });

    } catch (error: any) {
        console.error("Analysis Error:", error);
        return NextResponse.json(
            { error: "Failed to analyze dream: " + error.message },
            { status: 500 }
        );
    }
}
