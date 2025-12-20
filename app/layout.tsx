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
  title: {
    default: "Len Licht - Motion Graphic Designer",
    template: "%s | Len Licht",
  },
  description:
    "Len Licht is a Motion Graphic Designer specializing in motion graphics, live 2d animation, and 3D design.",
  keywords: [
    "lenlicht",
    "Len Licht",
    "Motion Graphic Designer",
    "Live 2D animations",
    "3D Animations",
    "Motion Graphics",
    "Anime Music Video",
    "AMV",
    "Music Video",
    "Animator"
  ],
  authors: [{ name: "Len Licht" }],
  creator: "Len Licht",

  metadataBase: new URL("https://www.lenlicht.online/"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Len Licht - Motion Graphic Designer",
    description:
      "Motion Graphic Designer portfolio showcasing motion graphics, live 2d animation, and 3D animation projects.",
    url: "https://www.lenlicht.online/",
    siteName: "Len Licht Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Len Licht Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Len Licht - Motion Graphic Designer",
    description:
      "Motion Graphic Designer portfolio showcasing motion graphics, live 2d animation, and 3D animation projects.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
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
