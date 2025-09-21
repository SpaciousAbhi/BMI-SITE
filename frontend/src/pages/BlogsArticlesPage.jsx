import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, User, Star, BookOpen, TrendingUp, Filter, FileText, Scale, Sparkles, Eye, Zap, ArrowRight, X, Tag, Heart, Brain, Shield } from 'lucide-react';
import { getAllArticles, getCategories, getTags, searchArticles, getArticleStats } from '../data/articles';
import { formatDate, calculateReadingTime } from '../utils/markdown';

const BlogsArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [tags, setTags] = useState([]);
  const [stats, setStats] = useState({});
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const allArticles = getAllArticles();
    const allTags = getTags();
    const articleStats = getArticleStats();

    setArticles(allArticles);
    setFilteredArticles(allArticles);
    setTags(allTags);
    setStats(articleStats);
  }, []);

  useEffect(() => {
    let filtered = articles;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = searchArticles(searchQuery);
    }

    // Apply tag filter
    if (selectedTag !== 'all') {
      filtered = filtered.filter(article => 
        article.tags && article.tags.includes(selectedTag)
      );
    }

    setFilteredArticles(filtered);
  }, [searchQuery, selectedTag, articles]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTag('all');
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background - Black OLED Theme */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-teal-900/10"></div>
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      {/* Compact Hero Section */}
      <div className="relative z-10 bg-gradient-to-r from-blue-900/60 via-black/80 to-teal-900/60 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Streamlined Header Content */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="relative">
                  <Heart className="w-10 h-10 text-blue-400 animate-pulse" />
                  <Sparkles className="w-3 h-3 text-teal-400 absolute -top-1 -right-1 animate-bounce" />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 bg-clip-text text-transparent">
                  Health Articles & Guides
                </h1>
              </div>
              <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed max-w-3xl mx-auto">
                Expert BMI insights & comprehensive health calculator guides
              </p>
              
              {/* Compact Stats Grid */}
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="group">
                  <div className="bg-black/40 backdrop-blur-md rounded-lg p-3 border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center justify-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-400 group-hover:animate-bounce" />
                      <div className="text-xl font-bold text-blue-400">{stats.totalArticles}</div>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Articles</div>
                  </div>
                </div>
                <div className="group">
                  <div className="bg-black/40 backdrop-blur-md rounded-lg p-3 border border-teal-500/30 hover:border-teal-400/60 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center justify-center gap-2">
                      <Star className="w-4 h-4 text-teal-400 group-hover:animate-spin" />
                      <div className="text-xl font-bold text-teal-400">{stats.featuredArticles}</div>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Featured</div>
                  </div>
                </div>
                <div className="group">
                  <div className="bg-black/40 backdrop-blur-md rounded-lg p-3 border border-green-500/30 hover:border-green-400/60 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4 text-green-400 group-hover:animate-bounce" />
                      <div className="text-xl font-bold text-green-400">{stats.averageReadTime}m</div>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Avg Read</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Focused BMI Content Section */}
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-blue-500/30">
                <Scale className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl md:text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 bg-clip-text">
                  BMI & Body Composition Guides
                </h2>
                <Heart className="w-5 h-5 text-teal-400 animate-pulse" />
              </div>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Comprehensive BMI calculator guides with expert medical insights and evidence-based health information
              </p>
            </div>
            
            {/* Featured Topic Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="group bg-gradient-to-br from-blue-900/30 via-blue-800/20 to-black/40 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Brain className="w-4 h-4 text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-white">BMI Fundamentals</h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">WHO standards, calculation methods & health categories</p>
              </div>
              
              <div className="group bg-gradient-to-br from-teal-900/30 via-teal-800/20 to-black/40 backdrop-blur-sm rounded-xl p-4 border border-teal-500/30 hover:border-teal-400/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-teal-500/20 rounded-lg">
                    <Shield className="w-4 h-4 text-teal-400" />
                  </div>
                  <h3 className="font-semibold text-white">Medical Accuracy</h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">Limitations, ethnic differences & clinical applications</p>
              </div>
              
              <div className="group bg-gradient-to-br from-green-900/30 via-green-800/20 to-black/40 backdrop-blur-sm rounded-xl p-4 border border-green-500/30 hover:border-green-400/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <h3 className="font-semibold text-white">Health Strategies</h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">Safe weight management & alternative assessments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Streamlined Search and Filters */}
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-black/30 backdrop-blur-lg rounded-xl p-4 border border-gray-700/30">
              <div className="flex flex-col md:flex-row gap-3">
                {/* Streamlined Search */}
                <div className="flex-1">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-lg transition-all duration-300 ${isSearchFocused ? 'opacity-100' : 'opacity-0'}`}></div>
                    <div className="relative">
                      <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${isSearchFocused ? 'text-blue-400' : 'text-gray-500'}`} />
                      <input
                        type="text"
                        placeholder="Search BMI articles & health guides..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        className="w-full pl-9 pr-4 py-2.5 bg-gray-900/50 border border-gray-600/30 rounded-lg text-white text-sm placeholder-gray-500 focus:border-blue-500/50 focus:bg-gray-900/70 focus:outline-none transition-all duration-300"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tag Filter Only */}
                <div className="flex gap-3">
                  <div className="relative">
                    <select
                      value={selectedTag}
                      onChange={(e) => setSelectedTag(e.target.value)}
                      className="appearance-none bg-gray-900/50 border border-gray-600/30 rounded-lg text-white text-sm px-3 py-2.5 pr-8 focus:border-teal-500/50 focus:bg-gray-900/70 focus:outline-none transition-all duration-300 cursor-pointer hover:border-gray-500/50"
                    >
                      <option value="all">All Topics</option>
                      {tags.map(tag => (
                        <option key={tag} value={tag}>
                          {tag}
                        </option>
                      ))}
                    </select>
                    <Tag className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
                  </div>

                  {/* Clear Filters */}
                  {(searchQuery || selectedTag !== 'all') && (
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white text-sm rounded-lg transition-all duration-300 font-medium hover:scale-105 whitespace-nowrap"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Active Filters Display */}
              {(searchQuery || selectedTag !== 'all') && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {searchQuery && (
                    <div className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs font-medium border border-blue-500/30">
                      <Search className="w-2 h-2 inline mr-1" />
                      "{searchQuery}"
                    </div>
                  )}
                  {selectedTag !== 'all' && (
                    <div className="bg-teal-500/20 text-teal-300 px-2 py-1 rounded-full text-xs font-medium border border-teal-500/30">
                      <Tag className="w-2 h-2 inline mr-1" />
                      {selectedTag}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Compact Articles Grid */}
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-7xl mx-auto">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-8">
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-gray-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-400 mb-2">No articles found</h3>
                <p className="text-gray-500 mb-4 max-w-sm mx-auto text-sm">
                  Try adjusting your search terms or clear filters to see all articles
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium hover:scale-105 text-sm"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-white mb-2">
                    {filteredArticles.length === articles.length 
                      ? 'Expert BMI & Health Articles' 
                      : `${filteredArticles.length} Article${filteredArticles.length === 1 ? '' : 's'} Found`}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {selectedTag !== 'all' 
                      ? `Exploring ${selectedTag} topics` 
                      : 'Comprehensive guides for body composition & weight assessment'}
                  </p>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredArticles.map((article, index) => (
                    <article
                      key={article.id}
                      className={`group relative bg-gradient-to-br from-gray-900/60 via-black/80 to-gray-900/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/30 hover:border-blue-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10 transform hover:-translate-y-1`}
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                      style={{
                        animationDelay: `${index * 50}ms`
                      }}
                    >
                      {/* Compact Article Image */}
                      <div className="h-32 relative overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${
                          article.category.includes('Body') ? 'from-blue-600 via-teal-500 to-blue-700' :
                          article.category.includes('Nutrition') ? 'from-teal-600 via-green-500 to-teal-700' :
                          article.category.includes('Medical') ? 'from-blue-600 via-blue-500 to-teal-600' :
                          'from-blue-600 via-teal-500 to-green-600'
                        } opacity-80`}></div>
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        
                        {/* Top badges */}
                        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                          {article.featured && (
                            <span className="bg-yellow-400/90 text-black px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                              <Star className="w-2 h-2" />
                              Featured
                            </span>
                          )}
                          {article.medicalReview && (
                            <span className="bg-green-400/90 text-black px-2 py-0.5 rounded-full text-xs font-bold">
                              Medical
                            </span>
                          )}
                        </div>
                        
                        {/* Reading time */}
                        <div className="absolute bottom-2 right-2">
                          <div className="bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1">
                            <Clock className="w-2 h-2" />
                            {article.readTime.split('-')[0]}min
                          </div>
                        </div>
                      </div>

                      {/* Compact Content Section */}
                      <div className="p-4">
                        <h2 className="text-base font-bold text-white mb-2 line-clamp-2 leading-snug group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-teal-400 group-hover:bg-clip-text transition-all duration-300">
                          {article.title}
                        </h2>
                        
                        <p className="text-gray-400 group-hover:text-gray-300 mb-3 line-clamp-2 text-sm leading-relaxed transition-colors duration-300">
                          {article.excerpt}
                        </p>

                        {/* Compact Meta */}
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-2.5 h-2.5" />
                            <span>{formatDate(article.date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-2.5 h-2.5" />
                            <span>Expert</span>
                          </div>
                        </div>

                        {/* Compact Tags */}
                        {article.tags && article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {article.tags.slice(0, 2).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="bg-gray-800/40 text-gray-400 px-2 py-0.5 rounded text-xs transition-colors duration-300 border border-gray-700/30"
                              >
                                {tag}
                              </span>
                            ))}
                            {article.tags.length > 2 && (
                              <span className="text-gray-500 text-xs py-0.5 px-1">
                                +{article.tags.length - 2}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Compact Read Button */}
                        <Link
                          to={`/blogs-articles/${article.slug}`}
                          className="block w-full"
                        >
                          <button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white py-2.5 rounded-lg transition-all duration-300 font-medium text-sm hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            <div className="relative flex items-center justify-center gap-2">
                              <span>Read Article</span>
                              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" />
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

        {/* Streamlined CTA Section */}
        <div className="relative overflow-hidden py-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-black/60 to-teal-900/40"></div>
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-48 h-48 bg-blue-500/10 rounded-full filter blur-2xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-teal-500/10 rounded-full filter blur-2xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Heart className="w-6 h-6 text-blue-400 animate-pulse" />
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 bg-clip-text text-transparent">
                    Try Our Calculators
                  </h2>
                  <Sparkles className="w-6 h-6 text-teal-400 animate-bounce" />
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed max-w-2xl mx-auto">
                  Apply what you've learned with our comprehensive suite of health calculators
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="group">
                  <div className="bg-black/20 backdrop-blur-md rounded-lg p-4 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
                    <Scale className="w-6 h-6 text-blue-400 mx-auto mb-2 group-hover:animate-bounce" />
                    <h3 className="font-bold text-white mb-1">BMI Calculator</h3>
                    <p className="text-gray-400 text-sm">Body Mass Index & Weight Assessment</p>
                  </div>
                </div>
                
                <div className="group">
                  <div className="bg-black/20 backdrop-blur-md rounded-lg p-4 border border-teal-500/20 hover:border-teal-400/40 transition-all duration-300 hover:scale-105">
                    <TrendingUp className="w-6 h-6 text-teal-400 mx-auto mb-2 group-hover:animate-bounce" />
                    <h3 className="font-bold text-white mb-1">All Calculators</h3>
                    <p className="text-gray-400 text-sm">Comprehensive Health & Fitness Tools</p>
                  </div>
                </div>
              </div>
              
              <Link
                to="/"
                className="inline-block group"
              >
                <button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-6 py-3 rounded-lg transition-all duration-300 font-semibold hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <div className="relative flex items-center gap-2">
                    <BookOpen className="w-5 h-5 group-hover:animate-spin" />
                    <span>Explore Calculators</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </div>
                </button>
              </Link>
              
              <div className="mt-4 text-gray-500">
                <span className="inline-flex items-center gap-2 text-sm">
                  <Star className="w-3 h-3 text-yellow-400" />
                  Medical-grade accuracy • Instant results • Evidence-based
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