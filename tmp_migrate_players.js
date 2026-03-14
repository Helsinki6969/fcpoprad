
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function migratePlayers() {
  const players = JSON.parse(fs.readFileSync('./src/data/players_data.json', 'utf8'));

  console.log(`Starting migration of ${players.length} players...`);

  const formattedPlayers = players.map(p => ({
    first_name: p.firstName,
    last_name: p.lastName,
    jersey_number: p.jerseyNumber,
    position: p.position,
    category: p.category,
    nationality: p.nationality || 'Slovensko',
    photo_url: p.photoUrl,
    birth_year: p.birthYear,
    age: p.age,
    bio: p.bio,
    matches_played: p.matchesPlayed || 0,
    goals: p.goals || 0,
    assists: p.assists || 0,
    yellow_cards: p.yellowCards || 0,
    red_cards: p.redCards || 0,
    is_active: p.isActive !== undefined ? p.isActive : true
  }));

  const chunkSize = 20;
  for (let i = 0; i < formattedPlayers.length; i += chunkSize) {
    const chunk = formattedPlayers.slice(i, i + chunkSize);
    const { error } = await supabase.from('players').insert(chunk);
    
    if (error) {
      console.error(`Error inserting chunk ${i / chunkSize}:`, error);
      // Wait a bit and retry if it's a rate limit? 
    } else {
      console.log(`Inserted chunk ${i / chunkSize + 1}/${Math.ceil(formattedPlayers.length / chunkSize)}`);
    }
  }

  console.log('Migration finished!');
}

migratePlayers();
