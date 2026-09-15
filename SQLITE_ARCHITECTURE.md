# SQLite Database Architecture

## Overview

This application uses SQLite for newsletter subscriptions with different deployment configurations for each environment.

## Database Locations

### Local Development
- **Path**: `apps/newsletter.db`
- **Persistence**: ✅ Persistent (stored in project directory)
- **Status**: Fully functional
- **Table**: `newsletter_subscribers`

### Vercel Preview Deployment
- **Path**: `/var/task/newsletter.db` (ephemeral runtime filesystem)
- **Persistence**: ❌ NOT persistent (reset after deployment)
- **Status**: API/UI testable, but database does not persist between deployments
- **Table**: `newsletter_subscribers_preview`
- **Limitation**: Serverless runtime provides ephemeral filesystem; SQLite data is lost after function execution
- **Recommendation**: Use Vercel Preview for testing API/UI only; do NOT rely on database persistence in Preview

### Production Linux Server (Persistent Deployment)
- **Path**: `/var/lib/logistic-landscape/data/newsletter.db`
- **Persistence**: ✅ Persistent (on permanent filesystem)
- **Status**: Fully functional
- **Table**: `newsletter_subscribers`
- **Configuration**: `NODE_ENV=production` without `VERCEL` env var triggers production path

## Table Names

The application uses different tables based on deployment environment:

```typescript
const env = process.env.VERCEL_ENV || 'production';
return env === 'preview' ? 'newsletter_subscribers_preview' : 'newsletter_subscribers';
```

- **Production/Local**: `newsletter_subscribers`
- **Vercel Preview**: `newsletter_subscribers_preview`

## Database Path Logic

See `apps/web/src/services/db.ts`:

1. **Explicit override**: If `DATABASE_PATH` env var is set, use it
2. **Production non-Vercel**: Use `/var/lib/logistic-landscape/data/newsletter.db`
3. **Development/Vercel Preview**: Use project-relative `apps/newsletter.db`

## Known Limitations

### Vercel Preview
- SQLite data does NOT persist between deployments
- Each deployment gets a fresh runtime with no prior database state
- The `newsletter_subscribers_preview` table remains empty in local inspection
- Use Vercel Preview for API endpoint testing and UI validation only

### Alternatives for Preview Persistence
If persistent database needed for Preview testing:
- Migrate to Vercel Postgres or Vercel KV
- Use external PostgreSQL/MySQL database
- Accept that Preview testing is stateless (recommended for now)

## Recommended Workflow

1. **Local Development**: Test with persistent SQLite at `apps/newsletter.db`
2. **Vercel Preview**: Test API/UI endpoints; ignore database persistence
3. **Production**: Deploy to persistent Linux server with SQLite at `/var/lib/logistic-landscape/data/newsletter.db`
