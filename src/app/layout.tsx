import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { BracketButton } from "@/components/ui/BracketButton";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Personal Portfolio",
  description: "Crafting code, capturing light, and making some noise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${mono.variable} antialiased relative min-h-screen overflow-x-hidden`}>
        {/* Grainy Overlay */}
        <div className="fixed inset-0 z-50 pointer-events-none grainy opacity-20" />
        
        <main className="relative z-10 min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}