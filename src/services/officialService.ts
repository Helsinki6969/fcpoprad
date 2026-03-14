import { supabase } from '../config/supabase';

export interface Official {
  id: string;
  name: string;
  photoUrl: string;
  quote: string;
  playerCareer: string;
  officialCareer: string;
  bio: string;
  displayOrder: number;
}

/**
 * Získať všetkých činovníkov a trénerov zo Supabase
 */
export async function getAllOfficials(): Promise<Official[]> {
  const { data, error } = await supabase
    .from('officials')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Chyba pri načítaní činovníkov:', error);
    return [];
  }

  return (data || []).map(mapDbOfficialToOfficial);
}

/**
 * Pomocná funkcia na mapovanie DB modelu na frontendový model
 */
function mapDbOfficialToOfficial(dbOfficial: any): Official {
  return {
    id: dbOfficial.id.toString(),
    name: dbOfficial.name,
    photoUrl: dbOfficial.photo_url,
    quote: dbOfficial.quote,
    playerCareer: dbOfficial.player_career,
    officialCareer: dbOfficial.official_career,
    bio: dbOfficial.bio,
    displayOrder: dbOfficial.display_order
  };
}
