import type { Metadata } from "next";
import { Outfit, DM_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

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
    <html
      lang="en"
      className={`${outfit.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0D0E10] text-gray-100">
        {children}
      </body>
    </html>
  );
}
