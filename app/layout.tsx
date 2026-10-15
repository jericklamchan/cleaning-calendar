// app/layout.tsx
import { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cleaning Calendar",
  description: "Cleaning operations management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-[#f8f7f4] text-gray-900 min-h-full flex flex-col">
        <Suspense fallback={<div className="h-12 bg-white border-b border-gray-200" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-6 pt-3 pb-8">
          {children}
        </main>
      </body>
    </html>
  );
}