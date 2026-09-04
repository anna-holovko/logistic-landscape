-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
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

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status ON newsletter_subscribers(status);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_created_at ON newsletter_subscribers(created_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read (if needed for verification)
CREATE POLICY "Allow public read on newsletter_subscribers" ON newsletter_subscribers
  FOR SELECT USING (true);

-- Create policy to allow public insert (for newsletter signups)
CREATE POLICY "Allow public insert on newsletter_subscribers" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- Create policy to allow service role updates
CREATE POLICY "Allow service role to update newsletter_subscribers" ON newsletter_subscribers
  FOR UPDATE USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Create policy to allow service role deletes
CREATE POLICY "Allow service role to delete newsletter_subscribers" ON newsletter_subscribers
  FOR DELETE USING (auth.role() = 'service_role');
