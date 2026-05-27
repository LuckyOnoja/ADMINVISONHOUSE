import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Admin Vision House | Premium Creative & Production Studio",
  description:
    "Admin Vision House is a premium creative production studio offering bespoke photography sets, videography spaces, and podcast suites. Book sessions for Serenity Arch, Neo Tide, Velvet Corner, Amber Lounge, Elite Circle, Iconic Oasis, and our professional Podcast Studio.",
  keywords:
    "creative studio, production house, photography studio, videography, podcast studio, booking, admin vision house, Lagos studio",
  authors: [{ name: "Admin Vision House" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0D0E10] text-gray-100">
        {children}
      </body>
    </html>
  );
}
