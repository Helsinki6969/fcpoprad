const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function debugSchema() {
  console.log('Checking table contact_messages...');
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Data found:', data);
  }
}

debugSchema();
