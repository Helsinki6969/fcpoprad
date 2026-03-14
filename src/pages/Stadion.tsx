import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Stadion() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Stadium gallery images
  const stadiumImages = [
    {
      url: 'https://cnhgzdliqiixlxyiksio.supabase.co/storage/v1/object/public/images/stadion1.jpg',
      caption: 'Pohľad na hlavnú tribúnu štadióna'
    },
    {
      url: 'https://cnhgzdliqiixlxyiksio.supabase.co/storage/v1/object/public/images/stadion2.jpg',
      caption: 'Hracie ihrisko FC Poprad - Stráže'
    },
    {
      url: 'https://cnhgzdliqiixlxyiksio.supabase.co/storage/v1/object/public/images/stadion3.jpg',
      caption: 'Detail hracieho povrchu'
    },
    {
      url: 'https://cnhgzdliqiixlxyiksio.supabase.co/storage/v1/object/public/images/stadion4.jpg',
      caption: 'Zázemie pre fanúšikov'
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % stadiumImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, stadiumImages.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10s
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % stadiumImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + stadiumImages.length) % stadiumImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#003474] to-[#0056bf] rounded-[30px] shadow-lg p-8 md:p-12 mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Štadión
          </h1>
          <p className="text-xl text-white">Náš domov v Strážach pod Tatrami</p>
        </div>

        {/* Content */}
        <div className="mb-8">
          {/* Stadium Image Gallery - Full Width */}
          <div className="bg-white rounded-[30px] shadow-lg p-6 md:p-8">
            <div className="rounded-[20px] overflow-hidden mb-6 relative">
              {/* Image Container */}
              <div className="relative h-96 md:h-[500px] lg:h-[600px]">
                {stadiumImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.caption}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <p className="text-white font-semibold text-lg">
                        {image.caption}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6 text-[#003474]" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6 text-[#003474]" />
                </button>

                {/* Dots Navigation */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-2 z-10">
                  {stadiumImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentSlide 
                          ? 'bg-[#b7975e] scale-125' 
                          : 'bg-white/60 hover:bg-white/80'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#003474] mb-4">
              Futbalový štadión Poprad
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Náš štadión sa nachádza v centre Popradu a poskytuje skvelé prostredie pre hráčov aj fanúšikov.
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-white rounded-[30px] shadow-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#003474] mb-6">
            História štadióna
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Futbalový štadión v Poprade prešiel v posledných rokoch významnými rekonštrukciami. 
            Modernizácia priniesla nové tribúny, zlepšené zázemie pre hráčov aj fanúšikov, a moderne osvetlenie.
          </p>
          <p className="text-lg text-gray-700">
            Štadión je domovom FC Poprad - Stráže a pravidelne tu prebiehajú stretnutia 
            najvyššej slovenskej súťaže. Okrem futbalových zápasov sa tu konajú aj iné 
            športové a spoločenské podujatia.
          </p>
        </div>
      </div>
    </div>
  );
}
