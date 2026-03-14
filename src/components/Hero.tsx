import { useState, useEffect } from 'react';
import { Play, Calendar, X } from 'lucide-react';
import { Link } from 'react-router';
import { Article } from '../data/articles';
import { getArticleThumbnail, getArticleVideoId } from '../utils/articleUtils';
import { getAllArticles } from '../services/articleService';

export function Hero() {
  const [latestArticle, setLatestArticle] = useState<Article | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const articles = await getAllArticles();
        if (articles && articles.length > 0) {
          setLatestArticle(articles[0]);
          setVideoId(getArticleVideoId(articles[0]));
        }
      } catch (error) {
        console.error('Error fetching latest article:', error);
      }
    };
    fetchLatest();
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-[#003474] to-blue-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            {latestArticle ? (
              <>
                <div className="inline-block px-4 py-2 bg-[#B7975E] text-white rounded-full text-sm font-bold">
                  NAJNOVŠIE
                </div>
                <h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight uppercase"
                  dangerouslySetInnerHTML={{ 
                    __html: (latestArticle.title || 'FC Poprad - Stráže')
                      .replace(/ (z|v|s|a|o|i|k|u) /gi, ' $1&nbsp;') // Rozšírený list predložiek (no widows)
                      .replace(/TV\s+Poprad/gi, 'TV&nbsp;Poprad') // Zoskupenie TV Poprad (case-insensitive)
                  }}
                />
                <p className="text-lg text-blue-100 leading-relaxed">
                  {latestArticle.excerpt}
                </p>
                <div className="flex items-center space-x-4 text-sm text-blue-200">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {latestArticle.date}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to={`/clanky/${latestArticle.slug}`}
                    className="px-8 py-3 bg-[#B7975E] text-white rounded-lg font-bold hover:bg-[#C5A878] transition-colors shadow-lg"
                  >
                    Čítaj viac
                  </Link>
                </div>
              </>
            ) : (
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  FC Poprad - Stráže
                </h1>
            )}
          </div>

          {/* Right Content - Featured Image */}
          <div className="relative">
            {latestArticle && getArticleThumbnail(latestArticle) && (
                <div className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer" onClick={() => videoId && setShowVideoModal(true)}>
                  <img
                    src={getArticleThumbnail(latestArticle)}
                    alt={latestArticle.title}
                    className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  {videoId && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-[#B7975E] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                        <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                      </div>
                    </div>
                  )}
                </div>
            )}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && videoId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 animate-in fade-in duration-300">
          <button 
            onClick={() => setShowVideoModal(false)}
            className="absolute top-6 right-6 p-2 text-white hover:text-[#B7975E] transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="w-full max-w-4xl px-4">
            <div 
              style={{ position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden', width: '100%' }} 
              className="rounded-xl shadow-2xl bg-black"
            >
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}