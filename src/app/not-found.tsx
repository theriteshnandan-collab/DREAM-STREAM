import Link from "next/link";
import { Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="z-10 text-center space-y-6">
                <Moon className="w-16 h-16 mx-auto text-primary opacity-50" />
                <h1 className="text-6xl font-bold">404</h1>
                <p className="text-xl text-muted-foreground">
                    This dream doesn&apos;t exist... yet
                </p>
                <Link href="/">
                    <Button className="mt-4">
                        Return to Dreams
                    </Button>
                </Link>
            </div>
        </div>
    );
}
