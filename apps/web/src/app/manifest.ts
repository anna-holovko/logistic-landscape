import type { MetadataRoute } from "next";
import { config } from "@/shared/config";
import { themeConfig } from "@/shared/tokens";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: config.site.name,
    short_name: config.site.name,
    description: config.site.description,
    start_url: "/",
    display: "standalone",
    background_color: themeConfig.backgroundColor,
    theme_color: themeConfig.primaryColor,
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
