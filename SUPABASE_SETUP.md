# Supabase Setup for Newsletter Database

## Database Configuration

The newsletter subscription system uses Supabase to store subscriber emails.

### Apply the Migration

You can apply the database migration in one of two ways:

#### Option 1: Using Supabase Dashboard (Recommended)

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project `logistic-landscape`
3. Go to **SQL Editor**
4. Click **New Query**
5. Copy and paste the contents of `supabase/migrations/001_create_newsletters_table.sql`
6. Click **Run**

#### Option 2: Using Supabase CLI

```bash
npm install -g @supabase/cli
supabase link --project-ref <your-project-ref>
supabase db push
```

### Table Schema

The migration creates a `newsletters` table with:
- `id`: Primary key (BIGSERIAL)
- `email`: Unique email address (TEXT)
- `agreed_to_terms`: Boolean flag for GDPR/terms (BOOLEAN)
- `subscribed_at`: Subscription timestamp (TIMESTAMP)
- `updated_at`: Last update timestamp (TIMESTAMP)
- `created_at`: Creation timestamp (TIMESTAMP)

### Row Level Security (RLS)

The table has RLS enabled with policies:
- **Public users**: Can read and insert newsletter subscriptions
- **Service role**: Can update and delete subscriptions (for admin management)

### API Endpoint

The newsletter subscription API is at:
```
POST /api/newsletter/subscribe
```

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thanks for subscribing! Check your email for updates.",
  "data": {
    "email": "user@example.com",
    "subscribedAt": "2024-09-04T12:00:00Z"
  }
}
```

### Environment Variables

Ensure these are set in Vercel:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (secret)

These are already configured in your `.env.local` and Vercel environment.

### Testing

After applying the migration, test the endpoint:

```bash
curl -X POST http://localhost:3000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

Or use the newsletter form on the homepage.

### Viewing Subscribers

To view subscribed emails in Supabase Dashboard:
1. Go to **SQL Editor**
2. Run: `SELECT * FROM newsletters ORDER BY subscribed_at DESC;`
