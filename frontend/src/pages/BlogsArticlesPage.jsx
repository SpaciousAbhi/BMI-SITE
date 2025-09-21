import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, User, Star, BookOpen, TrendingUp, Filter, FileText, Layers, Scale, Utensils, Dumbbell, Baby, Stethoscope, Sparkles, Eye, Zap, Globe, ArrowRight, X, Tag } from 'lucide-react';
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

      {/* Compact Hero Section */}
      <div className="relative z-10 bg-gradient-to-r from-blue-900/80 via-purple-900/80 to-teal-900/80 backdrop-blur-sm py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Compact Header Content */}
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="relative">
                  <FileText className="w-12 h-12 text-blue-400 animate-pulse" />
                  <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-bounce" />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent animate-pulse">
                  Blogs & Articles
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed max-w-4xl mx-auto">
                World-class health insights & comprehensive guides for all your calculator needs
              </p>
              
              {/* Compact Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                <div className="group">
                  <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen className="w-5 h-5 text-blue-400 group-hover:animate-bounce" />
                      <div className="text-2xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors">{stats.totalArticles}</div>
                    </div>
                    <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">Expert Articles</div>
                  </div>
                </div>
                <div className="group">
                  <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 border border-green-500/30 hover:border-green-400/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-5 h-5 text-green-400 group-hover:animate-spin" />
                      <div className="text-2xl font-bold text-green-400 group-hover:text-green-300 transition-colors">{stats.featuredArticles}</div>
                    </div>
                    <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">Featured Content</div>
                  </div>
                </div>
                <div className="group">
                  <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Layers className="w-5 h-5 text-yellow-400 group-hover:animate-pulse" />
                      <div className="text-2xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">{stats.categories}</div>
                    </div>
                    <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">Categories</div>
                  </div>
                </div>
                <div className="group">
                  <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-5 h-5 text-purple-400 group-hover:animate-bounce" />
                      <div className="text-2xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors">{stats.averageReadTime}m</div>
                    </div>
                    <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">Avg Read Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Compact Categories Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Explore Articles by <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text">Calculator Category</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Dive deep into specialized health content tailored to your interests and needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Body Composition & Weight Analysis */}
              <div 
                className="group relative bg-gradient-to-br from-blue-900/40 via-blue-800/30 to-blue-700/20 backdrop-blur-sm rounded-2xl p-5 border border-blue-500/30 hover:border-blue-400/60 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 cursor-pointer transform hover:-translate-y-1"
                onClick={() => setSelectedCategory('Body Composition & Weight Analysis')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/40 transition-all duration-300 group-hover:scale-110">
                      <Scale className="w-6 h-6 text-blue-400 group-hover:animate-bounce" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">Body Composition</h3>
                      <p className="text-blue-300 group-hover:text-blue-200 transition-colors text-sm">Weight Analysis</p>
                    </div>
                  </div>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors leading-relaxed mb-3 text-sm">
                    Comprehensive guides on BMI, body fat, lean mass, and weight assessment calculators with medical insights.
                  </p>
                  <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                    <span className="text-xs font-medium">Explore Articles</span>
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Nutrition & Diet Analysis */}
              <div 
                className="group relative bg-gradient-to-br from-orange-900/40 via-orange-800/30 to-orange-700/20 backdrop-blur-sm rounded-2xl p-5 border border-orange-500/30 hover:border-orange-400/60 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 cursor-pointer transform hover:-translate-y-1"
                onClick={() => setSelectedCategory('Nutrition & Diet Analysis')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-orange-500/20 rounded-xl group-hover:bg-orange-500/40 transition-all duration-300 group-hover:scale-110">
                      <Utensils className="w-6 h-6 text-orange-400 group-hover:animate-bounce" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors">Nutrition & Diet</h3>
                      <p className="text-orange-300 group-hover:text-orange-200 transition-colors text-sm">Analysis</p>
                    </div>
                  </div>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors leading-relaxed mb-3 text-sm">
                    Expert articles on calorie, macro, TDEE, and nutrition calculators for optimal diet planning and health.
                  </p>
                  <div className="flex items-center text-orange-400 group-hover:text-orange-300 transition-colors">
                    <span className="text-xs font-medium">Explore Articles</span>
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Fitness & Performance Analysis */}
              <div 
                className="group relative bg-gradient-to-br from-purple-900/40 via-purple-800/30 to-purple-700/20 backdrop-blur-sm rounded-2xl p-5 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 cursor-pointer transform hover:-translate-y-1"
                onClick={() => setSelectedCategory('Fitness & Performance Analysis')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-purple-500/20 rounded-xl group-hover:bg-purple-500/40 transition-all duration-300 group-hover:scale-110">
                      <Dumbbell className="w-6 h-6 text-purple-400 group-hover:animate-bounce" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">Fitness & Performance</h3>
                      <p className="text-purple-300 group-hover:text-purple-200 transition-colors text-sm">Analysis</p>
                    </div>
                  </div>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors leading-relaxed mb-3 text-sm">
                    Performance guides covering pace, calories burned, heart rate, and strength training calculators.
                  </p>
                  <div className="flex items-center text-purple-400 group-hover:text-purple-300 transition-colors">
                    <span className="text-xs font-medium">Explore Articles</span>
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Pregnancy & Women's Health */}
              <div 
                className="group relative bg-gradient-to-br from-pink-900/40 via-pink-800/30 to-pink-700/20 backdrop-blur-sm rounded-2xl p-5 border border-pink-500/30 hover:border-pink-400/60 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/25 cursor-pointer transform hover:-translate-y-1"
                onClick={() => setSelectedCategory('Pregnancy & Women\'s Health')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-pink-500/20 rounded-xl group-hover:bg-pink-500/40 transition-all duration-300 group-hover:scale-110">
                      <Baby className="w-6 h-6 text-pink-400 group-hover:animate-bounce" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-pink-300 transition-colors">Pregnancy & Women's</h3>
                      <p className="text-pink-300 group-hover:text-pink-200 transition-colors text-sm">Health</p>
                    </div>
                  </div>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors leading-relaxed mb-3 text-sm">
                    Specialized content on pregnancy, ovulation, due date, and women's health calculators with medical accuracy.
                  </p>
                  <div className="flex items-center text-pink-400 group-hover:text-pink-300 transition-colors">
                    <span className="text-xs font-medium">Explore Articles</span>
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Medical & Health Assessment */}
              <div 
                className="group relative bg-gradient-to-br from-red-900/40 via-red-800/30 to-red-700/20 backdrop-blur-sm rounded-2xl p-5 border border-red-500/30 hover:border-red-400/60 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-red-500/25 cursor-pointer transform hover:-translate-y-1"
                onClick={() => setSelectedCategory('Medical & Health Assessment')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-red-500/20 rounded-xl group-hover:bg-red-500/40 transition-all duration-300 group-hover:scale-110">
                      <Stethoscope className="w-6 h-6 text-red-400 group-hover:animate-bounce" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-red-300 transition-colors">Medical & Health</h3>
                      <p className="text-red-300 group-hover:text-red-200 transition-colors text-sm">Assessment</p>
                    </div>
                  </div>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors leading-relaxed mb-3 text-sm">
                    Clinical guides on GFR, BAC, and medical assessment calculators with professional healthcare insights.
                  </p>
                  <div className="flex items-center text-red-400 group-hover:text-red-300 transition-colors">
                    <span className="text-xs font-medium">Explore Articles</span>
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* All Categories Overview */}
              <div 
                className="group relative bg-gradient-to-br from-teal-900/40 via-teal-800/30 to-teal-700/20 backdrop-blur-sm rounded-2xl p-5 border border-teal-500/30 hover:border-teal-400/60 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-teal-500/25 cursor-pointer transform hover:-translate-y-1"
                onClick={() => setSelectedCategory('all')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-teal-500/20 rounded-xl group-hover:bg-teal-500/40 transition-all duration-300 group-hover:scale-110">
                      <Globe className="w-6 h-6 text-teal-400 group-hover:animate-spin" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors">All Categories</h3>
                      <p className="text-teal-300 group-hover:text-teal-200 transition-colors text-sm">Complete Collection</p>
                    </div>
                  </div>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors leading-relaxed mb-3 text-sm">
                    Browse our complete collection of health calculator articles across all categories and specialties.
                  </p>
                  <div className="flex items-center text-teal-400 group-hover:text-teal-300 transition-colors">
                    <span className="text-xs font-medium">View All Articles</span>
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Search and Filters */}
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-5 border border-gray-700/50 shadow-xl">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Compact Search */}
                <div className="flex-1">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl transition-all duration-300 ${isSearchFocused ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}></div>
                    <div className="relative">
                      <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${isSearchFocused ? 'text-blue-400' : 'text-gray-400'}`} />
                      <input
                        type="text"
                        placeholder="Search articles, guides & health insights..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        className="w-full pl-10 pr-5 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-blue-500/60 focus:bg-gray-800/80 focus:outline-none transition-all duration-300"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Compact Filters */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Category Filter */}
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="appearance-none bg-gray-800/50 border border-gray-600/50 rounded-xl text-white px-4 py-3 pr-10 focus:border-blue-500/60 focus:bg-gray-800/80 focus:outline-none transition-all duration-300 cursor-pointer hover:border-gray-500/60"
                    >
                      <option value="all">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>

                  {/* Tag Filter */}
                  <div className="relative">
                    <select
                      value={selectedTag}
                      onChange={(e) => setSelectedTag(e.target.value)}
                      className="appearance-none bg-gray-800/50 border border-gray-600/50 rounded-xl text-white px-4 py-3 pr-10 focus:border-purple-500/60 focus:bg-gray-800/80 focus:outline-none transition-all duration-300 cursor-pointer hover:border-gray-500/60"
                    >
                      <option value="all">All Tags</option>
                      {tags.map(tag => (
                        <option key={tag} value={tag}>
                          {tag}
                        </option>
                      ))}
                    </select>
                    <Tag className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>

                  {/* Clear Filters */}
                  {(searchQuery || selectedCategory !== 'all' || selectedTag !== 'all') && (
                    <button
                      onClick={clearFilters}
                      className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl transition-all duration-300 font-medium hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 whitespace-nowrap"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>

              {/* Active Filters Display */}
              {(searchQuery || selectedCategory !== 'all' || selectedTag !== 'all') && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {searchQuery && (
                    <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 backdrop-blur-sm text-blue-300 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/30">
                      <Search className="w-3 h-3 inline mr-1" />
                      Search: "{searchQuery}"
                    </div>
                  )}
                  {selectedCategory !== 'all' && (
                    <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-sm text-green-300 px-3 py-1 rounded-full text-xs font-medium border border-green-500/30">
                      <Filter className="w-3 h-3 inline mr-1" />
                      Category: {selectedCategory}
                    </div>
                  )}
                  {selectedTag !== 'all' && (
                    <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 backdrop-blur-sm text-purple-300 px-3 py-1 rounded-full text-xs font-medium border border-purple-500/30">
                      <Tag className="w-3 h-3 inline mr-1" />
                      Tag: {selectedTag}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Articles Grid */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-20">
                <div className="relative mb-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-gray-500 animate-pulse" />
                  </div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full animate-ping"></div>
                </div>
                <h3 className="text-3xl font-bold text-gray-400 mb-4">No articles found</h3>
                <p className="text-xl text-gray-500 mb-8 max-w-md mx-auto">
                  Try adjusting your search terms or exploring different categories
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-2xl transition-all duration-300 font-medium text-lg hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {filteredArticles.length === articles.length 
                      ? 'All Health Articles' 
                      : `${filteredArticles.length} Article${filteredArticles.length === 1 ? '' : 's'} Found`}
                  </h2>
                  <p className="text-gray-400 text-lg">
                    {selectedCategory !== 'all' 
                      ? `Exploring ${selectedCategory.toLowerCase()}` 
                      : 'Discover expert insights across all health topics'}
                  </p>
                </div>
                
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredArticles.map((article, index) => (
                    <article
                      key={article.id}
                      className={`group relative bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700/50 hover:border-gray-600/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl transform ${hoveredCard === index ? 'hover:-translate-y-4' : 'hover:-translate-y-2'}`}
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                      style={{
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      {/* Enhanced Article Image with Dynamic Gradients */}
                      <div className="h-56 relative overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${
                          article.category.includes('Body') ? 'from-blue-600 via-blue-500 to-teal-500' :
                          article.category.includes('Nutrition') ? 'from-orange-600 via-orange-500 to-yellow-500' :
                          article.category.includes('Fitness') ? 'from-purple-600 via-purple-500 to-pink-500' :
                          article.category.includes('Pregnancy') ? 'from-pink-600 via-rose-500 to-red-500' :
                          article.category.includes('Medical') ? 'from-red-600 via-red-500 to-pink-500' :
                          'from-teal-600 via-cyan-500 to-blue-500'
                        } opacity-90`}></div>
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        {/* Animated overlay pattern */}
                        <div className="absolute inset-0 opacity-20 group-hover:animate-pulse"></div>
                        
                        {/* Top badges */}
                        <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                          {article.featured && (
                            <span className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                              <Star className="w-3 h-3 animate-spin" />
                              Featured
                            </span>
                          )}
                          {article.medicalReview && (
                            <span className="bg-gradient-to-r from-green-500 to-green-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                              <Zap className="w-3 h-3 mr-1" />
                              Medical
                            </span>
                          )}
                        </div>
                        
                        {/* Category badge */}
                        <div className="absolute bottom-6 left-6">
                          <span className="bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                            {article.category}
                          </span>
                        </div>
                        
                        {/* Reading indicator */}
                        <div className="absolute bottom-6 right-6">
                          <div className="bg-black/60 backdrop-blur-md text-white px-3 py-2 rounded-full text-xs font-medium border border-white/20 flex items-center gap-2">
                            <Eye className="w-3 h-3" />
                            {article.readTime}
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Content Section */}
                      <div className="p-8">
                        <h2 className="text-2xl font-bold text-white mb-4 line-clamp-2 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                          {article.title}
                        </h2>
                        
                        <p className="text-gray-400 group-hover:text-gray-300 mb-6 line-clamp-3 text-sm leading-relaxed transition-colors duration-300">
                          {article.excerpt}
                        </p>

                        {/* Enhanced Meta Information */}
                        <div className="flex items-center gap-4 text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300 mb-6">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(article.date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>Expert Review</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            <span>Updated</span>
                          </div>
                        </div>

                        {/* Enhanced Tags */}
                        {article.tags && article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-6">
                            {article.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="bg-gray-800/50 hover:bg-gray-700/60 text-gray-400 hover:text-gray-300 px-3 py-1 rounded-full text-xs transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-gray-600/50"
                              >
                                {tag}
                              </span>
                            ))}
                            {article.tags.length > 3 && (
                              <span className="text-gray-500 text-xs py-1 px-2">
                                +{article.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        )}

                        {/* Enhanced Read Button */}
                        <Link
                          to={`/blogs-articles/${article.slug}`}
                          className="block w-full"
                        >
                          <button className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 hover:from-blue-700 hover:via-purple-700 hover:to-teal-700 text-white py-4 rounded-2xl transition-all duration-300 font-semibold text-lg group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-blue-500/25 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                            <div className="relative flex items-center justify-center gap-2">
                              <span>Read Full Article</span>
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                          </button>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* World-Class CTA Section */}
        <div className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/80 to-teal-900/80"></div>
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center">
              <div className="mb-8">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <TrendingUp className="w-12 h-12 text-blue-400 animate-bounce" />
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                    Ready to Calculate?
                  </h2>
                  <Sparkles className="w-12 h-12 text-purple-400 animate-pulse" />
                </div>
                <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
                  Apply what you've learned with our comprehensive suite of world-class health and fitness calculators
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="group">
                  <div className="bg-black/30 backdrop-blur-md rounded-3xl p-8 border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                    <Scale className="w-12 h-12 text-blue-400 mx-auto mb-4 group-hover:animate-bounce" />
                    <h3 className="text-2xl font-bold text-white mb-3">Body Composition</h3>
                    <p className="text-gray-300 text-lg">BMI, Body Fat, Lean Mass & More</p>
                  </div>
                </div>
                
                <div className="group">
                  <div className="bg-black/30 backdrop-blur-md rounded-3xl p-8 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
                    <Baby className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:animate-bounce" />
                    <h3 className="text-2xl font-bold text-white mb-3">Pregnancy Tools</h3>
                    <p className="text-gray-300 text-lg">Due Date, Weight Gain, Ovulation</p>
                  </div>
                </div>
                
                <div className="group">
                  <div className="bg-black/30 backdrop-blur-md rounded-3xl p-8 border border-teal-500/30 hover:border-teal-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/25">
                    <Dumbbell className="w-12 h-12 text-teal-400 mx-auto mb-4 group-hover:animate-bounce" />
                    <h3 className="text-2xl font-bold text-white mb-3">Fitness & Nutrition</h3>
                    <p className="text-gray-300 text-lg">TDEE, Macros, Calories & More</p>
                  </div>
                </div>
              </div>
              
              <Link
                to="/"
                className="inline-block group"
              >
                <button className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 hover:from-blue-700 hover:via-purple-700 hover:to-teal-700 text-white px-12 py-6 rounded-3xl transition-all duration-500 font-bold text-2xl hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <div className="relative flex items-center gap-4">
                    <BookOpen className="w-8 h-8 group-hover:animate-spin" />
                    <span>Explore All Calculators</span>
                    <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </button>
              </Link>
              
              <div className="mt-8 text-gray-400 text-lg">
                <span className="inline-flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  World-class accuracy • Medical-grade precision • Instant results
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsArticlesPage;