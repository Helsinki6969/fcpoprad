import { useState, useEffect } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { Article } from '../data/articles';
import { getAllArticles, initializeArticles } from '../services/articleService';
import { getArticleThumbnail } from '../utils/articleUtils';
import { articles as defaultArticles } from '../data/articles';

export function NewsGrid() {
  // useState - vytvorí lokálnu "pamäť" komponentu. Na začiatku je to prázdne pole [].
  // Keď zavoláme setArticles(dáta), React si uvedomí zmenu a automaticky prekreslí len túto časť stránky.
  const [articles, setArticles] = useState<Article[]>([]);

  // useEffect - spustí sa presne jedenkrát hneď po tom, ako sa táto mriežka zobrazí na obrazovke
  // (preto je na konci prázdne pole závislostí []).
  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      initializeArticles(defaultArticles);
      const data = await getAllArticles();
      setArticles(data);
    } catch (error) {
      console.error('Error loading articles:', error);
    }
  };

  // Show only the first 6 articles on homepage
  const displayedArticles = articles.slice(0, 6);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Aktuality</h2>
        <Link to="/clanky" className="text-[#003474] font-medium hover:text-[#B7975E] transition-colors flex items-center">
          Všetky články
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/*
           Funkcia .map prejde pole 'displayedArticles' článok po článku
           a pre každý z nich HTML kód (v slučke) 'naklonuje'. 
           Kľúč (key) pomáha Reactu vedieť, ktorý článok je ktorý, ak by sa poradie zmenilo.
        */}
        {displayedArticles.map((article) => (
          <Link
            key={article.id}
            to={`/clanky/${article.slug}`}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={getArticleThumbnail(article)}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-1">
                {article.tags && article.tags.length > 0 ? (
                  article.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-[#B7975E] text-white rounded-full text-[10px] font-bold">
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="px-3 py-1 bg-[#B7975E] text-white rounded-full text-xs font-bold">
                    {article.category}
                  </span>
                )}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <Calendar className="w-4 h-4 mr-2" />
                {article.date}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#003474] transition-colors">
                {article.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {article.excerpt}
              </p>
              <div className="inline-flex items-center text-[#003474] font-medium hover:text-[#B7975E] transition-colors">
                Čítaj viac
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}