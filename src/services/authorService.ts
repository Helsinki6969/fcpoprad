/**
 * FC POPRAD - Author Service
 * 
 * Služba pre prácu s autormi článkov.
 * Umožňuje získať informácie o autorovi na základe authorId z admins tabuľky.
 */

import { getAdminById } from '../data/admins';

export interface AuthorInfo {
  id: number;
  name: string;
  email: string;
  role: string;
  image: string;
}

/**
 * Získa informácie o autorovi článku
 * 
 * @param authorId - ID autora z admins tabuľky
 * @param fallbackName - Náhradné meno (ak authorId neexistuje)
 * @param fallbackImage - Náhradný obrázok (ak authorId neexistuje)
 * @returns AuthorInfo
 */
export function getAuthorInfo(
  authorId: number | undefined,
  fallbackName: string = 'FC Poprad',
  fallbackImage: string = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
): AuthorInfo {
  // Ak existuje authorId, pokús sa získať admin dáta
  if (authorId) {
    const admin = getAdminById(authorId);
    if (admin) {
      return {
        id: admin.id,
        name: admin.fullName,
        email: admin.email,
        role: admin.role,
        image: getAuthorImage(admin.id) // Získaj obrázok podľa ID
      };
    }
  }

  // Fallback - použij predvolené hodnoty
  return {
    id: 0,
    name: fallbackName,
    email: 'info@fcpoprad.sk',
    role: 'Redakcia',
    image: fallbackImage
  };
}

/**
 * Získa obrázok autora podľa ID
 * V produkčnom prostredí by sa obrázky ukladali na server
 * Teraz používame Unsplash placeholdery
 * 
 * @param adminId - ID administrátora
 * @returns URL obrázku
 */
function getAuthorImage(adminId: number): string {
  const authorImages: Record<number, string> = {
    1: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', // admin
    2: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', // vladimir.bycko
    3: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', // martin.kovac
    4: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', // jana.novakova
    5: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', // tomas.hudak
    6: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', // milan.balog
    7: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop'  // peter.sladek
  };

  return authorImages[adminId] || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop';
}

/**
 * Formátuje meno autora pre zobrazenie
 * 
 * @param name - Celé meno autora
 * @returns Formátované meno
 */
export function formatAuthorName(name: string): string {
  return name;
}

/**
 * Získa iniciály autora (pre avatar placeholder)
 * 
 * @param name - Celé meno autora
 * @returns Iniciály (napr. "MK" pre "Martin Kováč")
 */
export function getAuthorInitials(name: string): string {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}
