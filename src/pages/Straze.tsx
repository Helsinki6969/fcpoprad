import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Straze() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Stadium gallery images
  const galleryImages = [
    {
      url: 'https://cnhgzdliqiixlxyiksio.supabase.co/storage/v1/object/public/images/kostol_sv_jana_krstitela.jpg',
      caption: 'Kostol sv. Jána Krstiteľa v Strážach'
    },
    {
      url: 'https://cnhgzdliqiixlxyiksio.supabase.co/storage/v1/object/public/images/kostol_sv_jana_krstitela_2.jpg',
      caption: 'Detail kostola sv. Jána Krstiteľa'
    },
    {
      url: 'https://cnhgzdliqiixlxyiksio.supabase.co/storage/v1/object/public/images/strazepodtatrami.jpg',
      caption: 'Celkový pohľad na Stráže pod Tatrami'
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, galleryImages.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10s
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#003474] to-[#0056bf] rounded-[30px] shadow-lg p-8 md:p-12 mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Stráže pod Tatrami
          </h1>
          <p className="text-xl text-white">Náš domov a naša identita</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-[30px] shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#003474] mb-6">
            História
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Stráže, ako tomu nasvedčuje ich pomenovanie, vznikli ako strážna osada ochraňujúca uhorské hranice. Najstaršia písomná zmienka pochádza z roku 1276. Ich história a hospodárstvo boli úzko späté so susedmi – Spišskou Sobotou, Popradom, Veľkou a s Matejovcami. Mesto malo poľnohospodársky charakter. Remeselníci tu pracovali len pre potreby miestnych obyvateľov. Zaujímavosťou je, že v Strážach sa majetok nededil, ale sa predával aj v rámci rodiny. Na rieke Poprad bol okolo roku 1758 postavený mlyn. V tom istom roku bolo v Strážach 80 mešťanov, 21 nájomníkov, 73 čeľadníkov a 220 detí. Nový mlyn bol postavený v roku 1848. V roku 1927 získal mlyn Jozef Girgaš, ktorý bol posledným mlynárom až do znárodnenia v roku 1949. V Strážach žilo v roku 1940 778 obyvateľov, v rokoch 1944 – 1945 sa odsťahovalo z obce asi 300 Nemcov. V roku 1952 tu vzniklo jednotné roľnícke družstvo.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Obyvatelia Stráží zachovávali tradície a viedli bohatý duchovný život. Rímskokatolícka cirkev v roku 1927 vybudovala pri pôvodnom gotickom Kostole sv. Jána Krstiteľa zo 14. storočia kláštor pre rád redemptoristov. Námestie zdobí nádherná socha Immaculaty (1724 – 1730) zrekonštruovaná v roku 2005. Ako jedny z prvých na Spiši tu okolo roku 1527 začali prenikať myšlienky reformácie. V roku 1784 bol postavený murovaný evanjelický klasicistický kostol. Na námestí sa nachádza budova radnice zrekonštruovanej v roku 1996.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-[#003474] mb-6 mt-8">
            Súčasnosť
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Stráže sú v súčasnosti v bližšom okolí známe bohatým kultúrno-spoločenským životom. Veľmi úspešný je divadelný súbor Ozvena. Prvé divadelné scénky zahrali divadelníci na Veľkú noc v roku 1896 v nemeckom jazyku. Jedným zo zakladateľov slovenského divadla bol Július Maličký (1901-1978). Bol vyučeným krajčírom, no učarovalo mu divadlo. Prvým predstavením bol v roku 1919 Kamenný chodníček. Od tohto obdobia vznikla v Strážach tradícia, podľa ktorej sa hrajú divadelné predstavenia vždy na Vianoce a Veľkú noc. V roku 1920 sa Július Maličký stal členom dobrovoľného hasičského zboru a v rokoch 1930-1945 bol zvolený za jeho veliteľa.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Spomenutý hasičský zbor má v Strážach dlhoročnú tradíciu už pred rokom 1863, kedy si spoločný požiarny zbor založili obyvatelia Matejoviec, Spišskej Soboty, Popradu, Veľkej a Stráží. Spoločným a mimoriadne aktívnym veliteľom hasičov bol Eduard Blasy (1820-1888) z Veľkej. Dobrovoľný hasičský zbor so zborom v Spišskej Sobote patria medzi najaktívnejšie v meste a v okrese Poprad. Zázemie v meste majú aj viaceré športové aktivity. Najznámejšou športovou osobnosťou je hokejista Peter Bondra, ktorý tu prežíval svoje detstvo.
          </p>
        </div>

        {/* Image Gallery */}
        <div className="bg-white rounded-[30px] shadow-lg p-6 md:p-8">
          <div className="rounded-[20px] overflow-hidden mb-6 relative">
            {/* Image Container */}
            <div className="relative h-96 md:h-[500px] lg:h-[600px]">
              {galleryImages.map((image, index) => (
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
                {galleryImages.map((_, index) => (
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
            Fotogaléria Stráží pod Tatrami
          </h2>
          <p className="text-lg text-gray-700">
            Krásne prostredie Vysokých Tatier a silná miestna komunita vytvárajú jedinečnú atmosféru.
          </p>
        </div>
      </div>
    </div>
  );
}