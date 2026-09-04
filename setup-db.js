import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false }
});

async function setupDatabase() {
  try {
    const sql = fs.readFileSync('./setup-newsletter-db.sql', 'utf8');
    
    // Execute the entire SQL file at once
    const { data, error } = await supabase.rpc('execute_sql', { sql });
    
    if (error) {
      console.error('Error executing SQL:', error);
      process.exit(1);
    } else {
      console.log('✓ Database schema created successfully!');
      console.log('✓ Newsletter subscribers table is ready');
    }
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

setupDatabase();
