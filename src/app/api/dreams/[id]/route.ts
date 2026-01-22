import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";

// DELETE /api/dreams/[id] - Delete a dream
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { userId } = await auth(); // await auth() too in newer versions, though not strictly required if not using it yet, but good practice. Actually auth() is sync in some versions but moving to async. Let's check imports. It's @clerk/nextjs/server. 

        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        if (!supabase) {
            return NextResponse.json(
                { error: "Database not connected" },
                { status: 500 }
            );
        }

        const { id: dreamId } = await params;

        // Delete the dream (only if it belongs to the user)
        const { error } = await supabase
            .from('dreams')
            .delete()
            .eq('id', dreamId)
            .eq('user_id', userId);

        if (error) {
            console.error("Delete error:", error);
            return NextResponse.json(
                { error: "Failed to delete dream" },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error("Delete Dream Error:", error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
