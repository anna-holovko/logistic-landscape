import type { MetadataRoute } from "next";
import { config } from "@/shared/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: config.site.name,
    short_name: config.site.name,
    description: config.site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#152A31",
    theme_color: "#152A31",
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
