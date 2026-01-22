import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next";
import { Geist, Geist_Mono, Crimson_Pro } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import BackgroundLayout from "@/components/BackgroundLayout";
import FloatingNav from "@/components/FloatingNav";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson-pro",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DreamStream | AI Dream Journal",
  description: "Decode your subconscious with AI-powered dream analysis. Record, visualize, and understand your dreams with advanced psychological interpretation.",
  keywords: ["dream journal", "AI dream analysis", "dream interpretation", "Jungian psychology", "dream diary"],
  authors: [{ name: "DreamStream" }],
  openGraph: {
    title: "DreamStream | AI Dream Journal",
    description: "Decode your subconscious with AI-powered dream analysis",
    type: "website",
    locale: "en_US",
    siteName: "DreamStream",
  },
  twitter: {
    card: "summary_large_image",
    title: "DreamStream | AI Dream Journal",
    description: "Decode your subconscious with AI-powered dream analysis",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${crimsonPro.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <BackgroundLayout>
              <FloatingNav />
              <div className="flex flex-col min-h-screen pt-16">
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
            </BackgroundLayout>
            <Toaster richColors position="top-center" />
            <Analytics />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
