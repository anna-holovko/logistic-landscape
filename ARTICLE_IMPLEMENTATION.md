# Article Template Implementation

## Overview

A pixel-perfect, reusable Article Template has been implemented for the Logistic Landscape website. The architecture is designed to separate content from presentation, allowing the content source to be replaced later without changing the visual components.

**Build Status**: ✅ Successfully compiled and deployed
**Route**: `/articles/[slug]`
**Static Generation**: Enabled via `generateStaticParams()`

---

## Architecture

### Content Model

Articles are defined by the `Article` interface:

```typescript
interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
  readTime?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  tags?: string[];
  blocks: ArticleBlock[];
}
```

This interface is **content-source agnostic**. Articles can come from:
- Database (Supabase, PostgreSQL, MongoDB, etc.)
- CMS (Contentful, Sanity, Strapi, etc.)
- API endpoints
- User uploads
- Structured files (JSON, YAML, etc.)
- Google Sheets or other external sources

As long as the data conforms to the `Article` interface, the template components remain unchanged.

---

## Block Types

The article body is composed of reusable content blocks. Each block type has its own component and styling:

### 1. **TextBlock**
- **Purpose**: Body text paragraphs
- **Component**: `TextBlock.tsx`
- **Props**: `{ type: "text"; content: string }`
- **Styling**: 20px font size, navy color, normal weight

### 2. **HeadingBlock**
- **Purpose**: Section headings (H1-H4)
- **Component**: `HeadingBlock.tsx`
- **Props**: `{ type: "heading"; level: 1|2|3|4; content: string }`
- **Styling**: 
  - H1: Petrona 60px, semibold
  - H2: Petrona 40px italic
  - H3: IBM Plex 24px
  - H4: IBM Plex 20px

### 3. **QuoteBlock**
- **Purpose**: Pull quotes and testimonials
- **Component**: `QuoteBlock.tsx`
- **Props**: `{ type: "quote"; content: string; author?: string }`
- **Styling**: Card with paper background, bordered

### 4. **SummaryBlock**
- **Purpose**: Numbered summary points (like "Quick summary" section)
- **Component**: `SummaryBlock.tsx`
- **Props**: `{ type: "summary"; title: string; items: Array<{number, content}> }`
- **Styling**: Boxed layout with numbered items

### 5. **NumberedListBlock**
- **Purpose**: Numbered steps with title and description
- **Component**: `NumberedListBlock.tsx`
- **Props**: `{ type: "numbered-list"; items: Array<{number, title, description}> }`
- **Styling**: Large numbers, structured content

### 6. **ListBlock**
- **Purpose**: Bullet-point lists
- **Component**: `ListBlock.tsx`
- **Props**: `{ type: "list"; items: string[] }`
- **Styling**: Brick-colored dash bullets

### 7. **TableBlock**
- **Purpose**: Comparison and reference tables
- **Component**: `TableBlock.tsx`
- **Props**: `{ type: "table"; title?: string; headers: string[]; rows: Record<string, string>[] }`
- **Styling**: Bordered table with paper background headers

### 8. **CompanyBlock**
- **Purpose**: Companies mentioned in the article
- **Component**: `CompanyBlock.tsx`
- **Props**: `{ type: "companies"; title: string; companies: Array<{id, name, category, description, link}> }`
- **Styling**: List layout with links

### 9. **GridBlock**
- **Purpose**: 2x2 grid of related companies or topics
- **Component**: `GridBlock.tsx`
- **Props**: `{ type: "grid"; items: Array<{id, title, category, description, link}> }`
- **Styling**: Responsive 2-column grid (1 column on mobile)

---

## Component Structure

```
src/features/articles/
├── types.ts                          # Article and block type definitions
├── data.ts                           # Mock/development data source
├── index.ts                          # Public exports
└── components/
    ├── ArticleTemplate.tsx           # Main article page component
    ├── ArticleTemplate.module.css    # Article layout styling
    ├── ArticleBlockRenderer.tsx      # Block type dispatcher
    ├── blocks.module.css             # All block component styles
    ├── TextBlock.tsx
    ├── HeadingBlock.tsx
    ├── QuoteBlock.tsx
    ├── SummaryBlock.tsx
    ├── NumberedListBlock.tsx
    ├── ListBlock.tsx
    ├── TableBlock.tsx
    ├── CompanyBlock.tsx
    ├── GridBlock.tsx
    └── index.ts                      # Component exports
```

---

## Routing

### Dynamic Route
- **Path**: `src/app/articles/[slug]/page.tsx`
- **URL Pattern**: `/articles/small-truck-load-explained`
- **Features**:
  - Automatic SEO metadata generation
  - Static page pre-rendering via `generateStaticParams()`
  - 404 handling for non-existent articles

### Example Routes
- `/articles/small-truck-load-explained` - Main article example

---

## Styling System

The implementation uses CSS Modules with design tokens:

### Design Tokens (CSS Variables)
- **Colors**: Navy (#152A31), Brick (#BE5B3F), Paper (#F4EDE0), Water (#1E3C45)
- **Typography**: Petrona (display), IBM Plex Sans (body)
- **Spacing**: 4px, 8px, 12px, 16px, 20px, 24px, 32px
- **Border Radius**: 2px, 4px, 6px, 8px, 12px, 16px
- **Breakpoints**: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)

### Layout Constraints
- **Desktop**: 320px horizontal padding, 120px vertical padding
- **Tablet**: 100px horizontal padding
- **Mobile**: 20px horizontal padding, 60px top / 50px bottom padding

---

## Current Content Source

### Development Mock Data
**Location**: `src/features/articles/data.ts`

The `smallTruckLoadArticle` provides example article data that demonstrates all block types:
- Hero section with title, excerpt, metadata, and tags
- Quick summary block (5 numbered points)
- Multiple heading and text blocks
- Numbered list block (5 steps)
- Table block (comparison table)
- Bullet list block
- Company block (2 companies mentioned)
- Grid block (4 related companies)

**Access**: `http://localhost:3000/articles/small-truck-load-explained`

---

## Future Content Source Integration

The architecture is ready to accept articles from any source. To integrate a new content source:

### Step 1: Update Data Source
Replace `src/features/articles/data.ts` with a function that fetches articles:

```typescript
// Example: Database
export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const article = await db.articles.findOne({ slug });
  return article;
}

// Example: CMS
export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const article = await contentful.getArticleBySlug(slug);
  return parseArticleFromCMS(article);
}

// Example: API
export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const response = await fetch(`/api/articles/${slug}`);
  return response.json();
}
```

### Step 2: Update Route Handler
Modify `src/app/articles/[slug]/page.tsx` if needed for dynamic fetching:

```typescript
export async function generateStaticParams() {
  // Fetch all article slugs from your source
  const articles = await getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}
```

### Step 3: No Component Changes Required
The `ArticleTemplate` and block components remain completely unchanged.

---

## Pixel-Perfect Design Details

### Hero Section
- **Background**: Water color with texture overlay and gradient
- **Typography**: 60px Petrona SemiBold title
- **Metadata**: 16px IBM Plex Sans Medium Italic, gold and paper colors
- **Tags**: Dark water background, bordered pills with 4px border radius
- **Spacing**: 40px gap between title and excerpt, 20px gap for tags

### Body Sections
- **Max Width**: 800px content area
- **Background**: Paper Light (#F7F2E9)
- **Section Gaps**: 60px between blocks
- **Typography**: Consistent with design tokens

### Responsive Behavior
- **Tablet (1024px)**: Reduced padding, adjusted typography sizes
- **Mobile (768px)**: 
  - Hero title: 36px (from 60px)
  - Body padding: 20px horizontal
  - Section gaps: 40px (from 60px)
  - Grid: 1 column (from 2)

---

## Features Implemented

✅ Block-based content system
✅ Reusable block components
✅ Content-source agnostic architecture
✅ Pixel-perfect responsive design
✅ SEO metadata generation
✅ Static page generation
✅ CSS Modules styling
✅ Design token system
✅ Type-safe interfaces
✅ 9 block types (Text, Heading, Quote, Summary, NumberedList, List, Table, Company, Grid)

---

## Features NOT Implemented (Out of Scope)

As per requirements, these features are intentionally not included:
- ❌ Admin dashboard
- ❌ CMS editor UI
- ❌ Article management interface
- ❌ Drag-and-drop editor
- ❌ User article upload system
- ❌ Publishing workflow
- ❌ Comments/ratings
- ❌ Related articles auto-linking

These can be added later without modifying the Article Template.

---

## Testing

### Build Verification
```bash
cd apps/web
npm run typecheck  # ✅ Passed
npm run build      # ✅ Passed
npm run dev        # ✅ Running at localhost:3000
```

### Article Page Access
- **URL**: http://localhost:3000/articles/small-truck-load-explained
- **Status**: ✅ Rendering correctly
- **Metadata**: ✅ Generated correctly
- **Responsive**: ✅ Mobile, tablet, desktop layouts working

---

## File Structure Summary

```
apps/web/src/
├── app/
│   └── articles/
│       └── [slug]/
│           └── page.tsx              # Dynamic article page route
├── features/
│   └── articles/
│       ├── types.ts                  # Article + Block type definitions
│       ├── data.ts                   # Mock article data
│       ├── index.ts                  # Barrel exports
│       └── components/
│           ├── ArticleTemplate.tsx
│           ├── ArticleTemplate.module.css
│           ├── ArticleBlockRenderer.tsx
│           ├── blocks.module.css
│           ├── TextBlock.tsx
│           ├── HeadingBlock.tsx
│           ├── QuoteBlock.tsx
│           ├── SummaryBlock.tsx
│           ├── NumberedListBlock.tsx
│           ├── ListBlock.tsx
│           ├── TableBlock.tsx
│           ├── CompanyBlock.tsx
│           ├── GridBlock.tsx
│           └── index.ts
```

---

## Key Design Decisions

1. **Types First**: All article structures defined in TypeScript for type safety
2. **Block-Based Architecture**: Articles composed of reusable blocks, not monolithic
3. **Content Agnostic**: No assumptions about content source
4. **CSS Modules**: Scoped styles prevent naming conflicts
5. **Design Tokens**: All colors/spacing use CSS variables for consistency
6. **Static Generation**: Articles pre-rendered at build time for performance
7. **SEO Ready**: Automatic metadata generation from article data

---

## Next Steps

1. **Content Population**: Replace mock data with real content source (CMS, database, API, etc.)
2. **Additional Blocks**: Add more block types as needed (video, gallery, callout, etc.)
3. **Search/Filtering**: Implement article search and category filtering
4. **Related Articles**: Add "Related Articles" section
5. **Comments**: Add reader comments/discussion
6. **Analytics**: Track article views and engagement

All of these can be added without modifying the core Article Template.
