
import { supabase } from '../config/supabase';
import { Player } from '../data/players';

/**
 * Získať všetkých hráčov zo Supabase
 */
export async function getAllPlayers(): Promise<Player[]> {
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .order('last_name', { ascending: true });

  if (error) {
    console.error('Chyba pri načítaní hráčov:', error);
    return [];
  }

  return (data || []).map(mapDbPlayerToPlayer);
}

/**
 * Získať hráčov podľa kategórie
 */
export async function getPlayersByCategory(category: string): Promise<Player[]> {
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('category', category)
    .eq('is_active', true);

  if (error) {
    console.error(`Chyba pri načítaní hráčov pre kategóriu ${category}:`, error);
    return [];
  }

  return (data || []).map(mapDbPlayerToPlayer).sort((a, b) => {
    const positionOrder = ['Brankár', 'Obranca', 'Stredný záložník', 'Útočník'];
    const posA = positionOrder.indexOf(a.position);
    const posB = positionOrder.indexOf(b.position);
    
    if (posA !== posB) return posA - posB;
    return a.lastName.localeCompare(b.lastName, 'sk');
  });
}

/**
 * Získať hráča podľa ID
 */
export async function getPlayerById(id: string): Promise<Player | undefined> {
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Chyba pri načítaní hráča s ID ${id}:`, error);
    return undefined;
  }

  return data ? mapDbPlayerToPlayer(data) : undefined;
}

/**
 * Pomocná funkcia na mapovanie DB modelu na frontendový model
 */
function mapDbPlayerToPlayer(dbPlayer: any): Player {
  return {
    id: dbPlayer.id.toString(),
    firstName: dbPlayer.first_name,
    lastName: dbPlayer.last_name,
    jerseyNumber: dbPlayer.jersey_number,
    position: dbPlayer.position,
    category: dbPlayer.category,
    dateOfBirth: dbPlayer.date_of_birth,
    age: dbPlayer.age,
    height: dbPlayer.height,
    weight: dbPlayer.weight,
    nationality: dbPlayer.nationality,
    birthYear: dbPlayer.birth_year,
    bio: dbPlayer.bio,
    matchesPlayed: dbPlayer.matches_played,
    goals: dbPlayer.goals,
    assists: dbPlayer.assists,
    yellowCards: dbPlayer.yellow_cards,
    redCards: dbPlayer.red_cards,
    isActive: dbPlayer.is_active
  };
}
