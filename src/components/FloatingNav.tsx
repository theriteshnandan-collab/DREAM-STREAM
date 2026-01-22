"use client";

import { Home, BookOpen, User } from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function FloatingNav() {
    const pathname = usePathname();

    const navItems = [
        { name: "Dream", icon: Home, href: "/" },
        { name: "Journal", icon: BookOpen, href: "/journal" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/20 backdrop-blur-md">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo Area */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                        <span className="font-serif font-bold text-primary text-xl">D</span>
                    </div>
                    <span className="hidden md:block font-serif font-bold text-lg tracking-wide opacity-90 group-hover:opacity-100 transition-opacity">
                        DreamStream
                    </span>
                </Link>

                {/* Nav Items */}
                <nav className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2",
                                    isActive
                                        ? "bg-white/10 text-white shadow-sm"
                                        : "text-muted-foreground hover:text-white hover:bg-white/5"
                                )}
                            >
                                <item.icon className="w-3.5 h-3.5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Action */}
                <div className="flex items-center gap-4">
                    <SignedIn>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-8 h-8 ring-2 ring-white/10 hover:ring-white/30 transition-all"
                                }
                            }}
                            afterSignOutUrl="/"
                        />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="text-sm font-medium text-muted-foreground hover:text-white transition-colors px-3 py-1.5 hover:bg-white/5 rounded-md">
                                Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </div>
        </header>
    );
}
