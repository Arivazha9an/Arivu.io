import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://arivu.io"),

  title: {
    default: "Arivazhagan | Flutter Developer",
    template: "%s | Arivazhagan",
  },

  description:
    "Mobile Developer specialising in Flutter, Dart and cloud platforms. Explore projects, skills, and more.",

  icons: {
    icon: "/a‑alphabet‑icon.svg",
    shortcut: "/a‑alphabet‑icon.svg",
    apple: "/a‑alphabet‑icon.svg",
  },

  openGraph: {
    title: "Arivazhagan | Flutter Developer",
    description:
      "Mobile Developer specialising in Flutter, Dart and cloud platforms.",
    url: "https://arivu.io",
    siteName: "Arivazhagan",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Arivazhagan | Flutter Developer",
    description:
      "Mobile Developer specialising in Flutter, Dart and cloud platforms.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
