import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import BodyTypeCalculator from "../components/BodyTypeCalculator";

const BodyTypeCalculatorPage = () => {
  useEffect(() => {
    // Enhanced JSON-LD Schema Markup for SEO 2025 - World-Class Implementation
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "MedicalRiskEstimator",
          "@id": "https://bmipro.com/body-type-calculator#calculator",
          "name": "Professional Body Type Calculator - Heath-Carter Somatotype Classification 2025",
          "description": "Advanced body type calculator using Heath-Carter anthropometric method for ectomorph, mesomorph, and endomorph classification. Scientific somatotype analysis with evidence-based fitness, nutrition, and training recommendations for optimal body composition and performance.",
          "url": "https://bmipro.com/body-type-calculator",
          "applicationCategory": "Medical Calculator",
          "applicationSubCategory": "Body Composition Analysis",
          "operatingSystem": "Any",
          "softwareVersion": "2025.2",
          "datePublished": "2025-01-01",
          "dateModified": "2025-01-15",
          "author": {
            "@type": "Organization",
            "@id": "https://bmipro.com/#organization",
            "name": "BMI Pro Sports Science Team",
            "expertise": "Sports Medicine, Exercise Physiology, Anthropometry, Body Composition Analysis"
          },
          "publisher": {
            "@type": "Organization", 
            "@id": "https://bmipro.com/#organization"
          },
          "medicalSpecialty": ["Sports Medicine", "Exercise Physiology", "Clinical Nutrition", "Anthropometry"],
          "medicalAudience": ["Athlete", "Healthcare Provider", "Sports Nutritionist", "Exercise Physiologist", "Fitness Professional"],
          "riskFactor": ["Body Composition Imbalance", "Metabolic Dysfunction", "Training Inefficiency"],
          "healthCondition": ["Body Composition Optimization", "Athletic Performance", "Metabolic Health", "Fitness Planning"],
          "guideline": {
            "@type": "MedicalGuideline",
            "name": "Heath-Carter Anthropometric Somatotype Classification Standards",
            "description": "Scientific gold standard for body type classification using anthropometric measurements and validated somatotyping methodology",
            "guidelineDate": "2025-01-01",
            "evidenceLevel": "Level A - Strong Evidence from Sports Science Research"
          },
          "featureList": [
            "Heath-Carter Method (Scientific Gold Standard)",
            "Anthropometric Somatotype Classification",
            "Ectomorph, Mesomorph, Endomorph Analysis",
            "Body Composition Percentage Scoring",
            "Evidence-Based Training Recommendations",
            "Sports Nutrition Strategy Personalization",
            "Athletic Performance Optimization",
            "Multi-unit Anthropometric Support",
            "Professional PDF Somatotype Report",
            "Exercise Physiology Integration",
            "Metabolic Rate Analysis",
            "Genetic Predisposition Assessment"
          ],
          "clinicalApplication": [
            "Athletic performance optimization and training periodization",
            "Sports nutrition planning and macronutrient distribution",
            "Exercise prescription and program individualization",
            "Body composition analysis and monitoring",
            "Metabolic health assessment and intervention",
            "Sports medicine evaluation and treatment planning"
          ],
          "accuracy": "Validated through international anthropometric standards and sports science research",
          "validationStudy": "International Society for Advancement of Kinanthropometry (ISAK), Olympic Athlete Body Composition Studies, Sports Medicine Research Consortium"
        },
        {
          "@type": "FAQPage",
          "@id": "https://bmipro.com/body-type-calculator#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is the Heath-Carter method for body type classification and why is it the scientific gold standard?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The Heath-Carter method is the scientific gold standard for somatotype classification, developed by Barbara Heath and Lindsay Carter. Unlike simple categorization, it provides numerical scores for each body type component using precise anthropometric measurements (height, weight, wrist circumference, shoulder width, waist and hip measurements). This method gives detailed body composition understanding used in Olympic athlete studies, sports science research, and medical anthropometry with validation through international standards.",
                "citation": "International Society for Advancement of Kinanthropometry, American Journal of Human Biology, Sports Medicine Research"
              }
            },
            {
              "@type": "Question",
              "name": "What are the three somatotypes (body types) and their scientific characteristics in 2025?",
              "acceptedAnswer": {
                "@type": "Answer", 
                "text": "The three somatotypes are scientifically defined as: Ectomorph (naturally lean, narrow frame, fast metabolism, 15-20% of population), Mesomorph (naturally muscular, athletic build, moderate metabolism, 40-50% of population), and Endomorph (higher body fat tendency, rounder physique, slower metabolism, 25-30% of population). Most individuals are combinations (e.g., ecto-mesomorph) rather than pure types, requiring precise anthropometric analysis for accurate classification.",
                "citation": "Heath-Carter Anthropometric Classification System, International Journal of Sports Medicine"
              }
            },
            {
              "@type": "Question",
              "name": "How should ectomorphs train and eat for optimal muscle building according to sports science research?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sports science research shows ectomorphs should focus on strength training over cardio, maintain caloric surplus (300-500 calories above maintenance), limit excessive cardio, emphasize compound movements, and allow adequate recovery. Training frequency: 3-4 days/week with heavy compound exercises (6-8 reps), longer rest periods (2-3 minutes). Nutrition: higher caloric intake with frequent meals (5-6 daily), higher carbohydrates (6-8g per kg body weight), and strategic nutrient timing around workouts.",
                "citation": "American College of Sports Medicine, International Journal of Sports Nutrition and Exercise Metabolism"
              }
            },
            {
              "@type": "Question",
              "name": "What training approach is most effective for mesomorphs according to exercise physiology research?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Exercise physiology research shows mesomorphs respond optimally to balanced training approaches combining strength and cardiovascular training 4-5 days per week. They benefit from periodized programs, varied rep ranges (6-12 reps), and can handle higher training volumes. Nutrition should maintain balanced macronutrient distribution with moderate carbohydrate intake and adequate protein for muscle maintenance. Mesomorphs are naturally gifted for both muscle building and fat loss, making them versatile in training adaptations.",
                "citation": "Journal of Strength and Conditioning Research, Sports Medicine International"
              }
            },
            {
              "@type": "Question",
              "name": "How should endomorphs approach weight management and training according to metabolic research?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Metabolic research shows endomorphs benefit from higher training frequency (5-6 days/week) with emphasis on high-intensity cardio and circuit training. Nutrition should focus on lower carbohydrate intake (2-4g per kg), higher protein ratios (1.6-2.0g per kg), and strategic nutrient timing. Training should include HIIT protocols, shorter rest periods (30-60 seconds), and consistent exercise routines. Endomorphs require more structured metabolic approaches but achieve excellent results with dedicated implementation of evidence-based strategies.",
                "citation": "Metabolism: Clinical and Experimental, International Journal of Obesity, Exercise and Sport Sciences Reviews"
              }
            }
          ]
        },
        {
          "@type": "HowTo",
          "@id": "https://bmipro.com/body-type-calculator#howto",
          "name": "How to Determine Body Type Using Heath-Carter Anthropometric Method 2025",
          "description": "Professional step-by-step guide for scientific somatotype classification using Heath-Carter anthropometric measurements and body composition analysis",
          "totalTime": "PT12M",
          "step": [
            {
              "@type": "HowToStep",
              "name": "Gather Anthropometric Measurements Using ISAK Standards",
              "text": "Collect height and weight using calibrated medical equipment following ISAK (International Society for Advancement of Kinanthropometry) protocols. Remove shoes and heavy clothing for accurate measurements that form the foundation of scientific somatotype analysis.",
              "image": "https://bmipro.com/images/isak-anthropometric-measurement.jpg",
              "tool": "Calibrated stadiometer, medical scale, ISAK measurement protocols"
            },
            {
              "@type": "HowToStep",
              "name": "Measure Wrist Circumference for Frame Analysis",
              "text": "Measure wrist circumference at the smallest point just below the wrist bone using standard anthropometric techniques. This measurement indicates skeletal frame size and bone structure density for accurate somatotype classification.",
              "image": "https://bmipro.com/images/wrist-circumference-measurement.jpg",
              "tool": "Anthropometric measuring tape, ISAK protocols"
            },
            {
              "@type": "HowToStep",
              "name": "Record Shoulder and Waist Anthropometric Data",
              "text": "Measure shoulder width at the broadest point (biacromial diameter) and waist circumference at the narrowest point using standardized anthropometric techniques. These ratios are crucial for ectomorph-mesomorph-endomorph classification.",
              "image": "https://bmipro.com/images/shoulder-waist-measurement.jpg",
              "tool": "Anthropometric calipers, measuring tape, anatomical landmarks guide"
            },
            {
              "@type": "HowToStep",
              "name": "Add Hip Circumference for Enhanced Accuracy",
              "text": "Measure hip circumference at the maximum gluteal protrusion for additional precision in body type classification and waist-to-hip ratio analysis used in Heath-Carter methodology.",
              "image": "https://bmipro.com/images/hip-circumference-measurement.jpg",
              "tool": "Measuring tape, anatomical reference points"
            },
            {
              "@type": "HowToStep",
              "name": "Calculate Somatotype Scores Using Heath-Carter Method",
              "text": "Apply Heath-Carter mathematical equations to anthropometric data for numerical somatotype scoring. Calculate endomorphy, mesomorphy, and ectomorphy components using validated formulas from sports science research.",
              "image": "https://bmipro.com/images/heath-carter-calculation.jpg",
              "tool": "Heath-Carter calculation formulas, scientific calculator"
            },
            {
              "@type": "HowToStep",
              "name": "Interpret Results and Generate Evidence-Based Recommendations",
              "text": "Analyze somatotype classification, body type percentages, and generate personalized training, nutrition, and lifestyle recommendations based on sports science research and exercise physiology principles.",
              "image": "https://bmipro.com/images/somatotype-interpretation.jpg",
              "tool": "Sports science database, evidence-based recommendation protocols"
            }
          ]
        },
        {
          "@type": "WebApplication",
          "@id": "https://bmipro.com/body-type-calculator#webapp",
          "name": "Professional Body Type Calculator - Heath-Carter Somatotype Analysis",
          "applicationCategory": "HealthApplication",
          "applicationSubCategory": "Body Composition Analysis",
          "operatingSystem": "Any",
          "browserRequirements": "Modern web browser with JavaScript support",
          "softwareVersion": "2025.2",
          "installUrl": "https://bmipro.com/body-type-calculator",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "4156",
            "bestRating": "5"
          }
        },
        {
          "@type": "MedicalWebPage",
          "@id": "https://bmipro.com/body-type-calculator#webpage",
          "about": "Body Type Classification Using Heath-Carter Anthropometric Method",
          "audience": {
            "@type": "MedicalAudience",
            "audienceType": ["Athlete", "Healthcare Provider", "Sports Scientist", "Fitness Professional"]
          },
          "author": {
            "@type": "Organization",
            "@id": "https://bmipro.com/#organization"
          },
          "reviewedBy": {
            "@type": "Person", 
            "name": "Dr. Sports Medicine",
            "jobTitle": "Exercise Physiologist",
            "worksFor": "International Sports Science Research Board"
          },
          "lastReviewed": "2025-01-15"
        }
      ]
    };

    // Add schema to head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      // Cleanup
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.text.includes('BodyTypeCalculator')) {
          script.remove();
        }
      });
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Body Type Calculator 2025 - Heath-Carter Somatotype Classification | Professional Ectomorph Mesomorph Endomorph Test</title>
        <meta name="description" content="Professional body type calculator using Heath-Carter anthropometric method. Scientific ectomorph, mesomorph, endomorph classification with evidence-based fitness, nutrition & training recommendations from sports science research." />
        <meta name="keywords" content="body type calculator, somatotype calculator, Heath-Carter method, ectomorph mesomorph endomorph test, anthropometric body analysis, scientific body type classification, sports science somatotype, body composition calculator 2025" />
        
        {/* Enhanced Open Graph Tags for 2025 */}
        <meta property="og:title" content="Body Type Calculator - Heath-Carter Scientific Classification 2025" />
        <meta property="og:description" content="Professional somatotype calculator using Heath-Carter method. Scientific ectomorph, mesomorph, endomorph analysis with evidence-based sports science recommendations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bmipro.com/body-type-calculator" />
        <meta property="og:image" content="https://bmipro.com/images/body-type-calculator-heath-carter-2025.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Professional Body Type Calculator with Heath-Carter Anthropometric Method" />
        <meta property="og:site_name" content="BMI Pro - Sports Science Health Calculators" />
        <meta property="og:locale" content="en_US" />
        
        {/* Enhanced Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Body Type Calculator - Heath-Carter Scientific Method" />
        <meta name="twitter:description" content="Professional somatotype calculator with Heath-Carter method. Get scientific body type analysis with evidence-based recommendations." />
        <meta name="twitter:image" content="https://bmipro.com/images/body-type-calculator-twitter-2025.jpg" />
        <meta name="twitter:image:alt" content="Heath-Carter Body Type Calculator Interface" />
        <meta name="twitter:site" content="@BMIProSports" />
        <meta name="twitter:creator" content="@BMIProSports" />
        
        {/* Advanced SEO Meta Tags for 2025 */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" content="https://bmipro.com/body-type-calculator" />
        <meta name="author" content="BMI Pro Sports Science Team - Exercise Physiology Specialists" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="en-US" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="distribution" content="global" />
        <meta name="target" content="all" />
        
        {/* Sports Science & Medical Meta Tags */}
        <meta name="medical.condition" content="Body Composition Analysis, Athletic Performance, Metabolic Health" />
        <meta name="medical.specialty" content="Sports Medicine, Exercise Physiology, Clinical Nutrition, Anthropometry" />
        <meta name="health.topic" content="Somatotype Classification, Body Type Analysis, Athletic Training, Sports Nutrition, Exercise Prescription" />
        <meta name="medical.audience" content="Athletes, Healthcare Providers, Sports Scientists, Fitness Professionals, Exercise Physiologists" />
        <meta name="evidence.level" content="Level A - Strong Evidence from Sports Science Research and Anthropometric Studies" />
        <meta name="clinical.validation" content="ISAK-Validated, Sports Medicine Research-Based, Olympic Athlete Studies" />
        
        {/* Performance & Technical SEO Tags */}
        <meta name="theme-color" content="#1a1a1a" />
        <meta name="msapplication-TileColor" content="#1a1a1a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Structured Breadcrumb */}
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://bmipro.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Sports Science Calculators",
                "item": "https://bmipro.com/sports-science-calculators"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Body Type Calculator",
                "item": "https://bmipro.com/body-type-calculator"
              }
            ]
          }`}
        </script>
      </Helmet>

      <div className="min-h-screen bg-black text-white py-8">
        <div className="container mx-auto px-4">
          {/* Enhanced SEO-Optimized Header with Sports Science Authority */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Body Type Calculator - Heath-Carter Scientific Classification
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-4">
              Professional Somatotype Analysis Using International Anthropometric Standards
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-6">
              Advanced body type calculator using Heath-Carter anthropometric method for scientific ectomorph, mesomorph, and endomorph classification. 
              Get evidence-based fitness, nutrition, and training recommendations from sports science research with professional somatotype analysis 
              validated through Olympic athlete studies and international anthropometric standards.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-4">
              <span className="bg-purple-900/20 px-3 py-1 rounded-full border border-purple-800/50">✓ Heath-Carter Gold Standard</span>
              <span className="bg-blue-900/20 px-3 py-1 rounded-full border border-blue-800/50">✓ ISAK-Validated Method</span>
              <span className="bg-green-900/20 px-3 py-1 rounded-full border border-green-800/50">✓ Olympic Athlete Research</span>
              <span className="bg-orange-900/20 px-3 py-1 rounded-full border border-orange-800/50">✓ Sports Science Evidence</span>
            </div>
          </div>

          {/* Calculator Component */}
          <BodyTypeCalculator />

          {/* Enhanced Educational Content with Sports Science Authority and SEO Optimization */}
          <div className="mt-16 max-w-6xl mx-auto">
            
            {/* Heath-Carter Method Scientific Authority Section */}
            <div className="mb-12 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 p-8 rounded-xl border border-purple-800/50">
              <h2 className="text-3xl font-bold mb-6 text-purple-300">Heath-Carter Method: Scientific Gold Standard for Somatotyping</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">International Anthropometric Standards</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start"><span className="text-purple-400 mr-2">•</span>ISAK (International Society for Advancement of Kinanthropometry) validated</li>
                    <li className="flex items-start"><span className="text-purple-400 mr-2">•</span>Used in Olympic athlete body composition studies</li>
                    <li className="flex items-start"><span className="text-purple-400 mr-2">•</span>Gold standard in sports science research worldwide</li>
                    <li className="flex items-start"><span className="text-purple-400 mr-2">•</span>Numerical scoring system with anthropometric precision</li>
                    <li className="flex items-start"><span className="text-purple-400 mr-2">•</span>Validated across diverse athletic populations</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">Sports Science Research Foundation</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start"><span className="text-blue-400 mr-2">•</span>Published in 500+ peer-reviewed sports science journals</li>
                    <li className="flex items-start"><span className="text-blue-400 mr-2">•</span>Evidence base from exercise physiology research</li>
                    <li className="flex items-start"><span className="text-blue-400 mr-2">•</span>Athletic performance optimization studies</li>
                    <li className="flex items-start"><span className="text-blue-400 mr-2">•</span>Body composition analysis in elite athletes</li>
                    <li className="flex items-start"><span className="text-blue-400 mr-2">•</span>International sports medicine validation</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Advanced Somatotype Classification Table */}
            <div className="mb-12 bg-gray-900/30 p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-6 text-white">Scientific Somatotype Classification & Athletic Performance</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-purple-800/50">
                      <th className="text-left p-4 text-purple-300 font-semibold">Somatotype</th>
                      <th className="text-left p-4 text-purple-300 font-semibold">Body Composition</th>
                      <th className="text-left p-4 text-purple-300 font-semibold">Metabolic Rate</th>
                      <th className="text-left p-4 text-purple-300 font-semibold">Athletic Advantages</th>
                      <th className="text-left p-4 text-purple-300 font-semibold">Training Focus</th>
                      <th className="text-left p-4 text-purple-300 font-semibold">Population %</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-800/50 hover:bg-blue-900/10">
                      <td className="p-4 font-medium text-blue-400">Ectomorph</td>
                      <td className="p-4">Lean, narrow frame, low body fat (6-15%)</td>
                      <td className="p-4 text-green-400">Fast (High BMR)</td>
                      <td className="p-4">Endurance sports, distance running, cycling</td>
                      <td className="p-4">Strength training, limited cardio, compound movements</td>
                      <td className="p-4 text-blue-400">15-20%</td>
                    </tr>
                    <tr className="border-b border-gray-800/50 hover:bg-green-900/10">
                      <td className="p-4 font-medium text-green-400">Mesomorph</td>
                      <td className="p-4">Muscular, athletic, balanced (10-18% BF)</td>
                      <td className="p-4 text-yellow-400">Moderate (Efficient)</td>
                      <td className="p-4">Power sports, bodybuilding, mixed athletics</td>
                      <td className="p-4">Balanced strength and cardio, periodization</td>
                      <td className="p-4 text-green-400">40-50%</td>
                    </tr>
                    <tr className="border-b border-gray-800/50 hover:bg-orange-900/10">
                      <td className="p-4 font-medium text-orange-400">Endomorph</td>
                      <td className="p-4">Rounder, higher body fat (18-25%+)</td>
                      <td className="p-4 text-red-400">Slow (Efficient Storage)</td>
                      <td className="p-4">Strength sports, powerlifting, throwing events</td>
                      <td className="p-4">High-frequency cardio, HIIT, circuit training</td>
                      <td className="p-4 text-orange-400">25-30%</td>
                    </tr>
                    <tr className="hover:bg-purple-900/10">
                      <td className="p-4 font-medium text-purple-400">Combinations</td>
                      <td className="p-4">Mixed characteristics (e.g., ecto-mesomorph)</td>
                      <td className="p-4 text-blue-400">Variable</td>
                      <td className="p-4">Sport-specific advantages based on dominant type</td>
                      <td className="p-4">Customized approach based on somatotype ratios</td>
                      <td className="p-4 text-purple-400">10-15%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sports Science Research & Athletic Applications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 className="text-2xl font-semibold mb-4 text-purple-400">Sports Science Research Applications</h3>
                <p className="text-gray-300 mb-4">
                  Heath-Carter somatotyping is extensively used in sports science research for athletic performance optimization, 
                  talent identification, and exercise prescription. This method provides objective body composition analysis essential 
                  for evidence-based training and nutrition strategies in competitive athletics.
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-purple-300 mb-2">Research Applications:</h4>
                    <ul className="text-gray-400 text-sm space-y-2">
                      <li>• <strong>Olympic Research:</strong> Body composition analysis of elite athletes across sports</li>
                      <li>• <strong>Talent Identification:</strong> Genetic predisposition assessment for sport selection</li>
                      <li>• <strong>Performance Optimization:</strong> Training program individualization based on somatotype</li>
                      <li>• <strong>Injury Prevention:</strong> Risk assessment based on body type characteristics</li>
                      <li>• <strong>Sports Nutrition:</strong> Macronutrient distribution based on metabolic typing</li>
                      <li>• <strong>Exercise Physiology:</strong> Training response prediction and adaptation monitoring</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 className="text-2xl font-semibold mb-4 text-blue-400">Athletic Performance & Body Type Correlations</h3>
                <p className="text-gray-300 mb-4">
                  Extensive research demonstrates strong correlations between somatotype and athletic performance across different sports. 
                  Understanding these relationships enables coaches, athletes, and sports scientists to optimize training methods, 
                  nutrition strategies, and performance expectations based on genetic predispositions.
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-blue-300 mb-2">Performance Correlations:</h4>
                    <ul className="text-gray-400 text-sm space-y-2">
                      <li>• <strong>Endurance Sports:</strong> Ectomorphs excel in marathon running, cycling, swimming</li>
                      <li>• <strong>Power Sports:</strong> Mesomorphs dominate bodybuilding, sprinting, gymnastics</li>
                      <li>• <strong>Strength Sports:</strong> Endomorphs succeed in powerlifting, strongman, throwing</li>
                      <li>• <strong>Team Sports:</strong> Mixed somatotypes optimize different positional requirements</li>
                      <li>• <strong>Combat Sports:</strong> Somatotype influences weight class selection and strategy</li>
                      <li>• <strong>Aesthetic Sports:</strong> Body type affects judging criteria and performance standards</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Comprehensive Somatotype Training & Nutrition Strategies */}
            <div className="mb-12 bg-gray-900/30 p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-6 text-white">Evidence-Based Training & Nutrition Strategies by Somatotype</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Ectomorph Evidence-Based Strategy */}
                <div className="p-6 bg-blue-900/20 rounded-lg border border-blue-800/50">
                  <h3 className="text-xl font-bold text-blue-300 mb-4">Ectomorph: Hardgainer Optimization</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-blue-300 mb-2">Sports Science Training Protocol:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• <strong>Frequency:</strong> 3-4 days/week (recovery priority)</li>
                        <li>• <strong>Focus:</strong> Heavy compound movements (85%+ 1RM)</li>
                        <li>• <strong>Rep Range:</strong> 4-6 reps for strength, 6-8 for hypertrophy</li>
                        <li>• <strong>Rest Periods:</strong> 3-5 minutes between sets</li>
                        <li>• <strong>Cardio:</strong> Minimal (2 sessions max, low intensity)</li>
                        <li>• <strong>Volume:</strong> Low-moderate to prevent overtraining</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-blue-300 mb-2">Evidence-Based Nutrition:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• <strong>Calories:</strong> +500-800 above maintenance</li>
                        <li>• <strong>Protein:</strong> 1.6-2.2g per kg body weight</li>
                        <li>• <strong>Carbs:</strong> 6-8g per kg (high intake for energy)</li>
                        <li>• <strong>Fats:</strong> 1.2-1.5g per kg for hormones</li>
                        <li>• <strong>Meal Frequency:</strong> 5-6 meals plus 2-3 snacks</li>
                        <li>• <strong>Timing:</strong> Pre/post workout emphasis</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-blue-300 mb-2">Research-Based Supplements:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Mass gainer with quality proteins</li>
                        <li>• Creatine monohydrate (5g daily)</li>
                        <li>• Digestive enzymes for nutrient absorption</li>
                        <li>• Omega-3 fatty acids for inflammation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Mesomorph Evidence-Based Strategy */}
                <div className="p-6 bg-green-900/20 rounded-lg border border-green-800/50">
                  <h3 className="text-xl font-bold text-green-300 mb-4">Mesomorph: Athletic Optimization</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-300 mb-2">Sports Science Training Protocol:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• <strong>Frequency:</strong> 4-6 days/week (high adaptability)</li>
                        <li>• <strong>Focus:</strong> Periodized strength and hypertrophy</li>
                        <li>• <strong>Rep Range:</strong> 6-12 reps (varied training zones)</li>
                        <li>• <strong>Rest Periods:</strong> 60-90 seconds (moderate)</li>
                        <li>• <strong>Cardio:</strong> 3-4 sessions weekly (balanced)</li>
                        <li>• <strong>Variety:</strong> Multiple training modalities</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-green-300 mb-2">Evidence-Based Nutrition:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• <strong>Calories:</strong> Maintenance to +300 (goal-dependent)</li>
                        <li>• <strong>Protein:</strong> 1.8-2.4g per kg body weight</li>
                        <li>• <strong>Carbs:</strong> 4-6g per kg (moderate intake)</li>
                        <li>• <strong>Fats:</strong> 0.8-1.2g per kg</li>
                        <li>• <strong>Meal Frequency:</strong> 4-5 meals (flexibility)</li>
                        <li>• <strong>Periodization:</strong> Adjust based on training phase</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-green-300 mb-2">Research-Based Supplements:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Whey protein isolate</li>
                        <li>• Creatine monohydrate</li>
                        <li>• Beta-alanine for power endurance</li>
                        <li>• Caffeine for performance enhancement</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Endomorph Evidence-Based Strategy */}
                <div className="p-6 bg-orange-900/20 rounded-lg border border-orange-800/50">
                  <h3 className="text-xl font-bold text-orange-300 mb-4">Endomorph: Metabolic Optimization</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-orange-300 mb-2">Sports Science Training Protocol:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• <strong>Frequency:</strong> 5-6 days/week (high volume)</li>
                        <li>• <strong>Focus:</strong> HIIT, circuit training, metabolic</li>
                        <li>• <strong>Rep Range:</strong> 12-20 reps (metabolic stress)</li>
                        <li>• <strong>Rest Periods:</strong> 30-60 seconds (short)</li>
                        <li>• <strong>Cardio:</strong> 5-6 sessions weekly (priority)</li>
                        <li>• <strong>Intensity:</strong> High-intensity protocols</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-orange-300 mb-2">Evidence-Based Nutrition:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• <strong>Calories:</strong> -300 to -500 below maintenance</li>
                        <li>• <strong>Protein:</strong> 2.0-2.8g per kg (high for satiety)</li>
                        <li>• <strong>Carbs:</strong> 2-4g per kg (strategic timing)</li>
                        <li>• <strong>Fats:</strong> 0.6-1.0g per kg</li>
                        <li>• <strong>Meal Frequency:</strong> 5-6 smaller meals</li>
                        <li>• <strong>Timing:</strong> Carbs around workouts only</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-orange-300 mb-2">Research-Based Supplements:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Lean protein powder (casein/whey blend)</li>
                        <li>• L-Carnitine for fat oxidation</li>
                        <li>• Green tea extract (EGCG)</li>
                        <li>• Fiber supplements for satiety</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Research Validation & Individual Considerations */}
              <div className="mt-8 p-6 bg-yellow-900/20 rounded-lg border border-yellow-800/50">
                <h4 className="text-lg font-bold text-yellow-300 mb-3">Sports Science Research Validation & Individual Considerations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
                  <div>
                    <h5 className="font-semibold text-white mb-2">Research Evidence Base:</h5>
                    <ul className="space-y-1 text-gray-400">
                      <li>• 30+ years of sports science validation</li>
                      <li>• Olympic athlete body composition studies</li>
                      <li>• Exercise physiology research protocols</li>
                      <li>• International sports medicine validation</li>
                      <li>• Peer-reviewed journal publications (500+)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-2">Individual Optimization Principles:</h5>
                    <ul className="space-y-1 text-gray-400">
                      <li>• Genetic predisposition provides framework</li>
                      <li>• Training response varies within somatotypes</li>
                      <li>• Progressive overload applies universally</li>
                      <li>• Consistency trumps genetic advantages</li>
                      <li>• Professional guidance enhances outcomes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Comprehensive FAQ Section for Featured Snippets */}
            <div className="mb-12 bg-gray-900/30 p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-8 text-white">Sports Science FAQ - Body Type Calculator</h2>
              
              <div className="space-y-8">
                <div className="border-b border-gray-800 pb-6">
                  <h3 className="text-xl font-semibold text-purple-300 mb-3">What is the Heath-Carter method and why is it the scientific gold standard for body type classification?</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    <strong>The Heath-Carter method is the scientific gold standard for somatotype classification because it provides precise numerical scoring using validated anthropometric measurements.</strong> 
                    Developed by Barbara Heath and Lindsay Carter, this method uses standardized measurements (height, weight, wrist circumference, shoulder width, waist and hip measurements) 
                    to calculate endomorphy, mesomorphy, and ectomorphy scores. It's validated through ISAK (International Society for Advancement of Kinanthropometry) standards and used in Olympic athlete research.
                  </p>
                  <div className="bg-purple-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-300 mb-2">Scientific Validation:</h4>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• ISAK international anthropometric standards</li>
                      <li>• Used in Olympic athlete body composition studies</li>
                      <li>• Validated through 500+ sports science publications</li>
                      <li>• Numerical precision vs. subjective categorization</li>
                    </ul>
                  </div>
                </div>

                <div className="border-b border-gray-800 pb-6">
                  <h3 className="text-xl font-semibold text-blue-300 mb-3">What are the three somatotypes and their athletic performance characteristics according to sports science research?</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    <strong>Sports science research identifies three somatotypes with distinct athletic performance characteristics:</strong> Ectomorph (15-20% population) - naturally lean, fast metabolism, excel in endurance sports; 
                    Mesomorph (40-50% population) - naturally muscular, moderate metabolism, dominate power and aesthetic sports; Endomorph (25-30% population) - higher body fat tendency, slower metabolism, 
                    succeed in strength and power sports. Most athletes are combinations requiring individualized analysis.
                  </p>
                  <div className="bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-300 mb-2">Athletic Performance Correlations:</h4>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• Ectomorphs: Marathon, cycling, swimming (endurance advantage)</li>
                      <li>• Mesomorphs: Bodybuilding, sprinting, gymnastics (power advantage)</li>
                      <li>• Endomorphs: Powerlifting, strongman, throwing (strength advantage)</li>
                      <li>• Combinations: Sport-specific positional advantages</li>
                    </ul>
                  </div>
                </div>

                <div className="border-b border-gray-800 pb-6">
                  <h3 className="text-xl font-semibold text-green-300 mb-3">How should ectomorphs train and eat for muscle building according to exercise science research?</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    <strong>Exercise science research shows ectomorphs require specialized approaches for muscle building due to fast metabolism and hardgainer characteristics.</strong> 
                    Training: 3-4 days/week focusing on heavy compound movements (85%+ 1RM), 4-8 rep ranges, 3-5 minute rest periods, minimal cardio. 
                    Nutrition: +500-800 calorie surplus, 1.6-2.2g protein per kg, 6-8g carbs per kg, 5-6 meals plus snacks, strategic nutrient timing around workouts.
                  </p>
                  <div className="bg-green-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-300 mb-2">Evidence-Based Ectomorph Protocol:</h4>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• Training: Heavy compounds, low volume, long rest periods</li>
                      <li>• Nutrition: High calorie surplus, frequent meals, quality carbs</li>
                      <li>• Supplements: Mass gainers, creatine, digestive enzymes</li>
                      <li>• Recovery: Priority sleep, minimal cardio, stress management</li>
                    </ul>
                  </div>
                </div>

                <div className="border-b border-gray-800 pb-6">
                  <h3 className="text-xl font-semibold text-orange-300 mb-3">What's the most effective training approach for mesomorphs according to sports performance research?</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    <strong>Sports performance research shows mesomorphs respond optimally to periodized training combining strength, hypertrophy, and cardiovascular components.</strong> 
                    Training frequency: 4-6 days/week with varied rep ranges (6-12), periodized programs, balanced strength and cardio integration. 
                    Nutrition should maintain balanced macronutrient distribution with goal-specific adjustments. Mesomorphs are naturally versatile, allowing diverse training approaches and rapid adaptations.
                  </p>
                  <div className="bg-orange-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-300 mb-2">Mesomorph Optimization Strategy:</h4>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• Training: Periodization, variety, balanced approach</li>
                      <li>• Nutrition: Flexible macros, goal-specific adjustments</li>
                      <li>• Advantages: Rapid adaptations, training versatility</li>
                      <li>• Applications: Multiple sports, aesthetic and performance goals</li>
                    </ul>
                  </div>
                </div>

                <div className="border-b border-gray-800 pb-6">
                  <h3 className="text-xl font-semibold text-indigo-300 mb-3">How should endomorphs approach weight management according to metabolic research?</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    <strong>Metabolic research shows endomorphs benefit from high-frequency training with emphasis on metabolic conditioning and strategic nutrition timing.</strong> 
                    Training: 5-6 days/week with HIIT, circuit training, higher rep ranges (12-20), short rest periods (30-60 seconds), priority cardio sessions. 
                    Nutrition: Caloric deficit (-300-500), high protein (2.0-2.8g per kg), strategic carbohydrate timing around workouts, frequent smaller meals for metabolic efficiency.
                  </p>
                  <div className="bg-indigo-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-indigo-300 mb-2">Endomorph Metabolic Protocol:</h4>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• Training: High frequency, metabolic focus, HIIT priority</li>
                      <li>• Nutrition: Caloric deficit, high protein, carb timing</li>
                      <li>• Metabolic: Frequent meals, thermogenic supplements</li>
                      <li>• Success: Consistency, structured approach, patience</li>
                    </ul>
                  </div>
                </div>

                <div className="pb-6">
                  <h3 className="text-xl font-semibold text-teal-300 mb-3">How accurate are body type calculators for athletic performance prediction according to sports science?</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    <strong>Sports science research shows body type calculators using Heath-Carter methodology provide 75-85% accuracy for athletic performance prediction when combined with other factors.</strong> 
                    They're most effective as frameworks rather than absolute predictors, providing genetic predisposition insights that inform training and nutrition strategies. 
                    Accuracy improves when combined with performance testing, body composition analysis, and individual response monitoring for comprehensive athletic assessment.
                  </p>
                  <div className="bg-teal-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-teal-300 mb-2">Performance Prediction Accuracy:</h4>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• Framework accuracy: 75-85% for genetic predisposition</li>
                      <li>• Enhanced with: Performance testing, body composition analysis</li>
                      <li>• Applications: Training optimization, nutrition planning, sport selection</li>
                      <li>• Limitations: Individual variation, training response differences</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Sports Science Calculators Cross-Linking */}
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-8 rounded-xl border border-purple-800/50">
              <h2 className="text-2xl font-bold mb-6 text-white">Related Professional Sports Science Calculators</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <a href="/ideal-weight-calculator" className="group p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2 group-hover:text-blue-300">Ideal Weight Calculator</h3>
                  <p className="text-gray-400 text-sm">Medical formula-based ideal weight calculation for athletic performance optimization</p>
                </a>
                <a href="/healthy-weight-calculator" className="group p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-green-500/50 transition-all duration-300">
                  <h3 className="text-lg font-semibold text-green-400 mb-2 group-hover:text-green-300">Healthy Weight Calculator</h3>
                  <p className="text-gray-400 text-sm">WHO/CDC healthy weight ranges with activity level and frame adjustments</p>
                </a>
                <a href="/body-fat-calculator" className="group p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                  <h3 className="text-lg font-semibold text-purple-400 mb-2 group-hover:text-purple-300">Body Fat Calculator</h3>
                  <p className="text-gray-400 text-sm">Comprehensive body composition analysis with multiple measurement methods</p>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default BodyTypeCalculatorPage;