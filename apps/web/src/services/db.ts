import Database, { type Database as DatabaseType } from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Database path configuration
// Priority: DATABASE_PATH env var > process root > project directory
function getDbPath(): string {
  // If DATABASE_PATH is explicitly set, use it
  if (process.env.DATABASE_PATH) {
    return process.env.DATABASE_PATH;
  }

  // For external server deployments (non-Vercel), use a standard path
  if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
    const dataDir = '/var/lib/logistic-landscape/data';
    // Ensure directory exists for external deployments
    if (!fs.existsSync(dataDir)) {
      try {
        fs.mkdirSync(dataDir, { recursive: true });
      } catch {
        // If we can't create /var/lib, fall back to project directory
        return path.join(__dirname, '../../../newsletter.db');
      }
    }
    return path.join(dataDir, 'newsletter.db');
  }

  // For development and Vercel preview, use project-relative path
  return path.join(__dirname, '../../../newsletter.db');
}

const dbPath = getDbPath();

let db: DatabaseType | null = null;

function initializeSchema(database: DatabaseType): void {
  // Ensure tables exist (runs once on first connection)
  database.exec(`
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

  database.exec(`
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
}

function getDatabase(): DatabaseType {
  if (!db) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    db = Database(dbPath) as any;
    if (db) {
      db.pragma('journal_mode = WAL');
      initializeSchema(db);
    }
  }
  return db as DatabaseType;
}

export interface NewsletterSubscriber {
  id: number;
  email: string;
  status: 'subscribed' | 'unsubscribed' | 'pending';
  value: string | null;
  agreed_to_terms: boolean;
  subscribed_at: string;
  unsubscribed_at: string | null;
  updated_at: string;
  created_at: string;
}

function getTableName(): string {
  const env = process.env.VERCEL_ENV || 'production';
  return env === 'preview' ? 'newsletter_subscribers_preview' : 'newsletter_subscribers';
}

export function upsertNewsletterSubscriber(email: string): NewsletterSubscriber {
  const database = getDatabase();
  const table = getTableName();
  const now = new Date().toISOString();

  // Use a transaction to ensure atomicity
  const upsert = database.transaction(() => {
    // Try to update existing subscriber
    const updateStmt = database.prepare(`
      UPDATE ${table}
      SET status = ?, agreed_to_terms = ?, subscribed_at = ?, updated_at = ?
      WHERE email = ?
      RETURNING *
    `);

    const updated = updateStmt.get('subscribed', 1, now, now, email);

    if (updated) {
      return updated as NewsletterSubscriber;
    }

    // If no update, insert new subscriber
    const insertStmt = database.prepare(`
      INSERT INTO ${table} (email, status, agreed_to_terms, subscribed_at, updated_at, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
      RETURNING *
    `);

    return insertStmt.get(email, 'subscribed', 1, now, now, now) as NewsletterSubscriber;
  });

  return upsert();
}

export function getNewsletterSubscriber(email: string): NewsletterSubscriber | undefined {
  const database = getDatabase();
  const table = getTableName();

  const stmt = database.prepare(`
    SELECT * FROM ${table}
    WHERE email = ?
  `);

  return stmt.get(email) as NewsletterSubscriber | undefined;
}

export function closeDatabase(): void {
  if (db) {
    db.close();
    db = null;
  }
}
