import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, BookOpen, Search, Tag, TrendingUp, Heart, Zap, Target } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { useTheme } from '../contexts/ThemeContext';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BlogPage = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Blog articles data
  const blogArticles = [
    {
      id: 1,
      title: "Complete BMI Guide 2025: Understanding Body Mass Index",
      slug: "complete-bmi-guide-2025",
      excerpt: "Everything you need to know about BMI - calculations, categories, limitations, and alternatives. Get the complete guide to understanding your body mass index.",
      content: "Full article content...",
      category: "BMI Guide",
      author: "Dr. Sarah Chen",
      publishDate: "2025-01-13",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=400&fit=crop",
      tags: ["BMI", "Health", "Guide", "2025"],
      featured: true
    },
    {
      id: 2,
      title: "BMI vs Body Fat Percentage: Which is More Accurate?",
      slug: "bmi-vs-body-fat-percentage",
      excerpt: "Discover the key differences between BMI and body fat percentage measurements. Learn which metric provides better insights for your health goals.",
      content: "Full article content...",
      category: "Health Metrics",
      author: "Dr. Michael Torres",
      publishDate: "2025-01-12",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      tags: ["BMI", "Body Fat", "Health Metrics", "Comparison"],
      featured: true
    },
    {
      id: 3,
      title: "Healthy Weight Loss Tips Based on Your BMI Category",
      slug: "weight-loss-tips-by-bmi",
      excerpt: "Personalized weight loss strategies for different BMI categories. Safe, effective approaches to reach your healthy weight goals.",
      content: "Full article content...",
      category: "Weight Loss",
      author: "Nutritionist Lisa Park",
      publishDate: "2025-01-11",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop",
      tags: ["Weight Loss", "BMI", "Diet", "Health"],
      featured: false
    },
    {
      id: 4,
      title: "BMI Calculator for Different Age Groups: Children, Adults, Seniors",
      slug: "bmi-calculator-age-groups",
      excerpt: "Learn how BMI calculations and interpretations vary across different age groups. Special considerations for children, adults, and seniors.",
      content: "Full article content...",
      category: "Age-Specific",
      author: "Dr. Robert Kim",
      publishDate: "2025-01-10",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68e71?w=600&h=400&fit=crop",
      tags: ["BMI", "Age Groups", "Children", "Seniors"],
      featured: false
    },
    {
      id: 5,
      title: "Exercise Plans by BMI Category: Underweight to Obese",
      slug: "exercise-plans-by-bmi",
      excerpt: "Tailored workout routines for every BMI category. Safe and effective exercise plans to help you reach your optimal health.",
      content: "Full article content...",
      category: "Fitness",
      author: "Fitness Coach Maria Rodriguez",
      publishDate: "2025-01-09",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      tags: ["Exercise", "BMI", "Fitness", "Workout"],
      featured: false
    },
    {
      id: 6,
      title: "BMI Limitations: When Body Mass Index Isn't Enough",
      slug: "bmi-limitations-alternatives",
      excerpt: "Understanding the limitations of BMI and exploring alternative health metrics for a complete picture of your health.",
      content: "Full article content...",
      category: "Health Science",
      author: "Dr. Amanda Johnson",
      publishDate: "2025-01-08",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      tags: ["BMI", "Health Science", "Limitations", "Alternatives"],
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Articles', count: blogArticles.length },
    { id: 'bmi-guide', name: 'BMI Guide', count: blogArticles.filter(a => a.category === 'BMI Guide').length },
    { id: 'health-metrics', name: 'Health Metrics', count: blogArticles.filter(a => a.category === 'Health Metrics').length },
    { id: 'weight-loss', name: 'Weight Loss', count: blogArticles.filter(a => a.category === 'Weight Loss').length },
    { id: 'age-specific', name: 'Age-Specific', count: blogArticles.filter(a => a.category === 'Age-Specific').length },
    { id: 'fitness', name: 'Fitness', count: blogArticles.filter(a => a.category === 'Fitness').length },
    { id: 'health-science', name: 'Health Science', count: blogArticles.filter(a => a.category === 'Health Science').length },
  ];

  const filteredArticles = blogArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
                           article.category.toLowerCase().replace(' ', '-') === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = blogArticles.filter(article => article.featured);

  const getBackgroundGradient = () => {
    switch(theme) {
      case 'white':
        return 'bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50';
      case 'dark':
        return 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900';
      case 'black':
        return 'bg-gradient-to-br from-black via-gray-900 to-black';
      default:
        return 'bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category.toLowerCase()) {
      case 'bmi guide': return <BookOpen className="h-4 w-4" />;
      case 'health metrics': return <TrendingUp className="h-4 w-4" />;
      case 'weight loss': return <Target className="h-4 w-4" />;
      case 'fitness': return <Zap className="h-4 w-4" />;
      default: return <Heart className="h-4 w-4" />;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <SEOHead 
        title="Health & BMI Blog - Expert Articles on Body Mass Index & Wellness 2025"
        description="Expert health articles on BMI, weight management, fitness, and wellness. Get the latest insights on body mass index, healthy living, and personalized health tips from medical professionals."
        keywords="BMI blog, health articles, weight loss tips, body mass index guide, fitness advice, health blog, wellness tips, BMI calculator guide, health experts"
        canonical="/blog"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Health & BMI Blog",
          "description": "Expert health articles on BMI, weight management, fitness, and wellness",
          "url": "https://bmicalculator.com/blog",
          "publisher": {
            "@type": "Organization",
            "name": "Advanced BMI Calculator",
            "url": "https://bmicalculator.com"
          }
        }}
      />
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-500 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            Health & BMI Blog
          </h1>
          <div className={`w-32 h-1 mx-auto mb-6 rounded-full transition-all duration-500 ${
            theme === 'white' ? 'bg-gradient-to-r from-teal-400 to-cyan-500' :
            theme === 'dark' ? 'bg-gradient-to-r from-purple-400 to-pink-500' :
            'bg-gradient-to-r from-green-400 to-emerald-500'
          }`} />
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto transition-colors duration-500 ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Expert insights on <strong>BMI, health, fitness, and wellness</strong>. Get the latest science-backed information to make informed decisions about your health journey.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className={`backdrop-blur-md border-0 shadow-xl ${
            theme === 'white' 
              ? 'bg-white/80' 
              : theme === 'dark'
              ? 'bg-gray-800/80'
              : 'bg-black/80'
          }`}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                    theme === 'white' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-10 ${
                      theme === 'white' 
                        ? 'bg-white/70 border-teal-200' 
                        : theme === 'dark'
                        ? 'bg-gray-700/50 border-purple-500/30 text-white'
                        : 'bg-gray-900/50 border-green-500/30 text-white'
                    }`}
                  />
                </div>
                
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 lg:min-w-fit">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className={`transition-all duration-300 hover:scale-105 ${
                        selectedCategory === category.id
                          ? theme === 'white'
                            ? 'bg-teal-600 text-white'
                            : theme === 'dark'
                            ? 'bg-purple-600 text-white'
                            : 'bg-green-600 text-white'
                          : theme === 'white'
                          ? 'border-teal-200 text-teal-700 hover:bg-teal-50'
                          : theme === 'dark'
                          ? 'border-purple-500/50 text-purple-300 hover:bg-purple-900/20'
                          : 'border-green-500/50 text-green-300 hover:bg-green-900/20'
                      }`}
                    >
                      {category.name} ({category.count})
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Articles */}
        {selectedCategory === 'all' && searchTerm === '' && (
          <div className="mb-16">
            <h2 className={`text-3xl font-bold mb-8 text-center ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              Featured Articles
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {featuredArticles.map((article, index) => (
                <Card key={article.id} className={`backdrop-blur-md border-0 shadow-xl transform hover:scale-[1.02] transition-all duration-500 cursor-pointer animate-slide-in ${
                  theme === 'white' 
                    ? 'bg-white/80 hover:bg-white/90' 
                    : theme === 'dark'
                    ? 'bg-gray-800/80 hover:bg-gray-800/90'
                    : 'bg-black/80 hover:bg-gray-900/50'
                }`} style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="relative">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className={`absolute top-4 left-4 ${
                      theme === 'white' ? 'bg-teal-600 text-white' :
                      theme === 'dark' ? 'bg-purple-600 text-white' :
                      'bg-green-600 text-white'
                    }`}>
                      Featured
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <Badge variant="outline" className={`${
                        theme === 'white' ? 'border-teal-200 text-teal-700' :
                        theme === 'dark' ? 'border-purple-500/50 text-purple-300' :
                        'border-green-500/50 text-green-300'
                      }`}>
                        {getCategoryIcon(article.category)}
                        <span className="ml-1">{article.category}</span>
                      </Badge>
                      <div className={`flex items-center gap-1 text-sm ${
                        theme === 'white' ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </div>
                    </div>
                    
                    <h3 className={`text-xl font-bold mb-3 ${
                      theme === 'white' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {article.title}
                    </h3>
                    
                    <p className={`text-sm mb-4 line-clamp-3 ${
                      theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                    }`}>
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className={`flex items-center gap-2 text-sm ${
                        theme === 'white' ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        <User className="h-3 w-3" />
                        {article.author}
                        <Calendar className="h-3 w-3 ml-2" />
                        {new Date(article.publishDate).toLocaleDateString()}
                      </div>
                      
                      <Link to={`/blog/${article.slug}`}>
                        <Button size="sm" className={`${
                          theme === 'white' ? 'bg-teal-600 hover:bg-teal-700' :
                          theme === 'dark' ? 'bg-purple-600 hover:bg-purple-700' :
                          'bg-green-600 hover:bg-green-700'
                        } text-white`}>
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Articles Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className={`text-3xl font-bold ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              {selectedCategory === 'all' ? 'All Articles' : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <div className={`text-sm ${
              theme === 'white' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <Card key={article.id} className={`backdrop-blur-md border-0 shadow-xl transform hover:scale-[1.02] transition-all duration-500 cursor-pointer animate-slide-in ${
                theme === 'white' 
                  ? 'bg-white/80 hover:bg-white/90' 
                  : theme === 'dark'
                  ? 'bg-gray-800/80 hover:bg-gray-800/90'
                  : 'bg-black/80 hover:bg-gray-900/50'
              }`} style={{ animationDelay: `${index * 50}ms` }}>
                <div className="relative">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  {article.featured && (
                    <Badge className={`absolute top-3 left-3 text-xs ${
                      theme === 'white' ? 'bg-teal-600 text-white' :
                      theme === 'dark' ? 'bg-purple-600 text-white' :
                      'bg-green-600 text-white'
                    }`}>
                      Featured
                    </Badge>
                  )}
                </div>
                
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="outline" className={`text-xs ${
                      theme === 'white' ? 'border-teal-200 text-teal-700' :
                      theme === 'dark' ? 'border-purple-500/50 text-purple-300' :
                      'border-green-500/50 text-green-300'
                    }`}>
                      {getCategoryIcon(article.category)}
                      <span className="ml-1">{article.category}</span>
                    </Badge>
                    <div className={`flex items-center gap-1 text-xs ${
                      theme === 'white' ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </div>
                  </div>
                  
                  <h3 className={`text-lg font-bold mb-2 line-clamp-2 ${
                    theme === 'white' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {article.title}
                  </h3>
                  
                  <p className={`text-sm mb-4 line-clamp-3 ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                  }`}>
                    {article.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className={`text-xs ${
                        theme === 'white' ? 'bg-gray-100 text-gray-600' :
                        theme === 'dark' ? 'bg-gray-700 text-gray-300' :
                        'bg-gray-800 text-gray-400'
                      }`}>
                        <Tag className="h-2 w-2 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center gap-2 text-xs ${
                      theme === 'white' ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      <User className="h-3 w-3" />
                      {article.author.split(' ')[0]}
                      <Calendar className="h-3 w-3 ml-1" />
                      {new Date(article.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    
                    <Link to={`/blog/${article.slug}`}>
                      <Button size="sm" variant="outline" className={`text-xs ${
                        theme === 'white' ? 'border-teal-200 text-teal-700 hover:bg-teal-50' :
                        theme === 'dark' ? 'border-purple-500/50 text-purple-300 hover:bg-purple-900/20' :
                        'border-green-500/50 text-green-300 hover:bg-green-900/20'
                      }`}>
                        Read More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className={`h-16 w-16 mx-auto mb-4 ${
                theme === 'white' ? 'text-gray-400' : 'text-gray-600'
              }`} />
              <h3 className={`text-xl font-semibold mb-2 ${
                theme === 'white' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                No articles found
              </h3>
              <p className={`${
                theme === 'white' ? 'text-gray-500' : 'text-gray-400'
              }`}>
                Try adjusting your search terms or browse different categories.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPage;