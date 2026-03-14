export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  jerseyNumber: number;
  position: 'Brankár' | 'Obranca' | 'Stredný záložník' | 'Útočník';
  category: 'A tím' | 'Dorast' | 'U17' | 'U19' | 'U15' | 'Žiaci' | 'U13' | 'Prípravka';
  dateOfBirth?: string;
  age?: number;
  height?: number; // cm
  weight?: number; // kg
  nationality?: string;
  birthYear?: number;
  bio?: string;
  // Štatistiky
  matchesPlayed: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  isActive: boolean;
}

// Hráči sú teraz načítavaní dynamicky zo Supabase cez playerService.ts
// Tento súbor zostáva kvôli definícii rozhrania (Player interface).
