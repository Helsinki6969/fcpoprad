
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Calendar, ArrowRight, Search } from 'lucide-react';
import { Article } from '../data/articles';
import { getAllArticles, initializeArticles } from '../services/articleService';
import { getArticleThumbnail } from '../utils/articleUtils'; // Added this import
import { articles as defaultArticles } from '../data/articles';

const categories = ['Všetky', 'Novinky', 'Klubová TV', 'A Tím', 'U19', 'U17', 'U15', 'U13'];

export function Clanky() {
  const [selectedCategory, setSelectedCategory] = useState('Všetky');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    try {
      initializeArticles(defaultArticles);
      const data = await getAllArticles();
      setArticles(data);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === 'Všetky' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#003474] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Všetky články</h1>
          <p className="text-xl text-blue-200">
            Najnovšie správy, rozhovory a informácie z FC Poprad
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search Bar */}
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Hľadať články..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003474] focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? 'bg-[#003474] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Nájdených článkov: <span className="font-bold text-gray-900">{filteredArticles.length}</span>
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <Link
                key={article.id}
                to={`/clanky/${article.slug}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all group"
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
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#003474] transition-colors line-clamp-2">
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
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Žiadne výsledky
            </h3>
            <p className="text-gray-600">
              Nenašli sa žiadne články podľa zadaných kritérií.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
