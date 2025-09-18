import React from "react";
import PregnancyWeightGainCalculator from "../components/PregnancyWeightGainCalculator";

const PregnancyWeightGainCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
              Pregnancy Weight Gain Calculator
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Track healthy weight gain during pregnancy based on IOM guidelines and your pre-pregnancy BMI. 
            Get personalized recommendations for optimal maternal and fetal health.
          </p>
        </div>

        {/* Calculator Component */}
        <PregnancyWeightGainCalculator />

        {/* Educational Content */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-green-400">IOM Weight Gain Guidelines</h3>
              <p className="text-gray-300 mb-4">
                The Institute of Medicine (IOM) provides evidence-based weight gain recommendations to 
                optimize health outcomes for both mother and baby. These guidelines are based on your 
                pre-pregnancy BMI and are widely used by healthcare professionals worldwide.
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Underweight (BMI &lt; 18.5): 28-40 lbs total gain</li>
                <li>• Normal weight (BMI 18.5-24.9): 25-35 lbs total gain</li>
                <li>• Overweight (BMI 25-29.9): 15-25 lbs total gain</li>
                <li>• Obese (BMI &ge; 30): 11-20 lbs total gain</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-teal-400">Healthy Weight Gain Patterns</h3>
              <p className="text-gray-300 mb-4">
                Weight gain during pregnancy should be gradual and steady. Most of the weight gain occurs 
                during the second and third trimesters, with minimal gain during the first trimester when 
                morning sickness is common.
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• First trimester: 1-4.4 lbs total (0.5-2 lbs/month)</li>
                <li>• Second & third trimesters: 0.5-2 lbs per week</li>
                <li>• Twin pregnancies require higher weight gain</li>
                <li>• Regular monitoring helps track healthy progress</li>
              </ul>
            </div>
          </div>

          {/* SEO Content */}
          <div className="mt-8 bg-gray-900/30 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4 text-white">Understanding Pregnancy Weight Gain</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-green-300">Where Does the Weight Go?</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Baby:</span>
                    <span className="text-white">7-8 lbs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Placenta:</span>
                    <span className="text-white">1-2 lbs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amniotic fluid:</span>
                    <span className="text-white">2 lbs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Breast tissue:</span>
                    <span className="text-white">2 lbs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Blood supply:</span>
                    <span className="text-white">4 lbs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Fat stores & muscle:</span>
                    <span className="text-white">7-10 lbs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Uterus:</span>
                    <span className="text-white">2-5 lbs</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3 text-teal-300">Health Risks of Poor Weight Gain</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-orange-900/20 rounded-lg border border-orange-800/30">
                    <div className="font-medium text-orange-300">Too Little Weight Gain:</div>
                    <div className="text-gray-400 text-xs mt-1">
                      Low birth weight, preterm birth, poor fetal growth
                    </div>
                  </div>
                  <div className="p-3 bg-red-900/20 rounded-lg border border-red-800/30">
                    <div className="font-medium text-red-300">Excessive Weight Gain:</div>
                    <div className="text-gray-400 text-xs mt-1">
                      Gestational diabetes, high blood pressure, difficult delivery, postpartum weight retention
                    </div>
                  </div>
                  <div className="p-3 bg-green-900/20 rounded-lg border border-green-800/30">
                    <div className="font-medium text-green-300">Optimal Weight Gain:</div>
                    <div className="text-gray-400 text-xs mt-1">
                      Healthy baby weight, easier labor, faster postpartum recovery
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-8 bg-gray-900/30 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4 text-white">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-green-400 mb-2">What if I was overweight before pregnancy?</h4>
                <p className="text-gray-300 text-sm">
                  If you were overweight before pregnancy, you'll need less weight gain (15-25 lbs total) 
                  to support a healthy pregnancy. Focus on eating nutrient-dense foods and staying active 
                  as approved by your healthcare provider. Avoid trying to lose weight during pregnancy.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-teal-400 mb-2">How often should I weigh myself during pregnancy?</h4>
                <p className="text-gray-300 text-sm">
                  Weigh yourself once a week at the same time of day, preferably in the morning after using 
                  the bathroom. Daily weighing isn't recommended as normal fluctuations can cause unnecessary 
                  anxiety. Your healthcare provider will monitor your weight at each prenatal visit.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-green-400 mb-2">What if I'm carrying twins or multiples?</h4>
                <p className="text-gray-300 text-sm">
                  Twin and multiple pregnancies require higher weight gain. For twins: normal weight women 
                  should gain 37-54 lbs, overweight women 31-50 lbs, and obese women 25-42 lbs. Always 
                  follow your healthcare provider's specific recommendations for multiple pregnancies.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-teal-400 mb-2">What foods should I focus on for healthy weight gain?</h4>
                <p className="text-gray-300 text-sm">
                  Focus on nutrient-dense foods: lean proteins, whole grains, fruits, vegetables, dairy 
                  products, and healthy fats. Avoid empty calories from sugary drinks, processed foods, 
                  and excessive sweets. Take prenatal vitamins and stay hydrated throughout your pregnancy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PregnancyWeightGainCalculatorPage;