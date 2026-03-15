================================================================================
          FC POPRAD - STRÁŽE | MATURITNÝ PROJEKT | NÁVOD NA SPUSTENIE
================================================================================
--------------------------------------------------------------------------------
1. POŽIADAVKY NA SYSTÉM
--------------------------------------------------------------------------------

Pred spustením sa uistite, že máte nainštalované:
- Node.js (verzia 20.x alebo novšia)
  Stiahnuť tu: https://nodejs.org/

--------------------------------------------------------------------------------
2. POSTUP SPUSTENIA (KROK ZA KROKOM)                                            -----------------------
--------------------------------------------------------------------------------                      |
                                                                                                      | 
1. STIAHNUTIE/ROZBALENIE:                                                                             | 
   - Rozbaľte doručený archív so zdrojovými kódmi do ľubovoľného priečinka.                           | 
                                                                                                      |
2. OTVORENIE TERMINÁLU:                                                                               |
   - Otvorte príkazový riadok (cmd) alebo PowerShell.                                                 |
   - Presuňte sa do priečinka projektu:                                                               |
     cd "cesta/k/vasmu/priečinku/fcpoprad"                                                            |
                                                                                                      |
3. INŠTALÁCIA KNIŽNÍC (node_modules):                                                                 |
   - Spustite príkaz:                                                                                 |
     npm install                                                                                      |
   - Systém automaticky stiahne všetky závislosti zo súboru package.json.                             |
                                                                                                      |
4. BUILD APLIKÁCIE:                                                                                   |
   - Spustite príkaz:                                                                                 |		tieto kroky je možné vynechať a navštíviť:
     npm run build                                                                                    |		https://fcpoprad.info
   - Počkajte na hlásenie, že server beží (zvyčajne na porte 3000).                                   |
												      |
--------------------------------------------------------------------------------		      |
vite v6.3.5 building for production...								      |
✓ 1777 modules transformed.									      |
build/index.html                  0.49 kB │ gzip:   0.30 kB											  |
build/assets/logo.png            99.41 kB							      |
build/assets/index.css           62.82 kB │ gzip:  11.21 kB											  |
build/assets/index.BtslIIzo.js  697.12 kB │ gzip: 204.98 kB											  |
												      |
✓ built in X.XXs										      |
--------------------------------------------------------------------------------		      |
												      |
5. ZOBRAZENIE V PREHLIADAČI:									      |
   - Otvorte prehliadač a zadajte adresu:							      |
     http://localhost:3000									      |
												      |
--------------------------------------------------------------------------------		      |
3. PRÍSTUPOVÉ ÚDAJE (ADMIN PANEL)						-----------------------		      |
--------------------------------------------------------------------------------
Pre testovanie funkcií správy (pridávanie článkov, videí, hráčov) použite:

Odkaz: http://localhost:3000/admin / https://fcpoprad.info/admin
E-mail: komisia@fcpoprad.info
Heslo: Maturita2026@

--------------------------------------------------------------------------------
4. PRÍSTUPOVÉ ÚDAJE (ROUNDCUBE MAIL)
--------------------------------------------------------------------------------
Pre účely testovania kontaktného formulára

Odkaz: https://mail.fcpoprad.info/mail
E-mail: komisia@fcpoprad.info
Heslo: Maturita2026@

--------------------------------------------------------------------------------
5. TECHNICKÁ ŠPECIFIKÁCIA
--------------------------------------------------------------------------------
- Technológia: TypeScript + React + Vite (Frontend)
- Databáza a Backend: Supabase (Cloudová služba)
- Styling: Tailwind CSS (Utility-first framework)
- Ikony: Lucide React
- Web server: Nginx
- Hosting: Hetzner
================================================================================
