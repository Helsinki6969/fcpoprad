import { supabase } from '../config/supabase';

export interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  category: string;
  displayOrder: number;
}

/**
 * Získať všetkých partnerov zo Supabase
 */
export async function getAllPartners(): Promise<Partner[]> {
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Chyba pri načítaní partnerov:', error);
    return [];
  }

  return (data || []).map(mapDbPartnerToPartner);
}

/**
 * Pomocná funkcia na mapovanie DB modelu na frontendový model
 */
function mapDbPartnerToPartner(dbPartner: any): Partner {
  return {
    id: dbPartner.id.toString(),
    name: dbPartner.name,
    logoUrl: dbPartner.logo_url,
    websiteUrl: dbPartner.website_url,
    category: dbPartner.category,
    displayOrder: dbPartner.display_order
  };
}
