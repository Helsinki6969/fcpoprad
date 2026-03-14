import { useParams, Link, Navigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Calendar, User, Clock, Tag, ArrowLeft, ArrowRight, Facebook, Twitter } from 'lucide-react';
import { Article } from '../data/articles';
import { getArticleBySlug, getRelatedArticles } from '../services/articleService';
import { getArticleThumbnail, getArticleVideoId } from '../utils/articleUtils';

function parseWordPressContent(content: string) {
  if (!content) return '';
  let parsed = content;
  
  // 1. [embed] youtube link [/embed]
  parsed = parsed.replace(/\[embed\](.*?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+).*?)\[\/embed\]/gi, 
    (_match, _url, videoId) => {
      return `<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; width: 100%;" class="my-6 rounded-xl shadow-lg bg-black"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/${videoId}?rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
    }
  );

  // 2. [video ... mp4="..."]
  parsed = parsed.replace(/\[video.*?mp4="(.*?)".*?\]/gi, 
    (_match, mp4Url) => {
      return `<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; width: 100%;" class="my-6 rounded-xl shadow-lg bg-black"><video style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" controls><source src="${mp4Url}" type="video/mp4">Váš prehliadač nepodporuje video tag.</video></div>`;
    }
  );

  // 3. Uvoľnené/surové YouTube linky v texte (nesmieme zničiť úvodzovky v bežnom a href="")
  parsed = parsed.replace(/(^|[^"'])(https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)(?:&amp;[^\s<]+|&[^\s<]+)?)/gi, 
    (_match, prefix, _fullUrl, videoId) => {
      return `${prefix}<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; width: 100%;" class="my-6 rounded-xl shadow-lg bg-black"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="https://www.youtube.com/embed/${videoId}?rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
    }
  );

  return parsed;
}

export function DetailClanku() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (slug) {
      loadArticle(slug);
    }
  }, [slug]);

  const loadArticle = async (slug: string) => {
    setLoading(true);
    try {
      const articleData = await getArticleBySlug(slug);
      if (articleData) {
        setArticle(articleData);
        const related = await getRelatedArticles(articleData.id, articleData.category);
        setRelatedArticles(related);
      } else {
        setArticle(null);
      }
    } catch (error) {
      console.error('CHYBA pri načítaní článku:', error);
      setArticle(null);
    } finally {
      console.log('Načítavanie článku ukončené.');
      setLoading(false);
    }
  };
  
  if (!slug) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Načítavanie...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Článok sa nenašiel</h1>
          <p className="text-gray-600 mb-8">Požadovaný článok neexistuje alebo bol odstránený.</p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-[#003474] text-white rounded-lg hover:bg-[#B7975E] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Späť na domov
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = article.title;
    
    let shareUrl = '';
    if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    } else if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/"
            className="inline-flex items-center text-[#003474] hover:text-[#B7975E] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Späť na aktuality
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category Badges */}
          <div className="mb-6 flex flex-wrap gap-2">
            {article.tags && Array.isArray(article.tags) && article.tags.length > 0 ? (
              article.tags.map((tag, idx) => (
                <span key={idx} className="inline-block px-4 py-2 bg-[#B7975E] text-white rounded-full text-sm font-semibold">
                  {tag}
                </span>
              ))
            ) : (
              <span className="inline-block px-4 py-2 bg-[#B7975E] text-white rounded-full text-sm font-semibold">
                {article.category || 'Novinky'}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#003474] text-white font-bold mr-3 shadow-sm">
                FC
              </div>
              <div>
                <div className="flex items-center text-sm">
                  <User className="w-4 h-4 mr-1" />
                  <span className="font-medium text-gray-900">{article.author}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center text-sm">
              <Calendar className="w-4 h-4 mr-2" />
              {article.date}
            </div>

            <div className="flex items-center text-sm">
              <Clock className="w-4 h-4 mr-2" />
              {article.readTime} min čítania
            </div>

            {/* Share Buttons */}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm text-gray-500 mr-2">Zdieľať:</span>
              <button
                onClick={() => handleShare('facebook')}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#003474] text-gray-600 hover:text-white transition-colors"
                aria-label="Zdieľať na Facebooku"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#003474] text-gray-600 hover:text-white transition-colors"
                aria-label="Zdieľať na Twitteri"
              >
                <Twitter className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Featured Image - Show only if NOT a video article */}
          {!getArticleVideoId(article) && (
            <div className="mb-12 rounded-2xl overflow-hidden">
              <img
                src={getArticleThumbnail(article)}
                alt={article.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: parseWordPressContent(article.content) }}
          />

          {/* Tags */}
          {article.tags && Array.isArray(article.tags) && article.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 pt-8 border-t">
              <Tag className="w-5 h-5 text-gray-400" />
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-[#003474] hover:text-white transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Súvisiace články</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  to={`/clanky/${relatedArticle.slug}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex flex-wrap gap-1">
                      {relatedArticle.tags && relatedArticle.tags.length > 0 ? (
                        relatedArticle.tags.slice(0, 2).map((tag, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-[#B7975E] text-white rounded-full text-[10px] font-bold">
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="px-2 py-0.5 bg-[#B7975E] text-white rounded-full text-[10px] font-bold">
                          {relatedArticle.category}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      {relatedArticle.date}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#003474] transition-colors line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {relatedArticle.excerpt}
                    </p>
                    <div className="inline-flex items-center text-[#003474] font-medium text-sm">
                      Čítaj viac
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
