import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, User, Star, BookOpen, TrendingUp, Filter, FileText, Layers, Scale, Utensils, Dumbbell, Baby, Stethoscope, Sparkles, Eye, Zap, Globe, ArrowRight, X } from 'lucide-react';
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
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/30 to-teal-900/20"></div>
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 bg-gradient-to-r from-blue-900/80 via-purple-900/80 to-teal-900/80 backdrop-blur-sm py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header Content */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="relative">
                  <FileText className="w-16 h-16 text-blue-400 animate-pulse" />
                  <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-bounce" />
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent animate-pulse">
                  Blogs & Articles
                </h1>
              </div>
              <p className="text-2xl md:text-3xl text-gray-300 mb-8 leading-relaxed max-w-4xl mx-auto">
                World-class health insights & comprehensive guides for all your calculator needs
              </p>
              
              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="group">
                  <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <BookOpen className="w-6 h-6 text-blue-400 group-hover:animate-bounce" />
                      <div className="text-3xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors">{stats.totalArticles}</div>
                    </div>
                    <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Expert Articles</div>
                  </div>
                </div>
                <div className="group">
                  <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-green-500/30 hover:border-green-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Star className="w-6 h-6 text-green-400 group-hover:animate-spin" />
                      <div className="text-3xl font-bold text-green-400 group-hover:text-green-300 transition-colors">{stats.featuredArticles}</div>
                    </div>
                    <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Featured Content</div>
                  </div>
                </div>
                <div className="group">
                  <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Layers className="w-6 h-6 text-yellow-400 group-hover:animate-pulse" />
                      <div className="text-3xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">{stats.categories}</div>
                    </div>
                    <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Categories</div>
                  </div>
                </div>
                <div className="group">
                  <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-6 h-6 text-purple-400 group-hover:animate-bounce" />
                      <div className="text-3xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors">{stats.averageReadTime}m</div>
                    </div>
                    <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Avg Read Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Enhanced Categories Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Explore Articles by <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text">Calculator Category</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Dive deep into specialized health content tailored to your interests and needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Body Composition & Weight Analysis */}
              <div 
                className="group relative bg-gradient-to-br from-blue-900/40 via-blue-800/30 to-blue-700/20 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/30 hover:border-blue-400/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 cursor-pointer transform hover:-translate-y-2"
                onClick={() => setSelectedCategory('Body Composition & Weight Analysis')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 bg-blue-500/20 rounded-2xl group-hover:bg-blue-500/40 transition-all duration-300 group-hover:scale-110">
                      <Scale className="w-10 h-10 text-blue-400 group-hover:animate-bounce" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">Body Composition</h3>
                      <p className="text-blue-300 group-hover:text-blue-200 transition-colors">Weight Analysis</p>
                    </div>
                  </div>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors leading-relaxed mb-4">
                    Comprehensive guides on BMI, body fat, lean mass, and weight assessment calculators with medical insights.
                  </p>
                  <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                    <span className="text-sm font-medium">Explore Articles</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Nutrition & Diet Analysis */}
              <div 
                className="group relative bg-gradient-to-br from-orange-900/40 via-orange-800/30 to-orange-700/20 backdrop-blur-sm rounded-3xl p-8 border border-orange-500/30 hover:border-orange-400/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 cursor-pointer transform hover:-translate-y-2"
                onClick={() => setSelectedCategory('Nutrition & Diet Analysis')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 bg-orange-500/20 rounded-2xl group-hover:bg-orange-500/40 transition-all duration-300 group-hover:scale-110">
                      <Utensils className="w-10 h-10 text-orange-400 group-hover:animate-bounce" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-orange-300 transition-colors">Nutrition & Diet</h3>
                      <p className="text-orange-300 group-hover:text-orange-200 transition-colors">Analysis</p>
                    </div>
                  </div>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors leading-relaxed mb-4">
                    Expert articles on calorie, macro, TDEE, and nutrition calculators for optimal diet planning and health.
                  </p>
                  <div className="flex items-center text-orange-400 group-hover:text-orange-300 transition-colors">
                    <span className="text-sm font-medium">Explore Articles</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Fitness & Performance Analysis */}
              <div 
                className="group relative bg-gradient-to-br from-purple-900/40 via-purple-800/30 to-purple-700/20 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 cursor-pointer transform hover:-translate-y-2"
                onClick={() => setSelectedCategory('Fitness & Performance Analysis')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 bg-purple-500/20 rounded-2xl group-hover:bg-purple-500/40 transition-all duration-300 group-hover:scale-110">
                      <Dumbbell className="w-10 h-10 text-purple-400 group-hover:animate-bounce" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">Fitness & Performance</h3>
                      <p className="text-purple-300 group-hover:text-purple-200 transition-colors">Analysis</p>
                    </div>
                  </div>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors leading-relaxed mb-4">
                    Performance guides covering pace, calories burned, heart rate, and strength training calculators.
                  </p>
                  <div className="flex items-center text-purple-400 group-hover:text-purple-300 transition-colors">
                    <span className="text-sm font-medium">Explore Articles</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Pregnancy & Women's Health */}
              <div 
                className="group relative bg-gradient-to-br from-pink-900/40 via-pink-800/30 to-pink-700/20 backdrop-blur-sm rounded-3xl p-8 border border-pink-500/30 hover:border-pink-400/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/25 cursor-pointer transform hover:-translate-y-2"
                onClick={() => setSelectedCategory('Pregnancy & Women\'s Health')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 bg-pink-500/20 rounded-2xl group-hover:bg-pink-500/40 transition-all duration-300 group-hover:scale-110">
                      <Baby className="w-10 h-10 text-pink-400 group-hover:animate-bounce" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-pink-300 transition-colors">Pregnancy & Women's</h3>
                      <p className="text-pink-300 group-hover:text-pink-200 transition-colors">Health</p>
                    </div>
                  </div>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors leading-relaxed mb-4">
                    Specialized content on pregnancy, ovulation, due date, and women's health calculators with medical accuracy.
                  </p>
                  <div className="flex items-center text-pink-400 group-hover:text-pink-300 transition-colors">
                    <span className="text-sm font-medium">Explore Articles</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Medical & Health Assessment */}
              <div 
                className="group relative bg-gradient-to-br from-red-900/40 via-red-800/30 to-red-700/20 backdrop-blur-sm rounded-3xl p-8 border border-red-500/30 hover:border-red-400/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 cursor-pointer transform hover:-translate-y-2"
                onClick={() => setSelectedCategory('Medical & Health Assessment')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 bg-red-500/20 rounded-2xl group-hover:bg-red-500/40 transition-all duration-300 group-hover:scale-110">
                      <Stethoscope className="w-10 h-10 text-red-400 group-hover:animate-bounce" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-red-300 transition-colors">Medical & Health</h3>
                      <p className="text-red-300 group-hover:text-red-200 transition-colors">Assessment</p>
                    </div>
                  </div>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors leading-relaxed mb-4">
                    Clinical guides on GFR, BAC, and medical assessment calculators with professional healthcare insights.
                  </p>
                  <div className="flex items-center text-red-400 group-hover:text-red-300 transition-colors">
                    <span className="text-sm font-medium">Explore Articles</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>

              {/* All Categories Overview */}
              <div 
                className="group relative bg-gradient-to-br from-teal-900/40 via-teal-800/30 to-teal-700/20 backdrop-blur-sm rounded-3xl p-8 border border-teal-500/30 hover:border-teal-400/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/25 cursor-pointer transform hover:-translate-y-2"
                onClick={() => setSelectedCategory('all')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 bg-teal-500/20 rounded-2xl group-hover:bg-teal-500/40 transition-all duration-300 group-hover:scale-110">
                      <Globe className="w-10 h-10 text-teal-400 group-hover:animate-spin" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-teal-300 transition-colors">All Categories</h3>
                      <p className="text-teal-300 group-hover:text-teal-200 transition-colors">Complete Collection</p>
                    </div>
                  </div>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors leading-relaxed mb-4">
                    Browse our complete collection of health calculator articles across all categories and specialties.
                  </p>
                  <div className="flex items-center text-teal-400 group-hover:text-teal-300 transition-colors">
                    <span className="text-sm font-medium">View All Articles</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
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