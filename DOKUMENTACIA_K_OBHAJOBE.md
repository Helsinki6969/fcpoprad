# FC Poprad - Stráže
## Dokumentácia k maturitnej práci (Architektúra a Zdrojové kódy)

Táto dokumentácia obsahuje detailný popis architektúry webovej aplikácie futbalového klubu FC Poprad - Stráže, použitých technológií a vysvetlenie účelu každého dôležitého súboru a priečinka v projekte. Tento dokument slúži ako podklad pre obhajobu maturitnej práce.

### 1. Použité technológie a architektúra

Celý projekt je postavený ako **Single Page Application (SPA)**, čo znamená, že po prvom načítaní stránky sa ďalšie podstránky nevyžiadavajú zo servera, ale vykresľujú sa dynamicky priamo v prehliadači prostredníctvom JavaScriptu (presnejšie knižnice React). Toto zabezpečuje obrovskú rýchlosť a moderný používateľský zážitok.

- **React.js**: Hlavná JavaScriptová knižnica na tvorbu používateľského rozhrania. Komponentový prístup umožňuje znovupoužiteľnosť kódu (napríklad hlavička a pätička sú napísané raz a vložené všade).
- **Vite**: Nástroj na zostavenie (build tool) a lokálny vývojový server. Je oveľa rýchlejší ako starší Webpack, prekladá kód z TypeScriptu do čistého JavaScriptu rozpoznateľného v prehliadači.
- **TypeScript**: Nadstavba JavaScriptu, ktorá pridáva "statické typovanie". Zabudovaný kompilátor kontroluje chyby ešte predtým, ako sa kód spustí (napríklad či do funkcie posielame text alebo číslo), čím sa minimalizujú pády aplikácie v reálnej prevádzke.
- **Tailwind CSS**: Utility-first CSS framework použitý na dizajnovanie. Namiesto písania vlastných .css súborov sa vzhľad definuje priamo v HTML (JSX) pomocou predpripravených tried (napr. `bg-blue-500`, `text-center`, `flex`).
- **Supabase**: Backend-as-a-Service (BaaS) riešenie postavené na PostgreSQL databáze. Zabezpečuje tri hlavné stĺpce backendu bez nutnosti písať a spravovať vlastný PHP server:
  1. Databáza: tabuľky pre články a videá.
  2. Autentifikácia: zabezpečené prihlásenie pre administrátorov.
  3. Storage (Úložisko): bezpečné ukladanie obrázkov k článkom a statických PDF dokumentov (ako História či Týždenný mikrocyklus).
- **React Router**: Knižnica starajúca sa o navigáciu medzi podstránkami (aby URL zmeny ako /kontakt načítali relevantnú komponentu bez refreshu celého okna).
- **Shadcn UI / Radix**: Sada moderných, bezbariérových vizuálnych komponentov (tlačidlá, formuláre, modálne okná), ktoré si môžeme plne prispôsobiť svojim potrebám.

---

### 2. Štruktúra priečinkov a vysvetlenie súborov

#### Koreňový priečinok (Root)
- **`package.json`**: Srdce Node.js projektu. Obsahuje zoznam všetkých nainštalovaných knižníc (závislostí), meno projektu a príkazy (scripts) na spustenie vývoja (`npm run dev`) alebo vygenerovanie zostavy (`npm run build`).
- **`vite.config.ts`**: Konfiguračný súbor pre Vite. Definuje napríklad, ako má Vite prekladať obrázky či ako má zaobchádzať so systémovými cestami a balíčkami kompilácie.
- **`tailwind.config.js` & `postcss.config.js`**: Nastavenia vzhľadu aplikácie. V tailwinde si tu môžeme dodefinovať vlastné klubové farby a fonty.
- **`tsconfig.json`**: Pravidlá pre TypeScript prekladač.
- **`index.html`**: Jediný skutočný HTML súbor v celej aplikácii. Slúži ako "prázdne plátno", do ktorého React 'vstrekuje' celý svoj vizuál cez element `<div id="root"></div>`.
- **`.env`**: Súbor obsahujúci tajné systémové premenné prostredia (environment variables), napr. ukrýva kľúče k databáze Supabase! Tento súbor sa nikdy nesmie nahrávať verejne na web.

#### Priečinok `public/`
Obsahuje statické súbory, ktoré zostanú po skompilovaní presne také isté a nerieši ich bundler.
- **`.htaccess`**: Mimoriadne dôležitý súbor pre Apache server na webe. Presmerováva všetky užívateľské požiadavky (napr. url `fcpoprad.sk/admin`) priamo na `index.html`. Bez neho by priame zadanie URL vyústilo do Error 404 (nenájdené), pretože reálne existuje len index.html a celú obsluhu URL rieši až JS.

#### Priečinok `src/` (Source - Zdrojové kódy)
Toto je miesto, kde je napísaná všetka naša práca a programátorská logika.

**1. Vstupné body aplikácie**
- **`main.tsx`**: Absolútny začiatok aplikácie. Tento súbor zoberie komponent `<App />` a zapojí (vykreslí) ho do spomínaného HTML plátna (`index.html`).
- **`App.tsx`**: Hlavný komponent, ktorý definuje Cesty (Routes). V princípe hovorí: "Ak je používateľ na adrese `/`, ukáž komponent `<Domov />`. Ak je na `/kontakt`, ukáž komponent `<Kontakt />`".
- **`index.css`**: Hlavný CSS súbor. Importuje konfiguráciu z Tailwind knižnice a nadefinované globálne CSS premenné (ako sú napríklad klubové odtiene).

**2. Priečinok `src/pages/` (Stránky)**
Obsahuje jednotlivé vizuálne stránky, ktoré užívateľ vidí pri preklikávaní v menu.
- **`Domov.tsx`**: Úvodná stránka. Agreguje dokopy najnovšie pridané články, zápasy a zoznam videí z celej databázy.
- **`Admin.tsx`**: Zabezpečená "administrátorská zóna". Obsahuje formulár na prihlásenie a pokročilú logiku pre správu obsahu (noviniek, videí). Pripojená priamo k Supabase Auth. Správa samotných prístupov (vytváranie adminov) prebieha kvôli bezpečnosti výhradne v Supabase konzole.
- **`Clanky.tsx` & `KlubovaTv.tsx`**: Stránky vizualizujúce dynamické údaje stiahnuté zo Supabase servera (zošitý zoznam článkov a chronologických videí).
- **`Kontakt.tsx`, `Partneri.tsx`, `Historia.tsx`, `Stadion.tsx`, `Misia.tsx`, `Tyzdennik.tsx`, `U19.tsx` atď.**: Prezentačné stránky pre návštevníkov. Obsahujú skôr statické informácie, kontaktné údaje (formulár) a klubovú prezentáciu.

**3. Priečinok `src/components/` (Komponenty)**
Komponenty sú malé, oddelené, znovupoužiteľné časti stránky. Vďaka tomuto vieme kód recyklovať.
- **`Header.tsx` a `Footer.tsx`**: Hlavička a pätička webu s navigáciou. Sú importované do `App.tsx` globálne, takže po prekliku na inú podstránku ostáva navigácia stále konštantná.
- **`NewsGrid.tsx`**: Znovupoužiteľná "mriežka" aktuálnych správ. Pošleme jej zoznam noviniek a ona z nich vizuálne vyrenderuje karty s obrázkami. Použitá na domovskej stránke ale i v podstránke Články.
- **`ArticleModal.tsx` / `VideoModal.tsx`**: "Vyskakovacie (Pop-up)" detailné okná. Keď návštevník aplikácie klikne na konkrétny článok, pozadie stmavne a stredom obrazovky vybehne modal so samotným textom a obrázkom bez toho, aby sme ho museli presmerovať na úplne novú URL reláciu.
- **`admin/` (Podpriečinok)**: Obsahuje vizuálne zložitejšie formuláre špecificky určené iba pre stránku `Admin.tsx` (napr. `ArticleForm.tsx` pre editáciu textov, alebo `ImageUpload.tsx` pre bezpečné odosielanie obrázkov cez internet).
- **`ui/` (Podpriečinok)**: Tzv. Design System aplikácie. Obalené Shadcn UI komponenty (ako napr. Tlačidlo - `button.tsx`, Vstupné pole - `input.tsx`, modály - `dialog.tsx`). Používajú sa na zjednotenie dizajnu naprieč aplikáciou namiesto toho, aby sme CSS ostylovanie pre každé jedno tlačidlo písali po celom webe odznova.

**4. Priečinok `src/config/` (Konfigurácie)**
- **`supabase.ts`**: Obsahuje "kľúč od dverí" do cloudovej databázy. Stará sa o inicializáciu spojenia, aby celá aplikácia vedela sťahovať články, videá aj PDF z cloudu.

**5. Priečinok `src/services/` (Služby / API prepojenia)**
Toto je komunikačná vrstva aplikácie.
- Písať zložité technické riadky pre "stiahnutie z databázy" priamo v komponentoch by vytváralo ohromný vizuálny kódu-neporiadok (známy ako "Spaghetti code"). Preto existujú stredné články **`articleService.ts`** a **`videoService.ts`**.
- Tieto súbory obsahujú obalené asynchrónne (async) JavaScript funkcie ako napríklad `getAllArticles()` alebo `createVideo()`.
- Iba *služby* (services) naozaj "rozprávajú" s databázovým serverom zo Supabase a zaobstarávajú čítanie, zápis alebo mazanie v tabuľkách. Keď si React stránka chce zobraziť články, jednoducho zavolá túto službu a len počká na doručenie dátových listov formátu JSON. Tým dodržujeme štruktúrovanú segrágaciu kódu.

**6. Priečinok `src/assets/` (Obrázky a zdroje)**
- Ukladajú sa sem obrázky fyzicky pribalené k samotnej aplikácii. Teda nemalé množstvo klubových entít ako logá sponzorov (`jubema.png`, `lunys.png`) či hlavný symbol klubu (`logo.png`). Počas buildu nástroj Vite analyzuje tento priečinok, skomprimuje ho a zaistí cachovanie.

**7. Priečinok `src/data/` (Údajové makety / Mocks)**
- Miesto slúžiace pre oddelenie veľkých blokov textu alebo dát, ktoré sa nenačítavajú z internetového servera, ale sú "zadrátované" priamo v počítačovom kóde aplikácie za účelom šetrenia databázy, napríklad menoslov historických zoznamov kádra (`players.ts`).

--- 
### Zhrnutie toku dát a životného cyklu aplikácie
1. Užívateľ (Návštevník) zadá URL stránky `fcpoprad.sk` do prehliadača.
2. Webový server doručí jediný reálny HTML dokument (`index.html`), o ktorého obsah a skripty je za pomoci technológie Vite pripevnený plne logický React kód.
3. Spúšťač aplikácie (`main.tsx`) vloží na stránku router aplikácie (`App.tsx`). Vďaka tomu URL určí, ktorý pohľad uvidia oči návštevníka. Ak je na Home Page, spustí sa vykreslenie pomyseľného `<Domov />`.
4. Komponent Domov okamžite cez vrstvu "Services" (napr. databázový zavádzač `articleService.ts`) vypýta príslušné články funkčnými blokmi a asynchrónnymi "promise", pýtajúc údaje sprostredkovane zo Supabase.
5. Cloudový server (BaaS - Supabase) si danú SQL procedúru spracuje interne, vyhodnotí RLS (dostupnočné práva a bezpečnosť pre verejnosť) a vráti čisté JSON dáta – kolekcie textov a URL ciest k obrázkom uložených v storage.
6. Aplikácia tieto čisté dáta preberá. Následne z tohto radu textov "vymodeluje" pomocou iterácií (.map) a znovupoužiteľných komponentov (`<NewsGrid />`) tie známe a pre nás jasné kartičky na obrazovke; to celé v graficky dokonalej harmónii s utilitárnymi tailwind triedami.
7. O plynulé prekonanie celého tohto obojsmerného mosta medzi klientom a cloudom dbal framework, minimalizujúc potrebu pre načítavanie (refreshing) okna v očiach spotrebiteľa a navodzujúc plynulosť prechodov ako moderná natívna mobilná aplikácia.
