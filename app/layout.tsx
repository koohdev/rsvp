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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://gianna-turns-one.vercel.app"),
  title: "You're invited to Gianna's Baptism and First Birthday",
  description: "Tap here to RSVP",
  openGraph: {
    title: "You're invited to Gianna's Baptism and First Birthday",
    description: "Tap here to RSVP",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "Gianna Isabelle — 1st Birthday & Baptism Invitation",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "You're invited to Gianna's Baptism and First Birthday",
    description: "Tap here to RSVP",
    images: ["/preview.jpg"],
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${pinyonScript.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-white text-stone-900">{children}</body>
    </html>
  );
}
