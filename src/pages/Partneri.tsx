import { useState, useEffect } from 'react';
import { Partner, getAllPartners } from '../services/partnerService';

export function Partneri() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const data = await getAllPartners();
        setPartners(data);
      } catch (error) {
        console.error('Error fetching partners:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPartners();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003474]"></div>
      </div>
    );
  }

  const generalPartner = partners.find(p => p.category === 'Generálny partner');
  const otherPartners = partners.filter(p => p.category !== 'Generálny partner');

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
        {generalPartner && (
          <section className="mb-12">
            <h2 className="text-[36px] font-bold text-[#B7975E] mb-6">Generálny partner:</h2>
            <div className="bg-white rounded-lg p-8 w-full max-w-[370px] h-[370px] flex items-center justify-center shadow-lg">
              {generalPartner.websiteUrl ? (
                <a href={generalPartner.websiteUrl} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                  <img
                    src={generalPartner.logoUrl}
                    alt={generalPartner.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </a>
              ) : (
                <img
                  src={generalPartner.logoUrl}
                  alt={generalPartner.name}
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>
          </section>
        )}

        {/* Partners Grid */}
        <section>
          <h2 className="text-[36px] font-bold text-[#B7975E] mb-6">Partneri:</h2>
          {otherPartners.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPartners.map((partner) => (
                <div
                  key={partner.id}
                  className="bg-white rounded-lg p-8 h-[370px] flex items-center justify-center hover:shadow-xl transition-shadow shadow-lg"
                >
                  {partner.websiteUrl ? (
                    <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                      <img
                        src={partner.logoUrl}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </a>
                  ) : (
                    <img
                      src={partner.logoUrl}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-lg">
              <p className="text-xl text-gray-500">Zatiaľ nie sú pridaní žiadni partneri.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}