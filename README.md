# Logistic Landscape

A production-grade logistics industry platform built with React, Next.js, and Node.js.

## Overview

Logistic Landscape is a public logistics platform featuring:
- **Newsletter signup** (current implementation)
- **News & articles** (future)
- **Company profiles** (future)
- **Industry catalog** (future)
- **Geographic data** (future)
- **Event listings** (future)

The platform is designed to be:
- ✅ **SEO-first** with proper metadata, structured data, and canonicalization
- ✅ **AI-search-ready** (GEO optimization for ChatGPT, Perplexity, Claude)
- ✅ **Scalable** with clean domain-driven architecture
- ✅ **Maintainable** with clear ownership and reusable components
- ✅ **Type-safe** with TypeScript and shared contracts

---

## Quick Start

### Prerequisites

- Node.js 18.x or 20.x
- pnpm 9.0.0+

### Installation

```bash
git clone https://github.com/yourusername/logistic-landscape.git
cd logistic-landscape
pnpm install
```

### Development

```bash
pnpm dev
```

Visit http://localhost:3000

### Build & Deploy

```bash
pnpm build
```

Deploys automatically to Vercel on push to `main`.

---

## Project Structure

```
logistic-landscape/
├── apps/
│   └── web/                    # Next.js frontend + API routes
├── packages/
│   ├── types/                  # Shared TypeScript types
│   ├── validation/             # Zod schemas
│   ├── design-system/          # Design tokens + components
│   └── config/                 # Configuration
├── docs/
│   ├── architecture/           # Technical decisions
│   ├── design-system/          # Design token documentation
│   ├── seo/                    # SEO & GEO strategy
│   └── development/            # Setup & guides
└── .github/workflows/          # CI/CD pipeline
```

---

## Documentation

- **[Architecture Overview](docs/architecture/overview.md)** — Technical decisions and reasoning
- **[SEO Architecture](docs/seo/architecture.md)** — How SEO is implemented
- **[GEO (AI Search)](docs/seo/geo.md)** — Optimization for AI search engines
- **[Development Setup](docs/development/setup.md)** — Local development guide
- **[Design System](docs/design-system/figma-analysis.md)** — Design tokens and components

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript |
| Framework | Next.js 14 (App Router) |
| Backend | Node.js API routes + TypeScript |
| Validation | Zod |
| Design System | CSS tokens + React components |
| Testing | Vitest + React Testing Library |
| Code Quality | ESLint + Prettier |
| Deployment | Vercel |

---

## Key Features

### Newsletter Subscription

- Clean, typed API contract
- Client-side and server-side validation
- Domain-driven architecture
- Abstracted provider pattern (easily swap providers)

### SEO & Discoverability

- Automatic metadata generation
- Open Graph & Twitter cards
- JSON-LD structured data
- Sitemap generation
- Robots.txt configuration
- Canonical URLs

### AI Search Optimization

- Semantic HTML structure
- Entity-based content
- Factual accuracy
- Source transparency
- Relationship mapping
- Answer-ready content structure

### Design System

- Figma-derived design tokens
- Reusable React components
- CSS variables for theming
- Responsive design patterns
- Accessible components

---

## API Endpoints

### Newsletter

**POST** `/api/newsletter/subscribe`

```bash
curl -X POST http://localhost:3000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'
```

Response:
```json
{
  "success": true,
  "message": "Successfully subscribed to the newsletter!",
  "data": {
    "email": "user@example.com",
    "subscribedAt": "2024-08-27T12:00:00.000Z"
  }
}
```

---

## Development Commands

```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Lint code
pnpm lint

# Type check
pnpm typecheck

# Run tests
pnpm test

# Format code
pnpm format
```

---

## Project Philosophy

This is **not a prototype**—it's a production foundation.

### Design Principles

1. **Figma is source of truth** — Visual design comes from Figma, not invention
2. **Clear architecture** — Responsibility is explicit; ownership is clear
3. **Domain-driven** — Business logic lives close to the domain it belongs to
4. **SEO-first** — Every public page has proper metadata and structured data
5. **Type-safe** — TypeScript strict mode, shared contracts
6. **Accessible** — Semantic HTML, WCAG compliance
7. **Scalable** — Growing into articles, companies, etc. requires no core changes

### What This Means

- A developer joining later will understand immediately where everything lives
- Replacing a provider takes hours, not days
- Adding a new content type (articles, companies) follows the same pattern
- Styling comes from Figma, not personal preference
- Tests cover meaningful behavior, not arbitrary coverage
- Documentation explains the WHY, not just the WHAT

---

## Contributing

1. Create a feature branch: `git checkout -b feat/your-feature`
2. Make changes and commit: `git commit -am 'feat: add your feature'`
3. Ensure all checks pass: `pnpm lint && pnpm typecheck && pnpm test`
4. Push and open a pull request

---

## Deployment

### Vercel

The project is configured for Vercel:

1. Push to GitHub
2. Vercel automatically deploys on push to `main`
3. Preview deploys created for all PRs

### Environment Variables

Copy `.env.example` to `.env.local` for development:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000
```

For production, set in Vercel dashboard or `.env.production.local`.

---

## Support

- 📖 [Read the docs](docs/)
- 🐛 [Report issues](https://github.com/yourusername/logistic-landscape/issues)
- 💬 [Start a discussion](https://github.com/yourusername/logistic-landscape/discussions)

---

## License

MIT

---

## Status

- ✅ **Foundation:** Architecture, types, validation, design system
- ✅ **Newsletter:** API, form, validation, storage abstraction
- ⏳ **SEO/GEO:** Basic structure, ready for content pages
- 🔮 **Articles:** Planned (follows newsletter pattern)
- 🔮 **Companies:** Planned
- 🔮 **Locations & Industries:** Planned
