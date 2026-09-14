import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Pinyon_Script, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pinyonScript = Pinyon_Script({
  weight: "400",
  variable: "--font-pinyon",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  subsets: ["latin"],
});

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null) ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  "https://gianna-turns-one.vercel.app"
).replace(/\/$/, "");

const PREVIEW_IMAGE_URL = `${SITE_URL}/preview.jpg?v=2`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "You're invited to Gianna's Baptism and First Birthday",
  description: "Tap here to RSVP",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "You're invited to Gianna's Baptism and First Birthday",
    description: "Tap here to RSVP",
    url: SITE_URL,
    siteName: "Gianna's 1st Birthday & Baptism",
    images: [
      {
        url: PREVIEW_IMAGE_URL,
        secureUrl: PREVIEW_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "You're invited to Gianna's Baptism and First Birthday",
        type: "image/jpeg",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "You're invited to Gianna's Baptism and First Birthday",
    description: "Tap here to RSVP",
    images: [PREVIEW_IMAGE_URL],
  },
  icons: {
    other: [
      {
        rel: "image_src",
        url: PREVIEW_IMAGE_URL,
      },
    ],
  },
  ...(process.env.NEXT_PUBLIC_FB_APP_ID
    ? {
        facebook: {
          appId: process.env.NEXT_PUBLIC_FB_APP_ID,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      prefix="og: https://ogp.me/ns#"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${pinyonScript.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-white text-stone-900">{children}</body>
    </html>
  );
}
