// Waist-to-Height Ratio Calculator Utilities
// More accurate than BMI for predicting health risks

export const calculateWaistHeightRatio = (waist, height, units = 'metric') => {
  let waistCm, heightCm;
  
  if (units === 'metric') {
    waistCm = waist;
    heightCm = height;
  } else {
    // Convert inches to cm
    waistCm = waist * 2.54;
    heightCm = height * 2.54;
  }
  
  const ratio = waistCm / heightCm;
  return Math.round(ratio * 1000) / 1000; // Round to 3 decimal places
};

export const getWaistHeightCategory = (ratio, age, gender) => {
  let category, risk, color, description;
  
  // Age-adjusted thresholds
  let lowThreshold, moderateThreshold, highThreshold;
  
  if (age < 40) {
    lowThreshold = 0.4;
    moderateThreshold = 0.5;
    highThreshold = 0.6;
  } else if (age < 50) {
    lowThreshold = 0.42;
    moderateThreshold = 0.52;
    highThreshold = 0.62;
  } else {
    lowThreshold = 0.45;
    moderateThreshold = 0.55;
    highThreshold = 0.65;
  }
  
  if (ratio < lowThreshold) {
    category = 'Excellent';
    risk = 'Very Low';
    color = 'green';
    description = 'Excellent waist-to-height ratio. Very low risk of cardiovascular disease and metabolic disorders.';
  } else if (ratio < moderateThreshold) {
    category = 'Good';
    risk = 'Low';
    color = 'blue';
    description = 'Good waist-to-height ratio. Low risk of health complications. Maintain current lifestyle.';
  } else if (ratio < highThreshold) {
    category = 'Caution';
    risk = 'Moderate';
    color = 'yellow';
    description = 'Elevated waist-to-height ratio. Moderate risk of cardiovascular disease. Consider lifestyle changes.';
  } else {
    category = 'High Risk';
    risk = 'High';
    color = 'red';
    description = 'High waist-to-height ratio. Increased risk of cardiovascular disease, diabetes, and metabolic syndrome. Seek medical advice.';
  }
  
  return {
    category,
    risk,
    color,
    description,
    thresholds: {
      excellent: lowThreshold,
      good: moderateThreshold,
      caution: highThreshold
    }
  };
};

export const getHealthImplications = (ratio, age, gender) => {
  const category = getWaistHeightCategory(ratio, age, gender);
  
  let cardiovascularRisk, diabetesRisk, metabolicRisk, overallHealth;
  
  if (ratio < 0.4) {
    cardiovascularRisk = 'Very Low (10-15% lower than average)';
    diabetesRisk = 'Very Low (20% lower than average)';
    metabolicRisk = 'Very Low';
    overallHealth = 'Excellent metabolic health profile';
  } else if (ratio < 0.5) {
    cardiovascularRisk = 'Low (within normal range)';
    diabetesRisk = 'Low (within normal range)';
    metabolicRisk = 'Low';
    overallHealth = 'Good metabolic health profile';
  } else if (ratio < 0.6) {
    cardiovascularRisk = 'Moderate (30-50% higher than optimal)';
    diabetesRisk = 'Moderate (40-60% higher than optimal)';
    metabolicRisk = 'Moderate';
    overallHealth = 'Some concerns - lifestyle modifications recommended';
  } else {
    cardiovascularRisk = 'High (2-3x higher than optimal)';
    diabetesRisk = 'High (3-4x higher than optimal)';
    metabolicRisk = 'High';
    overallHealth = 'Significant health risks - medical consultation recommended';
  }
  
  return {
    cardiovascularRisk,
    diabetesRisk,
    metabolicRisk,
    overallHealth,
    category: category.category
  };
};

export const getRecommendations = (ratio, age, gender, currentWeight, height, units) => {
  const category = getWaistHeightCategory(ratio, age, gender);
  let recommendations = [];
  
  if (ratio >= 0.6) {
    recommendations = [
      'Consult with healthcare provider for comprehensive health assessment',
      'Consider supervised weight loss program',
      'Focus on reducing abdominal fat through diet and exercise',
      'Monitor blood pressure, blood sugar, and cholesterol levels',
      'Incorporate cardiovascular exercise (150+ minutes/week)',
      'Adopt Mediterranean-style diet rich in whole foods',
      'Consider stress management techniques (meditation, yoga)',
      'Get adequate sleep (7-9 hours per night)'
    ];
  } else if (ratio >= 0.5) {
    recommendations = [
      'Incorporate regular cardiovascular exercise (150 minutes/week)',
      'Focus on core-strengthening exercises',
      'Adopt a balanced diet with reduced processed foods',
      'Monitor portion sizes and practice mindful eating',
      'Increase fiber intake (25-35g per day)',
      'Limit refined sugars and trans fats',
      'Stay hydrated (8-10 glasses water daily)',
      'Consider tracking progress with measurements'
    ];
  } else if (ratio >= 0.4) {
    recommendations = [
      'Maintain current healthy lifestyle habits',
      'Continue regular physical activity',
      'Keep a balanced, nutritious diet',
      'Monitor waist measurements periodically',
      'Consider strength training to maintain muscle mass',
      'Stay consistent with healthy sleep patterns'
    ];
  } else {
    recommendations = [
      'Excellent health profile - maintain current habits',
      'Continue regular exercise routine',
      'Maintain balanced nutrition',
      'Serve as a role model for healthy living',
      'Consider periodic health check-ups',
      'Share healthy habits with family and friends'
    ];
  }
  
  return recommendations;
};

export const getTargetWaistSize = (height, units, targetRatio = 0.5) => {
  let heightCm = units === 'metric' ? height : height * 2.54;
  let targetWaistCm = heightCm * targetRatio;
  
  if (units === 'metric') {
    return Math.round(targetWaistCm * 10) / 10;
  } else {
    return Math.round((targetWaistCm / 2.54) * 10) / 10;
  }
};

export const compareWithBMI = (ratio, bmi) => {
  let waistAdvantages = [
    'More accurate for predicting cardiovascular disease risk',
    'Better indicator of abdominal fat (visceral adiposity)',
    'Not affected by muscle mass variations',
    'Simple measurement requiring only waist and height',
    'Age-independent assessment tool',
    'Better predictor of metabolic syndrome'
  ];
  
  let comparison;
  
  if (bmi < 25 && ratio < 0.5) {
    comparison = 'Both BMI and waist-to-height ratio indicate healthy weight status';
  } else if (bmi >= 25 && ratio >= 0.5) {
    comparison = 'Both BMI and waist-to-height ratio indicate elevated health risks';
  } else if (bmi < 25 && ratio >= 0.5) {
    comparison = 'Normal BMI but elevated waist-to-height ratio suggests central obesity risk';
  } else {
    comparison = 'Elevated BMI but normal waist-to-height ratio may indicate muscle mass';
  }
  
  return {
    comparison,
    advantages: waistAdvantages
  };
};

export const getMeasurementTips = () => {
  return {
    when: [
      'Measure in the morning before eating',
      'After using the bathroom',
      'While breathing normally (not holding breath)',
      'Same time of day for consistency'
    ],
    where: [
      'Find the narrowest part of your torso',
      'Usually just above the hip bones',
      'Below the rib cage, above the belly button',
      'Use the midpoint if narrowest part is unclear'
    ],
    how: [
      'Use a flexible measuring tape',
      'Stand straight with feet together',
      'Keep tape parallel to the floor',
      'Tape should be snug but not compressing skin',
      'Take measurement after normal exhale',
      'Record to nearest 0.5 cm or 1/4 inch'
    ],
    tips: [
      'Take 2-3 measurements and use the average',
      'Have someone else measure for accuracy',
      'Keep a measurement log for tracking progress',
      'Measure same location each time'
    ]
  };
};

export const formatWaistHeightResults = (waist, height, age, gender, units, currentWeight = null, bmi = null) => {
  const ratio = calculateWaistHeightRatio(waist, height, units);
  const category = getWaistHeightCategory(ratio, age, gender);
  const healthImplications = getHealthImplications(ratio, age, gender);
  const recommendations = getRecommendations(ratio, age, gender, currentWeight, height, units);
  const targetWaist = getTargetWaistSize(height, units);
  const bmiComparison = bmi ? compareWithBMI(ratio, bmi) : null;
  const measurementTips = getMeasurementTips();
  
  return {
    ratio,
    category,
    healthImplications,
    recommendations,
    targetWaist,
    bmiComparison,
    measurementTips,
    units,
    summary: {
      primaryMessage: category.description,
      riskLevel: category.risk,
      targetMessage: `For optimal health, aim for a waist measurement under ${targetWaist} ${units === 'metric' ? 'cm' : 'inches'}`
    }
  };
};