import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Clock, User, Calendar, Tag, Share2, BookOpen } from 'lucide-react';
import { parseMarkdown, generateTableOfContents, formatDate } from '../utils/markdown';

const ArticleContent = ({ article }) => {
  const [content, setContent] = useState('');
  const [parsedContent, setParsedContent] = useState(null);
  const [tableOfContents, setTableOfContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        
        // In a real implementation, you would fetch from your server or API
        // For now, we'll simulate loading the content
        const response = await fetch(article.contentPath);
        if (!response.ok) {
          throw new Error('Failed to load article content');
        }
        
        const markdownContent = await response.text();
        const parsed = parseMarkdown(markdownContent);
        const toc = generateTableOfContents(parsed.content);
        
        setContent(markdownContent);
        setParsedContent(parsed);
        setTableOfContents(toc);
        setError(null);
      } catch (err) {
        console.error('Error loading article:', err);
        setError('Failed to load article content');
        // For demo purposes, set some placeholder content
        setParsedContent({
          frontmatter: article,
          content: 'Article content would be loaded here from the markdown files...'
        });
      } finally {
        setLoading(false);
      }
    };

    if (article?.contentPath) {
      loadContent();
    }
  }, [article]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-800 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-800 rounded w-1/2 mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-800 rounded"></div>
                <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                <div className="h-4 bg-gray-800 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-red-400 mb-4">Error Loading Article</h1>
            <p className="text-gray-400 mb-8">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Article Header */}
      <div className="bg-gradient-to-r from-blue-900 to-teal-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                {article.category}
              </span>
              {article.medicalReview && (
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                  Medically Reviewed
                </span>
              )}
              {article.featured && (
                <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm">
                  Featured
                </span>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {article.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(article.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{article.readTime}</span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Table of Contents - Sidebar */}
            {tableOfContents.length > 0 && (
              <div className="lg:w-64 flex-shrink-0">
                <div className="sticky top-8">
                  <div className="bg-gray-900 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="w-5 h-5 text-blue-400" />
                      <h3 className="font-semibold text-white">Table of Contents</h3>
                    </div>
                    <nav>
                      <ul className="space-y-2">
                        {tableOfContents.map((item, index) => (
                          <li key={index}>
                            <a
                              href={`#${item.id}`}
                              className="text-gray-400 hover:text-white text-sm block py-1 transition-colors border-l-2 border-transparent hover:border-blue-400 pl-3"
                            >
                              {item.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <article className="prose prose-invert prose-lg max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // Custom component styling for dark theme
                    h1: ({ children }) => (
                      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 mt-8">
                        {children}
                      </h1>
                    ),
                    h2: ({ children, id }) => (
                      <h2 id={id} className="text-2xl md:text-3xl font-bold text-white mb-4 mt-8 border-b border-gray-700 pb-2">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 mt-6">
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="text-lg md:text-xl font-semibold text-white mb-2 mt-4">
                        {children}
                      </h4>
                    ),
                    p: ({ children }) => (
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {children}
                      </p>
                    ),
                    strong: ({ children }) => (
                      <strong className="text-white font-semibold">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="text-blue-300">
                        {children}
                      </em>
                    ),
                    ul: ({ children }) => (
                      <ul className="text-gray-300 mb-4 pl-6 space-y-2">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="text-gray-300 mb-4 pl-6 space-y-2">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-gray-300">
                        {children}
                      </li>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto mb-6">
                        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className="bg-gray-700">
                        {children}
                      </thead>
                    ),
                    th: ({ children }) => (
                      <th className="px-4 py-3 text-left text-white font-semibold">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="px-4 py-3 text-gray-300 border-t border-gray-700">
                        {children}
                      </td>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-blue-500 pl-4 my-6 italic text-gray-400">
                        {children}
                      </blockquote>
                    ),
                    code: ({ children, className }) => {
                      const isBlock = className?.includes('language-');
                      if (isBlock) {
                        return (
                          <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
                            <code className="text-green-400 text-sm">
                              {children}
                            </code>
                          </pre>
                        );
                      }
                      return (
                        <code className="bg-gray-800 text-green-400 px-2 py-1 rounded text-sm">
                          {children}
                        </code>
                      );
                    },
                    a: ({ children, href }) => (
                      <a
                        href={href}
                        className="text-blue-400 hover:text-blue-300 underline"
                        target={href?.startsWith('http') ? '_blank' : '_self'}
                        rel={href?.startsWith('http') ? 'noopener noreferrer' : ''}
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {parsedContent?.content || 'Loading content...'}
                </ReactMarkdown>
              </article>

              {/* Article Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-800">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-400 font-medium">Tags:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-700 transition-colors cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Medical Disclaimer */}
              <div className="mt-12 bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-6">
                <h4 className="text-yellow-400 font-semibold mb-2">Medical Disclaimer</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  This article is for informational purposes only and is not intended as medical advice. 
                  BMI calculations and health information should not replace professional medical consultation. 
                  Always consult with qualified healthcare providers for personalized health assessment and medical guidance. 
                  Individual health conditions, medications, and circumstances may affect the applicability of general guidelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleContent;