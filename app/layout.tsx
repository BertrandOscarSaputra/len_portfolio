import type { Metadata } from "next";
import { Geist, Geist_Mono, Bonheur_Royale } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/conditionalLayout";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const bonheurRoyale = Bonheur_Royale({
  variable: "--font-bonheur-royale",
  subsets: ["latin"],
  weight: ["400"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Len Licht",
  description: "My Portfolio Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bonheurRoyale.variable} antialiased bg-black text-white`}
      >
        <ConditionalLayout>
          <main>{children}</main>
          <Analytics />
          <SpeedInsights />
        </ConditionalLayout>
      </body>
    </html>
  );
}
