# Štruktúra projektu: FC Poprad - Stráže

Tento dokument slúži na rýchlu orientáciu v priečinkoch a súboroch projektu. Web je postavený na technológiách **React**, **Vite**, **TypeScript** a **Tailwind CSS**, s backendom v **Supabase**.

## 📂 Koreňový adresár (Root)

| Súbor / Priečinok | Popis |
| :--- | :--- |
| `src/` | Hlavný zdrojový kód aplikácie (logika, komponenty). |
| `public/` | Statické súbory pre produkciu (PHP skripty, favicon). |
| `.env` | Konfiguračné kľúče k Supabase (URL, API kľúč). |
| `index.html` | Hlavný HTML súbor, do ktorého sa vykresľuje React. |
| `package.json` | Správa knižníc a definícia spúšťacích skriptov (`npm run dev`). |
| `tsconfig.json` | Nastavenia pravidiel pre TypeScript. |
| `vite.config.ts` | Konfigurácia buildovacieho nástroja Vite. |
| `update.sh` | Skript pre automatizovanú aktualizáciu webu na serveri. |

---

## 📂 Priečinok `src/` (Srdce aplikácie)

| Podpriečinok | Popis |
| :--- | :--- |
| `assets/` | Lokálne obrázky (logá) importované priamo v kóde. |
| `components/` | Znovupoužiteľné UI časti (Hlavička, Pätička, Hero sekcia). |
| `config/` | Nastavenia externých služieb (Supabase klient). |
| `data/` | Statické JSON/TS dáta (zoznam videí, životopisy činovníkov). |
| `database/` | SQL schéma databázy (`schema.sql`) pre Supabase. |
| `pages/` | Jednotlivé obrazovky webu (Domov, Admin, Kontakt, atď.). |
| `services/` | Funkcie na získavanie dát zo Supabase (Hráči, Partneri). |
| `utils/` | Pomocné programátorské funkcie (formátovanie dátumov). |
| `App.tsx` | Hlavný smerovač (Routing) celej aplikácie. |
| `main.tsx` | Vstupný bod, ktorý spúšťa React aplikáciu. |
| `index.css` | Globálne CSS štýly a Tailwind konfigurácia. |

---

## 📂 Priečinok `public/` (Statické súbory)

| Podpriečinok / Súbor | Popis |
| :--- | :--- |
| `api/` | Obsahuje `contact.php` (odosielanie mailov cez Resend API). |
| `favicon.png` | Ikonka webu zobrazená v záložke prehliadača. |

---

## 🛠️ Užitočné príkazy
- `npm run dev` – Spustí lokálny vývojový server.
- `npm run build` – Pripraví čistý kód pre nahranie na server.
