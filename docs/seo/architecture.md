# SEO Architecture

## Overview

SEO is built into the architecture at every level. This document explains the approach.

---

## Page-Level SEO Contract

Every public page exports a `getPageSeo()` function that returns comprehensive metadata:

```typescript
interface PageSeo {
  title: string;                    // Page title for <title> and Open Graph
  description: string;              // Meta description
  canonical: string;                // Canonical URL
  robots?: string;                  // Robots directive
  ogType?: OpenGraphType;           // Open Graph type (website, article, etc)
  ogImage?: string;                 // Open Graph image
  twitterCard?: TwitterCardType;    // Twitter card type
  structuredData?: StructuredData;  // JSON-LD structured data
}
```

### Example: Homepage

Located in `apps/web/src/lib/seo/homepage-seo.ts`, the homepage SEO is generated from:
- Site configuration (name, description, URL)
- Open Graph metadata
- Twitter card metadata
- JSON-LD WebSite schema

---

## Implementation

### In Next.js Metadata API

```typescript
export const metadata: Metadata = (() => {
  const seo = getPageSeo();
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      url: seo.canonical,
      images: seo.ogImage ? [{ url: seo.ogImage }] : undefined,
    },
    twitter: {
      card: seo.twitterCard,
      title: seo.twitterTitle,
      description: seo.twitterDescription,
    },
  };
})();
```

### JSON-LD Structured Data

Structured data is injected into the page as a `<script type="application/ld+json">` tag:

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(getPageSeo().structuredData),
  }}
/>
```

---

## Entity-Based SEO

Future content pages (articles, companies, locations) will be entity-based:

```typescript
interface Entity {
  id: string;
  type: "article" | "company" | "location" | ...;
  slug: string;
  title: string;
  description: string;
  canonicalUrl: string;
  structuredData: JsonLd.Thing;
}
```

The SEO system generates:
1. **URL:** `/articles/[slug]`, `/companies/[slug]`, etc.
2. **Metadata:** From entity properties
3. **Structured Data:** Type-specific schema (Article, Organization, Place, etc.)
4. **Relationships:** Internal links reflect entity connections

---

## Sitemap Strategy

The sitemap will be generated from:
- Static pages (homepage, about, etc.)
- Published entities (articles, companies, etc.)
- Exclude: noindex pages, drafts, unpublished content

Implementation: `apps/web/src/app/sitemap.ts` (Next.js 13.3+)

---

## Robots.txt Strategy

- Allow crawling of all public pages
- Disallow: `/api/`, `/admin/` (when added), draft content
- Provide sitemap location

Implementation: `apps/web/src/app/robots.ts` (Next.js 13.3+)

---

## Canonical URLs

All pages have explicit canonical URLs to prevent duplicate content issues:

- Homepage: `https://logistic-landscape.com/`
- Article: `https://logistic-landscape.com/articles/article-slug`
- Company: `https://logistic-landscape.com/companies/company-slug`

---

## Open Graph & Twitter

Social media previews are generated from:
- Page metadata
- Entity thumbnail images
- Site branding

Ensure images are optimized:
- OG Image: 1200x630px (16:9 ratio)
- Twitter Image: 1200x675px (16:9 ratio)

---

## Structured Data Types

### Current
- WebSite (homepage)
- WebPage (pages in general)

### Future
- Article / NewsArticle (for news/articles)
- BreadcrumbList (for hierarchical navigation)
- Organization (company pages)
- Place / LocalBusiness (location pages)
- ItemList (catalog/search results)
- Person (author bios)

---

## SEO Best Practices

### ✅ DO

- Use semantic HTML (`<h1>`, `<h2>`, proper heading hierarchy)
- Include alt text for all meaningful images
- Write descriptive page titles (50-60 characters)
- Write unique meta descriptions (150-160 characters)
- Use clear, descriptive anchor text for internal links
- Implement consistent canonical URLs
- Use structured data for entities
- Optimize images (size, format, responsive)

### ❌ DON'T

- Stuff keywords
- Hide content from users
- Use cloaking or sneaky redirects
- Create doorway pages
- Fabricate structured data
- Return HTTP 200 for 404 pages
- Overuse NOINDEX
- Use rel="nofollow" for internal navigation

---

## Testing SEO

### Tools
- [Google Search Console](https://search.google.com/search-console)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [Mobile Friendly Test](https://search.google.com/mobile-friendly/)

### Checklist Before Launch
- [ ] All pages have unique titles
- [ ] All pages have unique descriptions
- [ ] Canonical URLs are set correctly
- [ ] Robots.txt is configured
- [ ] Sitemap is generated and valid
- [ ] Structured data passes validation
- [ ] Open Graph/Twitter metadata is present
- [ ] Images have alt text
- [ ] Internal links are semantic
- [ ] Core Web Vitals are optimized
- [ ] Mobile-friendly design confirmed
- [ ] 404 page returns correct status code
- [ ] Redirects are 301, not 302

---

## Future: AI Search Engine Optimization (AEO)

The platform is designed to be AI-search-ready:

- **Semantic HTML:** AI engines understand structure without CSS
- **Entity clarity:** Explicit entity types via structured data
- **Factual accuracy:** No misleading or fabricated information
- **Source transparency:** Author, date, publisher information clear
- **Relationship mapping:** Internal links show entity connections
- **Question-answer format:** Content structured for direct answers

See [GEO Architecture](./geo.md) for more details.
