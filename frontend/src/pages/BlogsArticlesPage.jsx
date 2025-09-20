import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, User, Star, BookOpen, TrendingUp, Filter, FileText, Layers, Scale, Utensils, Dumbbell, Baby, Stethoscope } from 'lucide-react';
import { getAllArticles, getCategories, getTags, searchArticles, getArticleStats } from '../data/articles';
import { formatDate, calculateReadingTime } from '../utils/markdown';

const BlogsArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const allArticles = getAllArticles();
    const allCategories = getCategories();
    const allTags = getTags();
    const articleStats = getArticleStats();

    setArticles(allArticles);
    setFilteredArticles(allArticles);
    setCategories(allCategories);
    setTags(allTags);
    setStats(articleStats);
  }, []);

  useEffect(() => {
    let filtered = articles;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = searchArticles(searchQuery);
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Apply tag filter
    if (selectedTag !== 'all') {
      filtered = filtered.filter(article => 
        article.tags && article.tags.includes(selectedTag)
      );
    }

    setFilteredArticles(filtered);
  }, [searchQuery, selectedCategory, selectedTag, articles]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTag('all');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 to-teal-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <FileText className="w-12 h-12 text-blue-400" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Blogs & Articles
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Expert health insights & comprehensive guides for all your calculator needs
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-black/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400">{stats.totalArticles}</div>
                <div className="text-sm text-gray-400">Articles</div>
              </div>
              <div className="bg-black/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400">{stats.featuredArticles}</div>
                <div className="text-sm text-gray-400">Featured</div>
              </div>
              <div className="bg-black/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-400">{stats.categories}</div>
                <div className="text-sm text-gray-400">Categories</div>
              </div>
              <div className="bg-black/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-400">{stats.averageReadTime}m</div>
                <div className="text-sm text-gray-400">Avg Read</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Overview Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">
            Explore Articles by <span className="text-transparent bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text">Calculator Category</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Body Composition & Weight Analysis */}
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 group cursor-pointer"
                 onClick={() => setSelectedCategory('Body Composition & Weight Analysis')}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                  <Scale className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Body Composition</h3>
                  <p className="text-sm text-gray-400">Weight Analysis</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Comprehensive guides on BMI, body fat, lean mass, and weight assessment calculators with medical insights.
              </p>
            </div>

            {/* Nutrition & Diet Analysis */}
            <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/20 rounded-xl p-6 border border-orange-500/20 hover:border-orange-400/40 transition-all duration-300 group cursor-pointer"
                 onClick={() => setSelectedCategory('Nutrition & Diet Analysis')}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30 transition-colors">
                  <Utensils className="w-8 h-8 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Nutrition & Diet</h3>
                  <p className="text-sm text-gray-400">Analysis</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Expert articles on calorie, macro, TDEE, and nutrition calculators for optimal diet planning and health.
              </p>
            </div>

            {/* Fitness & Performance Analysis */}
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group cursor-pointer"
                 onClick={() => setSelectedCategory('Fitness & Performance Analysis')}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                  <Dumbbell className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Fitness & Performance</h3>
                  <p className="text-sm text-gray-400">Analysis</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Performance guides covering pace, calories burned, heart rate, and strength training calculators.
              </p>
            </div>

            {/* Pregnancy & Women's Health */}
            <div className="bg-gradient-to-br from-pink-900/30 to-pink-800/20 rounded-xl p-6 border border-pink-500/20 hover:border-pink-400/40 transition-all duration-300 group cursor-pointer"
                 onClick={() => setSelectedCategory('Pregnancy & Women\'s Health')}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-pink-500/20 rounded-lg group-hover:bg-pink-500/30 transition-colors">
                  <Baby className="w-8 h-8 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Pregnancy & Women's</h3>
                  <p className="text-sm text-gray-400">Health</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Specialized content on pregnancy, ovulation, due date, and women's health calculators with medical accuracy.
              </p>
            </div>

            {/* Medical & Health Assessment */}
            <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 rounded-xl p-6 border border-red-500/20 hover:border-red-400/40 transition-all duration-300 group cursor-pointer"
                 onClick={() => setSelectedCategory('Medical & Health Assessment')}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-red-500/20 rounded-lg group-hover:bg-red-500/30 transition-colors">
                  <Stethoscope className="w-8 h-8 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Medical & Health</h3>
                  <p className="text-sm text-gray-400">Assessment</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Clinical guides on GFR, BAC, and medical assessment calculators with professional healthcare insights.
              </p>
            </div>

            {/* All Categories Overview */}
            <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 rounded-xl p-6 border border-green-500/20 hover:border-green-400/40 transition-all duration-300 group cursor-pointer"
                 onClick={() => setSelectedCategory('all')}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                  <Layers className="w-8 h-8 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">All Categories</h3>
                  <p className="text-sm text-gray-400">Complete Collection</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Browse our complete collection of health calculator articles across all categories and specialties.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles & guides..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="md:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tag Filter */}
              <div className="md:w-48">
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="all">All Tags</option>
                  {tags.map(tag => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              {(searchQuery || selectedCategory !== 'all' || selectedTag !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors whitespace-nowrap"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Active Filters Display */}
            {(searchQuery || selectedCategory !== 'all' || selectedTag !== 'all') && (
              <div className="mt-4 flex flex-wrap gap-2">
                {searchQuery && (
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                    Search: "{searchQuery}"
                  </span>
                )}
                {selectedCategory !== 'all' && (
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                    Category: {selectedCategory}
                  </span>
                )}
                {selectedTag !== 'all' && (
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                    Tag: {selectedTag}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="max-w-6xl mx-auto">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No articles found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search terms or clearing filters
              </p>
              <button
                onClick={clearFilters}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                >
                  {/* Article Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-blue-600 to-teal-600 relative">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-4 left-4">
                      {article.featured && (
                        <span className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-white mb-3 line-clamp-2 leading-tight">
                      {article.title}
                    </h2>
                    
                    <p className="text-gray-400 mb-4 line-clamp-3 text-sm leading-relaxed">
                      {article.excerpt}
                    </p>

                    {/* Article Meta */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(article.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{article.readTime}</span>
                      </div>
                      {article.medicalReview && (
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          <span>Medical</span>
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {article.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-800 text-gray-400 px-2 py-1 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                        {article.tags.length > 3 && (
                          <span className="text-gray-500 text-xs">
                            +{article.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    <Link
                      to={`/blogs-articles/${article.slug}`}
                      className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg transition-colors font-medium"
                    >
                      Read Article
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-blue-900 to-teal-900 rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Use Our Health Calculators?
          </h2>
          <p className="text-gray-300 mb-6 text-lg">
            Apply what you've learned with our comprehensive suite of health and fitness calculators
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-3 bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            <TrendingUp className="w-5 h-5" />
            Explore All Calculators
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogsArticlesPage;