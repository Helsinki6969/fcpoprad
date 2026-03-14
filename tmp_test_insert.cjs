const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testInsert() {
  console.log('Attempting test insert into contact_messages...');
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([
      {
        name: 'Test Agent',
        email: 'test@agent.com',
        subject: 'Test Subject',
        message: 'This is a test message from the AI agent.'
      }
    ])
    .select();

  if (error) {
    console.error('Insert failed:', JSON.stringify(error, null, 2));
    process.exit(1);
  }

  console.log('Insert successful:', JSON.stringify(data, null, 2));
}

testInsert();
