import logo from '../assets/logo.png';

export function AkoNamMozesPomoct() {
  const supportPoints = [
    "Ak dávaš, dávaj nežične.",
    "Svojím darom pomáhaš naplňať poslanie.",
    "Nepozeraj na klub cez peniaze, ale srdcom.",
    "Aj vďaka tebe môžu deti naplňať svoje sny.",
    "Ďalší sponzori v rámci klubu nie sú pre teba konkurencia, ale partneri.",
    "Klub verí tebe a ty ver klubu.",
    "Tvoja dôvera nám všetkým pomáha na ceste k cieľu.",
    "Prvoradým cieľom je radosť detí a nie výsledok zápasu.",
    "Pomáhaj nám zdieľať naše hodnoty.",
    "Ak môžeš, oslov ďalšieho partnera klubu, ktorý má možnosti klub podporiť.",
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      {/* Content Container */}
      <div className="max-w-4xl mx-auto text-center">
        {/* Club Logo */}
        <div className="mb-8 flex justify-center">
          <img src={logo} alt="FC Poprad Logo" className="w-32 h-32 md:w-40 md:h-40" />
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#B7975E' }}>
          Športový klub
        </h1>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#003474] mb-6">
          FC POPRAD - STRÁŽE
        </h2>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-12" style={{ color: '#B7975E' }}>
          Informácie pre sponzorov
        </h3>

        {/* Support Points List */}
        <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 md:p-12 shadow-lg mb-12">
          <ul className="space-y-4 text-left">
            {supportPoints.map((point, index) => (
              <li 
                key={index} 
                className="flex items-start text-[#003474] text-base md:text-lg lg:text-xl leading-relaxed"
              >
                <span className="mr-3 mt-1 text-[#B7975E] font-bold text-xl">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quote Section */}
        <div className="bg-gray-50 rounded-2xl p-6 md:p-8 shadow-md mb-8">
          <blockquote className="italic text-lg md:text-xl" style={{ color: '#B7975E' }}>
            "Ten kto dáva s radosťou, dáva najviac<br />
            a Boh miluje radostného darcu"
          </blockquote>
          <p className="mt-3 text-[#B7975E] font-semibold">Matka Tereza</p>
        </div>

        {/* Contact Information */}
        <div className="bg-[#003474] rounded-2xl p-6 md:p-8 text-white shadow-xl">
          <h4 className="text-xl md:text-2xl font-bold mb-4 text-[#B7975E]">Bankové spojenie</h4>
          <p className="text-lg md:text-xl mb-2">IBAN: SK51 0900 0000 0000 9328 0784</p>
          <p className="text-base md:text-lg">Variabilný symbol: 2025</p>
          <p className="mt-4 text-sm md:text-base text-blue-200">
            Pri platbe uveď do správy pre príjemcu "Dobrovoľný príspevok" a tvoje meno.
          </p>
        </div>
      </div>
    </div>
  );
}