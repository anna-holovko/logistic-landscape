-- Drop old table if exists
DROP TABLE IF EXISTS newsletter_subscribers_preview CASCADE;

-- Create newsletter_subscribers_preview table
CREATE TABLE IF NOT EXISTS newsletter_subscribers_preview (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'subscribed' CHECK (status IN ('subscribed', 'unsubscribed', 'pending')),
  value TEXT,
  agreed_to_terms BOOLEAN NOT NULL DEFAULT true,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_preview_email ON newsletter_subscribers_preview(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_preview_status ON newsletter_subscribers_preview(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_preview_created_at ON newsletter_subscribers_preview(created_at DESC);

-- Enable RLS
ALTER TABLE newsletter_subscribers_preview ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated read on newsletter_subscribers_preview" ON newsletter_subscribers_preview FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow public insert on newsletter_subscribers_preview" ON newsletter_subscribers_preview FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service role to update newsletter_subscribers_preview" ON newsletter_subscribers_preview FOR UPDATE USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Allow service role to delete newsletter_subscribers_preview" ON newsletter_subscribers_preview FOR DELETE USING (auth.role() = 'service_role');
