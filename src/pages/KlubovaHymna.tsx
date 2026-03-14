export function KlubovaHymna() {
  // YouTube video ID pre klubovú hymnu
  const youtubeVideoId = '_-9XgouFHks';

  // Define the hymn details
  const hymn = {
    subtitle: 'Pieseň našich sŕdc',
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#003474] to-[#0056bf] rounded-[30px] shadow-lg p-8 md:p-12 mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Klubová hymna
          </h1>
          <p className="text-xl text-white">{hymn.subtitle}</p>
        </div>

        {/* YouTube Video Section */}
        <div className="bg-white rounded-[30px] shadow-lg p-6 md:p-8 mb-8">
          <div className="w-full max-w-4xl mx-auto">
            <div className="relative w-full pb-[56.25%] rounded-[20px] overflow-hidden shadow-lg">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeVideoId}?rel=0&modestbranding=1`}
                title="FC Poprad - Stráže Klubová Hymna"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* Lyrics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-[30px] shadow-lg p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#003474] mb-6">
              Text hymny
            </h2>
            <div className="space-y-6 text-lg text-gray-700">
              <div>
                <p className="font-bold text-[#003474] mb-2">1. SLOHA</p>
                <p>
                  My sme z Popradu, mladí ale aj zrelí.<br />
                  Hrávame futbal, s preveľkým potešením.<br />
                  Ak sa chceš pridať, tak zaklop nám na dvere.<br />
                  Otvoríme Ti, s radosťou Ťa prijmeme.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-[#003474]/10 to-[#b7975e]/10 p-4 rounded-lg">
                <p className="font-bold text-[#003474] text-center">
                  /: REFRÉN: LALALALALALA… :/
                </p>
              </div>

              <div>
                <p className="font-bold text-[#003474] mb-2">2. SLOHA</p>
                <p>
                  Svoju hru hráme, z tréningov radosť máme.<br />
                  Loptu prihráme, góly vždy rýchlo dáme.<br />
                  Popradské deti, vo farbe bielomodrá.<br />
                  To sme my levy, nech to každý pozná.
                </p>
              </div>

              <div className="bg-gradient-to-r from-[#003474]/10 to-[#b7975e]/10 p-4 rounded-lg">
                <p className="font-bold text-[#003474] text-center">
                  /: REFRÉN: LALALALALALA… :/
                </p>
              </div>

              <div>
                <p className="font-bold text-[#003474] mb-2">3. SLOHA</p>
                <p>
                  Ôsmy div sveta, to sme my FC Poprad.<br />
                  Sídlime v Strážach, deti sú u nás poklad.<br />
                  Úsmev a radosť, je naša identita.<br />
                  Vždy sme veselí, je ozaj realita.
                </p>
              </div>

              <div className="bg-gradient-to-r from-[#003474]/10 to-[#b7975e]/10 p-4 rounded-lg">
                <p className="font-bold text-[#003474] text-center">
                  /: REFRÉN: LALALALALALA… :/
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[30px] shadow-lg p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#003474] mb-6">
              O hymne
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-[#b7975e] pl-4">
                <h3 className="font-bold text-xl mb-2">Účinkujú</h3>
                <p className="text-gray-700">Rolland</p>
                <p className="text-gray-700">Dievčenské Trio z Čirča</p>
              </div>
              <div className="border-l-4 border-[#b7975e] pl-4">
                <h3 className="font-bold text-xl mb-2">Autor textu</h3>
                <p className="text-gray-700">Trénerský kolektív FC Poprad – Stráže</p>
              </div>
              <div className="border-l-4 border-[#b7975e] pl-4">
                <h3 className="font-bold text-xl mb-2">Melódia</h3>
                <p className="text-gray-700">RoLLanďaci 3jo</p>
              </div>
              <div className="border-l-4 border-[#b7975e] pl-4">
                <h3 className="font-bold text-xl mb-2">Hudobné aranžmá</h3>
                <p className="text-gray-700">Patrik Bača</p>
              </div>
              <div className="border-l-4 border-[#b7975e] pl-4">
                <h3 className="font-bold text-xl mb-2">Nahrávanie</h3>
                <p className="text-gray-700">Igor Veverka</p>
              </div>
              <div className="border-l-4 border-[#b7975e] pl-4">
                <h3 className="font-bold text-xl mb-2">Mix/Master</h3>
                <p className="text-gray-700">Samo Pospišil</p>
              </div>
              <div className="border-l-4 border-[#b7975e] pl-4">
                <h3 className="font-bold text-xl mb-2">Kamera, strih a scenár</h3>
                <p className="text-gray-700">Global Diamonds</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}