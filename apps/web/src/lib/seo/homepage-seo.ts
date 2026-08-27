/**
 * Homepage SEO Configuration
 *
 * SEO metadata for the homepage/newsletter page.
 */

import { config } from "@logistic-landscape/config";
import { PageSeo, WebSiteSchema } from "@logistic-landscape/types";

export function getHomepageSeo(): PageSeo {
  const siteUrl = config.site.url;

  const structuredData: WebSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: config.site.name,
    url: siteUrl,
    description: config.site.description,
  };

  return {
    title: `${config.site.name} - Logistics Industry Platform`,
    description: config.site.description,
    canonical: siteUrl,
    robots: "index,follow",
    ogType: "website",
    ogImage: `${siteUrl}/og-image.png`,
    ogTitle: `${config.site.name}`,
    ogDescription: config.site.description,
    twitterCard: "summary_large_image",
    twitterImage: `${siteUrl}/twitter-image.png`,
    twitterTitle: `${config.site.name}`,
    twitterDescription: config.site.description,
    structuredData,
    siteName: config.site.name,
  };
}
