/**
 * Configuration
 *
 * Centralized configuration for the Logistic Landscape platform.
 */

export const config = {
  // Site metadata
  site: {
    name: "Logistic Landscape",
    description: "A public logistics platform for companies, news, and industry insights",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    locale: "en-US",
  },

  // API configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    timeout: 10000,
  },

  // Newsletter configuration
  newsletter: {
    maxEmailLength: 254,
    minEmailLength: 5,
  },

  // Rate limiting (newsletter endpoint)
  rateLimit: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 5, // 5 requests per hour per IP
  },

  // SEO configuration
  seo: {
    defaultRobots: "index,follow",
    sitemapBaseUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },
} as const;

export type Config = typeof config;
