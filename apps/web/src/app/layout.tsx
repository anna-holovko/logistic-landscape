import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { config } from "@/shared/config";
import { themeConfig } from "@/shared/tokens";
import "@/shared/styles/globals.css";
import "./globals.css";

const petrona = localFont({
  src: "./fonts/petrona-600.woff2",
  weight: "600",
  style: "normal",
  variable: "--font-petrona",
  display: "swap",
});

const ibmPlexSans = localFont({
  src: [
    { path: "./fonts/ibm-plex-sans.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-sans.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ibm-plex-sans.woff2", weight: "700", style: "normal" },
    {
      path: "./fonts/ibm-plex-sans-italic-500.woff2",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: config.site.name,
    template: `%s - ${config.site.name}`,
  },
  description: config.site.description,
  metadataBase: new URL(config.site.url),
  robots: "index,follow",
  openGraph: {
    type: "website",
    locale: config.site.locale,
    url: config.site.url,
    siteName: config.site.name,
  },
  twitter: {
    card: "summary_large_image",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black",
    title: config.site.name,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: themeConfig.primaryColor,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${petrona.variable} ${ibmPlexSans.variable}`}>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>{children}</body>
    </html>
  );
}
