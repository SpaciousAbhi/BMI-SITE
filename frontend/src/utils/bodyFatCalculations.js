// Body Fat Calculator - US Navy Method
// Uses circumference measurements and height

export const calculateBodyFatUSNavy = (measurements, gender) => {
  const { waist, neck, hip = 0, height } = measurements;
  
  let bodyFat;
  
  if (gender === 'male') {
    // Male formula: 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
    const logWaistNeck = Math.log10(waist - neck);
    const logHeight = Math.log10(height);
    bodyFat = 495 / (1.0324 - 0.19077 * logWaistNeck + 0.15456 * logHeight) - 450;
  } else {
    // Female formula: 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
    const logWaistHipNeck = Math.log10(waist + hip - neck);
    const logHeight = Math.log10(height);
    bodyFat = 495 / (1.29579 - 0.35004 * logWaistHipNeck + 0.22100 * logHeight) - 450;
  }
  
  // Ensure reasonable bounds
  return Math.max(3, Math.min(60, Math.round(bodyFat * 10) / 10));
};

export const getBodyFatCategory = (bodyFat, gender) => {
  let ranges;
  
  if (gender === 'male') {
    ranges = [
      { min: 0, max: 6, category: 'Essential Fat', color: 'text-red-600', bgColor: 'bg-red-50', description: 'Too low - health risks' },
      { min: 6, max: 13, category: 'Athletes', color: 'text-blue-600', bgColor: 'bg-blue-50', description: 'Athletic performance range' },
      { min: 14, max: 17, category: 'Fitness', color: 'text-green-600', bgColor: 'bg-green-50', description: 'Fit and healthy' },
      { min: 18, max: 24, category: 'Average', color: 'text-yellow-600', bgColor: 'bg-yellow-50', description: 'Acceptable range' },
      { min: 25, max: 100, category: 'Above Average', color: 'text-orange-600', bgColor: 'bg-orange-50', description: 'Consider reduction' }
    ];
  } else {
    ranges = [
      { min: 0, max: 12, category: 'Essential Fat', color: 'text-red-600', bgColor: 'bg-red-50', description: 'Too low - health risks' },
      { min: 12, max: 20, category: 'Athletes', color: 'text-blue-600', bgColor: 'bg-blue-50', description: 'Athletic performance range' },
      { min: 21, max: 24, category: 'Fitness', color: 'text-green-600', bgColor: 'bg-green-50', description: 'Fit and healthy' },
      { min: 25, max: 31, category: 'Average', color: 'text-yellow-600', bgColor: 'bg-yellow-50', description: 'Acceptable range' },
      { min: 32, max: 100, category: 'Above Average', color: 'text-orange-600', bgColor: 'bg-orange-50', description: 'Consider reduction' }
    ];
  }
  
  const range = ranges.find(r => bodyFat >= r.min && bodyFat < r.max) || ranges[ranges.length - 1];
  return range;
};

export const getBodyFatRecommendations = (bodyFat, gender, age) => {
  const recommendations = [];
  const category = getBodyFatCategory(bodyFat, gender);
  
  if (category.category === 'Essential Fat') {
    recommendations.push({
      type: 'health',
      title: 'Increase Body Fat',
      description: 'Your body fat is too low. Consult a healthcare provider immediately.',
      priority: 'urgent'
    });
    recommendations.push({
      type: 'nutrition',
      title: 'Increase Healthy Calories',
      description: 'Add healthy fats like nuts, avocados, and olive oil to your diet.',
      priority: 'high'
    });
  } else if (category.category === 'Above Average') {
    recommendations.push({
      type: 'nutrition',
      title: 'Reduce Caloric Intake',
      description: 'Create a moderate caloric deficit with portion control and healthier food choices.',
      priority: 'high'
    });
    recommendations.push({
      type: 'exercise',
      title: 'Combine Cardio and Strength Training',
      description: 'Mix cardiovascular exercise with resistance training for optimal fat loss.',
      priority: 'high'
    });
  } else if (category.category === 'Athletes' || category.category === 'Fitness') {
    recommendations.push({
      type: 'lifestyle',
      title: 'Maintain Current Level',
      description: 'Your body fat percentage is in an excellent range. Keep up your current routine.',
      priority: 'low'
    });
  }
  
  // Age-specific recommendations
  if (age > 40) {
    recommendations.push({
      type: 'exercise',
      title: 'Focus on Strength Training',
      description: 'Prioritize resistance training to maintain muscle mass and bone density.',
      priority: 'medium'
    });
  }
  
  // General recommendations
  recommendations.push({
    type: 'measurement',
    title: 'Regular Monitoring',
    description: 'Track your body fat percentage monthly rather than daily for best results.',
    priority: 'low'
  });
  
  return recommendations;
};

export const convertMeasurements = (measurements, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return measurements;
  
  const conversionFactor = fromUnit === 'inches' ? 2.54 : 1/2.54; // inches to cm or cm to inches
  
  return {
    waist: measurements.waist * conversionFactor,
    neck: measurements.neck * conversionFactor,
    hip: measurements.hip * conversionFactor,
    height: measurements.height * conversionFactor
  };
};