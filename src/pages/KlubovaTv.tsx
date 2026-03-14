import { Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import { videoService } from '../services/videoService';
import { Video } from '../data/videos';

export function KlubovaTv() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [displayCount, setDisplayCount] = useState(4);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await videoService.getAllVideos();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

  const visibleVideos = videos.slice(0, displayCount);
  const hasMore = displayCount < videos.length;

  const loadMore = () => {
    setDisplayCount(prev => prev + 4);
  };

  const handlePlayVideo = (video: Video) => {
    videoService.incrementViews(video.id);
    setSelectedVideo(video);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#003474] to-[#0056bf] rounded-[30px] shadow-lg p-8 md:p-12 mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Klubová TV
          </h1>
          <p className="text-xl text-white">Exkluzívny obsah z tréningu a zápasov</p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {visibleVideos.map((video) => (
            <div key={video.id} className="bg-white rounded-[30px] shadow-lg overflow-hidden">
              {/* Video Thumbnail */}
              <div className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden group cursor-pointer"
                   onClick={() => handlePlayVideo(video)}>
                <img 
                  src={video.thumbnail || (video.youtubeId ? `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg` : 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80')} 
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                <button className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#b7975e] flex items-center justify-center hover:bg-[#a08650] transition-all group-hover:scale-110">
                  <Play className="w-10 h-10 md:w-12 md:h-12 text-white ml-1" fill="white" />
                </button>
                {/* Tagy a kategória */}
                <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-10">
                  <div className="bg-[#b7975e] text-white px-3 py-1 rounded-full font-bold text-xs">
                    {video.category}
                  </div>
                  {video.tags && video.tags.map((tag, idx) => (
                    <div key={idx} className="bg-[#b7975e] text-white px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider">
                      {tag}
                    </div>
                  ))}
                </div>
                {/* Duration */}

                {/* Views */}
                <div className="absolute top-6 right-6 bg-black/70 text-white px-4 py-2 rounded-full text-sm z-10">
                  {video.views} videní
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6 md:p-8">
                <p className="text-gray-600 text-lg mb-2">{video.date}</p>
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-3">{video.title}</h3>
                <p className="text-lg text-gray-700 mb-4">{video.description}</p>
                <button 
                  onClick={() => handlePlayVideo(video)}
                  className="text-[#003474] font-semibold text-lg hover:underline flex items-center gap-2">
                  Pozrieť video
                  <svg width="28" height="15" viewBox="0 0 28 15" fill="none">
                    <path d="M27.7071 8.20711C28.0976 7.81658 28.0976 7.18342 27.7071 6.79289L21.3431 0.428932C20.9526 0.0384078 20.3195 0.0384078 19.9289 0.428932C19.5384 0.819457 19.5384 1.45262 19.9289 1.84315L25.5858 7.5L19.9289 13.1569C19.5384 13.5474 19.5384 14.1805 19.9289 14.5711C20.3195 14.9616 20.9526 14.9616 21.3431 14.5711L27.7071 8.20711ZM0 8.5H27V6.5H0V8.5Z" fill="#003474"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center">
            <button 
              onClick={loadMore}
              className="bg-[#003474] text-white px-8 py-4 rounded-[15px] text-xl md:text-2xl font-semibold hover:bg-[#002557] transition-colors"
            >
              Načítať ďalšie
            </button>
          </div>
        )}
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={handleCloseVideo}
        >
          <div 
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleCloseVideo}
              className="absolute -top-12 right-0 text-white text-4xl hover:text-gray-300 transition-colors"
            >
              ×
            </button>

            {/* Video Player */}
            <div className="bg-black rounded-lg overflow-hidden flex flex-col">
              {selectedVideo.videoUrl ? (
                <video
                  className="w-full h-64 sm:h-80 md:h-[500px] lg:h-[600px]"
                  src={selectedVideo.videoUrl}
                  controls
                  autoPlay
                />
              ) : (
                <iframe
                  className="w-full h-64 sm:h-80 md:h-[500px] lg:h-[600px]"
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
              
              {/* Video Info */}
              <div className="bg-white p-6">
                <h2 className="text-2xl font-bold text-[#003474] mb-2">{selectedVideo.title}</h2>
                <p className="text-gray-700 mb-3">{selectedVideo.description}</p>
                <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                  <span>{selectedVideo.date}</span>
                  <span>•</span>
                  <span>{selectedVideo.category}</span>
                  {selectedVideo.tags && selectedVideo.tags.length > 0 && (
                    <>
                      <span>•</span>
                      <div className="flex flex-wrap gap-1">
                        {selectedVideo.tags.map(tag => (
                          <span key={tag} className="bg-[#b7975e] text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                  <span>•</span>
                  <span>{selectedVideo.views} videní</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
