import logoMestopoprad from '../assets/mestopoprad.png';
import logoJubema from '../assets/jubema.png';
import logoLunys from '../assets/lunys.png';
import logoKingmedia from '../assets/kingmedia.png';
import logoCvicisko from '../assets/cvicisko.png';
import logoInpro from '../assets/inpro.png';
import logoMorematracov from '../assets/morematracov.png';
import logoBouquet from '../assets/bouquet.png';
import logoElprokan from '../assets/elprokan.png';
import logoKontajnerypoprad from '../assets/kontajnerypoprad.png';
import logoRedosi from '../assets/redosi.png';
import logoTatraclima from '../assets/tatraclima.png';
import logoTatrycolor from '../assets/tatrycolor.png';
import logoVipox from '../assets/vipox.png';

export function Partneri() {
  // General partner
  const generalPartner = {
    name: 'Mesto Poprad',
    logo: logoMestopoprad,
  };

  // Partners in order
  const partners = [
    { id: 1, name: 'Jubema', logo: logoJubema },
    { id: 2, name: 'Lunys', logo: logoLunys },
    { id: 3, name: 'Tatra Clima', logo: logoTatraclima },
    { id: 4, name: 'King Media', logo: logoKingmedia },
    { id: 5, name: 'Cvičisko', logo: logoCvicisko },
    { id: 6, name: 'Inpro Poprad', logo: logoInpro },
    { id: 7, name: 'Tatry Color', logo: logoTatrycolor },
    { id: 8, name: 'Vipox', logo: logoVipox },
    { id: 9, name: 'More matracov', logo: logoMorematracov },
    { id: 10, name: 'Redosi', logo: logoRedosi },
    { id: 11, name: 'Bouquet', logo: logoBouquet },
    { id: 12, name: 'El Pro Kan', logo: logoElprokan },
    { id: 13, name: 'Kontajnery Poprad', logo: logoKontajnerypoprad },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#003474] to-[#0056bf] rounded-[30px] shadow-lg p-8 md:p-12 mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Partneri
          </h1>
          <p className="text-xl text-white">Partneri, ktorí pomáhajú budovať klub</p>
        </div>

        {/* General Partner */}
        <section className="mb-12">
          <h2 className="text-[36px] font-bold text-[#B7975E] mb-6">Generálny partner:</h2>
          <div className="bg-white rounded-lg p-8 w-full max-w-[370px] h-[370px] flex items-center justify-center shadow-lg">
            <img
              src={generalPartner.logo}
              alt={generalPartner.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </section>

        {/* Partners Grid */}
        <section>
          <h2 className="text-[36px] font-bold text-[#B7975E] mb-6">Partneri:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white rounded-lg p-8 h-[370px] flex items-center justify-center hover:shadow-xl transition-shadow shadow-lg"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}