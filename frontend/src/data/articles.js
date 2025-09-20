// BMI Articles data and content loader
// Content will be loaded dynamically from the server

// Article metadata and content mapping
export const articles = [
  {
    id: 1,
    slug: 'ultimate-guide-bmi-calculator',
    title: 'Ultimate Guide to BMI Calculator: Formula, Chart & Health Categories 2025',
    description: 'Complete BMI calculator guide covering WHO standards, metric & imperial formulas, health categories, and medical accuracy. Learn everything about Body Mass Index calculation, limitations, and when to use BMI vs other methods.',
    excerpt: 'Body Mass Index (BMI) remains one of the most widely used health screening tools worldwide, adopted by the World Health Organization (WHO) and healthcare systems globally. This comprehensive guide covers everything you need to know about BMI calculation, interpretation, and practical applications in 2025.',
    contentPath: '/content/bmi/ultimate-guide-bmi-calculator.md',
    author: 'BMI Calculator Pro Medical Team',
    date: '2025-01-24',
    lastUpdated: '2025-01-24',
    readTime: '12-15 minutes',
    category: 'BMI Guide',
    keywords: 'BMI calculator, body mass index formula, BMI chart, WHO BMI categories, metric imperial BMI, calculate BMI, BMI health categories, underweight normal overweight obese BMI',
    featured: true,
    medicalReview: true,
    schema: {
      type: 'MedicalArticle',
      specialty: 'General Medicine',
      accuracy: 'Medically Reviewed'
    },
    imageUrl: '/images/bmi-guide-chart.jpg',
    tags: ['BMI Basics', 'Health Categories', 'WHO Standards', 'Medical Guide']
  },
  {
    id: 2,
    slug: 'is-bmi-accurate-athletes-seniors-ethnicities',
    title: 'Is BMI Accurate? Athletes, Seniors, Ethnicities Explained - Complete Analysis 2025',
    description: 'Comprehensive analysis of BMI accuracy limitations for athletes, elderly, and different ethnic groups. Learn why BMI misclassifies muscular individuals, age-related considerations, and ethnic-specific BMI adjustments with real case studies.',
    excerpt: 'Body Mass Index (BMI) serves as a widely used health screening tool, but its accuracy varies dramatically across different populations. This comprehensive analysis examines BMI limitations for athletes, seniors, and various ethnic groups, providing evidence-based insights into when BMI works—and when it fails.',
    contentPath: '/content/bmi/is-bmi-accurate-athletes-seniors-ethnicities.md',
    author: 'BMI Calculator Pro Medical Team',
    date: '2025-01-24',
    lastUpdated: '2025-01-24',
    readTime: '10-12 minutes',
    category: 'BMI Accuracy',  
    keywords: 'BMI accuracy, BMI limitations athletes, BMI elderly seniors, ethnic BMI differences, BMI muscle mass, Asian BMI categories, Pacific Islander BMI, body composition BMI',
    featured: true,
    medicalReview: true,
    schema: {
      type: 'MedicalArticle',
      specialty: 'Sports Medicine, Geriatrics, Epidemiology',
      accuracy: 'Medically Reviewed'
    },
    imageUrl: '/images/bmi-accuracy-comparison.jpg',
    tags: ['BMI Accuracy', 'Athletes', 'Ethnic Groups', 'Age Factors']
  },
  {
    id: 3,
    slug: 'bmi-health-risks-what-your-number-means',
    title: 'BMI and Health Risks: What Your Number Really Means - Complete Medical Analysis 2025',
    description: 'Comprehensive analysis of BMI health risks including heart disease, diabetes, cancer correlations, mortality data, pregnancy BMI guidance, and pediatric BMI percentile charts. Evidence-based medical research on what your BMI number means for your health.',
    excerpt: 'Understanding the relationship between Body Mass Index (BMI) and health risks is crucial for making informed decisions about weight management and healthcare. This comprehensive analysis examines evidence-based research on BMI correlations with chronic diseases, mortality rates, and health outcomes across different populations.',
    contentPath: '/content/bmi/bmi-health-risks-what-your-number-means.md',
    author: 'BMI Calculator Pro Medical Team',
    date: '2025-01-24',
    lastUpdated: '2025-01-24',
    readTime: '15-18 minutes',
    category: 'Health Risks',
    keywords: 'BMI health risks, BMI diabetes risk, BMI heart disease, BMI cancer risk, BMI mortality rate, pregnancy BMI, pediatric BMI percentiles, BMI chronic disease risk',
    featured: true,
    medicalReview: true,
    schema: {
      type: 'MedicalArticle',
      specialty: 'Preventive Medicine, Cardiology, Endocrinology',
      accuracy: 'Evidence-Based Medical Research'
    },
    imageUrl: '/images/bmi-health-risks-chart.jpg',
    tags: ['Health Risks', 'Medical Research', 'Disease Prevention', 'Mortality Data']
  },
  {
    id: 4,
    slug: 'how-to-change-bmi-safely-weight-loss-gain-strategies',
    title: 'How to Change Your BMI Safely: Weight Loss & Gain Strategies - Complete Guide 2025',
    description: 'Evidence-based guide to safely changing your BMI through healthy weight loss and weight gain strategies. Learn caloric balance, nutrition basics, safe weight loss rates, exercise recommendations, and why crash diets are dangerous.',
    excerpt: 'Changing your BMI safely requires understanding the science of energy balance, implementing sustainable lifestyle changes, and avoiding dangerous shortcuts. This comprehensive guide provides evidence-based strategies for healthy weight loss and weight gain while maintaining optimal health and preventing metabolic damage.',
    content: changeBMIContent,
    author: 'BMI Calculator Pro Medical Team',
    date: '2025-01-24',
    lastUpdated: '2025-01-24',
    readTime: '14-16 minutes',
    category: 'Weight Management',
    keywords: 'safe weight loss, healthy weight gain, change BMI safely, caloric deficit, sustainable weight loss, nutrition for weight loss, exercise for BMI, avoid crash diets, healthy weight management',
    featured: true,
    medicalReview: true,
    schema: {
      type: 'MedicalArticle',
      specialty: 'Nutrition, Exercise Science, Preventive Medicine',
      accuracy: 'Evidence-Based Weight Management'
    },
    imageUrl: '/images/safe-weight-management.jpg',
    tags: ['Weight Loss', 'Weight Gain', 'Nutrition', 'Exercise', 'Safety']
  },
  {
    id: 5,
    slug: 'bmi-alternatives-body-fat-waist-height-bmr',
    title: 'BMI Alternatives: Body Fat %, Waist-to-Height, BMR & More - Complete Guide 2025',
    description: 'Comprehensive guide to BMI alternatives including body fat percentage, waist-to-height ratio, lean body mass, BMR, and TDEE. Learn the best health metrics for athletes, seniors, and women with detailed comparison charts and measurement methods.',
    excerpt: 'While BMI provides valuable population-level health insights, numerous alternative measurements offer more precise individual health assessment. This comprehensive guide explores evidence-based BMI alternatives, their applications, measurement methods, and optimal use cases for different populations.',
    content: alternativesContent,
    author: 'BMI Calculator Pro Medical Team',
    date: '2025-01-24',
    lastUpdated: '2025-01-24',
    readTime: '16-18 minutes',
    category: 'Body Composition',
    keywords: 'BMI alternatives, body fat percentage, waist to height ratio, lean body mass, BMR calculator, TDEE calculator, body composition analysis, health metrics beyond BMI',
    featured: true,
    medicalReview: true,
    schema: {
      type: 'MedicalArticle',
      specialty: 'Sports Medicine, Nutrition Science, Preventive Medicine',
      accuracy: 'Evidence-Based Health Assessment'
    },
    imageUrl: '/images/bmi-alternatives-comparison.jpg',
    tags: ['Body Composition', 'Health Metrics', 'Assessment Methods', 'Alternative Measures']
  }
];

// Get article by slug
export const getArticleBySlug = (slug) => {
  return articles.find(article => article.slug === slug);
};

// Get all articles
export const getAllArticles = () => {
  return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Get featured articles
export const getFeaturedArticles = () => {
  return articles.filter(article => article.featured);
};

// Get articles by category
export const getArticlesByCategory = (category) => {
  return articles.filter(article => article.category === category);
};

// Get articles by tag
export const getArticlesByTag = (tag) => {
  return articles.filter(article => article.tags && article.tags.includes(tag));
};

// Search articles
export const searchArticles = (query) => {
  const searchTerm = query.toLowerCase();
  return articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm) ||
    article.description.toLowerCase().includes(searchTerm) ||
    article.excerpt.toLowerCase().includes(searchTerm) ||
    article.keywords.toLowerCase().includes(searchTerm) ||
    (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
  );
};

// Get related articles based on tags and category
export const getRelatedArticles = (currentSlug, limit = 3) => {
  const currentArticle = getArticleBySlug(currentSlug);
  if (!currentArticle) return [];

  const related = articles
    .filter(article => article.slug !== currentSlug)
    .map(article => {
      let score = 0;
      
      // Same category gets higher score
      if (article.category === currentArticle.category) {
        score += 3;
      }
      
      // Shared tags get score
      if (currentArticle.tags && article.tags) {
        const sharedTags = article.tags.filter(tag => 
          currentArticle.tags.includes(tag)
        );
        score += sharedTags.length;
      }
      
      // Featured articles get bonus
      if (article.featured) {
        score += 1;
      }
      
      return { ...article, score };
    })
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      // If same score, sort by date
      return new Date(b.date) - new Date(a.date);
    })
    .slice(0, limit);

  return related;
};

// Get all unique categories
export const getCategories = () => {
  const categories = [...new Set(articles.map(article => article.category))];
  return categories.sort();
};

// Get all unique tags
export const getTags = () => {
  const allTags = articles.reduce((tags, article) => {
    if (article.tags) {
      return [...tags, ...article.tags];
    }
    return tags;
  }, []);
  return [...new Set(allTags)].sort();
};

// Article statistics
export const getArticleStats = () => {
  return {
    totalArticles: articles.length,
    featuredArticles: articles.filter(a => a.featured).length,
    categories: getCategories().length,
    tags: getTags().length,
    averageReadTime: Math.round(
      articles.reduce((total, article) => {
        const minutes = parseInt(article.readTime.split('-')[0]);
        return total + minutes;
      }, 0) / articles.length
    )
  };
};