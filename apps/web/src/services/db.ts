import Database, { type Database as DatabaseType } from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../../../newsletter.db');

let db: DatabaseType | null = null;

function getDatabase(): DatabaseType {
  if (!db) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    db = Database(dbPath) as any;
    if (db) {
      db.pragma('journal_mode = WAL');
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

    const updated = updateStmt.get('subscribed', true, now, now, email);

    if (updated) {
      return updated as NewsletterSubscriber;
    }

    // If no update, insert new subscriber
    const insertStmt = database.prepare(`
      INSERT INTO ${table} (email, status, agreed_to_terms, subscribed_at, updated_at, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
      RETURNING *
    `);

    return insertStmt.get(email, 'subscribed', true, now, now, now) as NewsletterSubscriber;
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
