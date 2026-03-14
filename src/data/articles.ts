/**
 * Interface definujúci štruktúru článku
 * Používa sa v celej aplikácii pre type safety
 */
export interface Article {
  id: number;              // Unikátne ID článku
  slug: string;            // URL-friendly názov (napr. "galavecer-sa-opat-blizi")
  title: string;           // Názov článku
  date: string;            // Dátum publikovania (formát: DD.MM.YYYY)
  publishedDate?: string;  // MySQL formát dátumu (YYYY-MM-DD) - voliteľné
  category: string;        // Kategória článku (Aktuality, Rozhovory, Mládež, Zápasy, atď.)
  image: string;           // URL hlavného obrázku článku
  excerpt: string;         // Krátky popis článku (perex)
  author: string;          // Meno autora článku (pre zobrazenie)
  authorId?: number;       // ID autora z admins tabuľky (voliteľné pre spätnú kompatibilitu)
  authorImage: string;     // URL obrázku autora
  content: string;         // Plný obsah článku v HTML formáte
  tags: string[];          // Pole tagov/štítkov článku
  readTime: number;        // Odhadovaný čas čítania v minútach
}

/**
 * Mock dáta - predvolené články
 * Toto pole sa použije pri inicializácii localStorage
 * Po pripojení na MySQL databázu tieto dáta importujete do databázy
 */
export const articles: Article[] = [
  {
    id: 1,
    slug: 'galavecer-sa-opat-blizi',
    title: 'Galavečer sa opäť blíži',
    date: '21.11.2025',
    category: 'Novinky',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&h=600&fit=crop',
    excerpt: 'Tradičný galavečer futbalu sa opäť koná v meste Poprad. Tešíme sa na stretnutie s fanúšikmi.',
    author: 'Martin Kováč',
    authorId: 3, // martin.kovac
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    readTime: 5,
    tags: ['Galavečer', 'Udalosti', 'Fanúšikovia'],
    content: `
      <p>Už tradične sa v závere jesene pripravuje najväčšia udalosť sezóny - Galavečer FC Poprad. Tento rok sa uskutoční 15. decembra v priestoroch Grand Hotelu Poprad.</p>

      <p>Galavečer je príležitosťou na stretnutie všetkých, ktorí majú vzťah k nášmu klubu. Fanúšikovia, sponzori, bývalí i súčasní hráči, funkcionári - všetci, ktorí majú FC Poprad v srdci.</p>

      <h3>Program večera</h3>

      <p>Večer bude plný zaujímavých momentov. Okrem slávnostného posedenia a vyhodnotenia najúspešnejších hráčov sezóny nás čaká aj prednáška legendy slovenského futbalu.</p>

      <p>Hlavným hosťom večera bude Peter Dubovský ml., ktorý sa podelí o svoje skúsenosti z prostredia profesionálneho futbalu.</p>

      <h3>Ocenenia</h3>

      <p>Súčasťou galavečera bude odovzdanie ocenení v nasledujúcich kategóriách:</p>

      <ul>
        <li>Hráč sezóny A-tímu</li>
        <li>Najlepší strelec</li>
        <li>Objav roka</li>
        <li>Hráč mládežníckych kategórií</li>
        <li>Fanúšik roka</li>
        <li>Partner roka</li>
      </ul>

      <p>Veríme, že aj tento ročník galavečera bude nezabudnuteľný a prispeje k ešte väčšej súdržnosti našej futbalovej rodiny.</p>

      <h3>Vstupenky</h3>

      <p>Vstupenky je možné zakúpiť v kancelárii klubu alebo online cez náš web. Kapacita je limitovaná, preto neváhajte s rezerváciou!</p>

      <p>Tešíme sa na vás!</p>
    `
  },
  {
    id: 2,
    slug: 'peter-bazany-jr-musi-mat-v-sebe-radost',
    title: 'Peter Bažány Jr. musí mať v sebe radosť',
    date: '21.11.2025',
    category: 'Rozhovory',
    image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=1200&h=600&fit=crop',
    excerpt: 'Rozhovor s legendou klubu o histórii, súčasnosti a budúcnosti FC Poprad.',
    author: 'Jana Novotná',
    authorId: 4, // jana.novotna
    authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    readTime: 8,
    tags: ['Rozhovor', 'Legenda', 'História'],
    content: `
      <p>Peter Bažány Jr. je meno, ktoré v Poprade pozná každý futbalový fanúšik. V našom klube strávil viac ako dve desaťročia ako hráč, tréner a funkcionár. Dnes sme sa s ním porozprávali o jeho pohľade na futbal a klub.</p>

      <h3>Ako ste sa dostali k futbalu?</h3>

      <p>"Futbal bol vždy mojou vášňou. Už ako malý chlapec som kopával všade, kde sa dalo. Otec ma priviedol do FC Poprad, keď mi bolo šesť rokov, a odvtedy som tu zostal celý život," spomína Peter s úsmevom.</p>

      <h3>Čo považujete za najväčší úspech klubu?</h3>

      <p>"Úspechov bolo viac, ale ak mám vybrať jeden, tak postup do druhej ligy v roku 2003. To bolo niečo výnimočné pre mesto aj pre klub. Celý Poprad žil futbalom."</p>

      <h3>Ako vnímate súčasný stav klubu?</h3>

      <p>"Klub sa neustále vyvíja a rastie. Máme skvelú mládežnícku základňu, moderné zázemie a vedenie, ktoré má víziu. To je základ úspechu."</p>

      <h3>Aká je podľa vás budúcnosť FC Poprad?</h3>

      <p>"Musíme pokračovať v práci s mládežou. To je náš hlavný cieľ - vychovať vlastných hráčov, ktorí budú mať FC Poprad v srdci. Zároveň musíme budovať značku a zapájať komunitu."</p>

      <p>"Dôležité je, aby v tom všetkom zostala radosť z futbalu. Bez toho to nejde," uzatvára Peter Bažány Jr.</p>

      <h3>Odkaz pre mladých hráčov</h3>

      <p>"Pracujte tvrdo, ale nesmie vám chýbať vášeň. Futbal musíte milovať, inak to nemá zmysel. A vždy buďte hrdí, že reprezentujete FC Poprad."</p>
    `
  },
  {
    id: 3,
    slug: 'dorastenci-maju-jesen-2025-za-sebou',
    title: 'Dorastenci majú jeseň 2025 za sebou',
    date: '21.11.2025',
    category: 'Mládež',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&h=600&fit=crop',
    excerpt: 'Naša mládež odohral skvelú jesennú časť sezóny s výbornými výsledkami.',
    author: 'Tomáš Hudák',
    authorId: 5, // tomas.hudak
    authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    readTime: 6,
    tags: ['Mládež', 'Dorastenci', 'Výsledky'],
    content: `
      <p>Dorastenecký tím FC Poprad zakončil jesennú časť sezóny 2025/2026 s vynikajúcimi výsledkami. Zo 14 zápasov získali mladí hráči 34 bodov a umiestnili sa na druhom mieste tabuľky.</p>

      <h3>Štatistiky jesene</h3>

      <p>Naši dorastenci odohralai 14 zápasov s bilanciou 11 výhier, 1 remíza a iba 2 prehry. Strelili 42 gólov a inkasovali len 12. To je najlepšia defenzíva v celej súťaži!</p>

      <h3>Najlepší strelci</h3>

      <p>V tabuľke strelcov sa darilo hlavne týmto hráčom:</p>

      <ul>
        <li>Marek Petráš - 12 gólov</li>
        <li>Adam Novák - 9 gólov</li>
        <li>Lukáš Černák - 7 gólov</li>
      </ul>

      <h3>Slová trénera</h3>

      <p>"Som veľmi spokojný s výkonmi chlapcov. Predvádzajú moderný, ofenzívny futbal a zároveň majú vynikajúcu defenzívu. Vidím medzi nimi veľa talentov, ktorí majú šancu presadiť sa aj v A-tíme," hodnotí jeseň tréner Michal Hnát.</p>

      <h3>Zimná príprava</h3>

      <p>Dorastenci začínajú zimnú prípravu už 8. januára. Program zahŕňa intenzívne tréningy, kondičnú prípravu a tri prípravné zápasy.</p>

      <p>"Jarná časť bude ešte náročnejšia. Chceme zabojovať o prvé miesto a postup," dopĺňa kapitán mužstva Peter Adamec.</p>

      <p>Držíme palce našim dorastencom a veríme, že na jar nadviažu na vynikajúce jesenné výkony!</p>
    `
  },
  {
    id: 4,
    slug: 'zapas-tyzdna-fc-poprad-vs-tatran',
    title: 'Zápas týždňa: FC Poprad vs. Tatran',
    date: '18.11.2025',
    category: 'Zápasy',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=600&fit=crop',
    excerpt: 'V sobotu čaká náš tím dôležitý zápas proti tradičnému rivalovi.',
    author: 'Milan Balog',
    authorId: 6, // milan.balog
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    readTime: 4,
    tags: ['Zápas', 'Derby', 'Tatran'],
    content: `
      <p>V sobotu 23. novembra o 14:00 sa na našom štadióne odohrá jedno z najočakávanejších derby sezóny. FC Poprad privíta tradičného rivala - Tatran Prešov.</p>

      <h3>Aktuálna forma</h3>

      <p>Náš tím prichádza do zápasu v skvelej forme. Z posledných piatich zápasov sme získali 13 bodov (4 výhry, 1 remíza). Tatran má o niečo horšiu bilanciu - 8 bodov z piatich zápasov.</p>

      <h3>Vzájomné zápasy</h3>

      <p>Posledné tri vzájomné zápasy priniesli:</p>

      <ul>
        <li>FC Poprad 2:1 Tatran (jar 2025)</li>
        <li>Tatran 0:0 FC Poprad (jeseň 2024)</li>
        <li>FC Poprad 3:2 Tatran (jar 2024)</li>
      </ul>

      <h3>Kľúčoví hráči</h3>

      <p>Pozornosť sa bude uprávať hlavne na našich ofenzívnych ťahúňov - kapitána Juraja Melušu a strelca Martina Frka, ktorý je momentálne najlepším strelcom ligy s 14 gólmi.</p>

      <p>Na strane Tatranu treba dávať pozor na skúseného playmadera Richarda Hudeca a rýchleho krídelníka Dávida Sokoľa.</p>

      <h3>Slová trénera</h3>

      <p>"Je to derby, takže forma ide bokom. Očakávam vyrovnaný, bojovný zápas. Musíme byť koncentrovaní celých 90 minút a využiť domácu pôdu," hovorí tréner Ján Kozák.</p>

      <h3>Vstupenky a fanúšikovia</h3>

      <p>Vstupenky sú dostupné v predpredaji aj na deň zápasu. Očakávame rekordnú návštevu - okolo 2500 divákov. Príďte nás podporiť!</p>

      <p><strong>FC POPRAD, DO TOHO!</strong></p>
    `
  },
  {
    id: 5,
    slug: 'nove-posily-v-zimnej-priprave',
    title: 'Nové posily v zimnej príprave',
    date: '15.11.2025',
    category: 'Prestupý',
    image: 'https://images.unsplash.com/photo-1569517282132-25d22f4573e6?w=1200&h=600&fit=crop',
    excerpt: 'Klub predstavil nové posily, ktoré sa pridajú k tímu v zimnej príprave.',
    author: 'Martin Kováč',
    authorId: 3, // martin.kovac
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    readTime: 7,
    tags: ['Prestupý', 'Posily', 'Káder'],
    content: `
      <p>FC Poprad oficiálne predstavil tri nové posily, ktoré posilnia káder v jarnej časti sezóny 2025/2026. Vedenie klubu reagovalo na požiadavky trénera a vybralo hráčov, ktorí by mali okamžite pomôcť.</p>

      <h3>Matúš Čierny - brankár (23 rokov)</h3>

      <p>Prvou posilou je mladý brankár Matúš Čierny, ktorý prichádza z MŠK Žilina B. Matúš je odchovanec žilinskej akadémie a má za sebou skúsenosti z druhej ligy.</p>

      <p>"Som rád, že môžem byť súčasťou FC Poprad. Je to klub s tradíciou a ambíciami. Chcem zabojovať o miesto v základnej zostave a pomôcť tímu k úspechom," povedal po podpise zmluvy Matúš Čierny.</p>

      <h3>Filip Baranič - stredný záložník (26 rokov)</h3>

      <p>Druhá posila prišla z prešovskej Tatranu - skúsený stredný záložník Filip Baranič. Filip je známy svojou fyzickou silou, dôrazom v súbojoch a presnou prihrávkou.</p>

      <p>"Poznal som FC Poprad ako súpera a vždy ma zaujal. Teraz som rád, že môžem obliekať ich dres. Viem, čo od mňa tréner očakáva a urobím všetko pre úspech tímu," uviedol Filip.</p>

      <h3>Samuel Michalec - útočník (21 rokov)</h3>

      <p>Treťou a možno najzaujímavejšou posilou je mladý útočník Samuel Michalec z FC Košice. Samko je rýchly, technicky zdatný hráč s dobrým zakončením.</p>

      <p>"Poprad je perfektné miesto pre môj ďalší rozvoj. Chcem dostávať priestor, hrať pravidelne a dávať góly. Verím, že spoločne dosiahneme skvelé výsledky," dodal Samuel.</p>

      <h3>Slová športového riaditeľa</h3>

      <p>"Cielene sme hľadali hráčov, ktorí zapadnú do našej filozofie. Všetky tri posily sú hladné úspechu, majú správny charakter a veria v naše ciele. Verím, že sa rýchlo adaptujú a stanú sa oporami mužstva," zhodnotil prestupové aktivity športový riaditeľ Pavol Masaryk.</p>

      <h3>Odchody</h3>

      <p>Klub sa rozlúčil s troma hráčmi, ktorí dostali príležitosť v iných kluboch. Všetkým želáme veľa úspechov v ich ďalšej kariére.</p>
    `
  },
  {
    id: 6,
    slug: 'rekonstrukcia-stadiona-pokracuje',
    title: 'Rekonštrukcia štadióna pokračuje',
    date: '12.11.2025',
    category: 'Štadión',
    image: 'https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?w=1200&h=600&fit=crop',
    excerpt: 'Modernizácia nášho domovského štadióna je v plnom prúde.',
    author: 'Peter Sládek',
    authorId: 7, // peter.sladek
    authorImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
    readTime: 6,
    tags: ['Štadión', 'Infraštruktúra', 'Modernizácia'],
    content: `
      <p>Rekonštrukcia NTC Poprad pokračuje podľa plánu. Práce, ktoré sa začali v auguste, by mali byť ukončené do konca marca 2026. Klub tak v jarnej časti môže počítať s modernizovaným zázemím.</p>

      <h3>Čo sa rekonštruuje?</h3>

      <p>Hlavné rekonštrukčné práce zahŕňajú:</p>

      <ul>
        <li>Výmenu sedačiek na hlavnej tribúne (1200 sedadiel)</li>
        <li>Modernizáciu šatní pre hráčov a rozhodcov</li>
        <li>Rekonštrukciu sociálnych zariadení</li>
        <li>Výmenu osvetlenia za LED technológiu</li>
        <li>Nový ozvučovací systém</li>
        <li>Vybudovanie nového VIP priestoru</li>
        <li>Modernizáciu tlačového centra</li>
      </ul>

      <h3>Finančné prostriedky</h3>

      <p>Celková hodnota projektu je 850 000 eur. Financovanie zabezpečuje:</p>

      <ul>
        <li>Mesto Poprad - 400 000 eur</li>
        <li>Prešovský samosprávny kraj - 200 000 eur</li>
        <li>FC Poprad a sponzori - 250 000 eur</li>
      </ul>

      <h3>Priebeh prác</h3>

      <p>"Práce prebiehajú podľa harmonogramu. Sedačky sú už nainštalované, LED osvetlenie je hotové. Momentálne sa dokončujú šatne a VIP priestory," informuje vedúci projektu Ing. Marek Lichý.</p>

      <h3>Benefit pre fanúšikov</h3>

      <p>Modernizácia prinesie fanúšikom výrazne vyšší komfort:</p>

      <ul>
        <li>Pohodlné sedačky s operadlami</li>
        <li>Lepší výhľad na ihrisko</li>
        <li>Kvalitnejšie sociálne zariadenia</li>
        <li>Lepší zvuk a osvetlenie</li>
        <li>VIP zóna pre partnerov a hostí</li>
      </ul>

      <h3>Slová predsedu klubu</h3>

      <p>"Ide o najväčšiu investíciu do infraštruktúry v histórii klubu. Moderný štadión je nevyhnutný pre rozvoj futbalu v Poprade. Chceme vytvoriť podmienky na európskej úrovni," uviedol predseda klubu Mgr. Radovan Pukanský.</p>

      <h3>Otvorenie</h3>

      <p>Slávnostné otvorenie zrekonštruovaného štadióna sa plánuje na 28. marca 2026 pred prvým jarným zápasom. Tešíme sa na vás v novom!</p>
    `
  }
];

/**
 * Pomocná funkcia - Získať článok podľa slug
 * POZNÁMKA: Po pripojení na MySQL použite funkciu z articleService.ts
 * 
 * @param slug - URL slug článku
 * @returns Article | undefined
 */
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug);
}

/**
 * Pomocná funkcia - Získať súvisiace články
 * POZNÁMKA: Po pripojení na MySQL použite funkciu z articleService.ts
 * 
 * @param currentArticleId - ID aktuálneho článku
 * @param category - Kategória článkov
 * @param limit - Maximálny počet článkov (predvolené: 3)
 * @returns Article[]
 */
export function getRelatedArticles(currentArticleId: number, category: string, limit: number = 3): Article[] {
  return articles
    .filter(article => article.id !== currentArticleId && article.category === category)
    .slice(0, limit);
}