import matter from 'gray-matter';

// Utility functions for processing markdown content
export const parseMarkdown = (markdownContent) => {
  const { data, content } = matter(markdownContent);
  return {
    frontmatter: data,
    content
  };
};

// Generate breadcrumb from article data
export const generateBreadcrumb = (article) => {
  return [
    { name: 'Home', href: '/' },
    { name: 'BMI Resources', href: '/bmi-resources' },
    { name: article.title, href: `/bmi-resources/${article.slug}` }
  ];
};

// Generate schema markup for articles
export const generateArticleSchema = (article) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalArticle",
    "headline": article.title,
    "description": article.description,
    "author": {
      "@type": "Organization",
      "name": article.author || "BMI Calculator Pro Medical Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BMI Calculator Pro",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bmipro.com/logo.png"
      }
    },
    "datePublished": article.date,
    "dateModified": article.lastUpdated || article.date,
    "medicalSpecialty": article.schema?.specialty || "General Medicine",
    "medicalAudience": {
      "@type": "MedicalAudience",
      "audienceType": "Patient"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://bmipro.com/bmi-resources/${article.slug}`
    },
    "keywords": article.keywords,
    "wordCount": article.content ? article.content.split(' ').length : 0,
    "isAccessibleForFree": true,
    "isFamilyFriendly": true
  };

  return schema;
};

// Generate FAQ schema from FAQ sections in content
export const generateFAQSchema = (content) => {
  // Extract FAQ sections from markdown content
  const faqRegex = /### (\d+\.\s*[^#\n]+)\n([\s\S]*?)(?=###|\n##|\n---|\n$)/g;
  const faqs = [];
  let match;

  while ((match = faqRegex.exec(content)) !== null) {
    const question = match[1].trim();
    const answer = match[2].trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
    
    if (question && answer && question.includes('?')) {
      faqs.push({
        "@type": "Question",
        "name": question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": answer
        }
      });
    }
  }

  if (faqs.length > 0) {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs
    };
  }

  return null;
};

// Calculate reading time
export const calculateReadingTime = (content) => {
  if (!content) return '5 min read';
  
  const wordsPerMinute = 200;
  const wordCount = content.split(' ').length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  return `${minutes} min read`;
};

// Generate related articles suggestions
export const getRelatedArticles = (currentSlug, allArticles) => {
  return allArticles
    .filter(article => article.slug !== currentSlug)
    .sort((a, b) => {
      // Prioritize featured articles
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      // Then sort by date
      return new Date(b.date) - new Date(a.date);
    })
    .slice(0, 3);
};

// Format date for display
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Generate table of contents from markdown headings
export const generateTableOfContents = (content) => {
  if (!content) return [];
  
  const headingRegex = /^(##)\s+(.+)(?:\s+\{#([^}]+)\})?$/gm;
  const toc = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = match[3] || title.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    if (level === 2) { // Only include h2 headings in TOC
      toc.push({
        id,
        title,
        level
      });
    }
  }

  return toc;
};

// Sanitize HTML content for safe rendering
export const sanitizeContent = (content) => {
  // Basic sanitization - remove potentially dangerous HTML
  return content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/data:/gi, '');
};

// Extract excerpt from content
export const extractExcerpt = (content, maxLength = 160) => {
  if (!content) return '';
  
  // Remove markdown syntax and get plain text
  const plainText = content
    .replace(/#+\s/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
    .replace(/`(.*?)`/g, '$1') // Remove code
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  // Find the last complete word within the limit
  const truncated = plainText.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return truncated.substring(0, lastSpace) + '...';
};