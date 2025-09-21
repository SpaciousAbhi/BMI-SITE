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

        {/* Enhanced Search and Filters */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="bg-black/40 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Enhanced Search */}
                <div className="flex-1">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl transition-all duration-300 ${isSearchFocused ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}></div>
                    <div className="relative">
                      <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 transition-colors duration-300 ${isSearchFocused ? 'text-blue-400' : 'text-gray-400'}`} />
                      <input
                        type="text"
                        placeholder="Search articles, guides & health insights..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        className="w-full pl-14 pr-6 py-4 bg-gray-800/50 border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:border-blue-500/60 focus:bg-gray-800/80 focus:outline-none transition-all duration-300 text-lg"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Enhanced Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Category Filter */}
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="appearance-none bg-gray-800/50 border border-gray-600/50 rounded-2xl text-white px-6 py-4 pr-12 focus:border-blue-500/60 focus:bg-gray-800/80 focus:outline-none transition-all duration-300 text-lg cursor-pointer hover:border-gray-500/60"
                    >
                      <option value="all">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>

                  {/* Tag Filter */}
                  <div className="relative">
                    <select
                      value={selectedTag}
                      onChange={(e) => setSelectedTag(e.target.value)}
                      className="appearance-none bg-gray-800/50 border border-gray-600/50 rounded-2xl text-white px-6 py-4 pr-12 focus:border-purple-500/60 focus:bg-gray-800/80 focus:outline-none transition-all duration-300 text-lg cursor-pointer hover:border-gray-500/60"
                    >
                      <option value="all">All Tags</option>
                      {tags.map(tag => (
                        <option key={tag} value={tag}>
                          {tag}
                        </option>
                      ))}
                    </select>
                    <Tag className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>

                  {/* Clear Filters */}
                  {(searchQuery || selectedCategory !== 'all' || selectedTag !== 'all') && (
                    <button
                      onClick={clearFilters}
                      className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-2xl transition-all duration-300 font-medium text-lg hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 whitespace-nowrap"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>

              {/* Active Filters Display */}
              {(searchQuery || selectedCategory !== 'all' || selectedTag !== 'all') && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {searchQuery && (
                    <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 backdrop-blur-sm text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-500/30">
                      <Search className="w-4 h-4 inline mr-2" />
                      Search: "{searchQuery}"
                    </div>
                  )}
                  {selectedCategory !== 'all' && (
                    <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-sm text-green-300 px-4 py-2 rounded-full text-sm font-medium border border-green-500/30">
                      <Filter className="w-4 h-4 inline mr-2" />
                      Category: {selectedCategory}
                    </div>
                  )}
                  {selectedTag !== 'all' && (
                    <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 backdrop-blur-sm text-purple-300 px-4 py-2 rounded-full text-sm font-medium border border-purple-500/30">
                      <Tag className="w-4 h-4 inline mr-2" />
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
                        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] group-hover:animate-pulse"></div>
                        
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