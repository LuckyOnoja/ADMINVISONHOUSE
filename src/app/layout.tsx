import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
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
      className={`h-full antialiased ${inter.variable} ${spaceGrotesk.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col bg-[#090909] text-gray-100">
        {children}
      </body>
    </html>
  );
}
