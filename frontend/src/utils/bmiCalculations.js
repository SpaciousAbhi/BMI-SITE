// BMI and health calculations utility functions

export const calculateBMI = (weight, height, units = 'metric') => {
  let weightKg = weight;
  let heightM = height;

  if (units === 'imperial') {
    // Convert pounds to kg and inches to meters
    weightKg = weight * 0.453592;
    heightM = height * 0.0254;
  } else {
    // Convert cm to meters
    heightM = height / 100;
  }

  const bmi = weightKg / (heightM * heightM);
  return Math.round(bmi * 10) / 10;
};

export const getBMICategory = (bmi) => {
  if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600', bgColor: 'bg-blue-50' };
  if (bmi < 25) return { category: 'Normal weight', color: 'text-green-600', bgColor: 'bg-green-50' };
  if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
  if (bmi < 35) return { category: 'Obesity Class 1', color: 'text-orange-600', bgColor: 'bg-orange-50' };
  if (bmi < 40) return { category: 'Obesity Class 2', color: 'text-red-600', bgColor: 'bg-red-50' };
  return { category: 'Obesity Class 3', color: 'text-red-800', bgColor: 'bg-red-100' };
};

export const calculateBodyFat = (bmi, age, gender) => {
  // Deurenberg formula for body fat percentage estimation
  let bodyFat;
  
  if (gender === 'male') {
    bodyFat = (1.20 * bmi) + (0.23 * age) - 16.2;
  } else {
    bodyFat = (1.20 * bmi) + (0.23 * age) - 5.4;
  }
  
  return Math.max(0, Math.round(bodyFat * 10) / 10);
};

export const calculateIdealWeight = (height, age, gender, units = 'metric') => {
  let heightCm = height;
  
  if (units === 'imperial') {
    heightCm = height * 2.54;
  }
  
  let idealWeight;
  
  // Devine formula adjusted for age and gender
  if (gender === 'male') {
    idealWeight = 50 + 2.3 * ((heightCm / 2.54) - 60);
    if (age > 25) {
      idealWeight += (age - 25) * 0.1;
    }
  } else {
    idealWeight = 45.5 + 2.3 * ((heightCm / 2.54) - 60);
    if (age > 25) {
      idealWeight += (age - 25) * 0.1;
    }
  }
  
  if (units === 'imperial') {
    idealWeight = idealWeight * 2.20462; // Convert to pounds
  }
  
  return Math.round(idealWeight * 10) / 10;
};

export const getHealthRecommendations = (bmi, bodyFat, age, gender) => {
  const recommendations = [];
  const category = getBMICategory(bmi);
  
  // BMI-based recommendations
  if (bmi < 18.5) {
    recommendations.push({
      type: 'nutrition',
      title: 'Increase Caloric Intake',
      description: 'Focus on nutrient-dense, high-calorie foods to gain healthy weight.',
      priority: 'high'
    });
    recommendations.push({
      type: 'exercise',
      title: 'Strength Training',
      description: 'Include resistance exercises to build lean muscle mass.',
      priority: 'medium'
    });
  } else if (bmi >= 25) {
    recommendations.push({
      type: 'nutrition',
      title: 'Caloric Deficit',
      description: 'Create a moderate caloric deficit through portion control and healthy food choices.',
      priority: 'high'
    });
    recommendations.push({
      type: 'exercise',
      title: 'Cardio Exercise',
      description: '150+ minutes of moderate-intensity cardio per week.',
      priority: 'high'
    });
  }
  
  // Body fat recommendations
  const healthyBFRanges = {
    male: { min: 10, max: 20 },
    female: { min: 16, max: 30 }
  };
  
  const range = healthyBFRanges[gender];
  if (bodyFat > range.max) {
    recommendations.push({
      type: 'lifestyle',
      title: 'Body Fat Reduction',
      description: 'Focus on combining cardio with strength training to reduce body fat percentage.',
      priority: 'medium'
    });
  }
  
  // Age-specific recommendations
  if (age > 40) {
    recommendations.push({
      type: 'health',
      title: 'Regular Health Checkups',
      description: 'Schedule regular health screenings for diabetes, cardiovascular health, and bone density.',
      priority: 'medium'
    });
  }
  
  // General recommendations
  recommendations.push({
    type: 'lifestyle',
    title: 'Stay Hydrated',
    description: 'Drink 8-10 glasses of water daily for optimal health and metabolism.',
    priority: 'low'
  });
  
  return recommendations;
};

export const formatWeight = (weight, units) => {
  return `${weight} ${units === 'metric' ? 'kg' : 'lbs'}`;
};

export const formatHeight = (height, units) => {
  if (units === 'metric') {
    return `${height} cm`;
  } else {
    const feet = Math.floor(height / 12);
    const inches = height % 12;
    return `${feet}'${inches}"`;
  }
};