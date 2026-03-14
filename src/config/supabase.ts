import { createClient } from '@supabase/supabase-js';

// Tieto kľúče si aplikácia pýta zo skrytého súboru .env.
// import.meta.env je špecialita nástroja Vite pre bezpečné načítanie hesiel z prostredia, aby 
// neboli heslá vpísané priamo tu v zdrojovom kóde "na tvrdo".
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Bezpečnostná kontrola - ak sa v súbore .env nenachádzajú URL alebo kľúč, vypíše chybu do vývojárskej konzoly v prehliadači (F12)
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Chýbajúca konfigurácia pre Supabase. Skontrolujte súbor .env");
}

// Vytvoríme a vyexportujeme samotného "klienta" (nástroj), cez ktorého budú všetky ostatné 
// súbory (ako napr. articleService.ts) komunikovať s databázou.
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
