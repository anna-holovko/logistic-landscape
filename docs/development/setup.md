# Development Setup

## Prerequisites

- **Node.js:** 18.x or 20.x
- **pnpm:** 9.0.0 or higher

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/logistic-landscape.git
cd logistic-landscape
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Update `.env.local` with your configuration:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Development Server

### Start the development server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
logistic-landscape/
├── apps/
│   └── web/                    # Next.js frontend app
│       ├── src/
│       │   ├── app/            # Next.js app directory (routes, layouts)
│       │   ├── features/       # Feature domains (newsletter, articles, etc)
│       │   └── lib/            # Utilities and helpers
│       └── public/             # Static assets
│
├── packages/
│   ├── types/                  # Shared TypeScript types
│   ├── validation/             # Zod validation schemas
│   ├── design-system/          # Design tokens and React components
│   └── config/                 # Configuration constants
│
└── docs/                       # Documentation
```

## Common Commands

### Development

```bash
# Start dev server
pnpm dev

# Start dev server with specific app
pnpm --filter=web dev
```

### Building

```bash
# Build all apps
pnpm build

# Build specific app
pnpm --filter=web build
```

### Code Quality

```bash
# Run linter
pnpm lint

# Type checking
pnpm typecheck

# Run tests
pnpm test
```

## Working with Features

### Newsletter Feature

Located in `apps/web/src/features/newsletter/`

```
newsletter/
├── client/
│   ├── components/            # React components
│   ├── hooks/                 # Custom React hooks
│   └── services/              # API client
├── model/                     # Domain model (Email, types, repository)
├── application/               # Use cases (business logic)
├── infrastructure/            # Provider implementations
└── index.ts                   # Public API
```

### Adding a New Feature

1. Create `apps/web/src/features/your-feature/`
2. Follow the same structure: `client/`, `model/`, `application/`, `infrastructure/`
3. Export public API from `index.ts`
4. Use in pages/components

## API Endpoints

### Newsletter Subscription

**POST** `/api/newsletter/subscribe`

Request:
```json
{
  "email": "user@example.com"
}
```

Response (success):
```json
{
  "success": true,
  "message": "Successfully subscribed",
  "data": {
    "email": "user@example.com",
    "subscribedAt": "2024-08-27T12:00:00Z"
  }
}
```

Response (error):
```json
{
  "success": false,
  "message": "Invalid email address",
  "error": {
    "code": "INVALID_EMAIL",
    "message": "Please enter a valid email address"
  }
}
```

## Testing

### Run All Tests

```bash
pnpm test
```

### Run Tests in Watch Mode

```bash
pnpm test:watch
```

### Test Coverage

```bash
pnpm test:coverage
```

## Debugging

### Enable Debug Logs

```bash
DEBUG=* pnpm dev
```

### VS Code Debugger

Add to `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js",
      "type": "node",
      "runtimeExecutable": "node",
      "runtimeArgs": ["--inspect", "node_modules/.bin/next", "dev"],
      "cwd": "${workspaceFolder}/apps/web",
      "console": "integratedTerminal"
    }
  ]
}
```

## Deployment

### Vercel

The project is configured for Vercel deployment.

1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy

## Troubleshooting

### Module not found errors

Make sure workspace dependencies are properly installed:

```bash
pnpm install --force
```

### TypeScript errors

Type check the entire workspace:

```bash
pnpm typecheck
```

### Port 3000 already in use

Use a different port:

```bash
pnpm dev -- -p 3001
```

## Next Steps

1. Review the [Architecture Overview](../architecture/overview.md)
2. Check the [Design System Setup](../design-system/figma-analysis.md)
3. Read [SEO Architecture](../seo/architecture.md)
4. Start working on features
