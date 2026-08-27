import type { Metadata } from "next";
import { config } from "@/shared/config";
import "@/shared/styles/globals.css";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>{children}</body>
    </html>
  );
}
