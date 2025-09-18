import React from "react";
import PregnancyWeightGainCalculator from "../components/PregnancyWeightGainCalculator";
import PageTransition from "../components/PageTransition";

const PregnancyWeightGainCalculatorPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-black">
        <PregnancyWeightGainCalculator />
        
        {/* Enhanced SEO Content Section */}
        <div className="max-w-4xl mx-auto p-6 mt-8">
          
          {/* Comprehensive FAQ Section */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Frequently Asked Questions - Pregnancy Weight Gain Calculator
            </h2>
            
            <div className="space-y-6">
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  How much weight should I gain during pregnancy?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Healthy pregnancy weight gain depends on your pre-pregnancy BMI. The Institute of Medicine (IOM) guidelines recommend: Underweight (BMI &lt;18.5): 28-40 lbs, Normal weight (BMI 18.5-24.9): 25-35 lbs, Overweight (BMI 25-29.9): 15-25 lbs, Obese (BMI &ge;30): 11-20 lbs. For twin pregnancies, recommended gains are higher. Our calculator provides personalized ranges based on your individual BMI.
                </p>
              </div>
              
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  When does most pregnancy weight gain occur?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Weight gain patterns vary by trimester: First trimester (weeks 1-13): 2-4 lbs total due to morning sickness and small baby size. Second trimester (weeks 14-27): 0.5-1 lb per week as appetite returns and baby grows rapidly. Third trimester (weeks 28-40): 0.5-1 lb per week continued, with some women gaining less near the end. Most weight gain occurs in the second and third trimesters.
                </p>
              </div>
              
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  What contributes to pregnancy weight gain?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Pregnancy weight gain comes from multiple sources: Baby (7-8 lbs), Placenta (1-2 lbs), Amniotic fluid (2 lbs), Uterus enlargement (2 lbs), Breast tissue (1-2 lbs), Increased blood volume (3-4 lbs), Increased fluid volume (2-3 lbs), Fat stores for breastfeeding (6-8 lbs). This totals approximately 25-35 lbs for normal-weight women, with individual variation based on pre-pregnancy BMI.
                </p>
              </div>
              
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  What if I'm gaining too much or too little weight?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Both excessive and insufficient weight gain can affect pregnancy outcomes. Too much weight gain increases risks of gestational diabetes, high blood pressure, large baby, and cesarean delivery. Too little weight gain may lead to low birth weight, preterm delivery, or developmental issues. If you're outside recommended ranges, consult your healthcare provider. They can assess your individual situation and provide personalized nutrition guidance.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  How can I manage healthy weight gain during pregnancy?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Focus on nutrient-dense foods rather than just calories: eat regular, balanced meals with fruits, vegetables, whole grains, lean proteins, and dairy. Take prenatal vitamins as recommended. Stay hydrated with water. Exercise regularly with your doctor's approval (walking, swimming, prenatal yoga). Monitor your weight weekly and track trends rather than daily fluctuations. Avoid "eating for two" - you only need about 300-500 extra calories per day in later pregnancy.
                </p>
              </div>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Understanding Healthy Pregnancy Weight Gain
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">IOM Weight Gain Guidelines</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-900/20 rounded-lg">
                    <p className="text-blue-300 font-semibold">Underweight (BMI &lt;18.5)</p>
                    <p className="text-gray-300 text-sm">28-40 lbs total • 1-1.3 lbs/week (2nd & 3rd trimester)</p>
                  </div>
                  <div className="p-3 bg-green-900/20 rounded-lg">
                    <p className="text-green-300 font-semibold">Normal Weight (BMI 18.5-24.9)</p>
                    <p className="text-gray-300 text-sm">25-35 lbs total • 0.8-1 lb/week (2nd & 3rd trimester)</p>
                  </div>
                  <div className="p-3 bg-yellow-900/20 rounded-lg">
                    <p className="text-yellow-300 font-semibold">Overweight (BMI 25-29.9)</p>
                    <p className="text-gray-300 text-sm">15-25 lbs total • 0.5-0.7 lbs/week (2nd & 3rd trimester)</p>
                  </div>
                  <div className="p-3 bg-red-900/20 rounded-lg">
                    <p className="text-red-300 font-semibold">Obese (BMI &ge;30)</p>
                    <p className="text-gray-300 text-sm">11-20 lbs total • 0.4-0.6 lbs/week (2nd & 3rd trimester)</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-purple-400 mb-3">Weight Gain Breakdown</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between p-2 bg-gray-800/50 rounded">
                    <span className="text-gray-300">Baby</span>
                    <span className="text-white">7-8 lbs</span>
                  </div>
                  <div className="flex justify-between p-2 bg-gray-800/50 rounded">
                    <span className="text-gray-300">Placenta</span>
                    <span className="text-white">1-2 lbs</span>
                  </div>
                  <div className="flex justify-between p-2 bg-gray-800/50 rounded">
                    <span className="text-gray-300">Amniotic Fluid</span>
                    <span className="text-white">2 lbs</span>
                  </div>
                  <div className="flex justify-between p-2 bg-gray-800/50 rounded">
                    <span className="text-gray-300">Uterus</span>
                    <span className="text-white">2 lbs</span>
                  </div>
                  <div className="flex justify-between p-2 bg-gray-800/50 rounded">
                    <span className="text-gray-300">Breast Tissue</span>
                    <span className="text-white">1-2 lbs</span>
                  </div>
                  <div className="flex justify-between p-2 bg-gray-800/50 rounded">
                    <span className="text-gray-300">Blood Volume</span>
                    <span className="text-white">3-4 lbs</span>
                  </div>
                  <div className="flex justify-between p-2 bg-gray-800/50 rounded">
                    <span className="text-gray-300">Fluid Volume</span>
                    <span className="text-white">2-3 lbs</span>
                  </div>
                  <div className="flex justify-between p-2 bg-gray-800/50 rounded">
                    <span className="text-gray-300">Fat Stores</span>
                    <span className="text-white">6-8 lbs</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-purple-400 mb-3">Multiple Pregnancy Guidelines</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• <strong>Twins (Normal BMI):</strong> 37-54 lbs</li>
                  <li>• <strong>Twins (Overweight):</strong> 31-50 lbs</li>
                  <li>• <strong>Twins (Obese):</strong> 25-42 lbs</li>
                  <li>• <strong>Triplets:</strong> 50-62 lbs (limited data)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Nutrition & Exercise Section */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Healthy Pregnancy Nutrition & Exercise
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-green-900/20 border border-green-800/30 rounded-lg">
                <h3 className="text-green-400 font-semibold mb-3">Nutritional Needs</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• <strong>1st Trimester:</strong> No extra calories needed</li>
                  <li>• <strong>2nd Trimester:</strong> +340 calories/day</li>
                  <li>• <strong>3rd Trimester:</strong> +450 calories/day</li>
                  <li>• <strong>Key Nutrients:</strong> Folic acid, iron, calcium, DHA</li>
                  <li>• <strong>Hydration:</strong> 8-10 glasses water daily</li>
                  <li>• <strong>Prenatal Vitamins:</strong> Fill nutritional gaps</li>
                </ul>
              </div>
              
              <div className="p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                <h3 className="text-blue-400 font-semibold mb-3">Safe Exercise Guidelines</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• <strong>Frequency:</strong> 150 minutes moderate activity/week</li>
                  <li>• <strong>Safe Activities:</strong> Walking, swimming, prenatal yoga</li>
                  <li>• <strong>Avoid:</strong> Contact sports, high-risk activities</li>
                  <li>• <strong>Warning Signs:</strong> Chest pain, bleeding, dizziness</li>
                  <li>• <strong>Benefits:</strong> Reduced back pain, better mood</li>
                  <li>• <strong>Consult Doctor:</strong> Before starting new routines</li>
                </ul>
              </div>
              
              <div className="p-4 bg-yellow-900/20 border border-yellow-800/30 rounded-lg">
                <h3 className="text-yellow-400 font-semibold mb-3">Foods to Limit/Avoid</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• <strong>High Mercury Fish:</strong> Shark, swordfish, king mackerel</li>
                  <li>• <strong>Raw/Undercooked:</strong> Sushi, eggs, meat</li>
                  <li>• <strong>Unpasteurized:</strong> Soft cheeses, milk</li>
                  <li>• <strong>Alcohol:</strong> No safe amount during pregnancy</li>
                  <li>• <strong>Excess Caffeine:</strong> Limit to 200mg/day</li>
                  <li>• <strong>High Sodium:</strong> Processed foods, deli meats</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Calculators Section */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Related Pregnancy Health Tools
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="/pregnancy-calculator" className="p-4 bg-pink-900/20 border border-pink-800/30 rounded-lg hover:bg-pink-900/30 transition-colors">
                <h3 className="text-pink-400 font-semibold mb-2">Pregnancy Calculator</h3>
                <p className="text-gray-300 text-sm">Track pregnancy progress and developmental milestones</p>
              </a>
              
              <a href="/due-date-calculator" className="p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg hover:bg-blue-900/30 transition-colors">
                <h3 className="text-blue-400 font-semibold mb-2">Due Date Calculator</h3>
                <p className="text-gray-300 text-sm">Calculate accurate due dates using medical formulas</p>
              </a>
              
              <a href="/calorie-calculator" className="p-4 bg-green-900/20 border border-green-800/30 rounded-lg hover:bg-green-900/30 transition-colors">
                <h3 className="text-green-400 font-semibold mb-2">Calorie Calculator</h3>
                <p className="text-gray-300 text-sm">Calculate daily calorie needs for healthy pregnancy</p>
              </a>
            </div>
          </div>
        </div>

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalRiskCalculator",
              "name": "Pregnancy Weight Gain Calculator - IOM Guidelines",
              "description": "Medical-grade pregnancy weight gain calculator using IOM guidelines based on pre-pregnancy BMI for healthy maternal and fetal outcomes",
              "url": "https://your-domain.com/pregnancy-weight-gain-calculator",
              "medicalSpecialty": "Obstetrics and Gynecology",
              "usageInfo": "Enter pre-pregnancy weight, height, current weight, and gestational weeks to track healthy weight gain",
              "applicationCategory": "HealthApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Advanced BMI Calculator",
                "url": "https://your-domain.com"
              },
              "mainEntity": {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "How much weight should I gain during pregnancy?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Healthy pregnancy weight gain depends on pre-pregnancy BMI: Underweight (28-40 lbs), Normal weight (25-35 lbs), Overweight (15-25 lbs), Obese (11-20 lbs) based on IOM guidelines."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "When does most pregnancy weight gain occur?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "First trimester: 2-4 lbs total. Second and third trimesters: 0.5-1 lb per week. Most weight gain occurs in the second and third trimesters as baby grows rapidly."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What contributes to pregnancy weight gain?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Weight gain includes: baby (7-8 lbs), placenta (1-2 lbs), amniotic fluid (2 lbs), uterus (2 lbs), breast tissue (1-2 lbs), blood volume (3-4 lbs), fluid volume (2-3 lbs), fat stores (6-8 lbs)."
                    }
                  }
                ]
              }
            })
          }}
        />
      </div>
    </PageTransition>
  );
};

export default PregnancyWeightGainCalculatorPage;