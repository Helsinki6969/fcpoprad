import vojtovicImg from '../assets/vojtovic.jpg';
import bendikImg from '../assets/bendik.jpg';
import byckoImg from '../assets/bycko.jpg';
import handzusImg from '../assets/handzus.jpg';
import koterbaImg from '../assets/koterba.jpg';
import pohlodImg from '../assets/pohlod.jpg';
import ratajImg from '../assets/rataj.jpg';
import vernarecImg from '../assets/vernarec.jpg';
import gregaImg from '../assets/grega.jpg';

export function CinovniciATreneri() {
  // Data činovníkov a trénerov
  const officials = [
    {
      id: 1,
      name: 'Mikuláš Vojtovič',
      photo: vojtovicImg,
      quote: '„V každej situácii sa nájde riešenie"',
      playerCareer: 'Nižná nad Oravou, Nové Mesto nad Váhom, Poprad- Stráže',
      officialCareer: '',
      bio: 'Do Stráže som prišiel v 2. roku vojenskej základnej služby v roku 1973 do mužstva, ktoré prežívalo svoje najlepšie obdobie, do veľmi dobrej partie. Ako veľmi malá mestská časť sme dokázali konkurovať všetkým primestským klubom , vrátene Popradu. Neskôr prišli horšie časy. Futbalové kluby Matejovce , Spišská Sobota aj Veľká zanikli aj pri meste Poprad ostali len Stráže… Vďaka až fanatizmu niektorých ľudí zo Stráž sme dokázali udržať futbal až dodnes. „Funkcionárčiť" som začal ešte ako aktívny hráč cca v r.1980 a ostalo to vo mne až dodnes. Už je tomu 40 rokov.. Futbal a mladých ľudí okolo neho mám rád dodnes a dúfam, že aj oni mňa. Verím, že sa pomoci príchodom novej krvi do našich rád klub znova lepšie časy.'
    },
    {
      id: 2,
      name: 'Peter Bendík',
      photo: bendikImg,
      quote: '„Nerob iným to, čo nechceš, aby oni robili Tebe"',
      playerCareer: 'TJ ŠM Poprad – Stráže (1973-1991)',
      officialCareer: 'TJ ŠM Poprad – Stráže (1985-1996), ŠK ZEMEDAR Poprad – Stráže (1996 – 2020)',
      bio: 'Od malého chlapca až po súčasnosť som zostal verný Strážskemu futbalu a svoj voľný čas som venoval jeho zachovaniu a rozvoju. Od roku 1973 do 1991 ako hráč a od 1985 až do súčasnosti ako funkcionár vzostup a pády Strážskeho futbalu, no vždy sa našli zanietenci, ktorí svoju aktivitu a obetavosťou zachovali existenciu futbalu v tejto mestskej časti, v ktorej ako jedinej a poslednej ešte futbal existuje. Verím, že aktivitou mladej generácie priaznivocov Strážskeho futbalu svitá na lepšie časy.'
    },
    {
      id: 3,
      name: 'Vladimír Bycko',
      photo: byckoImg,
      quote: '„Ty si moje útočište a pevnosť moja. V tebe mám dôveru Bože môj."',
      playerCareer: 'Chemlon Humenné, Dukla Banská Bystrica, FK Rakýtovce',
      officialCareer: 'Spišská Nová Ves /2008 – 2009/, TJ Štart Hrabušice /2017 – 2020/, FK Poprad /2018 – 2019/',
      bio: 'Vo futbale som preto, lebo som mu obetoval celé svoje detstvo a stále ho mám v srdci. Futbalovo najviac vďačím trénerovi Alexandrovi Bochynovovi, ktorý mak ako 5 ročného prijal do prípravky Chemlonu Humenné a odvtedy som si futbal zamiloval. Táto hra mi dáva emócie, radosť a hlavne vztahy. Spoznal som cez neho veľa úžasných ľudí. Čo by som chcel vo futbale dosiahnuť? Tak ako vždy vedieť si schémou zvládnuť prehrávať. To som sa dokážem posunúť ukáže až čas. Mojím cieľom je byť pre deti oporou a druhým otcom. Túžim, aby sa deťom odovzdali správne morálne hodnoty, ktoré sú potrebné pre ich rast. Chcem aby futbal spájal a vytvárali kamarátske vzťahy na celý život.'
    },
    {
      id: 4,
      name: 'Peter Handzuš',
      photo: handzusImg,
      quote: '„Jediný spôsob ako byť skutočne spokojný, je veriť, že to, čo robíme je skvelá práca. A jediný spôsob ako robiť skvelú prácu, je milovať to, čo robíme."',
      playerCareer: 'Poprad Veľká, FK Poprad, FK Svit',
      officialCareer: 'FK Poprad /1997-2020/',
      bio: 'Futbalu som venoval väčšinu doterajšieho života, či už ako zamestnanec futbalového štadióna v Poprade – Veľká, alebo ako tréner. Mojou zásadou sú šľachetný štaiahu do roka 1997, keď som začal vypomáhať Stanovi Michlíkovi, vtedajšiemu trénerovi žiakov FK Poprad. Futbal ako taký ma svojou vytvárenej miesto aj u nás v rodine. Budem rád, ak v tomto klube znova nájdem radosť a vášeň, ktorú mi futbal prostredníctvom hráčov ponúkal. Chcem pracovať s ľudmi, s ktorými si rozumiem.'
    },
    {
      id: 5,
      name: 'Mgr. Tomáš Koterba',
      photo: koterbaImg,
      quote: '„ Choď si za svojím snom, on sám za Tebou nepríde."',
      playerCareer: 'TJ Slovan Levoča, FK 05 Levoča',
      officialCareer: 'TJ Slovan Levoča / 2000 – 2005/, FK 05 Levoča / 2005 – 2017/, Regionálny výberový tréner mládeže VsFZ / 2012 – 2015 /, FK Poprad /2016 – 2020/',
      bio: 'Futbal je môj životný štýl, spôsob sebarealizácie, vyjadrenía sa a prostriedkom napĺňania si životných cieľov, či snov. Sny sú najlepším palivom na našej ceste. Je to u mňa skôr beh na dlhé trate, no som presvedčený, že futbal v konečnom dôsledku je spravodlivý a skôr, či neskôr vám vráti v akejkoľvek podobe to, čo ste mu odozvdali a obetovali. Som vďačný za proces a výsledky mojej práce výchovy nielen šikovných futbalistov, ale hlavne slušných ľudí.'
    },
    {
      id: 6,
      name: 'Mgr. Martin Pohlod',
      photo: pohlodImg,
      quote: '„Nebojte sa! Boží duch, ktorý je vo vás, je mocnejší ako Duch sveta!"',
      playerCareer: 'OFK Tatran Bystré, MFK Vranov nad Topľou, 1. FC Tatran Prešov, FC Pivovar Šariš Veľký Šariš, ŠK Štrba',
      officialCareer: 'FC Ružinov Bratislava /2008/, MFK Tatran Liptovský Mikuláš /2008 – 2015/, FK Poprad /2016 – 2018/, ŠK Štrba /2019 – 2020/',
      bio: 'Vďaka otcovi, ktorý bol vyše dve desaťročia predsedom klubu v mojej rodnej obci som pri futbale od detstva. Formovalo ma množstvo trénerov, resp. funkcionárov s ktorými som prišiel do kontaktu. Futbal pre mňa niesol, resp. ešte stále nesie množstvo emócií, ktoré som si vďačný. Futbal ako taký ma svojou vytvárel miesto, kde som poznal správnych ľudí, či pre mňa zásadné výzvy. Splnil som si svoj sen hrať prvú ligu. Zažil som aj veľmi negatívne časy, kedy ma futbal skoro zničil. Mojím hlavným cieľom je budovať kultúrne prostredie a pričiniť sa o to, aby futbal prinášal radosť. Snívam o tom, aby samotný zápass bol naozajstnou hostinou, kde si domáci súper učtí hostujúceho v každom smere. Potom sa takýmto spôsobom bude medzi ľudmi vytvárať jednota…'
    },
    {
      id: 7,
      name: 'Peter Rataj',
      photo: ratajImg,
      quote: '„Nikdy sa nevzdávaj a neskláňaj hlavu!"',
      playerCareer: 'Poprad, Svit, Lokomotíva Košice, Ružomberok, Petržalka, 1.FC Košice, Vienna, Kežmarok',
      officialCareer: 'Mládežnícky tréner FK POPRAD /2005 – 2020/',
      bio: 'Futbal mám strašne rád. Zažil som vďaka nemu veľa nezabudnuteľných okamihov. Splnil som si svoj sen hrať prvú ligu.'
    },
    {
      id: 8,
      name: 'Mgr. Jozef Vernarec',
      photo: vernarecImg,
      quote: '„Viera, nádej a láska… ale najväčšia z nich je láska…" (1 Kor 13,13)',
      playerCareer: 'Dukla Banská Bystrica, ŠK Svätý Jur, FC Ružinov Bratislava, ŠK Tomášov, TJ Malínovo, FK 1931 Hranovnica, OFK Kravany, OFK 1934 Spišské Bystré, TJ Partizán Vernár',
      officialCareer: 'Mládežnícky tréner v FK Poprad (2011-2019), Regionálny výberový tréner mládeže VsFZ (2014 – 2016)',
      bio: 'Ako dedinský chlapec mi futbal v mladosti priráštol k srdcu. S futbalom som prešiel celé Slovensko, spoznal som veľa ľudí, našiel si veľa priateľov. Vidím v ňom nielen 22 chlapcov behať za 1 loptou, ale ďaleko viac. Je to o predvídaní, zodpovednosti, spoľahnutí sa jeden na druhého, ochote pracovať pre iných, ale i o sebapoznávaní, prekonávaní svojich limitov, disciplíne a o plnení si svojich snov! Mojou túžbou je, aby deti, ktoré futbalovo vediem, sa na každý tréning tešili, aby medzi chlapcami vznikali naozajstné priateľstvá, aby prevládala radosť na tréningu a aby sa deti cítili potrebné a milované okolím. Ak dosiahneme toto, tak je môje najväčšie futbalové víťazstvo!'
    },
    {
      id: 9,
      name: 'Branislav Grega',
      photo: gregaImg,
      quote: '„Nehľadaj dôvod prečo sa to nedá, ale nájdi spôsob ako to pôjde"',
      playerCareer: 'Poprad Veľká, FK Poprad',
      officialCareer: 'FK Poprad /2008-2018/',
      bio: 'Futbal je a bude jednou z dôležitých častí môjho života. Priniesol mi mnoho zážitkov, spomienok a priateľov, ale aj skúsenosti a ponáučení či už v športovom, ale aj v súkromnom živote.\n\nJe dôležité odovzdať tieto skúsenosti mládeži, aby im následne pomohli v ich ďalšom rozvíjaní…'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#003474] to-[#0056bf] rounded-[30px] shadow-lg p-8 md:p-12 mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Činovníci a tréneri
          </h1>
          <p className="text-xl text-white">Ľudia, ktorí tvoria klub</p>
        </div>

        {/* Officials List */}
        <div className="space-y-12">
          {officials.map((official, index) => (
            <div key={official.id} className="bg-white rounded-[30px] shadow-lg p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Photo */}
                <div className="lg:col-span-1">
                  <img 
                    src={official.photo} 
                    alt={official.name} 
                    className="w-full h-full object-cover rounded-[20px]" 
                  />
                </div>

                {/* Info */}
                <div className="lg:col-span-2 space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-black">
                    {official.name}
                  </h2>
                  
                  <p className="text-xl text-gray-700 italic">
                    {official.quote}
                  </p>

                  <div>
                    <p className="text-xl text-black">
                      <span className="font-bold">Hráčska kariéra: </span>
                      <span className="font-semibold">{official.playerCareer}</span>
                    </p>
                  </div>

                  <div>
                    <p className="text-xl text-black">
                      <span className="font-bold">Trénerska/funkcionárska kariéra: </span>
                      <span className="font-semibold">{official.officialCareer}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="bg-gray-100 rounded-[20px] p-8">
                <p className="text-xl text-gray-700 font-bold">
                  {official.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}