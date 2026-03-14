import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Toaster } from 'sonner';

// Importy komponentov - Header a Footer sa zobrazujú na každej stránke
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Importy všetkých stránok webstránky
import { Domov } from './pages/Domov';
import { ATim } from './pages/ATim';
import { U19 } from './pages/U19';
import { U17 } from './pages/U17';
import { U15 } from './pages/U15';
import { U13 } from './pages/U13';
import { Timy } from './pages/Timy';
import { Partneri } from './pages/Partneri';
import { AkoNamMozesPomoct } from './pages/AkoNamMozesPomoct';
import { Kontakt } from './pages/Kontakt';
import { Clanky } from './pages/Clanky';
import { DetailClanku } from './pages/DetailClanku';
import { Sprava } from './pages/Admin';
import { KlubovaTv } from './pages/KlubovaTv';
import { Stadion } from './pages/Stadion';
import { Straze } from './pages/Straze';
import { KlubovaHymna } from './pages/KlubovaHymna';
import { Historia } from './pages/Historia';
import { CinovniciATreneri } from './pages/CinovniciATreneri';
import { Poslanie } from './pages/Poslanie';
import { AkoSaZlepsujeme } from './pages/AkoSaZlepsujeme';
import { TyzdennyMikrocyklus } from './pages/TyzdennyMikrocyklus';
import { DetailHraca } from './pages/DetailHraca';

/**
 * Hlavná aplikačná komponenta
 * Exportuje sa ako default export - táto komponenta sa renderuje v index.html
 */
export default function App() {
  return (
    <BrowserRouter>
      {/* Flex container pre sticky footer - min-h-screen zabezpečí, že obsah vypĺňa celú výšku obrazovky */}
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header sa zobrazuje na vrchu každej stránky */}
        <Header />
        
        {/* Main content area - flex-grow zabezpečí, že vypĺňa priestor medzi header a footer */}
        <main className="flex-grow">
          {/* Routes - definuje všetky URL cesty a ich zodpovedajúce komponenty */}
          <Routes>
            {/* Domovská stránka */}
            <Route path="/" element={<Domov />} />
            
            {/* Klubové stránky - TV, štadión, hymna, história */}
            <Route path="/klubova-tv" element={<KlubovaTv />} />
            <Route path="/stadion" element={<Stadion />} />
            <Route path="/straze" element={<Straze />} />
            <Route path="/hymna" element={<KlubovaHymna />} />
            <Route path="/strate" element={<Straze />} /> {/* Alternatívna URL pre Straže */}
            <Route path="/klubova-hymna" element={<KlubovaHymna />} /> {/* Alternatívna URL pre hymnu */}
            <Route path="/historia" element={<Historia />} />
            <Route path="/osoby" element={<CinovniciATreneri />} />
            <Route path="/misia" element={<Poslanie />} />
            <Route path="/vylepsenie" element={<AkoSaZlepsujeme />} />
            <Route path="/tyzdennik" element={<TyzdennyMikrocyklus />} />
            <Route path="/tyzdenni-mikrocyklus" element={<TyzdennyMikrocyklus />} /> {/* Alternatívna URL */}
            
            {/* Tímy - rôzne kategórie */}
            <Route path="/atim" element={<ATim />} />
            <Route path="/u19" element={<U19 />} />
            <Route path="/u17" element={<U17 />} />
            <Route path="/u15" element={<U15 />} />
            <Route path="/u13" element={<U13 />} />
            
            {/* Prehľad všetkých tímov */}
            <Route path="/timy" element={<Timy />} />
            
            {/* Partneri a kontakt */}
            <Route path="/partneri" element={<Partneri />} />
            <Route path="/ako-pomohnut" element={<AkoNamMozesPomoct />} />
            <Route path="/kontakt" element={<Kontakt />} />
            
            {/* Články */}
            <Route path="/clanky" element={<Clanky />} /> {/* Zoznam všetkých článkov */}
            <Route path="/aktuality" element={<Clanky />} /> {/* Alias pre články */}
            <Route path="/clanky/:slug" element={<DetailClanku />} /> {/* Detail jedného článku - :slug je dynamický parameter */}
            
            {/* Admin panel - chránené heslo: fcpoprad2026 */}
            <Route path="/admin" element={<Sprava />} />
            
            {/* Detail hráča */}
            <Route path="/hrac/:id" element={<DetailHraca />} /> {/* Detail jedného hráča - :id je dynamický parameter */}
          </Routes>
        </main>
        
        {/* Footer sa zobrazuje na spodku každej stránky */}
        <Footer />
      </div>
      
      {/* Toaster - notifikácie zobrazujúce sa v pravom hornom rohu (napr. "Článok bol uložený") */}
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}