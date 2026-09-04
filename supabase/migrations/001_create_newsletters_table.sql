-- Create newsletters table
CREATE TABLE IF NOT EXISTS newsletters (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  agreed_to_terms BOOLEAN NOT NULL DEFAULT true,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_newsletters_email ON newsletters(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_newsletters_created_at ON newsletters(created_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE newsletters ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read (if needed for verification)
CREATE POLICY "Allow public read on newsletters" ON newsletters
  FOR SELECT USING (true);

-- Create policy to allow public insert (for newsletter signups)
CREATE POLICY "Allow public insert on newsletters" ON newsletters
  FOR INSERT WITH CHECK (true);

-- Create policy to allow service role updates
CREATE POLICY "Allow service role to update newsletters" ON newsletters
  FOR UPDATE USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Create policy to allow service role deletes
CREATE POLICY "Allow service role to delete newsletters" ON newsletters
  FOR DELETE USING (auth.role() = 'service_role');
