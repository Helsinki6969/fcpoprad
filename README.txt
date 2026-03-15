================================================================================
          FC POPRAD - STRÁŽE | WEBOVÁ STRÁNKA | NÁVOD NA SPUSTENIE
================================================================================
--------------------------------------------------------------------------------
1. POŽIADAVKY NA SYSTÉM
--------------------------------------------------------------------------------
Pred spustením treba mať nainštalované:
- Node.js (verzia 20.x alebo novšia)
  Stiahnúť tu: https://nodejs.org/
--------------------------------------------------------------------------------
2. POSTUP SPUSTENIA (KROK ZA KROKOM)
--------------------------------------------------------------------------------
1. STIAHNUTIE/ROZBALENIE:
   - Presuňte priečinok "fcpoprad" na ľubovoľné miesto v PC.
2. PRÍKAZOVÝ RIADOK:
   - Otvorte Príkazový riadok (cmd) alebo PowerShell.
   - Presuňte sa do priečinka projektu:
     cd "cesta/k/vasmu/priečinku/fcpoprad"

3. INŠTALÁCIA KNIŽNÍC (node_modules):
   - Spustite príkaz: 
     npm install
   - Systém automaticky stiahne všetky závislosti zo súboru package.json.
   - POZNÁMKA: Priečinok 'node_modules' nie je súčasťou archívu kvôli veľkosti.
     Objaví sa po spustení príkazu: npm install

4. SPUSTENIE APLIKÁCIE:
   - Spustite príkazy:
     npm run build
   - Počkajte na hlásenie, že server beží (zvyčajne na porte 3000):
     -----------------------------------
     VITE v6.3.5  ready in xxx ms

     ➜  Local:   http://localhost:3000/   <  túto URL zadajte do prehliadača
     -----------------------------------
--------------------------------------------------------------------------------
3. PRÍSTUPOVÉ ÚDAJE (ADMIN PANEL)
--------------------------------------------------------------------------------
Pre testovanie funkcií správy (pridávanie článkov, videí, hráčov) použite:

Odkaz: http://localhost:3000/admin
E-mail: komisia@fcpoprad.info
Heslo: Maturita2026@
--------------------------------------------------------------------------------
4. PRÍSTUPOVÉ ÚDAJE (MAIL)
--------------------------------------------------------------------------------
Pre test kontaktného formulára, resp.
prečítanie správy odoslanej z formulára, použite:

Odkaz: https://mail.fcpoprad.info/mail
E-mail: komisia@fcpoprad.info
Heslo: Maturita2026@
--------------------------------------------------------------------------------
4. TECHNICKÁ ŠPECIFIKÁCIA
--------------------------------------------------------------------------------
- Technológia: React v18 + Vite (Frontend)
- Programovací jazyk: TypeScript
- Databáza a Backend: Supabase (Cloudové riešenie)
- Styling: Tailwind CSS (Utility-first framework)
- Ikony: Lucide React
- Web server: nginx
- Hostovanie (VPS): Hetzner
================================================================================
