"use client";

import Link from "next/link";
import { Github, Mail, Heart } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative mt-32 pb-12 w-full px-4">
            <div className="container mx-auto max-w-4xl">
                {/* Manifesto / Philosophy Section */}
                <div className="mb-20 text-center space-y-6">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white/90">
                        The Philosophy
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground font-serif leading-relaxed max-w-2xl mx-auto">
                        "Dreams are the whispers of the soul. In an age of infinite noise, we help you listen to the silence within."
                    </p>
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto" />
                </div>

                {/* Footer Grid */}
                <div className="grid md:grid-cols-3 gap-12 text-center md:text-left border-t border-white/5 pt-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-flex items-center gap-2 group">
                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                <span className="font-serif font-bold text-primary text-xs">D</span>
                            </div>
                            <span className="font-serif font-bold text-lg tracking-wide opacity-80 group-hover:opacity-100 transition-opacity">
                                DreamStream
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground/60 leading-relaxed">
                            An AI-powered sanctuary for your subconscious mind.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-white/50 uppercase tracking-widest">Explore</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/" className="hover:text-primary transition-colors">Record Dream</Link></li>
                            <li><Link href="/journal" className="hover:text-primary transition-colors">Journal</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-white/50 uppercase tracking-widest">Connect</h3>
                        <div className="flex justify-center md:justify-start gap-4">
                            <Link href="https://x.com/NandanRite30165" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-all group">
                                {/* X Logo */}
                                <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                                </svg>
                            </Link>
                            <Link href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-all">
                                <Github className="w-4 h-4" />
                            </Link>
                            <Link href="mailto:theriteshnandan@gmail.com" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-all">
                                <Mail className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar / Made with Love */}
                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/40">
                    <p>© 2026 DreamStream AI. All rights served in the astral plane.</p>
                    <p className="flex items-center gap-1.5">
                        Made with <Heart className="w-3 h-3 text-red-500 fill-red-500/20 animate-pulse" /> by <span className="text-white/60">DreamStream Team</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
