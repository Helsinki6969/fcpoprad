import { Play, Trophy } from 'lucide-react';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { videoService } from '../services/videoService';
import { Video } from '../data/videos';

export function Sidebar() {
  // State pre najnovšie videá
  const [latestVideos, setLatestVideos] = useState<Video[]>([]);

  // Načítanie najnovších videí pri načítaní komponentu
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videos = await videoService.getAllVideos();
        // Zobraz len prvé 2 najnovšie videá
        setLatestVideos(videos.slice(0, 2));
      } catch (error) {
        console.error("Chyba pri načítaní videí v Sidebar:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="space-y-6">
      {/* Sekcia Klubová TV */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-[#003474] to-blue-700 px-6 py-4">
          <h3 className="text-white font-bold flex items-center">
            <Play className="w-5 h-5 mr-2" />
            Klubová TV
          </h3>
        </div>
        <div className="p-6 space-y-4">
          {latestVideos.map((video) => (
            <Link
              key={video.id}
              to="/klubova-tv"
              className="group cursor-pointer block"
            >
              <div className="relative rounded-lg overflow-hidden mb-2">
                <img
                  src={video.thumbnail || (video.youtubeId ? `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg` : 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80')}
                  alt={video.title}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80';
                  }}
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-12 h-12 bg-[#B7975E] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                  </div>
                </div>
                {/* Views counter */}
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-white text-xs">
                  {video.views} zhliadnutí
                </div>
              </div>
              <h4 className="font-medium text-gray-900 group-hover:text-[#003474] transition-colors line-clamp-2">
                {video.title}
              </h4>
              <p className="text-sm text-gray-500 mt-1">{video.date}</p>
            </Link>
          ))}

          {/* Link na všetky videá */}
          <Link
            to="/klubova-tv"
            className="block text-center py-2 px-4 bg-[#003474] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors mt-4"
          >
            Všetky videá
          </Link>
        </div>
      </div>

      {/* Sekcia Futbalnet - Embedded iframe */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-[#003474] to-blue-700 px-6 py-4">
          <h3 className="text-white font-bold flex items-center">
            <Trophy className="w-5 h-5 mr-2" />
            Futbalnet
          </h3>
        </div>
        <div className="p-4">
          <iframe
            src="https://sportnet.sme.sk/futbalnet/k/fc-poprad-straze/"
            className="w-full h-[600px] border-0 rounded-lg"
            title="FC Poprad Futbalnet"
            loading="lazy"
          />
        </div>
      </div>

      {/* Rýchle odkazy - Dôležité stránky */}
      <div className="bg-gradient-to-br from-[#B7975E] to-[#C5A878] rounded-xl shadow-md overflow-hidden p-6 text-white">
        <h3 className="font-bold mb-4">Dôležité odkazy</h3>
        <div className="space-y-2">
          <Link to="/stadion" className="block py-2 px-4 bg-white/90 rounded-lg font-medium hover:bg-white transition-colors text-[#003474]">
            Štadión
          </Link>
          <Link to="/hymna" className="block py-2 px-4 bg-white/90 rounded-lg font-medium hover:bg-white transition-colors text-[#003474]">
            Klubová hymna
          </Link>
          <Link to="/straze" className="block py-2 px-4 bg-white/90 rounded-lg font-medium hover:bg-white transition-colors text-[#003474]">
            Stráže pod Tatrami
          </Link>
        </div>
      </div>
    </div>
  );
}