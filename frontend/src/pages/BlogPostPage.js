import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Tag, Share2, BookOpen, Heart, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useTheme } from '../contexts/ThemeContext';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BlogPostPage = () => {
  const { theme } = useTheme();
  const { slug } = useParams();

  // Blog articles data (in real app, this would come from API/CMS)
  const blogArticles = [
    {
      id: 1,
      title: "Complete BMI Guide 2025: Understanding Body Mass Index",
      slug: "complete-bmi-guide-2025",
      excerpt: "Everything you need to know about BMI - calculations, categories, limitations, and alternatives. Get the complete guide to understanding your body mass index.",
      content: `
        <h2>What is BMI (Body Mass Index)?</h2>
        <p>Body Mass Index (BMI) is a simple calculation used to assess whether a person has a healthy body weight for their height. It was developed in the 1830s by Belgian mathematician Adolphe Quetelet and has become one of the most widely used health screening tools worldwide.</p>
        
        <h3>How is BMI Calculated?</h3>
        <p>BMI is calculated using the following formula:</p>
        <ul>
          <li><strong>Metric System:</strong> BMI = weight (kg) / height (m)²</li>
          <li><strong>Imperial System:</strong> BMI = (weight (lbs) / height (inches)²) × 703</li>
        </ul>
        
        <h3>BMI Categories and Ranges</h3>
        <div class="bmi-categories">
          <ul>
            <li><strong>Underweight:</strong> BMI less than 18.5</li>
            <li><strong>Normal weight:</strong> BMI 18.5-24.9</li>
            <li><strong>Overweight:</strong> BMI 25-29.9</li>
            <li><strong>Obese Class I:</strong> BMI 30-34.9</li>
            <li><strong>Obese Class II:</strong> BMI 35-39.9</li>
            <li><strong>Obese Class III:</strong> BMI 40 or greater</li>
          </ul>
        </div>
        
        <h3>Why BMI Matters for Your Health</h3>
        <p>BMI serves as a useful screening tool for several reasons:</p>
        <ul>
          <li>Quick and easy assessment of weight status</li>
          <li>Helps identify potential health risks</li>
          <li>Provides a starting point for health discussions</li>
          <li>Useful for population health studies</li>
        </ul>
        
        <h3>Limitations of BMI</h3>
        <p>While BMI is a valuable tool, it has several limitations:</p>
        <ul>
          <li>Doesn't distinguish between muscle and fat mass</li>
          <li>May not be accurate for athletes with high muscle mass</li>
          <li>Doesn't account for body fat distribution</li>
          <li>May not be appropriate for all ethnic groups</li>
          <li>Doesn't consider age-related changes in body composition</li>
        </ul>
        
        <h3>BMI Alternatives and Complementary Measures</h3>
        <p>For a more comprehensive health assessment, consider these additional metrics:</p>
        <ul>
          <li><strong>Body Fat Percentage:</strong> More accurate measure of body composition</li>
          <li><strong>Waist-to-Hip Ratio:</strong> Indicates fat distribution</li>
          <li><strong>Waist Circumference:</strong> Assesses abdominal obesity</li>
          <li><strong>Body Shape Index:</strong> Considers height and waist circumference</li>
        </ul>
        
        <h3>BMI Across Different Demographics</h3>
        <h4>Children and Adolescents</h4>
        <p>For individuals under 20, BMI percentiles are used instead of fixed categories, comparing the child's BMI to others of the same age and sex.</p>
        
        <h4>Older Adults</h4>
        <p>For seniors (65+), slightly higher BMI ranges may be healthier, as some extra weight can provide protection against illness and injury.</p>
        
        <h4>Athletes and Muscular Individuals</h4>
        <p>Athletes often have higher BMIs due to increased muscle mass, which doesn't necessarily indicate poor health.</p>
        
        <h3>Using BMI Effectively</h3>
        <p>To get the most value from BMI:</p>
        <ul>
          <li>Use it as one of several health indicators</li>
          <li>Consider your individual circumstances</li>
          <li>Track changes over time rather than focusing on single measurements</li>
          <li>Consult healthcare professionals for interpretation</li>
          <li>Combine with other health assessments</li>
        </ul>
        
        <h3>Taking Action Based on Your BMI</h3>
        <p>If your BMI indicates potential health concerns:</p>
        <ul>
          <li>Consult with a healthcare provider</li>
          <li>Consider lifestyle modifications</li>
          <li>Focus on sustainable changes</li>
          <li>Monitor progress regularly</li>
          <li>Seek professional guidance when needed</li>
        </ul>
        
        <h3>Conclusion</h3>
        <p>BMI remains a valuable screening tool when used appropriately. While it has limitations, it provides a quick and accessible way to assess weight status and potential health risks. For the most comprehensive health assessment, use BMI alongside other measurements and professional medical advice.</p>
      `,
      category: "BMI Guide",
      author: "Dr. Sarah Chen",
      authorBio: "Dr. Sarah Chen is a board-certified physician specializing in preventive medicine and nutrition. She has over 15 years of experience helping patients achieve their health goals through evidence-based approaches.",
      publishDate: "2025-01-13",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&h=400&fit=crop",
      tags: ["BMI", "Health", "Guide", "2025"],
      featured: true
    },
    {
      id: 2,
      title: "BMI vs Body Fat Percentage: Which is More Accurate?",
      slug: "bmi-vs-body-fat-percentage",
      excerpt: "Discover the key differences between BMI and body fat percentage measurements. Learn which metric provides better insights for your health goals.",
      content: `
        <h2>Introduction: The Great Health Metric Debate</h2>
        <p>When it comes to assessing your health and fitness, two metrics often dominate the conversation: Body Mass Index (BMI) and Body Fat Percentage. Both serve as indicators of your overall health, but they measure different aspects of your body composition. Understanding the differences can help you choose the right metric for your health journey.</p>
        
        <h3>Understanding BMI</h3>
        <p>BMI is a simple calculation that uses your height and weight to determine if you fall into a healthy weight range. It's calculated as:</p>
        <p><strong>BMI = weight (kg) / height (m)²</strong></p>
        
        <h4>Pros of BMI:</h4>
        <ul>
          <li>Quick and easy to calculate</li>
          <li>No special equipment needed</li>
          <li>Widely recognized and understood</li>
          <li>Good for population-level health assessments</li>
          <li>Established correlation with health risks</li>
        </ul>
        
        <h4>Cons of BMI:</h4>
        <ul>
          <li>Doesn't distinguish between muscle and fat</li>
          <li>Ignores body fat distribution</li>
          <li>May be inaccurate for athletes</li>
          <li>Doesn't account for bone density variations</li>
          <li>Less precise for individual assessment</li>
        </ul>
        
        <h3>Understanding Body Fat Percentage</h3>
        <p>Body fat percentage measures the proportion of your body weight that consists of fat tissue. This metric provides insight into your body composition beyond just weight and height.</p>
        
        <h4>Healthy Body Fat Ranges:</h4>
        <ul>
          <li><strong>Men:</strong> 10-20% (athletes: 6-13%)</li>
          <li><strong>Women:</strong> 16-25% (athletes: 14-20%)</li>
        </ul>
        
        <h4>Pros of Body Fat Percentage:</h4>
        <ul>
          <li>Distinguishes between fat and muscle mass</li>
          <li>More accurate for fitness assessment</li>
          <li>Better indicator of health risks</li>
          <li>Useful for tracking body composition changes</li>
          <li>More relevant for athletic performance</li>
        </ul>
        
        <h4>Cons of Body Fat Percentage:</h4>
        <ul>
          <li>Requires specialized equipment or methods</li>
          <li>Can be expensive to measure accurately</li>
          <li>Results may vary between measurement methods</li>
          <li>More complex to understand and track</li>
          <li>Less standardized across different populations</li>
        </ul>
        
        <h3>Methods for Measuring Body Fat Percentage</h3>
        <h4>Most Accurate Methods:</h4>
        <ul>
          <li><strong>DEXA Scan:</strong> Dual-energy X-ray absorptiometry - considered the gold standard</li>
          <li><strong>Hydrostatic Weighing:</strong> Underwater weighing method</li>
          <li><strong>Bod Pod:</strong> Air displacement plethysmography</li>
        </ul>
        
        <h4>Convenient Methods:</h4>
        <ul>
          <li><strong>Bioelectrical Impedance:</strong> Used in many scales and handheld devices</li>
          <li><strong>Skinfold Calipers:</strong> Measures thickness of subcutaneous fat</li>
          <li><strong>US Navy Method:</strong> Uses body measurements to estimate body fat</li>
        </ul>
        
        <h3>When to Use Each Metric</h3>
        
        <h4>Use BMI When:</h4>
        <ul>
          <li>You need a quick health screening</li>
          <li>You're tracking general weight trends</li>
          <li>You don't have access to body composition tools</li>
          <li>You're comparing population health data</li>
          <li>You're at the beginning of your health journey</li>
        </ul>
        
        <h4>Use Body Fat Percentage When:</h4>
        <ul>
          <li>You're serious about fitness and body composition</li>
          <li>You're an athlete or very muscular</li>
          <li>You want to track muscle gain and fat loss</li>
          <li>You have access to accurate measurement tools</li>
          <li>You're working with a fitness professional</li>
        </ul>
        
        <h3>Real-World Scenarios</h3>
        
        <h4>Scenario 1: The Athletic Individual</h4>
        <p>A professional football player might have a BMI of 32 (classified as obese), but a body fat percentage of only 12% (excellent). In this case, body fat percentage provides a much more accurate picture of health.</p>
        
        <h4>Scenario 2: The Sedentary Individual</h4>
        <p>Someone with a "normal" BMI of 23 might have a body fat percentage of 30% due to lack of muscle mass. Here, body fat percentage reveals hidden health risks that BMI misses.</p>
        
        <h4>Scenario 3: The Weight Loss Journey</h4>
        <p>During weight loss, BMI might stay the same while body fat percentage decreases and muscle mass increases. Body fat percentage better reflects positive body composition changes.</p>
        
        <h3>The Verdict: Which is More Accurate?</h3>
        
        <p>For individual health assessment, <strong>body fat percentage is generally more accurate</strong> because it:</p>
        <ul>
          <li>Provides information about body composition</li>
          <li>Accounts for muscle mass differences</li>
          <li>Better correlates with health risks</li>
          <li>More useful for fitness goals</li>
        </ul>
        
        <p>However, BMI remains valuable because it's:</p>
        <ul>
          <li>Accessible to everyone</li>
          <li>Widely understood</li>
          <li>Effective for population studies</li>
          <li>Good starting point for health assessment</li>
        </ul>
        
        <h3>Combining Both Metrics</h3>
        <p>The most comprehensive approach uses both metrics:</p>
        <ul>
          <li>Use BMI for initial screening and trend tracking</li>
          <li>Use body fat percentage for detailed body composition analysis</li>
          <li>Monitor both over time for complete picture</li>
          <li>Consider other factors like waist circumference and overall fitness</li>
        </ul>
        
        <h3>Practical Recommendations</h3>
        
        <h4>For Beginners:</h4>
        <ul>
          <li>Start with BMI for basic assessment</li>
          <li>Gradually incorporate body fat percentage measurements</li>
          <li>Focus on sustainable lifestyle changes</li>
          <li>Don't obsess over numbers</li>
        </ul>
        
        <h4>For Fitness Enthusiasts:</h4>
        <ul>
          <li>Prioritize body fat percentage</li>
          <li>Track both metrics over time</li>
          <li>Consider professional body composition analysis</li>
          <li>Use data to adjust training and nutrition</li>
        </ul>
        
        <h3>Conclusion</h3>
        <p>While body fat percentage provides more accurate information about your body composition and health status, BMI remains a valuable and accessible tool. The best approach is to understand the strengths and limitations of each metric and use them appropriately based on your goals, resources, and circumstances. Remember, no single number defines your health - focus on overall wellness, including physical fitness, nutrition, sleep, and mental health.</p>
      `,
      category: "Health Metrics",
      author: "Dr. Michael Torres",
      authorBio: "Dr. Michael Torres is a sports medicine physician and certified strength and conditioning specialist with expertise in body composition analysis and athletic performance.",
      publishDate: "2025-01-12",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
      tags: ["BMI", "Body Fat", "Health Metrics", "Comparison"],
      featured: true
    }
  ];

  const article = blogArticles.find(a => a.slug === slug);
  
  if (!article) {
    return (
      <div className={`min-h-screen transition-all duration-700 ${
        theme === 'white' ? 'bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50' :
        theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' :
        'bg-gradient-to-br from-black via-gray-900 to-black'
      }`}>
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className={`text-4xl font-bold mb-4 ${
            theme === 'white' ? 'text-gray-900' : 'text-white'
          }`}>
            Article Not Found
          </h1>
          <p className={`text-lg mb-8 ${
            theme === 'white' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            The article you're looking for doesn't exist.
          </p>
          <Link to="/blog">
            <Button className={`${
              theme === 'white' ? 'bg-teal-600 hover:bg-teal-700' :
              theme === 'dark' ? 'bg-purple-600 hover:bg-purple-700' :
              'bg-green-600 hover:bg-green-700'
            } text-white`}>
              Back to Blog
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedArticles = blogArticles.filter(a => 
    a.id !== article.id && 
    (a.category === article.category || a.tags.some(tag => article.tags.includes(tag)))
  ).slice(0, 3);

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

  return (
    <div className={`min-h-screen transition-all duration-700 ${getBackgroundGradient()}`}>
      <SEOHead 
        title={`${article.title} | Health & BMI Blog`}
        description={article.excerpt}
        keywords={article.tags.join(', ')}
        canonical={`/blog/${article.slug}`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": article.title,
          "description": article.excerpt,
          "image": article.image,
          "author": {
            "@type": "Person",
            "name": article.author
          },
          "publisher": {
            "@type": "Organization",
            "name": "Advanced BMI Calculator",
            "url": "https://bmicalculator.com"
          },
          "datePublished": article.publishDate,
          "dateModified": article.publishDate,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://bmicalculator.com/blog/${article.slug}`
          }
        }}
      />
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back to Blog */}
        <div className="mb-8">
          <Link to="/blog" className={`inline-flex items-center gap-2 text-sm transition-all duration-300 hover:scale-105 ${
            theme === 'white' ? 'text-teal-600 hover:text-teal-700' :
            theme === 'dark' ? 'text-purple-400 hover:text-purple-300' :
            'text-green-400 hover:text-green-300'
          }`}>
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge className={`${
                theme === 'white' ? 'bg-teal-100 text-teal-800' :
                theme === 'dark' ? 'bg-purple-900/50 text-purple-200' :
                'bg-green-900/50 text-green-200'
              }`}>
                {article.category}
              </Badge>
              <div className={`flex items-center gap-4 text-sm ${
                theme === 'white' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(article.publishDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.readTime}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {article.author}
                </div>
              </div>
            </div>

            <h1 className={`text-4xl md:text-5xl font-bold mb-6 leading-tight ${
              theme === 'white' ? 'text-gray-900' : 'text-white'
            }`}>
              {article.title}
            </h1>

            <p className={`text-xl leading-relaxed mb-8 ${
              theme === 'white' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              {article.excerpt}
            </p>

            {/* Featured Image */}
            <div className="relative mb-8 rounded-lg overflow-hidden shadow-xl">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-4 mb-8">
              <span className={`text-sm font-medium ${
                theme === 'white' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Share this article:
              </span>
              <Button size="sm" variant="outline" className={`${
                theme === 'white' ? 'border-teal-200 text-teal-700 hover:bg-teal-50' :
                theme === 'dark' ? 'border-purple-500/50 text-purple-300 hover:bg-purple-900/20' :
                'border-green-500/50 text-green-300 hover:bg-green-900/20'
              }`}>
                <Share2 className="h-3 w-3 mr-1" />
                Share
              </Button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className={`${
                  theme === 'white' ? 'bg-gray-100 text-gray-700' :
                  theme === 'dark' ? 'bg-gray-700 text-gray-300' :
                  'bg-gray-800 text-gray-400'
                }`}>
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Article Content */}
          <Card className={`backdrop-blur-md border-0 shadow-xl mb-12 ${
            theme === 'white' 
              ? 'bg-white/90' 
              : theme === 'dark'
              ? 'bg-gray-800/90'
              : 'bg-black/90'
          }`}>
            <CardContent className="p-8 md:p-12">
              <div 
                className={`prose prose-lg max-w-none ${
                  theme === 'white' 
                    ? 'prose-gray' 
                    : theme === 'dark'
                    ? 'prose-invert prose-purple'
                    : 'prose-invert prose-green'
                } prose-headings:font-bold prose-a:no-underline prose-a:font-medium prose-li:marker:text-current`}
                dangerouslySetInnerHTML={{ __html: article.content }}
                style={{
                  color: theme === 'white' ? '#374151' : '#e5e7eb',
                }}
              />
            </CardContent>
          </Card>

          {/* Author Bio */}
          <Card className={`backdrop-blur-md border-0 shadow-xl mb-12 ${
            theme === 'white' 
              ? 'bg-white/80' 
              : theme === 'dark'
              ? 'bg-gray-800/80'
              : 'bg-black/80'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  theme === 'white' ? 'bg-teal-100' :
                  theme === 'dark' ? 'bg-purple-900/30' :
                  'bg-green-900/30'
                }`}>
                  <User className={`h-8 w-8 ${
                    theme === 'white' ? 'text-teal-600' :
                    theme === 'dark' ? 'text-purple-400' :
                    'text-green-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold mb-2 ${
                    theme === 'white' ? 'text-gray-900' : 'text-white'
                  }`}>
                    About {article.author}
                  </h3>
                  <p className={`text-sm ${
                    theme === 'white' ? 'text-gray-600' : 'text-gray-300'
                  }`}>
                    {article.authorBio}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mb-12">
              <h2 className={`text-3xl font-bold mb-8 ${
                theme === 'white' ? 'text-gray-900' : 'text-white'
              }`}>
                Related Articles
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <Card key={relatedArticle.id} className={`backdrop-blur-md border-0 shadow-xl transform hover:scale-[1.02] transition-all duration-500 cursor-pointer ${
                    theme === 'white' 
                      ? 'bg-white/80 hover:bg-white/90' 
                      : theme === 'dark'
                      ? 'bg-gray-800/80 hover:bg-gray-800/90'
                      : 'bg-black/80 hover:bg-gray-900/50'
                  }`}>
                    <div className="relative">
                      <img 
                        src={relatedArticle.image} 
                        alt={relatedArticle.title}
                        className="w-full h-32 object-cover rounded-t-lg"
                      />
                    </div>
                    
                    <CardContent className="p-4">
                      <Badge variant="outline" className={`mb-2 text-xs ${
                        theme === 'white' ? 'border-teal-200 text-teal-700' :
                        theme === 'dark' ? 'border-purple-500/50 text-purple-300' :
                        'border-green-500/50 text-green-300'
                      }`}>
                        {relatedArticle.category}
                      </Badge>
                      
                      <h3 className={`text-sm font-bold mb-2 line-clamp-2 ${
                        theme === 'white' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {relatedArticle.title}
                      </h3>
                      
                      <div className="flex items-center justify-between">
                        <div className={`flex items-center gap-1 text-xs ${
                          theme === 'white' ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          <Clock className="h-3 w-3" />
                          {relatedArticle.readTime}
                        </div>
                        
                        <Link to={`/blog/${relatedArticle.slug}`}>
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
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPostPage;