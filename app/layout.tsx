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
  title: "Gianna Isabelle — 1st Birthday & Baptism Invitation",
  description:
    "Join us for the baptism and 1st birthday celebration of our daughter, Gianna Isabelle. October 10, 2026.",
  openGraph: {
    title: "Gianna Isabelle — 1st Birthday & Baptism",
    description:
      "Join us in celebrating Gianna's 1st Birthday & Baptism on October 10, 2026.",
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
    title: "Gianna Isabelle — 1st Birthday & Baptism",
    description:
      "Join us in celebrating Gianna's 1st Birthday & Baptism on October 10, 2026.",
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
