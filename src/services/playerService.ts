
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
 * Vytvoriť nového hráča v Supabase
 */
export async function createPlayer(playerData: Omit<Player, 'id' | 'isActive'>): Promise<Player | null> {
  const { data, error } = await supabase
    .from('players')
    .insert([{
      first_name: playerData.firstName,
      last_name: playerData.lastName,
      jersey_number: playerData.jerseyNumber,
      position: playerData.position,
      category: playerData.category,
      date_of_birth: playerData.dateOfBirth,
      age: playerData.age,
      height: playerData.height,
      weight: playerData.weight,
      nationality: playerData.nationality,
      birth_year: playerData.birthYear,
      bio: playerData.bio,
      matches_played: playerData.matchesPlayed,
      goals: playerData.goals,
      assists: playerData.assists,
      yellow_cards: playerData.yellowCards,
      red_cards: playerData.redCards,
      is_active: true
    }])
    .select()
    .single();

  if (error) {
    console.error('Chyba pri vytváraní hráča:', error);
    return null;
  }

  return mapDbPlayerToPlayer(data);
}

/**
 * Aktualizovať existujúceho hráča v Supabase
 */
export async function updatePlayer(id: string, playerData: Partial<Omit<Player, 'id'>>): Promise<Player | null> {
  const dbData: any = {};
  if (playerData.firstName) dbData.first_name = playerData.firstName;
  if (playerData.lastName) dbData.last_name = playerData.lastName;
  if (playerData.jerseyNumber !== undefined) dbData.jersey_number = playerData.jerseyNumber;
  if (playerData.position) dbData.position = playerData.position;
  if (playerData.category) dbData.category = playerData.category;
  if (playerData.dateOfBirth) dbData.date_of_birth = playerData.dateOfBirth;
  if (playerData.age !== undefined) dbData.age = playerData.age;
  if (playerData.height !== undefined) dbData.height = playerData.height;
  if (playerData.weight !== undefined) dbData.weight = playerData.weight;
  if (playerData.nationality) dbData.nationality = playerData.nationality;
  if (playerData.birthYear !== undefined) dbData.birth_year = playerData.birthYear;
  if (playerData.bio !== undefined) dbData.bio = playerData.bio;
  if (playerData.matchesPlayed !== undefined) dbData.matches_played = playerData.matchesPlayed;
  if (playerData.goals !== undefined) dbData.goals = playerData.goals;
  if (playerData.assists !== undefined) dbData.assists = playerData.assists;
  if (playerData.yellowCards !== undefined) dbData.yellow_cards = playerData.yellowCards;
  if (playerData.redCards !== undefined) dbData.red_cards = playerData.redCards;
  if (playerData.isActive !== undefined) dbData.is_active = playerData.isActive;

  const { data, error } = await supabase
    .from('players')
    .update(dbData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Chyba pri aktualizácii hráča:', error);
    return null;
  }

  return mapDbPlayerToPlayer(data);
}

/**
 * Vymazať hráča (soft delete)
 */
export async function deletePlayer(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('players')
    .update({ is_active: false })
    .eq('id', id);

  if (error) {
    console.error('Chyba pri mazaní hráča:', error);
    return false;
  }

  return true;
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
