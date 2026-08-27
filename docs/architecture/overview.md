# Logistic Landscape — Architecture Overview

## Product Vision

**Logistic Landscape** is a public logistics platform currently implementing a **Newsletter signup page** with architecture designed to scale into:

- Media library
- News/articles
- Logistics company profiles
- Service catalog
- Industry categorization
- Geographic data
- Event listings
- Entity relationships (companies, locations, industries)

## Technical Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | React 18 + TypeScript | Type safety, component model, ecosystem |
| Rendering | Next.js 14 (App Router) | SSR/SSG for SEO, server components, built-in optimization |
| API | Node.js (Nitro/h3) + TypeScript | Type-safe backend, same language frontend/backend |
| Database | TBD (newsletter: in-memory stub initially) | Supports future entities |
| Deployment | Vercel | Native Next.js support, preview deploys, analytics |
| Package Manager | pnpm | Workspace support, monorepo organization |
| Testing | Vitest + React Testing Library | Modern, fast, aligned with ecosystem |
| Linting | ESLint + Prettier | Code consistency, formatting |
| Validation | Zod | Runtime schema validation, type inference |

## Architecture Decision: Rendering Strategy

### Decision: Next.js App Router with SSR + Hybrid Rendering

**Why not a pure SPA?**
- SEO is first-class requirement (section 28 of master prompt)
- Newsletter page is public, must be crawlable and indexable
- Future content pages will be editorial (articles, news) — require server rendering
- Future entity pages may have personalization — hybrid rendering (SSR for initial load + client interactivity)

**Why Next.js specifically?**
- Unified React development for frontend
- Built-in routing, metadata API, image optimization
- Server components for layout/metadata without hydration overhead
- Seamless Vercel deployment
- Strong SEO primitives (canonical, robots, sitemap)

**Rendering per page:**
- `/ (Newsletter)`: SSR (metadata, initial state)
- Future `/articles/[slug]`: SSR (SEO, per-article metadata)
- Future `/companies/[slug]`: SSR (entity metadata, structured data)
- Dynamic filters/search: client-side within SSR shell

## Architecture Decision: Monorepo Structure

**Decision: pnpm workspaces with clear package boundaries**

```
logistic-landscape/
├── apps/
│   ├── web/                     # Next.js frontend
│   └── api/                     # Node.js backend (API routes + RPC)
├── packages/
│   ├── types/                   # Shared TypeScript types
│   ├── validation/              # Shared Zod schemas
│   ├── design-system/           # Design tokens + React components
│   └── config/                  # Environment, constants
├── docs/
└── .github/                     # CI/CD
```

**Benefit:** Clear ownership, reusable schemas, single source of truth for API contract.

## Architecture Decision: Backend Integration

**Decision: API routes within Next.js (no separate Node server initially)**

The backend API will live as Next.js route handlers (`app/api/...`), not a separate server.

**Why?**
- Single deployment unit on Vercel
- Shared TypeScript types between frontend and API
- Simpler environment management
- Can extract to separate server later without API changes

**API Design:**

```
POST /api/newsletter/subscribe
Request: { email: string }
Response: { success: boolean; message: string; error?: string }
```

## Domain Boundaries

### Current Domain: Newsletter

```
features/newsletter/
├── client/
│   ├── components/              # UI components
│   ├── hooks/                   # Custom hooks (form state, etc)
│   └── services/                # Client-side services (API client)
├── server/
│   ├── use-cases/               # Business logic (subscribe use case)
│   ├── repositories/            # Data abstraction
│   └── providers/               # External service integrations
├── model/
│   ├── email.ts                 # Email value object
│   └── types.ts                 # Newsletter domain types
└── schemas/
    └── validation.ts            # Zod schemas
```

### Future Domains (Architecture ready, not implemented)

```
features/articles/
features/media/
features/companies/
features/locations/
features/industries/
```

Each domain follows the same pattern: client UI, server logic, domain model.

## SEO Architecture

SEO is not bolted on; it's built into every page.

### Page-Level SEO Contract

Every page exports a `getPageSeo()` function:

```typescript
type PageSeo = {
  title: string;
  description: string;
  canonical?: string;
  robots?: "noindex,nofollow" | "index,follow";
  ogImage?: string;
  ogType?: "website" | "article";
  structuredData?: object;
};
```

This is used by:
- Next.js metadata API (head tags)
- Open Graph / Twitter meta tags
- JSON-LD structured data
- Sitemap inclusion/exclusion
- Robots.txt directives

### Entity-Focused SEO

Entities are first-class in the domain model:

```typescript
interface Entity {
  id: string;
  type: "company" | "article" | "location" | ...;
  slug: string;
  title: string;
  description: string;
  canonicalUrl: string;
  structuredData: JsonLd.Thing;
}
```

Structured data is generated from the entity, not manually for each page.

## Design System Architecture

Design system is extracted directly from Figma.

```
design-system/
├── tokens/
│   ├── colors.ts                # Color palette
│   ├── typography.ts            # Font families, sizes, weights
│   ├── spacing.ts               # Spacing scale
│   ├── radii.ts                 # Border radii
│   ├── shadows.ts               # Drop shadows
│   └── breakpoints.ts           # Responsive breakpoints
├── components/
│   ├── button/                  # Reusable button component
│   ├── input/                   # Reusable input field
│   ├── form-field/              # Form field wrapper
│   ├── card/                    # Card container
│   ├── section/                 # Page section container
│   ├── logo/                    # Logistic Landscape logo
│   └── typography/              # Text, heading components
├── styles/
│   └── globals.css              # CSS variables for tokens
└── index.ts                     # Export all
```

## API Contract

Shared types bridge frontend and API.

```typescript
// packages/types/newsletter.ts
export interface NewsletterSubscribeRequest {
  email: string;
}

export interface NewsletterSubscribeResponse {
  success: boolean;
  message: string;
  error?: {
    code: string;
    message: string;
  };
}

export type NewsletterError = 
  | "INVALID_EMAIL"
  | "DUPLICATE_EMAIL"
  | "PROVIDER_ERROR"
  | "RATE_LIMITED"
  | "INTERNAL_ERROR";
```

Frontend and API are typed against the same contract. Validation is consistent.

## Error Handling

Typed error hierarchy:

```typescript
// domain/errors.ts
export class NewsletterError extends Error {
  constructor(
    public code: NewsletterErrorCode,
    message: string,
    public statusCode = 400
  ) {
    super(message);
  }
}

export type NewsletterErrorCode = 
  | "INVALID_EMAIL"
  | "DUPLICATE_SUBSCRIPTION"
  | "PROVIDER_UNAVAILABLE"
  | "RATE_LIMITED";
```

API returns typed error responses. Frontend maps to user-facing messages.

## Testing Strategy

```
Unit tests: Domain/application logic
  - Email validation
  - Use case business logic
  - Repository abstraction

Integration tests: API endpoints
  - POST /api/newsletter/subscribe
  - Error scenarios
  - Provider integration

Component tests: React components
  - Form submission
  - Validation display
  - Success/error states
  - Loading states

E2E tests: User workflows (future)
```

## Performance Strategy

- **Images:** Next.js Image optimization, Figma assets optimized
- **Fonts:** WOFF2, font-display: swap
- **Bundle:** Code splitting per route, tree-shaking
- **Hydration:** Minimal client-side JavaScript for newsletter page
- **Caching:** Revalidation strategy for future content pages
- **Analytics:** Web Vitals tracking

## Deployment Strategy

**Environment:** Vercel (native Next.js support)

**Configuration:**
- `main` branch → Production
- Preview deploys for PRs
- Environment variables for API keys (provider integrations)

**CI/CD:**
- Install: pnpm
- Lint: ESLint
- Type check: tsc
- Test: vitest
- Build: next build

All must pass before merge.

## Future Expansion Points

### Adding a New Content Type (e.g., Articles)

1. Create `features/articles/` following newsletter pattern
2. Add article entity model
3. Create `getPageSeo()` for article pages
4. Add article routes in Next.js router
5. Update sitemap generation
6. Add structured data (NewsArticle, Article)
7. Tests follow same pattern

### Replacing the Newsletter Provider

The provider is abstracted behind a repository interface:

```typescript
interface NewsletterRepository {
  subscribe(email: Email): Promise<SubscribeResult>;
}
```

Concrete implementations live in `infrastructure/providers/`:
- `brevo-provider.ts`
- `mailchimp-provider.ts`
- `in-memory-provider.ts` (for tests)

Switch providers without touching domain/application logic.

### Adding Multilingual Support

- URL structure: `/en/`, `/de/`, `/es/`
- `hreflang` links via Next.js i18n routing
- Structured data per language
- Metadata translated per page

Architecture supports this without core changes.

## Code Quality & Maintainability

### TypeScript Configuration

- `strict: true`
- No implicit any
- Enforce exhaustive pattern matching

### Naming Conventions

- Components: PascalCase (`NewsletterForm.tsx`)
- Utilities/functions: camelCase (`validateEmail.ts`)
- Types: PascalCase (`NewsletterRequest`)
- Constants: UPPER_SNAKE_CASE (`MAX_EMAIL_LENGTH`)
- Directories: lowercase with hyphens (`form-field/`, `use-cases/`)

### Module Exports

Every module exports a single primary export + supporting types:

```typescript
// components/button/Button.tsx
export const Button: React.FC<ButtonProps> = ...;

// components/button/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

### No Arbitrary Utils Directories

Business logic stays close to the domain it belongs to.

Utilities → design system or framework (React hooks).

### Documentation as Code

- README per module explaining responsibility
- JSDoc comments for public APIs (why, not what)
- Architecture decisions in `/docs`
- No orphaned markdown files

## Scalability Strategy

As the platform grows:

1. **Entity-heavy:** Add Company, Article, Location entities following domain pattern
2. **Search:** Implement full-text search across entities
3. **Relationships:** Leverage structured data and entity connections
4. **Performance:** Page caching, CDN edge functions, incremental static regeneration
5. **Internationalization:** Add language routing and translation management
6. **Analytics:** Page analytics, entity popularity, user journey tracking
7. **Admin:** Add content management for articles, companies, events
8. **API v1/v2:** Version API endpoints when breaking changes occur

None of these require fundamental architecture changes—they extend the domain pattern.

---

This architecture is intentionally designed to be understood by a developer joining the team six months later. Every boundary is explicit. Every responsibility is clear.
