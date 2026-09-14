# DEVOPS SETUP REQUIREMENTS
## Logistic Landscape Platform

**Generated**: 2026-09-14  
**Document Type**: Infrastructure Setup Guide for DevOps Engineers  
**Current Branch**: `preview` (staging), `main` (production)

---

## 1. PROJECT STACK

### Core Technologies

| Technology | Type | Current Version | Location |
|-----------|------|-----------------|----------|
| Framework | Next.js | 14.2.35 | apps/web/package.json |
| Runtime | Node.js | 20.x (18.x support) | CI: .github/workflows/ci.yml |
| Package Manager | pnpm | 9.15.9 (locked) | pnpm-lock.yaml |
| React | UI Library | 18.3.1 | apps/web/package.json |
| TypeScript | Language | 5.9.3 | apps/web/package.json |
| Styling | CSS Modules | N/A (native) | apps/web/src/shared/styles/ |
| Database | Supabase (PostgreSQL) | 2.109.0 | apps/web/package.json |
| Deployment | Vercel | (Managed) | vercel.json |
| CI/CD | GitHub Actions | Ubuntu latest | .github/workflows/ |
| Build Tool | Next.js built-in | N/A | next.config.js |

### Supporting Dependencies

| Dependency | Purpose | Version | Scope |
|-----------|---------|---------|-------|
| @supabase/supabase-js | Database client | 2.115.0 (locked) | Production |
| zod | Schema validation | (devDep) | Build/Runtime |
| pg | PostgreSQL client | 8.23.0 | Development |
| motion | Animations | 13.1.1 | Production |
| eslint | Code linting | 9.39.5 | Development |
| typescript | Type checking | 5.9.3 | Development |
| prettier | Code formatting | 3.0.0 | Development |

### Architecture

- **Monorepo**: pnpm workspaces (root package.json defines workspaces)
- **Apps**: `apps/web` (main Next.js application)
- **Packages**: `packages/*` (shared utilities - currently minimal)
- **Structure**: Feature-based organization with `/src/features`, `/src/shared`

---

## 2. RUNTIME REQUIREMENTS

### Required Versions

| Technology | Required | Current | Source | Must-Have |
|-----------|----------|---------|--------|-----------|
| **Node.js** | 18.x, 20.x | 20.20.1 | CI matrix (.github/workflows/ci.yml) | ✅ YES |
| **pnpm** | 8.x minimum | 9.15.9 | pnpm-lock.yaml lockfileVersion: 9.0 | ✅ YES |
| **React** | 18.x | 18.3.1 | apps/web/package.json | ✅ YES |
| **Next.js** | 14.2.x | 14.2.35 | apps/web/package.json | ✅ YES |
| **TypeScript** | 5.x | 5.9.3 | apps/web/package.json | ✅ YES |
| **npm** | 6.x minimum | 10.x+ | Built with Node.js | ⚠️ Via pnpm |

### Recommended Production Setup

```text
Node.js: 20.x LTS (20.20.1 or latest 20.x)
pnpm: 9.x (9.15.9 or latest 9.x)
```

### Deprecation Notes

⚠️ **Supabase Deprecation Warning** (from build logs):
- Node.js 20 is deprecated for supabase-js future versions
- Upgrade to Node.js 22+ recommended for future compatibility
- Current version (2.115.0) still supports Node.js 20

---

## 3. ENVIRONMENT VARIABLES

### 3.1 PUBLIC Variables (Frontend - Safe to expose)

| Variable | Required | Purpose | Used For | Environment | Source |
|----------|----------|---------|----------|-------------|--------|
| `NEXT_PUBLIC_SITE_URL` | ✅ YES | Application base URL | Site metadata, SEO, redirects | All | next.config.js, shared/config |
| `NEXT_PUBLIC_API_URL` | ✅ YES | API endpoint base URL | API calls, navigation | All | next.config.js, shared/config |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ YES | Supabase project URL | Database connection | All | supabase.ts |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ YES | Supabase public key | Client auth, RLS | All | supabase.ts |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | ✅ YES | Supabase publishable key | Auth flow | All | supabase.ts |

### 3.2 PRIVATE Variables (Server-side only - Never expose)

| Variable | Required | Purpose | Used For | Environment | Access |
|----------|----------|---------|----------|-------------|--------|
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ YES | Supabase admin key | Admin operations, newsletter API | Server | api/newsletter/route.ts |
| `SUPABASE_JWT_SECRET` | ⚠️ OPTIONAL | JWT signing secret | Auth token validation | Server | Not currently used |
| `SUPABASE_SECRET_KEY` | ⚠️ OPTIONAL | Supabase secret key | API authentication | Server | Not currently used |
| `POSTGRES_URL` | ✅ YES | PostgreSQL connection (pooled) | Direct DB access | Server | services/newsletter.ts |
| `POSTGRES_URL_NON_POOLING` | ✅ YES | PostgreSQL connection (non-pooled) | Migrations, admin tasks | Server | Database setup |
| `POSTGRES_USER` | ✅ YES | Database username | Connection auth | Server | setup-db.js |
| `POSTGRES_PASSWORD` | ✅ YES | Database password | Connection auth | Server | setup-db.js |
| `POSTGRES_HOST` | ✅ YES | Database hostname | Connection string | Server | setup-db.js |
| `POSTGRES_DATABASE` | ✅ YES | Database name | Schema selection | Server | setup-db.js |
| `POSTGRES_PRISMA_URL` | ⚠️ OPTIONAL | Prisma connection string | ORM (if added) | Server | Not currently used |

### 3.3 BUILD-TIME Variables

| Variable | Required | Purpose | Build | Runtime |
|----------|----------|---------|-------|---------|
| `NEXT_PUBLIC_SITE_URL` | ✅ YES | Site config | ✅ Required | ✅ Required |
| `NEXT_PUBLIC_API_URL` | ✅ YES | API config | ✅ Required | ✅ Required |
| All `NEXT_PUBLIC_SUPABASE_*` | ✅ YES | Frontend auth | ✅ Required | ✅ Required |

### 3.4 Runtime-Only Variables

| Variable | Required | Used When |
|----------|----------|-----------|
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ YES | POST /api/newsletter/subscribe |
| `POSTGRES_URL` | ✅ YES | Newsletter API operations |
| All private Postgres vars | ✅ YES | Database connections |

### 3.5 Vercel-Specific Variables

| Variable | Required | Purpose | Vercel Only |
|----------|----------|---------|-------------|
| `VERCEL_ENV` | ⚠️ OPTIONAL | Environment indicator | ✅ YES |
| `VERCEL_OIDC_TOKEN` | ⚠️ OPTIONAL | OIDC authentication | ✅ YES |
| `TURBO_CACHE` | ⚠️ OPTIONAL | Build caching | ✅ YES (Build optimization) |

### 3.6 Environment Variable Configuration per Environment

#### Local Development (.env.local)
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=<local-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<local-anon-key>
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<local-publishable-key>
SUPABASE_SERVICE_ROLE_KEY=<local-service-key>
POSTGRES_URL=postgres://...
POSTGRES_URL_NON_POOLING=postgres://...
POSTGRES_USER=...
POSTGRES_PASSWORD=...
POSTGRES_HOST=...
POSTGRES_DATABASE=...
```

#### Preview Deployment (Vercel - preview branch)
```
NEXT_PUBLIC_SITE_URL=https://logistic-landscape-preview.vercel.app
NEXT_PUBLIC_API_URL=https://logistic-landscape-preview.vercel.app
NEXT_PUBLIC_SUPABASE_URL=<preview-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<preview-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<preview-service-key>
POSTGRES_URL=<preview-pooling-url>
(All private vars set on Vercel)
```

#### Production Deployment (Vercel - main branch)
```
NEXT_PUBLIC_SITE_URL=https://logistic-landscape.vercel.app
NEXT_PUBLIC_API_URL=https://logistic-landscape.vercel.app
NEXT_PUBLIC_SUPABASE_URL=<prod-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<prod-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<prod-service-key>
POSTGRES_URL=<prod-pooling-url>
(All private vars set on Vercel)
```

---

## 4. DATABASE / SUPABASE SETUP

### Database Provider
- **Provider**: Supabase (PostgreSQL 14+)
- **Type**: Managed PostgreSQL
- **Location**: Project ID: `yyxxefwquuolwjkltvzx` (from .env.local)
- **Region**: `aws-0-us-east-1` (inferred from connection string)

### Required Tables

#### `newsletter_subscribers`
**Location**: Migration file `supabase/migrations/001_create_newsletters_table.sql`

**Schema**:
```sql
CREATE TABLE newsletter_subscribers (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  status TEXT DEFAULT 'subscribed' CHECK (status IN ('subscribed', 'unsubscribed', 'pending')),
  value TEXT,
  agreed_to_terms BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

**Indexes**:
```sql
idx_newsletter_subscribers_email (email)
idx_newsletter_subscribers_status (status)
idx_newsletter_subscribers_created_at (created_at DESC)
```

**Row Level Security (RLS)**: ✅ ENABLED

**RLS Policies**:
1. **Public Read**: `SELECT` access for everyone
2. **Public Insert**: `INSERT` access for newsletter signups
3. **Service Role Update**: `UPDATE` for admin operations (service_role only)
4. **Service Role Delete**: `DELETE` for admin operations (service_role only)

### Future Tables (Not Required Now)

The project is prepared for an articles system but does NOT require these tables now:
- `articles` (future - not implemented)
- `article_versions` (future - not implemented)
- `article_blocks` (future - not implemented)
- `article_media` (future - not implemented)

### Authentication

- **Method**: JWT via Supabase Auth
- **Public Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Service Role**: `SUPABASE_SERVICE_ROLE_KEY` (for admin operations)
- **JWT Secret**: `SUPABASE_JWT_SECRET` (optional, for custom token validation)

### Storage

**Supabase Storage Buckets**: NOT CURRENTLY CONFIGURED

Future article uploads may need:
- `article-uploads` (private bucket for user articles)
- `article-images` (public bucket for article images)

**Status**: No storage configuration required at this time.

### Database Extensions

- **UUID**: Standard (for future use)
- **PostGIS**: NOT required
- **pgvector**: NOT required
- **Custom**: None currently

### Triggers & Functions

**Current**: None defined (RLS policies handle access control)

**Future considerations** (when articles are added):
- Trigger for `updated_at` timestamp updates
- Trigger for article versioning

### Migrations

**Location**: `supabase/migrations/`

**Current**:
- `001_create_newsletters_table.sql` - Newsletter table setup

**Application**:
```bash
# Option 1: Via Supabase Dashboard (Dashboard → SQL Editor → Run)
# Option 2: Via Supabase CLI
supabase link --project-ref <your-project-ref>
supabase db push
```

**DevOps Action**: Run migration in preview and production environments after initial setup.

---

## 5. STORAGE / MEDIA

### Static Application Assets

**Location**: `apps/web/public/`

**Content Types**:
- SVG icons: `assets/preview/`, `icons/`
- PNG images: Screenshots, logos
- WebP images: Optimized backgrounds
- MP4 video: Logo animation (`logo-animation.mp4`)

**Access**: Public (CDN via Vercel)

**Serving**: Automatic via `public/` folder (Next.js)

**No Configuration Needed**: Vercel handles automatic CDN distribution.

### Asset Sizes (Reference)
- Images: 100KB - 2MB (optimized)
- SVGs: 5-50KB
- Videos: 1-5MB
- Total public folder: ~50MB

### Future Article Media

**Not Required Now**, but architecture prepared:

When articles are implemented, users may upload:
- Article images (JPEG, PNG, WebP)
- Article videos (MP4, WebM)
- Document attachments (PDF)

**Recommended Future Setup** (when needed):
1. Supabase Storage bucket: `article-uploads` (private)
2. CDN caching: Vercel Edge Network
3. Image optimization: Next.js Image component
4. File size limits: Set during implementation

**No Action Required Now**: Static assets only.

---

## 6. DEPLOYMENT

### Platform
- **Provider**: Vercel (vercel.com)
- **Account Owner**: anna-holovko-3090 (from VERCEL_OIDC_TOKEN)
- **Project**: logistic-landscape
- **Project ID**: prj_LuNmZtmh0zAVnRKuvfmAaXXrb4GJ

### Build Configuration

**Build Command**:
```bash
cd apps/web && pnpm build
```

**Install Command**:
```bash
pnpm install
```

**Output Directory**: `.next`

**Build Timeout**: 900 seconds (Vercel default)

### Deployment Configuration

**File**: Root `vercel.json`
```json
{
  "buildCommand": "cd apps/web && pnpm build",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "git": {
    "deploymentEnabled": {
      "main": true,
      "preview": true
    }
  }
}
```

**Web App Override**: `apps/web/vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next"
}
```

### Branches & Environments

| Branch | Environment | Deployment | Auto-Deploy | URL Pattern |
|--------|-------------|-----------|------------|-------------|
| `main` | Production | ✅ Manual review then auto | ✅ YES | logistic-landscape.vercel.app |
| `preview` | Staging | ✅ Automatic | ✅ YES | logistic-landscape-preview.vercel.app |
| PR branches | Preview | ✅ Automatic | ✅ YES | logistic-landscape-pr-*.vercel.app |

### Domain Configuration

**Production Domain**: NOT CONFIGURED (using vercel.app subdomain)

**To Configure Custom Domain**:
1. Vercel Dashboard → Project Settings → Domains
2. Add domain (e.g., `logistic-landscape.com`)
3. Update DNS records (provided by Vercel)
4. Update `NEXT_PUBLIC_SITE_URL` environment variable

### Environment Variables in Vercel

**Set via**: Vercel Dashboard → Settings → Environment Variables

**Configuration**:
- Mark `NEXT_PUBLIC_*` vars as "available to frontend"
- Mark all others as "only server"
- Set different values per environment (production vs preview)

### Required Environment Setup in Vercel

**Production (.vercel/project.json reference)**:
- All public Supabase vars (preview)
- All private Supabase vars (production)
- Production Postgres connection strings
- NEXT_PUBLIC_SITE_URL=https://logistic-landscape.vercel.app
- NEXT_PUBLIC_API_URL=https://logistic-landscape.vercel.app

**Preview** (staging):
- All public Supabase vars (staging)
- All private Supabase vars (staging)
- Staging Postgres connection strings
- NEXT_PUBLIC_SITE_URL=https://logistic-landscape-preview.vercel.app
- NEXT_PUBLIC_API_URL=https://logistic-landscape-preview.vercel.app

### Preview/Staging Environment

**Purpose**: Test on `preview` branch before main

**Flow**:
```
Push to preview → Vercel detects → Run build → Deploy to preview.vercel.app
```

**Database**: Staging Supabase project (separate from production)

**Note**: Newsletter table exists in staging - test signups there first

### Production Deployment

**Flow**:
```
Push to main → Vercel detects → Run CI (GitHub Actions) → Vercel builds → Deploy to main URL
```

**Automatic Deployment**: Enabled (vercel.json config)

### Rollbacks

**Vercel Rollback**:
1. Dashboard → Deployments
2. Select previous working deployment
3. Click "Promote to Production"

**Database Rollback** (if schema changes):
1. Supabase Dashboard → SQL Editor
2. Manually run rollback SQL script
3. Re-deploy application

---

## 7. CI/CD PIPELINE

### GitHub Actions Configuration

**Location**: `.github/workflows/ci.yml`

**Trigger Events**:
- `push` to `main` branch
- `pull_request` to `main` branch

**Job Matrix**:
- Runs on: `ubuntu-latest`
- Node versions: `18.x`, `20.x` (tests both)

### CI/CD Pipeline Steps

```
1. Checkout code (actions/checkout@v4)
   ↓
2. Setup pnpm v8 (pnpm/action-setup@v2)
   ↓
3. Setup Node.js with cache (actions/setup-node@v4)
   ↓
4. Install dependencies
   run: pnpm install
   ↓
5. Type check
   run: pnpm typecheck
   ↓
6. Lint
   run: pnpm lint
   (eslint configuration in root)
   ↓
7. Test
   run: pnpm test
   (vitest configured, minimal test suite)
   ↓
8. Build
   run: pnpm build
   (Full Next.js build)
   ↓
9. [PASS] Ready for Vercel deployment
   [FAIL] Block PR/push
```

### Build Scripts

**Root package.json**:
```json
{
  "dev": "cd apps/web && npm run dev",
  "build": "cd apps/web && npm run build",
  "typecheck": "cd apps/web && npm run typecheck",
  "lint": "cd apps/web && npm run lint",
  "test": "cd apps/web && npm run test"
}
```

**Web app (apps/web/package.json)**:
```json
{
  "dev": "next dev",
  "build": "npx next build",
  "start": "npx next start",
  "lint": "npx eslint src/",
  "typecheck": "npx tsc --noEmit",
  "test": "npx vitest"
}
```

### Linting

- **Tool**: ESLint 9.x
- **Config**: `eslint.config.js` (root)
- **Plugins**: @typescript-eslint, react, react-hooks, @next/next
- **Run**: `pnpm lint`

### Type Checking

- **Tool**: TypeScript 5.9.3
- **Run**: `pnpm typecheck` (no emit, errors only)
- **Strict Mode**: Enabled

### Testing

- **Framework**: Vitest
- **Status**: Configured but minimal test suite
- **Run**: `pnpm test`

### Build Validation

**Build generates**:
- `.next/` output directory (Next.js build cache)
- Static pages (pre-rendered routes)
- Server functions (API routes)

**Build succeeds if**:
- No TypeScript errors
- No ESLint errors
- All imports resolve
- All CSS modules compile
- All assets found

---

## 8. PREVIEW & PRODUCTION ENVIRONMENTS

### Environment Separation

| Aspect | Preview (staging) | Production |
|--------|------------------|-----------|
| Branch | `preview` | `main` |
| Vercel URL | logistic-landscape-preview.vercel.app | logistic-landscape.vercel.app |
| Deployment | Automatic on push | Automatic on push (after CI passes) |
| Database | Staging Supabase | Production Supabase |
| Newsletter Table | `newsletter_subscribers` (staging) | `newsletter_subscribers` (production) |
| Supabase Project | Preview project | Production project |
| Postgres Pool | Preview pooling connection | Production pooling connection |

### Environment Variables per Deployment

**Shared across both** (adapt to URL):
- `NEXT_PUBLIC_SITE_URL` (different per environment)
- `NEXT_PUBLIC_API_URL` (different per environment)
- All `NEXT_PUBLIC_SUPABASE_*` vars (different credentials)
- All private Supabase/Postgres vars (different credentials)

### Vercel Environment Configuration

**How to set up in Vercel Dashboard**:

1. Go to **Project Settings → Environment Variables**
2. Add each variable
3. Select environments:
   - "Preview" for staging vars
   - "Production" for production vars
   - "Development" for local development (not deployed)
4. Save

**Example**:
```
Variable: NEXT_PUBLIC_SITE_URL
Value (Preview): https://logistic-landscape-preview.vercel.app
Value (Production): https://logistic-landscape.vercel.app
```

### Testing the Preview Environment

**Workflow**:
1. Push a branch or changes to `preview`
2. Vercel auto-deploys to preview environment
3. Test at `logistic-landscape-preview.vercel.app`
4. Newsletter signups go to staging Supabase
5. After validation, push to `main` for production

---

## 9. SECURITY REQUIREMENTS

### Security Headers (Configured)

**Implemented in next.config.js**:

```javascript
headers: [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'  // Prevent MIME sniffing
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'  // Clickjacking prevention
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'  // XSS protection
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'  // Referrer handling
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'  // Feature permissions
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains'  // HSTS
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; ..."  // CSP policy
  }
]
```

### Row Level Security (RLS)

**Supabase RLS**: ✅ ENABLED on `newsletter_subscribers` table

**Policies**:
- Public can insert (newsletter signup)
- Public can read (verification)
- Service role can update/delete (admin management)

### API Authentication

**Newsletter Endpoint**:
- `POST /api/newsletter/subscribe`
- Public endpoint (no auth required)
- Rate limited: 5 requests per hour per IP
- Input validation: Zod schema
- Supabase anon key used (public operations only)

### Database Access

**Public Tier** (Supabase anon key):
- Newsletter table: INSERT, SELECT only
- RLS enforced

**Service Role** (Server-side key):
- Full access to all tables
- Used for admin operations
- Never exposed to client

### Environment Variable Security

**Public Variables** (Frontend-safe):
- `NEXT_PUBLIC_*` prefix
- Visible in browser
- Safe to commit if not secrets

**Private Variables** (Server-only):
- NO `NEXT_PUBLIC_` prefix
- Kept in `.env.local` (gitignored)
- Vercel encrypted storage
- Never exposed to frontend

**Vercel Secret Management**:
- Encrypted at rest
- Accessible only during build and runtime
- Rotatable per environment
- Audit logs available

### File Upload Validation

**Current**: No file uploads (static assets only)

**Future Articles** (when implemented):
- File type whitelist (JPEG, PNG, WebP only)
- File size limits (10MB max suggested)
- Virus scanning (recommended)
- User ownership validation
- Rate limiting per user

### CORS & Cross-Origin

**Current Configuration**:
- No explicit CORS headers set
- Same-origin API calls only
- Newsletter endpoint accepts POST from any origin

**Future Considerations**:
- If external APIs needed, configure CORS appropriately
- Whitelist specific origins in next.config.js

### Secrets Rotation

**Process**:
1. Generate new Supabase keys (Dashboard → API Settings)
2. Update in Vercel environment variables
3. Verify staging deployment first
4. Update production variables
5. Optionally rotate old keys (revoke if possible)

---

## 10. EXTERNAL SERVICES

### Currently Integrated

| Service | Purpose | Type | Environment Variables | Required |
|---------|---------|------|----------------------|----------|
| **Supabase** | Database & Auth | Core | NEXT_PUBLIC_SUPABASE_* SUPABASE_* | ✅ YES |
| **Vercel** | Deployment & Hosting | Core | VERCEL_OIDC_TOKEN | ✅ YES |
| **GitHub** | Source control & CI | Core | (OAuth via Vercel) | ✅ YES |
| **PostgreSQL** | Database backend | Core | POSTGRES_* | ✅ YES |

### Optional / Not Configured

| Service | Purpose | Status | Action |
|---------|---------|--------|--------|
| Analytics (Google Analytics) | User tracking | NOT CONFIGURED | Optional |
| Email Service (Sendgrid, etc) | Transactional email | NOT CONFIGURED | Future |
| CDN (Cloudflare) | Content delivery | NOT NEEDED | Vercel Edge handles it |
| Image Optimization (Imgix) | Image serving | NOT NEEDED | Next.js Image component handles it |
| Form Backend (Formspree) | Form handling | NOT NEEDED | Supabase API handles newsletter |
| Uptime Monitoring | Health checks | NOT CONFIGURED | Optional |

### Supabase Configuration Details

**Project Reference**: `yyxxefwquuolwjkltvzx` (from connection strings)

**Services Used**:
- PostgreSQL database
- Authentication (JWT)
- Row Level Security
- API (REST/GraphQL - not currently used)

**Services NOT Used**:
- Supabase Storage
- Supabase Realtime
- Supabase Vector/Embeddings
- Edge Functions

### GitHub Integration

**Connection**: Vercel OAuth (automatic)

**Permissions Required**:
- Read repository access
- Webhook access (for deployments)

**Repositories**:
- `anna-holovko/logistic-landscape` (primary)
- Branch protection: `main` (recommended)

---

## 11. FUTURE ARTICLES INFRASTRUCTURE

### Current State (This Document Date: 2026-09-14)

**Articles System Status**: ✅ Frontend template implemented, 0% backend infrastructure

**What's Ready Now**:
- ArticleTemplate component (design complete)
- Article block system (9 block types)
- Routing structure (`/articles/[slug]`)
- Article data interfaces (TypeScript)
- Mock article data (STL example)

**What's NOT Ready**:
- No database tables for articles
- No upload mechanism
- No CMS integration
- No article management UI
- No editorial workflow

### Required Now (For Frontend Only)

**Database**: NOT REQUIRED

The frontend can work with:
- Mock data (current)
- JSON files
- API responses
- External CMS

### Potential Future Infrastructure (When Uploading Is Implemented)

**Database Tables** (optional, one possible approach):

```sql
CREATE TABLE articles (
  id UUID PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  category TEXT,
  author_id UUID,
  published_at TIMESTAMP,
  updated_at TIMESTAMP,
  status TEXT DEFAULT 'draft',  -- draft, published, archived
  content_blocks JSONB,  -- Serialized block data
  featured_image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE article_versions (
  id UUID PRIMARY KEY,
  article_id UUID REFERENCES articles(id),
  version_number INTEGER,
  content_blocks JSONB,
  created_at TIMESTAMP,
  created_by UUID
);
```

**Storage** (optional, if serving images):

```yaml
Supabase Storage Buckets:
  - article-uploads (private, user-owned)
  - article-images (public, CDN cached)
```

**API Endpoints** (if custom backend):

```
POST /api/articles/upload         - Create new article
PUT /api/articles/[id]            - Update article
DELETE /api/articles/[id]         - Delete article
POST /api/articles/[id]/publish   - Publish article
GET /api/articles                 - List articles (admin)
```

**Access Control** (via RLS):

```sql
-- Only article owner or admin can edit
CREATE POLICY article_edit_policy ON articles
  FOR UPDATE
  USING (auth.uid() = author_id OR auth.role() = 'service_role');

-- Only published articles visible to public
CREATE POLICY article_visibility ON articles
  FOR SELECT
  USING (status = 'published' OR auth.uid() = author_id);
```

### NOT Implemented (Out of Scope)

- ❌ Admin dashboard
- ❌ CMS editor UI
- ❌ Drag-and-drop editor
- ❌ WYSIWYG editor
- ❌ Article versioning
- ❌ Publishing workflow
- ❌ Comments/discussions
- ❌ Collaborative editing

### Flexible Content Source

**Architecture allows**:
1. **Option A**: Custom API + database (this section)
2. **Option B**: Integrate Contentful, Sanity, or other CMS
3. **Option C**: Keep mock data + manual updates to code
4. **Option D**: Google Sheets + API middleware
5. **Option E**: User-uploaded JSON files

**No change to ArticleTemplate needed** for any option.

---

## 12. VERSION MATRIX

| Technology | Current Version | Required Minimum | Recommended | Source |
|-----------|-----------------|------------------|------------|--------|
| **Node.js** | 20.20.1 | 18.x | 20.x LTS | CI matrix, .env |
| **pnpm** | 9.15.9 | 8.x | 9.x | pnpm-lock.yaml v9.0 |
| **React** | 18.3.1 | 18.x | 18.3.1+ | pnpm-lock.yaml |
| **Next.js** | 14.2.35 | 14.2.x | 14.2.35+ | pnpm-lock.yaml |
| **TypeScript** | 5.9.3 | 5.x | 5.9.3+ | pnpm-lock.yaml |
| **npm** | NOT USED | 6.x+ | Use pnpm instead | - |
| **Supabase SDK** | 2.115.0 | 2.x | 2.115.0+ | pnpm-lock.yaml |
| **PostgreSQL** | NOT SPECIFIED | 12+ | 14+ | Supabase managed |
| **Zod** | NOT SPECIFIED | 3.x | Latest | For validation |
| **Motion** | 13.1.1 | 13.x | 13.1.1+ | pnpm-lock.yaml |
| **ESLint** | 9.39.5 | 8.x | 9.x | pnpm-lock.yaml |

### Version Compatibility Matrix

```
✅ Node.js 20.x + pnpm 9.x = ✓ Fully supported
✅ Node.js 20.x + pnpm 8.x = ✓ Works but upgrade pnpm
⚠️  Node.js 18.x + pnpm 9.x = ✓ Works (legacy)
❌ Node.js <18.x = ✗ NOT supported
```

### Deprecation Timeline

| Technology | Status | End of Life | Action |
|-----------|--------|------------|--------|
| Node.js 18 | Deprecating | 2025-04 | Upgrade to 20.x by Q1 2025 |
| Node.js 20 | Active LTS | 2026-04 | Stable; upgrade to 22.x by 2026 |
| Supabase SDK 2.x | Maintained | Current | Keep updated (2.x) |
| Next.js 14 | Maintained | Current | Keep on 14.x (or upgrade to 15.x when ready) |

---

## 13. DEVOPS ACTION CHECKLIST

### ✅ MUST CONFIGURE NOW

**Before first deployment**:

- [ ] **Vercel Account Setup**
  - [ ] Create Vercel project: "logistic-landscape"
  - [ ] Connect GitHub repository (anna-holovko/logistic-landscape)
  - [ ] Set deployment branches: `main` (production), `preview` (staging)

- [ ] **Supabase Projects** (2 required: production + staging)
  - [ ] Create production Supabase project
  - [ ] Create staging Supabase project
  - [ ] Note project URLs and keys for both
  - [ ] Copy connection strings (pooled + non-pooling)

- [ ] **Database Migrations**
  - [ ] Apply `supabase/migrations/001_create_newsletters_table.sql` to both Supabase projects
  - [ ] Verify `newsletter_subscribers` table exists in both
  - [ ] Verify RLS policies enabled on both
  - [ ] Test INSERT and SELECT permissions

- [ ] **Vercel Environment Variables** (Production)
  - [ ] NEXT_PUBLIC_SITE_URL = production domain (or vercel.app URL)
  - [ ] NEXT_PUBLIC_API_URL = production domain (or vercel.app URL)
  - [ ] NEXT_PUBLIC_SUPABASE_URL = production Supabase URL
  - [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY = production anon key
  - [ ] NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = production publishable key
  - [ ] SUPABASE_SERVICE_ROLE_KEY = production service role key (SECRET)
  - [ ] POSTGRES_URL = production pooling connection
  - [ ] POSTGRES_URL_NON_POOLING = production non-pooling connection
  - [ ] POSTGRES_USER = postgres
  - [ ] POSTGRES_PASSWORD = (SECRET - from Supabase)
  - [ ] POSTGRES_HOST = (from Supabase)
  - [ ] POSTGRES_DATABASE = postgres

- [ ] **Vercel Environment Variables** (Preview/Staging)
  - [ ] Repeat above with staging Supabase credentials
  - [ ] Different URLs and keys for staging environment

- [ ] **GitHub Actions Verification**
  - [ ] Confirm `.github/workflows/ci.yml` runs on push to main
  - [ ] Test a dummy PR to verify CI passes
  - [ ] Verify ESLint, TypeScript, Build all succeed

- [ ] **Build Verification**
  - [ ] Run locally: `pnpm install && pnpm build`
  - [ ] Verify `.next/` output directory created
  - [ ] No build errors or warnings

### ⚙️ REQUIRED FOR PREVIEW ENVIRONMENT

- [ ] **Staging Supabase Configuration**
  - [ ] Create separate Supabase project for staging
  - [ ] Apply migrations to staging
  - [ ] Set staging credentials in Vercel (Preview environment)

- [ ] **Preview Branch Workflow**
  - [ ] Protect `main` branch (require PR reviews)
  - [ ] Allow `preview` branch for experimental changes
  - [ ] Document deployment flow for team

- [ ] **Newsletter Testing** (Staging)
  - [ ] Test newsletter signup on preview environment
  - [ ] Verify email inserts into staging newsletter table
  - [ ] Test unsubscribe flow

### 🔴 REQUIRED FOR PRODUCTION

- [ ] **Production Supabase Hardening**
  - [ ] Enable automated backups
  - [ ] Configure RLS policies (already done in migration)
  - [ ] Set up monitoring/alerts for table growth
  - [ ] Document backup/restore procedures

- [ ] **Vercel Production Settings**
  - [ ] Enable production branch protection (requires PR reviews)
  - [ ] Configure custom domain (if using domain other than vercel.app)
  - [ ] Set up SSL certificate (automatic on Vercel)
  - [ ] Enable automatic rollbacks if needed

- [ ] **Monitoring & Logging**
  - [ ] Set up Vercel deployment notifications
  - [ ] Configure error tracking (optional: Sentry, etc.)
  - [ ] Monitor Supabase query performance
  - [ ] Set up database size monitoring

- [ ] **Security Hardening**
  - [ ] Verify CORS headers in next.config.js
  - [ ] Review CSP policy (currently permissive)
  - [ ] Test rate limiting on newsletter endpoint
  - [ ] Audit environment variable exposure

- [ ] **Performance Tuning**
  - [ ] Enable Vercel Analytics (optional)
  - [ ] Review Core Web Vitals in production
  - [ ] Configure caching headers for static assets
  - [ ] Monitor build times

- [ ] **Documentation**
  - [ ] Document password reset procedure
  - [ ] Document deployment rollback steps
  - [ ] Create runbook for common incidents
  - [ ] Document Supabase admin access

### 📋 REQUIRED FOR NEWSLETTER FEATURE

- [ ] **Newsletter Endpoint Testing**
  - [ ] Test POST /api/newsletter/subscribe locally
  - [ ] Verify rate limiting (5 requests/hour)
  - [ ] Test with invalid emails (should reject)
  - [ ] Verify error handling and responses
  - [ ] Test on staging environment
  - [ ] Test on production environment

- [ ] **Database Integrity**
  - [ ] Verify email uniqueness constraint works
  - [ ] Test duplicate email subscription (should update)
  - [ ] Verify timestamp fields auto-populate
  - [ ] Check index performance

### 🚀 FUTURE — ONLY WHEN ARTICLE UPLOAD IS IMPLEMENTED

- [ ] **Article Database Tables**
  - [ ] Design schema for articles
  - [ ] Create migrations for article tables
  - [ ] Set up RLS policies for article access control
  - [ ] Plan versioning/draft system

- [ ] **Article Storage Setup** (if storing images)
  - [ ] Create Supabase Storage buckets
  - [ ] Configure public/private access
  - [ ] Set up image optimization pipeline
  - [ ] Configure CDN caching

- [ ] **Article API Endpoints**
  - [ ] Implement CRUD endpoints
  - [ ] Add authentication middleware
  - [ ] Implement pagination for article lists
  - [ ] Add full-text search (if needed)

- [ ] **Article Moderation** (if user uploads)
  - [ ] Implement content review workflow
  - [ ] Set up admin dashboard
  - [ ] Configure notifications for new uploads
  - [ ] Plan spam/abuse prevention

- [ ] **Article SEO**
  - [ ] Implement sitemap for articles
  - [ ] Set up Open Graph metadata
  - [ ] Configure canonical URLs
  - [ ] Add structured data (Schema.org)

---

## 14. DEPLOYMENT CHECKLIST (Step-by-Step)

### Phase 1: Local Development Setup

```bash
# 1. Clone repository
git clone https://github.com/anna-holovko/logistic-landscape.git
cd logistic-landscape

# 2. Install dependencies
pnpm install

# 3. Create .env.local with local Supabase credentials
cp .env.example .env.local
# Edit .env.local with your local values

# 4. Verify build locally
pnpm build

# 5. Test locally
pnpm dev
# Visit http://localhost:3000
```

### Phase 2: Staging Environment

```bash
# 1. Create staging Supabase project
# - Visit supabase.com → create project
# - Get URL and keys
# - Copy project ref from connection string

# 2. Apply migrations to staging
# - Supabase Dashboard → SQL Editor
# - Copy and run: supabase/migrations/001_create_newsletters_table.sql

# 3. Configure Vercel preview environment
# - Vercel Dashboard → Settings → Environment Variables
# - Add all NEXT_PUBLIC_* vars (staging credentials)
# - Add all SUPABASE_* and POSTGRES_* vars (staging credentials)
# - Set to "Preview" environment

# 4. Push to preview branch
git checkout -b preview
git push origin preview

# 5. Vercel auto-deploys
# - Wait for build to complete
# - Verify at logistic-landscape-preview.vercel.app

# 6. Test newsletter endpoint (staging)
curl -X POST https://logistic-landscape-preview.vercel.app/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### Phase 3: Production Environment

```bash
# 1. Create production Supabase project
# - Visit supabase.com → create project
# - Get URL and keys
# - Copy project ref

# 2. Apply migrations to production
# - Supabase Dashboard → SQL Editor
# - Copy and run: supabase/migrations/001_create_newsletters_table.sql

# 3. Configure Vercel production environment
# - Vercel Dashboard → Settings → Environment Variables
# - Add all NEXT_PUBLIC_* vars (production credentials)
# - Add all SUPABASE_* and POSTGRES_* vars (production credentials)
# - Set to "Production" environment

# 4. Configure custom domain (optional)
# - Vercel Dashboard → Domains
# - Add your domain
# - Update DNS records (Vercel will show instructions)
# - Update NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_API_URL

# 5. Protect main branch
# - GitHub Repository → Settings → Branches
# - Add branch protection rule for "main"
# - Require PR review before merge
# - Require status checks to pass

# 6. First production push
git checkout main
git merge preview  # or cherry-pick specific commits
git push origin main

# 7. Vercel auto-deploys
# - Wait for CI to pass
# - Vercel builds and deploys to production

# 8. Verify production
# - Test: https://logistic-landscape.vercel.app
# - Test newsletter: curl POST /api/newsletter/subscribe
# - Check Supabase production table
```

---

## SUMMARY FOR DEVOPS ENGINEER

### Quick Reference

```yaml
Project:
  Name: Logistic Landscape
  Type: Next.js SPA with Newsletter
  Repository: anna-holovko/logistic-landscape

Stack:
  Runtime: Node.js 20.x (18.x compatible)
  Package Manager: pnpm 9.x
  Framework: Next.js 14.2.35
  Language: TypeScript 5.9.3
  Database: Supabase (PostgreSQL)
  Hosting: Vercel
  CI/CD: GitHub Actions

Environments:
  Production: main branch → logistic-landscape.vercel.app
  Staging: preview branch → logistic-landscape-preview.vercel.app
  Development: local machine

Database:
  Type: PostgreSQL (Supabase managed)
  Tables: newsletter_subscribers (RLS enabled)
  Migrations: supabase/migrations/001_*.sql

Key Features:
  - Newsletter signup (with rate limiting)
  - Blog/Articles system (frontend ready, no backend yet)
  - Responsive design
  - Security headers configured
  - SEO optimized

Infrastructure Needs:
  ✅ Vercel account + project
  ✅ Supabase projects (prod + staging)
  ✅ GitHub repository access
  ✅ Environment variables (see section 3)
  ✅ Database migrations (see section 4)

Critical Environment Variables:
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - SUPABASE_SERVICE_ROLE_KEY
  - POSTGRES_URL (all variants)
```

### Immediate Actions

1. **Create Vercel Project**: Connect GitHub repo, set branches
2. **Create 2 Supabase Projects**: One for prod, one for staging
3. **Run Migrations**: Apply newsletter table schema to both
4. **Set Environment Variables**: Add to Vercel (production + preview environments)
5. **Test Build**: Verify `pnpm build` succeeds locally
6. **Deploy Preview**: Push to `preview` branch, test staging
7. **Deploy Production**: Push to `main` branch, test production
8. **Configure Domain**: Optional - add custom domain to Vercel

### Monitoring & Maintenance

- Watch Vercel deployment logs for errors
- Monitor Supabase database size and query performance
- Set up alerts for newsletter table growth
- Review GitHub Actions CI/CD runs
- Test newsletter signup flow monthly

---

**Document Prepared For**: DevOps Engineering Team  
**Date**: 2026-09-14  
**Repository**: https://github.com/anna-holovko/logistic-landscape  
**Contact**: DevOps Lead / Infrastructure Team
