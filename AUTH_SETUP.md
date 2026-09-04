# Supabase Authentication Setup

This project uses Supabase Authentication for user management and authentication.

## Authentication Endpoints

### 1. Sign Up (Register New User)

**Endpoint:** `POST /api/auth/signup`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "fullName": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "user_metadata": {
      "full_name": "John Doe"
    }
  }
}
```

### 2. Sign In (Login)

**Endpoint:** `POST /api/auth/signin`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Signed in successfully",
  "session": {
    "access_token": "eyJhbGc...",
    "refresh_token": "..."
  },
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

### 3. Sign Out (Logout)

**Endpoint:** `POST /api/auth/signout`

**Response:**
```json
{
  "success": true,
  "message": "Signed out successfully"
}
```

### 4. Get Current Session

**Endpoint:** `GET /api/auth/session`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

## Environment Variables Required

These should already be set in your `.env.local` and Vercel:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (secret)

## Supabase Configuration

### Enable Email/Password Authentication

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your **logistic-landscape** project
3. Go to **Authentication** → **Providers**
4. Enable **Email** provider
5. Configure email templates if needed

### JWT Configuration

JWT tokens are automatically managed by Supabase. Tokens expire after a configurable period (default 3600 seconds / 1 hour).

### Password Requirements

Supabase uses the following default password requirements:
- Minimum 6 characters
- Can be customized in Authentication settings

## Testing Authentication

### Test Sign Up
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpass123",
    "fullName": "Test User"
  }'
```

### Test Sign In
```bash
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpass123"
  }'
```

### Test Get Session
```bash
curl -X GET http://localhost:3000/api/auth/session \
  -H "Authorization: Bearer {access_token}"
```

## Security Considerations

1. **HTTPS Only** - Always use HTTPS in production
2. **HttpOnly Cookies** - Session tokens should be stored in HttpOnly cookies
3. **CORS** - Configure CORS properly for your frontend domain
4. **Rate Limiting** - Implement rate limiting on auth endpoints
5. **Password Reset** - Implement password reset flow with email verification
6. **MFA** - Consider implementing Multi-Factor Authentication

## Next Steps

1. ✅ Authentication API routes are set up
2. ⏳ Create authentication UI components (Login, Signup forms)
3. ⏳ Implement session management in frontend
4. ⏳ Add protected routes/pages for authenticated users
5. ⏳ Set up password reset flow
