import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, ExternalLink } from 'lucide-react';
import ArticleContent from '../components/ArticleContent';
import { getArticleBySlug, getRelatedArticles } from '../data/articles';
import { generateArticleSchema, generateFAQSchema } from '../utils/markdown';

const ArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadArticle = () => {
      setLoading(true);
      
      const foundArticle = getArticleBySlug(slug);
      
      if (!foundArticle) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setArticle(foundArticle);
      setNotFound(false);

      // Get related articles
      const related = getRelatedArticles(slug, 3);
      setRelatedArticles(related);

      // Update document title and meta tags
      document.title = foundArticle.title + ' | BMI Calculator Pro';
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', foundArticle.description);
      }

      // Update meta keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', foundArticle.keywords);
      }

      // Add structured data
      const articleSchema = generateArticleSchema(foundArticle);
      
      // Remove existing structured data
      const existingSchema = document.querySelector('#article-schema');
      if (existingSchema) {
        existingSchema.remove();
      }

      // Add new structured data
      const schemaScript = document.createElement('script');
      schemaScript.id = 'article-schema';
      schemaScript.type = 'application/ld+json';
      schemaScript.textContent = JSON.stringify(articleSchema);
      document.head.appendChild(schemaScript);

      setLoading(false);
    };

    if (slug) {
      loadArticle();
    }

    // Cleanup function
    return () => {
      // Reset title when leaving
      document.title = 'BMI Calculator - Free Body Mass Index Calculator | Healthy Weight Tool 2025';
      
      // Remove structured data
      const existingSchema = document.querySelector('#article-schema');
      if (existingSchema) {
        existingSchema.remove();
      }
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-blue-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-400">Loading article...</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <BookOpen className="w-24 h-24 text-gray-600 mx-auto mb-8" />
            <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
            <p className="text-gray-400 mb-8 text-lg">
              Sorry, we couldn't find the article you're looking for. It may have been moved or doesn't exist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </button>
              <Link
                to="/bmi-resources"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                Browse Articles
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back Navigation */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            
            <div className="flex items-center gap-4">
              <Link
                to="/bmi-resources"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                All Articles
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                BMI Calculator
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      {article && <ArticleContent article={article} />}

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Related Articles
              </h2>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    to={`/bmi-resources/${relatedArticle.slug}`}
                    className="group bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                        {relatedArticle.category}
                      </span>
                      {relatedArticle.featured && (
                        <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-semibold">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-3 line-clamp-3">
                      {relatedArticle.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{relatedArticle.readTime}</span>
                      <ExternalLink className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-900 to-teal-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Calculate Your BMI?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Use our advanced BMI calculator to get personalized health insights based on what you've learned
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
            >
              <BookOpen className="w-6 h-6" />
              Calculate Your BMI Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;