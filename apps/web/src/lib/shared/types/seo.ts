/**
 * SEO Types
 *
 * Metadata and SEO configuration for pages.
 * Every public page has a consistent SEO contract.
 */

export interface PageSeo {
  title: string;
  description: string;
  canonical: string;
  robots?: "index,follow" | "noindex,nofollow" | "index,nofollow" | "noindex,follow";
  ogType?: OpenGraphType;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterCard?: TwitterCardType;
  twitterImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  structuredData?: StructuredData;
  alternateLanguages?: AlternateLanguage[];
  siteName?: string;
}

export type OpenGraphType =
  | "website"
  | "article"
  | "business.business"
  | "product";

export type TwitterCardType =
  | "summary"
  | "summary_large_image"
  | "app"
  | "player";

export interface AlternateLanguage {
  hrefLang: string;
  href: string;
}

// JSON-LD / Structured Data
export type StructuredData =
  | WebSiteSchema
  | WebPageSchema
  | BreadcrumbListSchema
  | ArticleSchema
  | NewsArticleSchema
  | OrganizationSchema
  | LocalBusinessSchema
  | PersonSchema
  | ProductSchema
  | ServiceSchema;

// Base schema type
export interface BaseSchema {
  "@context": "https://schema.org";
  "@type": string;
  "@id"?: string;
}

export interface WebSiteSchema extends BaseSchema {
  "@type": "WebSite";
  name: string;
  url: string;
  description?: string;
  image?: string;
  logo?: {
    "@type": "ImageObject";
    url: string;
    width?: number;
    height?: number;
  };
}

export interface WebPageSchema extends BaseSchema {
  "@type": "WebPage";
  name: string;
  url: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  isPartOf?: {
    "@type": "WebSite";
    url: string;
  };
}

export interface BreadcrumbListSchema extends BaseSchema {
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item?: string;
  }>;
}

export interface ArticleSchema extends BaseSchema {
  "@type": "Article";
  headline: string;
  description?: string;
  image?: string | string[];
  datePublished: string;
  dateModified?: string;
  author?: PersonSchema | PersonSchema[];
  publisher?: OrganizationSchema;
  mainEntity?: string;
}

export interface NewsArticleSchema extends BaseSchema {
  "@type": "NewsArticle";
  headline: string;
  description?: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: PersonSchema;
  publisher?: OrganizationSchema;
}

export interface OrganizationSchema extends BaseSchema {
  "@type": "Organization";
  name: string;
  url?: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
  contactPoint?: {
    "@type": "ContactPoint";
    contactType: string;
    telephone?: string;
    email?: string;
  };
}

export interface LocalBusinessSchema extends BaseSchema {
  "@type": "LocalBusiness";
  name: string;
  url?: string;
  description?: string;
  address?: PostalAddressSchema;
  contactPoint?: {
    "@type": "ContactPoint";
    contactType: string;
    telephone?: string;
    email?: string;
  };
  geo?: {
    "@type": "GeoCoordinates";
    latitude: number;
    longitude: number;
  };
}

export interface PersonSchema extends BaseSchema {
  "@type": "Person";
  name: string;
  url?: string;
  image?: string;
  description?: string;
}

export interface ProductSchema extends BaseSchema {
  "@type": "Product";
  name: string;
  description?: string;
  image?: string;
  url?: string;
  offers?: OfferSchema[];
}

export interface ServiceSchema extends BaseSchema {
  "@type": "Service";
  name: string;
  description?: string;
  image?: string;
  provider?: OrganizationSchema;
  areaServed?: string[];
}

export interface PostalAddressSchema {
  "@type": "PostalAddress";
  addressCountry?: string;
  addressRegion?: string;
  addressLocality?: string;
  postalCode?: string;
  streetAddress?: string;
}

export interface OfferSchema {
  "@type": "Offer";
  price?: string;
  priceCurrency?: string;
  availability?: string;
  url?: string;
}
