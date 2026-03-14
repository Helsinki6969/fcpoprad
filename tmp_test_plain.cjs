const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function testPlainInsert() {
  console.log('Attempting PLAIN insert (no select) into contact_messages...');
  const { error } = await supabase
    .from('contact_messages')
    .insert([
      {
        name: 'Test Final',
        email: 'final@test.com',
        subject: 'Final Test',
        message: 'Testing if INSERT works without SELECT'
      }
    ]);

  if (error) {
    console.error('Insert failed:', JSON.stringify(error, null, 2));
    process.exit(1);
  }

  console.log('Insert successful! (No error returned)');
}

testPlainInsert();
