================================================================================
          FC POPRAD - STRÁŽE | MATURITNÝ PROJEKT | NÁVOD NA SPUSTENIE
================================================================================

Tento dokument obsahuje kompletný postup na stiahnutie, inštaláciu a spustenie 
zdrojových kódov webovej aplikácie.

--------------------------------------------------------------------------------
1. POŽIADAVKY NA SYSTÉM
--------------------------------------------------------------------------------
Pred spustením sa uistite, že máte nainštalované:
- Node.js (verzia 20.x alebo novšia)
  Stiahnuť tu: https://nodejs.org/

--------------------------------------------------------------------------------
2. POSTUP SPUSTENIA (KROK ZA KROKOM)
--------------------------------------------------------------------------------
1. STIAHNUTIE/ROZBALENIE:
   - Rozbaľte doručený archív so zdrojovými kódmi do ľubovoľného priečinka.

2. OTVORENIE TERMINÁLU:
   - Otvorte Príkazový riadok (cmd) alebo PowerShell.
   - Presuňte sa do priečinka projektu:
     cd "cesta/k/vasmu/priečinku/fcpoprad"

3. INŠTALÁCIA KNIŽNÍC (node_modules):
   - Spustite príkaz: 
     npm install
   - Systém automaticky stiahne všetky závislosti zo súboru package.json.
   - POZNÁMKA: Priečinok 'node_modules' nie je súčasťou archívu kvôli veľkosti.

4. SPUSTENIE APLIKÁCIE:
   - Spustite príkaz:
     npm run dev
   - Počkajte na hlásenie, že server beží (zvyčajne na porte 5173).

5. ZOBRAZENIE V PREHLIADAČI:
   - Otvorte prehliadač a zadajte adresu:
     http://localhost:5173

--------------------------------------------------------------------------------
3. PRÍSTUPOVÉ ÚDAJE (ADMIN PANEL)
--------------------------------------------------------------------------------
Pre testovanie funkcií správy (pridávanie článkov, videí, hráčov) použite:

Odkaz: http://localhost:5173/admin
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
- Hostovanie (VPS): Nginx (akonáhle je web vybuildovaný cez npm run build)

--------------------------------------------------------------------------------
Tento projekt bol vyvinutý s dôrazom na moderné webové štandardy, mobilnú 
responzivitu a cloudovú správu dát.
================================================================================
