import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import BodyTypeCalculator from "../components/BodyTypeCalculator";

const BodyTypeCalculatorPage = () => {
  useEffect(() => {
    // Enhanced JSON-LD Schema Markup for SEO
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "MedicalRiskCalculator",
          "@id": "https://bmipro.com/body-type-calculator#calculator",
          "name": "Body Type Calculator - Somatotype Classification | Heath-Carter Method",
          "description": "Discover your somatotype using the Heath-Carter anthropometric method. Professional body type calculator for ectomorph, mesomorph, and endomorph classification with personalized fitness and nutrition recommendations.",
          "url": "https://bmipro.com/body-type-calculator",
          "applicationCategory": "Medical Calculator",
          "applicationSubCategory": "Body Composition Analysis",
          "operatingSystem": "Any",
          "softwareVersion": "2025.1",
          "datePublished": "2025-01-01",
          "dateModified": "2025-01-15",
          "author": {
            "@type": "Organization",
            "@id": "https://bmipro.com/#organization"
          },
          "publisher": {
            "@type": "Organization",
            "@id": "https://bmipro.com/#organization"
          },
          "medicalSpecialty": "Sports Medicine",
          "medicalAudience": ["Patient", "Healthcare Provider", "Fitness Professional", "Nutritionist"],
          "riskFactor": "Body Composition",
          "healthCondition": "Body Type Assessment",
          "guideline": {
            "@type": "MedicalGuideline",
            "name": "Heath-Carter Somatotype Classification Method",
            "description": "Evidence-based anthropometric method for scientific body type classification and fitness planning"
          },
          "featureList": [
            "Heath-Carter Somatotype Method",
            "Ectomorph Classification",
            "Mesomorph Classification", 
            "Endomorph Classification",
            "Anthropometric Measurements",
            "Body Composition Analysis",
            "Personalized Fitness Plans",
            "Nutrition Recommendations",
            "Training Optimization",
            "PDF Report Generation"
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://bmipro.com/body-type-calculator#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What are the three body types (somatotypes) and their characteristics?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The three somatotypes are: Ectomorph (naturally lean, narrow frame, fast metabolism, difficulty gaining weight), Mesomorph (naturally muscular, athletic build, moderate metabolism, responds well to exercise), and Endomorph (higher body fat tendency, rounder physique, slower metabolism, gains weight easily). Most people are combinations of these types."
              }
            },
            {
              "@type": "Question",
              "name": "What is the Heath-Carter method for body type classification?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The Heath-Carter method is the scientific gold standard for somatotype classification. Unlike simple categorization, it provides numerical scores for each body type component using anthropometric measurements (height, weight, wrist circumference, shoulder width, waist and hip measurements). This method gives detailed body composition understanding used in sports science and medical research."
              }
            },
            {
              "@type": "Question",
              "name": "How should ectomorphs train and eat for best results?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ectomorphs should focus on strength training over cardio, maintain a caloric surplus for muscle gain, limit excessive cardio, emphasize compound movements, increase meal frequency, and allow adequate recovery time. Training should be 3-4 days per week with heavy compound exercises and longer rest periods. Nutrition should include higher caloric intake with frequent meals."
              }
            },
            {
              "@type": "Question",
              "name": "What training approach works best for mesomorphs?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Mesomorphs respond well to balanced training approaches combining strength and cardio training 4-5 days per week. They can handle variety in exercises, benefit from periodized training programs, and maintain balanced macronutrient distribution with moderate carbohydrate intake and adequate protein for muscle maintenance."
              }
            },
            {
              "@type": "Question",
              "name": "How should endomorphs approach weight management and fitness?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Endomorphs benefit from higher training frequency (5-6 days/week) with emphasis on cardio and circuit training. Nutrition should focus on lower carbohydrate intake, higher protein ratios, and nutrient timing. Training should include HIIT, shorter rest periods, and consistent exercise routines for optimal fat loss and weight management."
              }
            }
          ]
        },
        {
          "@type": "HowTo",
          "@id": "https://bmipro.com/body-type-calculator#howto",
          "name": "How to Determine Your Body Type Using the Heath-Carter Method",
          "description": "Step-by-step guide to classify your somatotype using scientific anthropometric measurements",
          "totalTime": "PT10M",
          "step": [
            {
              "@type": "HowToStep",
              "name": "Gather Basic Measurements",
              "text": "Measure your height and weight accurately. Remove shoes and heavy clothing for precise measurements that form the foundation of somatotype analysis.",
              "image": "https://bmipro.com/images/basic-measurements.jpg"
            },
            {
              "@type": "HowToStep",
              "name": "Measure Wrist Circumference",
              "text": "Measure around the smallest part of your wrist just below the wrist bone. This indicates frame size and bone structure for classification.",
              "image": "https://bmipro.com/images/wrist-measurement.jpg"
            },
            {
              "@type": "HowToStep",
              "name": "Record Shoulder and Waist Measurements",
              "text": "Measure shoulder width at the broadest point and waist circumference at the narrowest point. These ratios are crucial for somatotype determination.",
              "image": "https://bmipro.com/images/body-measurements.jpg"
            },
            {
              "@type": "HowToStep",
              "name": "Add Hip Measurement (Optional)",
              "text": "Measure hip circumference at the widest point for additional accuracy in body type classification and ratio analysis.",
              "image": "https://bmipro.com/images/hip-measurement.jpg"
            },
            {
              "@type": "HowToStep",
              "name": "Analyze Results and Recommendations",
              "text": "Review your somatotype classification, body type percentages, and receive personalized training and nutrition recommendations based on your results.",
              "image": "https://bmipro.com/images/somatotype-results.jpg"
            }
          ]
        },
        {
          "@type": "WebApplication",
          "@id": "https://bmipro.com/body-type-calculator#webapp",
          "name": "Professional Body Type Calculator - Somatotype Analysis",
          "applicationCategory": "HealthApplication",
          "operatingSystem": "Any",
          "browserRequirements": "Modern web browser with JavaScript support",
          "softwareVersion": "2025.1",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
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
        <title>Body Type Calculator 2025 - Somatotype Classification | Ectomorph, Mesomorph, Endomorph Test</title>
        <meta name="description" content="Discover your body type with our professional somatotype calculator. Heath-Carter method for ectomorph, mesomorph, endomorph classification with personalized fitness and nutrition plans." />
        <meta name="keywords" content="body type calculator, somatotype calculator, ectomorph mesomorph endomorph test, Heath-Carter method, body type classification, fitness body type, somatotype analysis 2025" />
        
        {/* Enhanced Open Graph Tags */}
        <meta property="og:title" content="Body Type Calculator - Professional Somatotype Classification 2025" />
        <meta property="og:description" content="Discover your somatotype with Heath-Carter method. Ectomorph, mesomorph, endomorph classification with personalized fitness recommendations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bmipro.com/body-type-calculator" />
        <meta property="og:image" content="https://bmipro.com/images/body-type-calculator-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="BMI Pro - Professional Health Calculators" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Body Type Calculator - Somatotype Classification" />
        <meta name="twitter:description" content="Professional body type calculator using Heath-Carter method. Get personalized fitness and nutrition recommendations." />
        <meta name="twitter:image" content="https://bmipro.com/images/body-type-calculator-twitter.jpg" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" content="https://bmipro.com/body-type-calculator" />
        <meta name="author" content="BMI Pro Sports Science Team" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="en" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        
        {/* Health-specific Meta Tags */}
        <meta name="medical.condition" content="Body Composition Analysis" />
        <meta name="medical.specialty" content="Sports Medicine, Exercise Physiology" />
        <meta name="health.topic" content="Body Type Classification, Somatotype Analysis, Fitness Planning" />
      </Helmet>

      <div className="min-h-screen bg-black text-white py-8">
        <div className="container mx-auto px-4">
          {/* Enhanced SEO-Optimized Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Body Type Calculator - Somatotype Classification
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-4">
              Discover Your Somatotype Using the Heath-Carter Anthropometric Method
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Professional body type calculator for ectomorph, mesomorph, and endomorph classification. Get personalized 
              fitness, nutrition, and training recommendations based on your unique body composition and somatotype analysis.
            </p>
          </div>

          {/* Calculator Component */}
          <BodyTypeCalculator />

          {/* Enhanced Educational Content with SEO Optimization */}
          <div className="mt-16 max-w-6xl mx-auto">
            
            {/* Quick Reference Section for Featured Snippets */}
            <div className="mb-12 bg-purple-900/20 p-6 rounded-xl border border-purple-800/50">
              <h2 className="text-2xl font-bold mb-6 text-purple-300">Quick Reference: Body Types (Somatotypes) Comparison</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-purple-800/50">
                      <th className="text-left p-3 text-purple-300">Body Type</th>
                      <th className="text-left p-3 text-purple-300">Characteristics</th>
                      <th className="text-left p-3 text-purple-300">Metabolism</th>
                      <th className="text-left p-3 text-purple-300">Training Focus</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-800/50">
                      <td className="p-3 font-medium text-blue-400">Ectomorph</td>
                      <td className="p-3">Lean, narrow frame, small bones</td>
                      <td className="p-3">Fast - burns calories quickly</td>
                      <td className="p-3">Strength training, limited cardio</td>
                    </tr>
                    <tr className="border-b border-gray-800/50">
                      <td className="p-3 font-medium text-green-400">Mesomorph</td>
                      <td className="p-3">Muscular, athletic, broad shoulders</td>
                      <td className="p-3">Moderate - balanced efficiency</td>
                      <td className="p-3">Balanced strength and cardio</td>
                    </tr>
                    <tr className="border-b border-gray-800/50">
                      <td className="p-3 font-medium text-orange-400">Endomorph</td>
                      <td className="p-3">Rounder, higher body fat, wider build</td>
                      <td className="p-3">Slow - stores energy efficiently</td>
                      <td className="p-3">High frequency cardio and HIIT</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Scientific Foundation Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 className="text-2xl font-semibold mb-4 text-purple-400">Heath-Carter Method: Scientific Gold Standard</h3>
                <p className="text-gray-300 mb-4">
                  The Heath-Carter somatotyping method, developed by Barbara Heath and Lindsay Carter, is the scientific gold 
                  standard for body type classification. This evidence-based anthropometric approach provides numerical scores 
                  for each somatotype component, offering precise body composition analysis used in sports science and medical research.
                </p>
                <div className="space-y-3">
                  <h4 className="text-lg font-medium text-purple-300">Scientific Applications:</h4>
                  <ul className="text-gray-400 text-sm space-y-2">
                    <li>• Olympic athlete body composition studies</li>
                    <li>• Medical research on metabolism</li>
                    <li>• Sports performance optimization</li>
                    <li>• Health risk assessment protocols</li>
                    <li>• Fitness program individualization</li>
                    <li>• Nutrition planning personalization</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 className="text-2xl font-semibold mb-4 text-blue-400">Anthropometric Precision & Accuracy</h3>
                <p className="text-gray-300 mb-4">
                  Unlike basic body type questionnaires, our calculator uses precise anthropometric measurements including BMI, 
                  wrist circumference (frame size), shoulder-to-waist ratios, and hip-to-waist ratios. This scientific approach 
                  provides accurate somatotype classification with numerical scoring for each body type component.
                </p>
                <div className="space-y-3">
                  <h4 className="text-lg font-medium text-blue-300">Measurement Components:</h4>
                  <ul className="text-gray-400 text-sm space-y-2">
                    <li>• BMI integration for initial classification</li>
                    <li>• Wrist circumference for frame analysis</li>
                    <li>• Shoulder-to-waist ratio assessment</li>
                    <li>• Hip-to-waist ratio evaluation</li>
                    <li>• Height-weight proportional analysis</li>
                    <li>• Gender-specific calculation adjustments</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Comprehensive Body Type Analysis */}
            <div className="mb-12 bg-gray-900/30 p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-6 text-white">Complete Somatotype Analysis & Characteristics</h2>
              <p className="text-gray-300 mb-8 text-lg">
                Understanding your somatotype provides insights into metabolism, muscle-building potential, fat storage tendencies, 
                and optimal training approaches. Most individuals are combinations of body types, making personalized analysis 
                crucial for effective fitness and nutrition planning.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Ectomorph Analysis */}
                <div className="p-6 bg-blue-900/20 rounded-lg border border-blue-800/30">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-blue-300 mb-2">Ectomorph</h3>
                    <div className="text-lg font-semibold text-blue-400 mb-2">Lean & Linear Build</div>
                    <div className="text-sm text-gray-400">15-20% of population</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-blue-300 mb-2">Physical Characteristics:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Narrow shoulders and hips</li>
                        <li>• Small bone structure and joints</li>
                        <li>• Low body fat percentage (typically 6-15%)</li>
                        <li>• Long limbs relative to torso</li>
                        <li>• Minimal muscle mass naturally</li>
                        <li>• Angular, defined features</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-blue-300 mb-2">Metabolic Traits:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Fast metabolism (high BMR)</li>
                        <li>• Burns calories efficiently</li>
                        <li>• Difficulty gaining weight</li>
                        <li>• High carbohydrate tolerance</li>
                        <li>• Quick recovery from meals</li>
                        <li>• Sensitive to overtraining</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-blue-300 mb-2">Fitness Advantages:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Natural leanness advantage</li>
                        <li>• Excellent endurance potential</li>
                        <li>• Quick fat loss when needed</li>
                        <li>• Low injury risk from weight</li>
                        <li>• Efficient cardiovascular system</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Mesomorph Analysis */}
                <div className="p-6 bg-green-900/20 rounded-lg border border-green-800/30">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-green-300 mb-2">Mesomorph</h3>
                    <div className="text-lg font-semibold text-green-400 mb-2">Athletic & Muscular Build</div>
                    <div className="text-sm text-gray-400">40-50% of population</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-300 mb-2">Physical Characteristics:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Broad shoulders, narrow waist</li>
                        <li>• Medium to large bone structure</li>
                        <li>• Naturally muscular physique</li>
                        <li>• Balanced body proportions</li>
                        <li>• Body fat range 10-18%</li>
                        <li>• Athletic appearance naturally</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-green-300 mb-2">Metabolic Traits:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Moderate, efficient metabolism</li>
                        <li>• Balanced energy utilization</li>
                        <li>• Gains muscle relatively easily</li>
                        <li>• Moderate fat storage tendency</li>
                        <li>• Good carbohydrate tolerance</li>
                        <li>• Responds well to training</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-green-300 mb-2">Fitness Advantages:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Optimal muscle-building genetics</li>
                        <li>• Versatile training adaptability</li>
                        <li>• Balanced strength and endurance</li>
                        <li>• Quick training adaptations</li>
                        <li>• Athletic performance potential</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Endomorph Analysis */}
                <div className="p-6 bg-orange-900/20 rounded-lg border border-orange-800/30">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-orange-300 mb-2">Endomorph</h3>
                    <div className="text-lg font-semibold text-orange-400 mb-2">Soft & Round Build</div>
                    <div className="text-sm text-gray-400">25-30% of population</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-orange-300 mb-2">Physical Characteristics:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Wider hips and shoulders</li>
                        <li>• Larger bone structure</li>
                        <li>• Higher body fat tendency (18-25%+)</li>
                        <li>• Rounder, softer physique</li>
                        <li>• Shorter limbs relative to torso</li>
                        <li>• Fuller facial features</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-orange-300 mb-2">Metabolic Traits:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Slower metabolism (lower BMR)</li>
                        <li>• Efficient energy storage</li>
                        <li>• Gains weight easily</li>
                        <li>• Higher fat storage tendency</li>
                        <li>• Lower carbohydrate tolerance</li>
                        <li>• Requires more effort for fat loss</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-orange-300 mb-2">Fitness Advantages:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Strong power potential</li>
                        <li>• Good muscle-building capacity</li>
                        <li>• Excellent strength foundation</li>
                        <li>• Energy reserve advantages</li>
                        <li>• Responds well to structure</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Training & Nutrition by Body Type */}
            <div className="mb-12 bg-gray-900/30 p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-6 text-white">Personalized Training & Nutrition Strategies</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Ectomorph Strategy */}
                <div className="p-6 bg-blue-900/20 rounded-lg border border-blue-800/50">
                  <h3 className="text-xl font-bold text-blue-300 mb-4">Ectomorph Training & Nutrition</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-blue-300 mb-2">Optimal Training Approach:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• <strong>Frequency:</strong> 3-4 days per week</li>
                        <li>• <strong>Focus:</strong> Heavy compound movements</li>
                        <li>• <strong>Rep Range:</strong> 6-8 reps for strength</li>
                        <li>• <strong>Rest:</strong> 2-3 minutes between sets</li>
                        <li>• <strong>Cardio:</strong> Minimal (2-3 sessions weekly)</li>
                        <li>• <strong>Duration:</strong> 45-60 minutes max</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-blue-300 mb-2">Nutrition Strategy:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• <strong>Calories:</strong> Surplus (300-500 above maintenance)</li>
                        <li>• <strong>Protein:</strong> 1.2-1.6g per kg body weight</li>
                        <li>• <strong>Carbs:</strong> 6-8g per kg (high intake)</li>
                        <li>• <strong>Fats:</strong> 1-1.2g per kg</li>
                        <li>• <strong>Meals:</strong> 5-6 per day</li>
                        <li>• <strong>Timing:</strong> Pre/post workout nutrition</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-blue-300 mb-2">Key Supplements:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Mass gainer protein powder</li>
                        <li>• Creatine monohydrate</li>
                        <li>• Multivitamin complex</li>
                        <li>• Healthy fats (omega-3)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Mesomorph Strategy */}
                <div className="p-6 bg-green-900/20 rounded-lg border border-green-800/50">
                  <h3 className="text-xl font-bold text-green-300 mb-4">Mesomorph Training & Nutrition</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-300 mb-2">Optimal Training Approach:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• <strong>Frequency:</strong> 4-5 days per week</li>
                        <li>• <strong>Focus:</strong> Balanced strength and hypertrophy</li>
                        <li>• <strong>Rep Range:</strong> 6-12 reps (varied)</li>
                        <li>• <strong>Rest:</strong> 60-90 seconds between sets</li>
                        <li>• <strong>Cardio:</strong> 3-4 sessions weekly</li>
                        <li>• <strong>Variety:</strong> Periodization works well</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-green-300 mb-2">Nutrition Strategy:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• <strong>Calories:</strong> Maintenance or slight surplus</li>
                        <li>• <strong>Protein:</strong> 1.4-1.8g per kg body weight</li>
                        <li>• <strong>Carbs:</strong> 4-6g per kg (moderate)</li>
                        <li>• <strong>Fats:</strong> 0.8-1g per kg</li>
                        <li>• <strong>Meals:</strong> 4-5 per day</li>
                        <li>• <strong>Flexibility:</strong> Can adjust based on goals</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-green-300 mb-2">Key Supplements:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Whey protein powder</li>
                        <li>• Creatine monohydrate</li>
                        <li>• Beta-alanine</li>
                        <li>• Multivitamin</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Endomorph Strategy */}
                <div className="p-6 bg-orange-900/20 rounded-lg border border-orange-800/50">
                  <h3 className="text-xl font-bold text-orange-300 mb-4">Endomorph Training & Nutrition</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-orange-300 mb-2">Optimal Training Approach:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• <strong>Frequency:</strong> 5-6 days per week</li>
                        <li>• <strong>Focus:</strong> High volume, circuit training</li>
                        <li>• <strong>Rep Range:</strong> 12-15+ reps</li>
                        <li>• <strong>Rest:</strong> 30-60 seconds between sets</li>
                        <li>• <strong>Cardio:</strong> 4-5 sessions weekly (HIIT)</li>
                        <li>• <strong>Consistency:</strong> Key to success</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-orange-300 mb-2">Nutrition Strategy:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• <strong>Calories:</strong> Deficit (300-500 below maintenance)</li>
                        <li>• <strong>Protein:</strong> 1.6-2.0g per kg body weight</li>
                        <li>• <strong>Carbs:</strong> 2-4g per kg (lower, timing crucial)</li>
                        <li>• <strong>Fats:</strong> 0.6-0.8g per kg</li>
                        <li>• <strong>Meals:</strong> 4-6 smaller portions</li>
                        <li>• <strong>Timing:</strong> Carbs around workouts</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-orange-300 mb-2">Key Supplements:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Lean protein powder</li>
                        <li>• L-Carnitine</li>
                        <li>• Green tea extract</li>
                        <li>• Fiber supplements</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Considerations */}
              <div className="mt-8 p-6 bg-yellow-900/20 rounded-lg border border-yellow-800/50">
                <h4 className="text-lg font-bold text-yellow-300 mb-3">Important Considerations for All Body Types</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
                  <div>
                    <h5 className="font-semibold text-white mb-2">Individual Variations:</h5>
                    <ul className="space-y-1 text-gray-400">
                      <li>• Most people are combinations (e.g., ecto-mesomorph)</li>
                      <li>• Body type can change with age and lifestyle</li>
                      <li>• Genetics provide framework, not limitations</li>
                      <li>• Consistency trumps body type advantages</li>
                      <li>• Progressive overload applies to all types</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-2">Success Principles:</h5>
                    <ul className="space-y-1 text-gray-400">
                      <li>• Patience and realistic expectations</li>
                      <li>• Track progress beyond just weight</li>
                      <li>• Adjust strategies based on results</li>
                      <li>• Professional guidance when needed</li>
                      <li>• Focus on health over appearance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Comprehensive FAQ Section for Featured Snippets */}
            <div className="mb-12 bg-gray-900/30 p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-8 text-white">Frequently Asked Questions - Body Type Calculator</h2>
              
              <div className="space-y-6">
                <div className="border-b border-gray-800 pb-6">
                  <h3 className="text-xl font-semibold text-purple-300 mb-3">What are the three body types (somatotypes) and their characteristics?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    The three somatotypes are: <strong>Ectomorph</strong> (naturally lean, narrow frame, fast metabolism, difficulty gaining weight), <strong>Mesomorph</strong> (naturally muscular, athletic build, moderate metabolism, responds well to exercise), and <strong>Endomorph</strong> (higher body fat tendency, rounder physique, slower metabolism, gains weight easily). Most people are combinations of these types rather than pure classifications.
                  </p>
                </div>

                <div className="border-b border-gray-800 pb-6">
                  <h3 className="text-xl font-semibold text-blue-300 mb-3">What is the Heath-Carter method for body type classification?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    <strong>The Heath-Carter method is the scientific gold standard for somatotype classification</strong>. Unlike simple categorization, it provides numerical scores for each body type component using anthropometric measurements (height, weight, wrist circumference, shoulder width, waist and hip measurements). This method gives detailed body composition understanding used in sports science, medical research, and fitness planning for precise individual assessment.
                  </p>
                </div>

                <div className="border-b border-gray-800 pb-6">
                  <h3 className="text-xl font-semibold text-green-300 mb-3">How should ectomorphs train and eat for best results?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    <strong>Ectomorphs should focus on strength training over cardio</strong>, maintain a caloric surplus for muscle gain, limit excessive cardio, emphasize compound movements, increase meal frequency, and allow adequate recovery time. <strong>Training should be 3-4 days per week</strong> with heavy compound exercises and longer rest periods. <strong>Nutrition should include higher caloric intake</strong> (300-500 calories above maintenance) with frequent meals and higher carbohydrate intake (6-8g per kg body weight).
                  </p>
                </div>

                <div className="border-b border-gray-800 pb-6">
                  <h3 className="text-xl font-semibold text-orange-300 mb-3">What training approach works best for mesomorphs?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    <strong>Mesomorphs respond well to balanced training approaches</strong> combining strength and cardio training 4-5 days per week. They can handle variety in exercises, benefit from periodized training programs, and maintain balanced macronutrient distribution with moderate carbohydrate intake and adequate protein for muscle maintenance. <strong>Mesomorphs are naturally gifted for both muscle building and fat loss</strong>, making them versatile in training adaptations.
                  </p>
                </div>

                <div className="border-b border-gray-800 pb-6">
                  <h3 className="text-xl font-semibold text-indigo-300 mb-3">How should endomorphs approach weight management and fitness?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    <strong>Endomorphs benefit from higher training frequency (5-6 days/week)</strong> with emphasis on cardio and circuit training. Nutrition should focus on lower carbohydrate intake (2-4g per kg), higher protein ratios (1.6-2.0g per kg), and nutrient timing. <strong>Training should include HIIT, shorter rest periods</strong>, and consistent exercise routines for optimal fat loss and weight management. Endomorphs require more structured approaches but can achieve excellent results with dedication.
                  </p>
                </div>

                <div className="border-b border-gray-800 pb-6">
                  <h3 className="text-xl font-semibold text-teal-300 mb-3">Can your body type change over time?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    <strong>Your fundamental somatotype doesn't change, but body composition can shift significantly</strong> with age, training, and lifestyle factors. Hormonal changes, muscle development, and fat distribution can alter your apparent body type. <strong>Environmental factors can modify how your genetics express themselves</strong>, allowing ectomorphs to build muscle, endomorphs to become leaner, and mesomorphs to maintain their advantages throughout life with proper training and nutrition.
                  </p>
                </div>

                <div className="pb-6">
                  <h3 className="text-xl font-semibold text-pink-300 mb-3">How accurate are body type calculators for fitness planning?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    <strong>Body type calculators provide valuable starting points with 70-85% accuracy</strong> for general fitness planning. They're most effective when combined with body composition analysis, fitness assessments, and professional guidance. <strong>Use somatotype classification as a framework, not rigid rules</strong>. Individual responses to training and nutrition vary significantly, so monitor progress and adjust strategies based on actual results rather than relying solely on body type predictions.
                  </p>
                </div>
              </div>
            </div>

            {/* Related Calculators Cross-Linking */}
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-8 rounded-xl border border-purple-800/50">
              <h2 className="text-2xl font-bold mb-6 text-white">Related Professional Health Calculators</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <a href="/ideal-weight-calculator" className="group p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2 group-hover:text-blue-300">Ideal Weight Calculator</h3>
                  <p className="text-gray-400 text-sm">Medical formula-based ideal weight calculation using validated medical methods</p>
                </a>
                <a href="/healthy-weight-calculator" className="group p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-green-500/50 transition-all duration-300">
                  <h3 className="text-lg font-semibold text-green-400 mb-2 group-hover:text-green-300">Healthy Weight Calculator</h3>
                  <p className="text-gray-400 text-sm">Personalized healthy weight ranges with age, activity, and frame adjustments</p>
                </a>
                <a href="/bmi-calculator" className="group p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                  <h3 className="text-lg font-semibold text-purple-400 mb-2 group-hover:text-purple-300">BMI Calculator</h3>
                  <p className="text-gray-400 text-sm">Body Mass Index calculation with comprehensive health risk analysis</p>
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