const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Database path configuration
// Priority: DATABASE_PATH env var > production /var/lib > project directory
function getDbPath() {
  // If DATABASE_PATH is explicitly set, use it
  if (process.env.DATABASE_PATH) {
    return process.env.DATABASE_PATH;
  }

  // For external server deployments (non-Vercel), use a standard path
  if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
    const dataDir = '/var/lib/logistic-landscape/data';
    // Ensure directory exists
    if (!fs.existsSync(dataDir)) {
      try {
        fs.mkdirSync(dataDir, { recursive: true });
      } catch {
        // If we can't create /var/lib, fall back to project directory
        return path.join(__dirname, 'newsletter.db');
      }
    }
    return path.join(dataDir, 'newsletter.db');
  }

  // For development and Vercel, use project-relative path
  return path.join(__dirname, 'newsletter.db');
}

const dbPath = getDbPath();

// Create or open database
const db = new Database(dbPath);

try {
  // Create newsletter_subscribers table
  db.exec(`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL DEFAULT 'subscribed' CHECK (status IN ('subscribed', 'unsubscribed', 'pending')),
      value TEXT,
      agreed_to_terms BOOLEAN NOT NULL DEFAULT 1,
      subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
      unsubscribed_at DATETIME,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);
    CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status ON newsletter_subscribers(status);
    CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_created_at ON newsletter_subscribers(created_at DESC);
  `);

  // Create newsletter_subscribers_preview table for preview environment
  db.exec(`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers_preview (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL DEFAULT 'subscribed' CHECK (status IN ('subscribed', 'unsubscribed', 'pending')),
      value TEXT,
      agreed_to_terms BOOLEAN NOT NULL DEFAULT 1,
      subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
      unsubscribed_at DATETIME,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_preview_email ON newsletter_subscribers_preview(email);
    CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_preview_status ON newsletter_subscribers_preview(status);
    CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_preview_created_at ON newsletter_subscribers_preview(created_at DESC);
  `);

  console.log('✓ Database schema created successfully!');
  console.log('✓ Newsletter subscribers table is ready');
  console.log(`✓ Database file: ${dbPath}`);
} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
} finally {
  db.close();
}
