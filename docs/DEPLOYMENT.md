# Deployment Guide

This application is designed to be deployable to **two environments in parallel**:
1. **Vercel** - for Preview/development and potential production
2. **External Server** - for DevOps-managed production deployments

Both deployments use the same codebase and database architecture (SQLite).

---

## Overview

**Architecture:**
```
Frontend (Next.js)
    ↓
API Routes (Next.js)
    ↓
SQLite Database
```

**Database:**
- Engine: SQLite (better-sqlite3)
- Tables: newsletter_subscribers, newsletter_subscribers_preview
- Persistence: Local file system
- No external database service required

---

## Vercel Deployment

### Prerequisites
- Vercel account
- Git repository (GitHub, GitLab, or Bitbucket)

### Configuration
1. Connect repository to Vercel project
2. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SITE_URL` - Application base URL
   - `NEXT_PUBLIC_API_URL` - API base URL (can be same as site URL)
   - `NODE_ENV` - Set to `production`

3. Optional:
   - `DATABASE_PATH` - If not set, uses project-relative path (./newsletter.db)

### Build Settings
- **Framework:** Next.js
- **Build Command:** `cd apps/web && pnpm build`
- **Install Command:** `pnpm install`
- **Output Directory:** `.next` (handled by Next.js)

### Important Notes
- Vercel provides ephemeral filesystems on preview deployments
- For production on Vercel, ensure database persistence strategy is suitable
- Preview deployments have fresh databases
- Newsletter data on Vercel preview deployments is NOT persistent between redeploys

### Preview Deployment
Preview deployments work automatically on pull requests:
```
git push origin feature-branch
→ Vercel automatically creates a preview deployment
→ Access via preview URL in PR
```

### Deployment Flow
```
Git → Vercel → Build → Next.js Build → Deploy to edge/serverless
```

---

## External Server Deployment

### Prerequisites
- Linux server (Ubuntu 20.04+ recommended)
- Node.js 20.x installed
- Git installed
- Nginx or reverse proxy
- SSL certificate (Let's Encrypt recommended)
- Sufficient disk space for SQLite database

### Installation Steps

#### 1. Clone Repository
```bash
cd /var/lib/applications
git clone https://github.com/anna-holovko/logistic-landscape.git
cd logistic-landscape
```

#### 2. Install Dependencies
```bash
nvm use  # Uses .nvmrc (Node.js 20)
pnpm install
```

#### 3. Create Data Directory
```bash
sudo mkdir -p /var/lib/logistic-landscape/data
sudo chown -R www-data:www-data /var/lib/logistic-landscape/data
sudo chmod 755 /var/lib/logistic-landscape/data
```

#### 4. Environment Configuration
Create `.env.production`:
```bash
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://your-domain.com
DATABASE_PATH=/var/lib/logistic-landscape/data/newsletter.db
```

#### 5. Initialize Database
```bash
DATABASE_PATH=/var/lib/logistic-landscape/data/newsletter.db node setup-db.js
```

Verify database was created:
```bash
ls -lh /var/lib/logistic-landscape/data/newsletter.db
```

#### 6. Build Application
```bash
pnpm build
```

#### 7. Configure Process Manager

**Option A: PM2**
```bash
npm install -g pm2
pm2 start apps/web/.next/standalone/server.js \
  --name logistic-landscape \
  --env NODE_ENV=production \
  --env DATABASE_PATH=/var/lib/logistic-landscape/data/newsletter.db
pm2 startup
pm2 save
```

**Option B: Systemd Service**
Create `/etc/systemd/system/logistic-landscape.service`:
```ini
[Unit]
Description=Logistic Landscape
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/lib/applications/logistic-landscape
Environment="NODE_ENV=production"
Environment="DATABASE_PATH=/var/lib/logistic-landscape/data/newsletter.db"
ExecStart=/home/deploy/.nvm/versions/node/v20.20.1/bin/node apps/web/.next/standalone/server.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable logistic-landscape
sudo systemctl start logistic-landscape
sudo systemctl status logistic-landscape
```

#### 8. Configure Nginx
Create `/etc/nginx/sites-available/logistic-landscape`:
```nginx
upstream logistic-landscape {
    server 127.0.0.1:3000;
}

server {
    listen 80;
    server_name your-domain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    # SSL certificates (use Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # Proxy settings
    location / {
        proxy_pass http://logistic-landscape;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Static files caching
    location /_next/static/ {
        expires 365d;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/logistic-landscape /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 9. SSL Certificate (Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d your-domain.com
```

#### 10. Configure Backups
SQLite database backup script:
```bash
#!/bin/bash
# /usr/local/bin/backup-logistic-landscape.sh
BACKUP_DIR="/var/backups/logistic-landscape"
DB_PATH="/var/lib/logistic-landscape/data/newsletter.db"

mkdir -p "$BACKUP_DIR"
cp "$DB_PATH" "$BACKUP_DIR/newsletter.db.backup.$(date +%Y%m%d-%H%M%S)"

# Keep only last 30 backups
find "$BACKUP_DIR" -name "newsletter.db.backup.*" -mtime +30 -delete
```

Add to crontab:
```bash
sudo crontab -e
# Add: 0 2 * * * /usr/local/bin/backup-logistic-landscape.sh
```

### Monitoring
Check application status:
```bash
# With PM2
pm2 status

# With systemd
sudo systemctl status logistic-landscape

# Check logs
sudo journalctl -u logistic-landscape -f

# Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Database Maintenance
Monitor database size:
```bash
ls -lh /var/lib/logistic-landscape/data/newsletter.db
```

Vacuum database (optimize):
```bash
sqlite3 /var/lib/logistic-landscape/data/newsletter.db "VACUUM;"
```

### Updates
Deploy new version:
```bash
cd /var/lib/applications/logistic-landscape
git pull origin main
pnpm install
pnpm build

# Restart application
pm2 restart logistic-landscape
# OR
sudo systemctl restart logistic-landscape
```

### Port Configuration
- **Application Port:** 3000 (configurable in next.config.js if needed)
- **Nginx Port:** 80/443 (HTTP/HTTPS)
- **Database:** No network exposure (local SQLite)

---

## Environment Variables Reference

### Application
- `NODE_ENV` - `development` or `production`
- `NEXT_PUBLIC_SITE_URL` - Base URL of the application (e.g., `https://example.com`)
- `NEXT_PUBLIC_API_URL` - API endpoint URL (e.g., `https://example.com`)

### Database
- `DATABASE_PATH` - Path to SQLite database file
  - Default (development): `./newsletter.db`
  - Default (production, external): `/var/lib/logistic-landscape/data/newsletter.db`
  - Can be overridden by setting this variable

### Vercel-specific (auto-set)
- `VERCEL_ENV` - Auto-set by Vercel to `production` or `preview`
- `VERCEL_URL` - Auto-set to deployment URL

---

## Troubleshooting

### Database permission errors
```bash
sudo chown www-data:www-data /var/lib/logistic-landscape/data/newsletter.db
sudo chmod 664 /var/lib/logistic-landscape/data/newsletter.db
```

### Application won't start
Check logs:
- PM2: `pm2 logs logistic-landscape`
- Systemd: `sudo journalctl -u logistic-landscape -f`
- Vercel: Check deployment logs in Vercel dashboard

### Nginx 502 Bad Gateway
- Check if application is running: `curl http://localhost:3000`
- Check upstream server config in nginx conf
- Restart Nginx: `sudo systemctl restart nginx`

### Database file grows too large
SQLite databases can fragment. Optimize periodically:
```bash
sqlite3 /var/lib/logistic-landscape/data/newsletter.db "VACUUM; ANALYZE;"
```

---

## Performance Considerations

### Vercel
- Preview deployments are stateless; database resets between redeploys
- Suitable for API-first architectures with external persistent storage
- For persistent data, consider storing outside Vercel or use external backend

### External Server
- Persistent filesystem ensures SQLite data survives restarts
- WAL mode enabled for better concurrency
- Monitor database file size and optimize periodically
- Backup strategy essential for production data

---

## CI/CD Recommendations

### GitHub Actions Example
```yaml
name: Deploy

on:
  push:
    branches: [main, preview]

jobs:
  deploy-vercel:
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## Summary

| Aspect | Vercel | External Server |
|--------|--------|-----------------|
| **Persistence** | Ephemeral (preview), depends on strategy (prod) | Persistent (local filesystem) |
| **Database Location** | project-relative or `DATABASE_PATH` | `/var/lib/logistic-landscape/data` |
| **Scaling** | Vercel handles auto-scaling | Manual/containerized scaling |
| **Monitoring** | Vercel dashboard | Process manager + system logs |
| **Costs** | Vercel pricing | Server hosting costs |
| **Complexity** | Simpler, Vercel-managed | More control, manual setup |

Both environments use the same codebase and architecture. Choose based on your operational preferences and persistence requirements.
